const asyncHandler = require("express-async-handler");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");

//---- Controller----

const aiMockInterview = asyncHandler(async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // If questions are provided, run analysis prompt
    if (req.body.questions) {
      const { questions } = req.body; // array of { question, type, answer }

      // Format questions and answers into prompt text
      const qnaText = questions
        .map(
          (q, i) =>
            `Q${i + 1}: ${q.question}\nAnswer: ${q.answer || "[No answer provided]"}\n`
        )
        .join("\n");

      const analysisPrompt = `You are an AI interviewer. Analyze the following questions and answers from a candidate and provide a feedback in JSON formatt with the fields:
- performance: one of [poor, average, good, excellent]
- reason: brief explanation of the performance rating
- improvement_suggest: one paragraph suggestion for improvement

Here are the questions and answers:

${qnaText}

Return ONLY a valid JSON object, no extra text.`;

      const analysisResult = await model.generateContent(analysisPrompt);

      const analysisText = analysisResult.response.text().replace("```json", "").replace("```", "");;

      // Try to parse JSON safely
      let feedbackJSON;
      try {
        feedbackJSON = JSON.parse(analysisText);
      } catch (parseErr) {
        // fallback: wrap in object with raw text if JSON parse fails
        feedbackJSON = {
          error: "Failed to parse AI response as JSON",
          rawResponse: analysisText,
        };
      }

      return res.status(200).json({
        message: "Analysis feedback generated",
        feedback: feedbackJSON,
      });
    }

    // ELSE: proceed with original flow for generating interview questions

    // Extracting inputs from the request
    const { jobRole, jobDescription, companyName } = req.body;
    const resumeFile = req.file; // `multer` stores the file info in `req.file`

    if (!jobRole || !jobDescription || !companyName || !resumeFile) {
      return res.status(400).json({
        message: "All the fields are required.",
      });
    }

    // Temporary file path for the uploaded resume
    const resumePath = resumeFile.path; // Path to the uploaded file
    const resumeBuffer = fs.readFileSync(resumePath);

    // Extract text from the resume PDF using pdf-parse
    const pdfData = await pdfParse(resumeBuffer);
    const extractedText = pdfData.text;

    // Constructing the prompt for Google Gemini API
    const prompt = `- Job Role: ${jobRole}
- Job Description: ${jobDescription}
- Company Name: ${companyName}
- Resume: ${extractedText}
Analyze the provided resume, job role, job description, and company name to generate interview questions tailored to the candidate’s experience and the specific job requirements. The questions should assess both technical expertise and problem-solving skills while considering the expectations of the hiring company. Include a mix of behavioral, technical, and situational questions. Provide the output in a structured JSON format as shown below:
[
  {
      "question": "Can you explain how your experience with React.js aligns with the job role of a Frontend Developer at [CompanyName]?",
      "type": "Technical"
  },
  {
      "question": "Tell us about a challenging project you worked on and how you handled the difficulties. How does this experience prepare you for the role at [CompanyName]?",
      "type": "Behavioral"
  },
  {
      "question": "Given the job description for a Backend Developer, how would you design an efficient authentication system using Node.js and MongoDB?",
      "type": "Situational"
  },
  {
      "question": "What strategies do you use to stay updated with industry trends, and how would you apply them in your role at [CompanyName]?",
      "type": "General"
  }
]
Ensure that the questions are diverse and focus on various aspects such as coding skills, problem-solving ability, system design, past project experience, company-specific challenges, and communication skills. Tailor the difficulty level based on the candidate's experience and job requirements. Generate minimum 10 to 15 questions`;

    const result = await model.generateContent(prompt);

    const content = result.response.text().replace("```json", "").replace("```", "");

    return res.status(200).json({
      message: "Interview questions generated",
      response: JSON.parse(content),
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  aiMockInterview,
};
