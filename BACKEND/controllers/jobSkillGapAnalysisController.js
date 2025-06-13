const asyncHandler = require("express-async-handler");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ContentHistory = require("../models/ContentHistory");
const User = require("../models/User");

//----googleAI Controller----

const jobSkillGapAnalysisController = asyncHandler(async (req, res) => {
  try {
     // Extracting inputs from the request
     const { jobRole, jobDescription, timeRemaining, companyName} = req.body;
     const resumeFile = req.file; // `multer` stores the file info in `req.file`
    
     if (!jobRole || !jobDescription || !timeRemaining || !companyName || !resumeFile) {
       return res
         .status(400)
         .json({
           message:
             "All the field are required",
         });
     }
     
    // Temporary file path for the uploaded resume
    const resumePath = resumeFile.path; // Path to the uploaded file
    const resumeBuffer = fs.readFileSync(resumePath);

    // Extract text from the resume PDF using pdf-parse
    const pdfData = await pdfParse(resumeBuffer);
    const extractedText = pdfData.text;

    // Constructing the prompt for Google Gemini API// const prompt = `This is my job role: ${jobRole}, this is the job description: ${jobDescription}, this is the time remaining ${timeRemaining}, this is company name: ${companyName} and this is my resume: ${extractedText}. Score ats score The Resume Provided and parameter used for that and make categories of that. Provide what can be improved in resume to improve ATS score Provide Analysis my skills profiecency level where level 1 is lowest and level 10 is highest based on my projects and work experience. Provide Analysis of job description and level of skill proficiency level required in this job. Now tell me what are my acceptance chances from 100%. Provide current skills need to improve to which level.Provide New skills need to learn to which level. Provide Roadmap based on time remaing if time is less than 2 days then provide roadmap in accourding to hours. Provide insights about the company as if it will be a good fit for my career or not and why also Provide what impact my skills can have in this company. Provide this whole data in such formatt that it convert into JSON formatt after we use JSON.parse() function as your output is always in string.`;
    const prompt = `Analyze the following information and generate a comprehensive report in JSON format:
    - Job Role: ${jobRole}
    - Job Description: ${jobDescription}
    - Time Remaining: ${timeRemaining}
    - Company Name: ${companyName}
    - Resume Text: ${extractedText}

    Instructions:
    1. **ATS Score Analysis**:
      - Score the provided resume's ATS compatibility based on the job description.
      - Categorize the ATS analysis results into sections (e.g., Skills Match, Keywords, Formatting, etc.).
      - Suggest specific improvements to increase the ATS score.

    2. **Skill Proficiency Analysis**:
      - Evaluate my skill proficiency levels (scale 1-10) based on the resume, projects, and work experience.
      - Assess the required proficiency levels for the job description according to current market standard and compare with my current levels.

    3. **Acceptance Probability**:
      - Calculate the chances of acceptance (percentage from 0 to 100) based on the analysis above.

    4. **Skill Improvement Recommendations**:
      - List current skills to improve and specify the target proficiency level.
      - Recommend new skills to learn, with target proficiency levels.

    5. **Roadmap for Improvement**:
      - If time remaining is less than 2 days, provide a detailed hourly roadmap.
      - For more time, provide a broader roadmap with key milestones.

    6. **Company Insights**:
      - Evaluate if this company aligns with my career goals and explain why.
      - Highlight the potential impact of my skills on this company.

    Output Requirements:
    - Structure the entire response in valid JSON format.
    - Ensure the JSON format works directly with JSON.parse().
    - JSON structure must use:
    {
      "ATS_Analysis": {
        "Score": 85,
        "Categories": {
          "Skills_Match": "Good",
          "Keywords": "Moderate",
          "Formatting": "Poor"
        },
        "Improvements": ["Add more job-specific keywords", "Use ATS-friendly formatting"]
      },
      "Skill_Analysis": {
        "Current_Proficiency": {
          "ReactJS": 8,
          "NodeJS": 7
        },
        "Job_Required_Proficiency": {
          "ReactJS": 9,
          "NodeJS": 8
        }
      },
      "Acceptance_Probability": "75%",
      "Improvement_Recommendations": {
        "Current_Skills": {
          "ReactJS": 9,
          "NodeJS": 8
        },
        "New_Skills": {
          "TypeScript": 7
        }
      },
      "Roadmap": {
        "Time_Based": {
          "Hours": {
            "Day_1": ["Improve ATS keywords", "Optimize resume formatting"],
            "Day_2": ["Focus on skill gaps"]
          }
        }
      },
      "Company_Insights": {
        "Fit_for_Career": true,
        "Reasons": ["Innovative work environment", "Aligned with long-term goals"],
        "Impact": "High potential to contribute with ReactJS expertise"
      }
    }`;

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


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
      message: "Analysis completed.",
      response: JSON.parse(content),
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  jobSkillGapAnalysisController,
};


