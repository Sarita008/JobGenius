import axios from "axios";

export const aiJobSearchAPI = async (formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8090/api/v1/googleai/ai-job-search`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error in analyseJobAPI:", error?.response?.data || error.message);
    throw error;
  }
};

export const aiMockInterviewAPI = async (formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8090/api/v1/googleai/ai-mock-interview`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error in analyseJobAPI:", error?.response?.data || error.message);
    throw error;
  }
};

export const aiSkillAssessmentAPI= async (formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8090/api/v1/googleai/ai-skill-assessment`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error in analyseJobAPI:", error?.response?.data || error.message);
    throw error;
  }
};

export const analyseJobAPI = async (formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8090/api/v1/googleai/analyse-job`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error in analyseJobAPI:", error?.response?.data || error.message);
    throw error;
  }
};