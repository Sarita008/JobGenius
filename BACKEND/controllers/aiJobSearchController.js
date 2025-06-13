const asyncHandler = require("express-async-handler");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ContentHistory = require("../models/ContentHistory");
const User = require("../models/User");

//---- Controller----

const aiJobSearchController = asyncHandler(async (req, res) => {
  try {
     // Extracting inputs from the request
     const {jobRole} = req.body;
     const resumeFile = req.file; // `multer` stores the file info in `req.file`
    
     if (!jobRole || !resumeFile) {
       return res
         .status(400)
         .json({
           message:
             "All the field are required.1",
         });
     }
     
     
    // Temporary file path for the uploaded resume
    const resumePath = resumeFile.path; // Path to the uploaded file
    const resumeBuffer = fs.readFileSync(resumePath);

    // Extract text from the resume PDF using pdf-parse
    const pdfData = await pdfParse(resumeBuffer);
    const extractedText = pdfData.text;

    // Constructing the prompt for Google Gemini API//;
    const prompt = `
    Preferred Job Role: ${jobRole}
    Resume Content: ${extractedText}

    You are an intelligent job-matching assistant. Analyze the candidate’s resume and the preferred job role. Based on the candidate's skills, experience, and preferences, perform a **real-time search** across reliable and verified sources, including company career pages.

    Your task is to extract the **20 most relevant and recently posted jobs** (not older than 7 days) that **match the candidate’s profile and job role**. For each job, collect the following details:

    - "job_role": (Exact job title)
    - "job_description": (Concise and accurate job summary)
    - "company_name": (Name of the hiring organization)
    - "apply_link": (**company’s official careers page** — must be valid and clickable)

    ### Important Requirements:
    - Only return **live, active, and currently open job listings**.
    - The **apply_link must point to the company’s official career page** not to any particular job.
    - All links must be **fully working and valid**. Avoid redirects to expired, broken, or third-party listings.
    - If the job is not listed on the official company site, **do not include it**.
    - Prioritize listings that are **closely aligned with the candidate’s resume and preferred role**.
    - Avoid duplicates, outdated posts, or irrelevant job roles.
    - Output must be a **valid JSON array** following the format shown below.

    ### JSON Output Format:
    [
      {
        "job_role": "Frontend Developer",
        "job_description": "We are looking for a skilled React.js developer to build scalable web applications. Responsibilities include developing UI components, managing application state, and ensuring high-performance web applications.",
        "company_name": "Tech Innovators Inc.",
        "apply_link": "https://careers.techinnovators.com/jobs"
      },
      {
        "job_role": "Full Stack Developer",
        "job_description": "Join our team as a Full Stack Developer with expertise in MERN stack development. Work on building web applications, RESTful APIs, and cloud-based solutions.",
        "company_name": "XYZ Solutions",
        "apply_link": "https://xyzsolutions.com/careers"
      }
    ]

    Only return the final JSON output. No extra commentary or explanation. Ensure accuracy, recency, and validity of all job listings.
    `;



    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


    const result = await model.generateContent(prompt);
    console.log("result:", result.response.text());

    // Get the response from the model
    const content = result.response.text().replace("```json","").replace("```", "");
    console.log("content:",content);
    
    //Create the history
        const newContent = await ContentHistory.create({
          user: req?.user?._id,
          content,
        });
        //Push the content into the user
        const userFound = await User.findById(req?.user?.id);
        userFound.contentHistory.push(newContent?._id);
        //Update the api Request count
        userFound.apiRequestCount += 1;
        await userFound.save();

    res.status(200).json({
      message: "Search completed.",
      response: JSON.parse(content),
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  aiJobSearchController
};


