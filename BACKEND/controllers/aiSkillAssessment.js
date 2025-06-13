const asyncHandler = require("express-async-handler");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const aiSkillAssessment = asyncHandler(async (req, res) => {
  try {
    const resumeFile = req.file;
    const userAnswers = req.body.answers; // JSON string from frontend

    if (!resumeFile) {
      return res.status(400).json({
        message: "Resume file is required.",
      });
    }

    const resumePath = resumeFile.path;
    const resumeBuffer = fs.readFileSync(resumePath);
    const pdfData = await pdfParse(resumeBuffer);
    const extractedText = pdfData.text;

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt = "";

    // Case 1: Generate MCQs based on resume
    if (!userAnswers) {
      prompt = `
The Resume content: ${extractedText};

Analyze the given resume content, including projects, work experience, and skills, to generate a skill assessment questionnaire. 
Create 30–40 multiple-choice questions (MCQs) based on the candidate's skills.
Categorize the questions as Easy, Medium, or Hard — 10% Hard, 30% Medium, and 60% Easy.
Make sure the questions cover key skills like programming languages, frameworks, databases, and tools mentioned in the resume.

Return a JSON array like:
[
  {
    "question": "Which lifecycle method runs after a component mounts in React?",
    "options": ["componentDidMount", "render", "useEffect", "shouldComponentUpdate"],
    "difficulty": "Easy"
  },
  ...
]
Only return the JSON array.
`;
    } else {
      // Case 2: Evaluate answers and return skill-wise breakdown
      prompt = `
Resume Content:
${extractedText}

Below are multiple-choice questions and the candidate’s answers:

${userAnswers}

Evaluate the user's skills based on the correctness and difficulty of their answers. Then, return a **skill-wise score** out of 10 for each technology or topic you can infer (e.g., React, Node.js, JavaScript, MongoDB, Express, HTML, CSS, etc.).

if user did not answer questions correctly in selected answer or have selected answer have null then reduce thier level accordingly


###IMPORTANT: DO NOT EVALUATE on RESUME ONLY PROVIDE LEVEL BASED ON ASNWERS. give 1 level at lowest.


### Output JSON format:
{
  "skill_evaluation": {
    "React": 8,
    "Node.js": 7,
    "JavaScript": 9,
    "MongoDB": 6,
    "HTML": 8,
    "CSS": 7
  },
  "summary": "The candidate shows strong frontend development skills with solid React and JavaScript knowledge. Backend and database knowledge is moderate."
}

Only return valid JSON. No extra explanation outside of the JSON.
`;
    }

    const result = await model.generateContent(prompt);
    const content = result.response.text().replace(/```json|```/g, "");
    console.log(content);
    


    res.status(200).json({
      message: userAnswers ? "Skill Evaluation by Technology" : "Skill Assessment Questions Generated",
      response: JSON.parse(content),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred during AI processing",
      error: error.message,
    });
  }
});

module.exports = {
  aiSkillAssessment,
};
