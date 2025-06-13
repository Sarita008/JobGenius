const express = require("express");
const uploadMiddleware = require("../middlewares/uploadMiddleware")
const isAuthenticated = require("../middlewares/isAuthenticated");
const { jobSkillGapAnalysisController } = require("../controllers/jobSkillGapAnalysisController");
const checkApiRequestLimit = require("../middlewares/checkApiRequestLimit");
const { aiJobSearchController } = require("../controllers/aiJobSearchController");
const { aiSkillAssessment } = require("../controllers/aiSkillAssessment");
const { aiMockInterview } = require("../controllers/aiMockInterview");

const googleAIRouter = express.Router();

googleAIRouter.post(
  "/analyse-job",
  uploadMiddleware.single('resume'),
  isAuthenticated,
  checkApiRequestLimit,
  jobSkillGapAnalysisController
);

googleAIRouter.post(
  "/ai-job-search",
  uploadMiddleware.single('resume'),
  isAuthenticated,
  checkApiRequestLimit,
  aiJobSearchController
);

googleAIRouter.post(
  "/ai-skill-assessment",
  uploadMiddleware.single('resume'),
  isAuthenticated,
  checkApiRequestLimit,
  aiSkillAssessment
);

googleAIRouter.post(
  "/ai-mock-interview",
  uploadMiddleware.single('resume'),
  isAuthenticated,
  checkApiRequestLimit,
  aiMockInterview
);



module.exports = googleAIRouter;
