import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserProfileAPI } from "../../apis/user/usersAPI";
import StatusMessage from "../Alert/StatusMessage";
import { aiMockInterviewAPI } from "../../apis/googleAI/googleAI";
import AnalysisResult from "./AnalysisResult";

const AiMockInterview = () => {
  const [generatedAnalysis, setGeneratedAnalysis] = useState(null);

  // Fetch user profile
  const { isLoading, isError, data, error } = useQuery({
    queryFn: getUserProfileAPI,
    queryKey: ["profile"],
  });

  // Mutation for generating questions AND submitting answers
  const mutation = useMutation({
    mutationFn: aiMockInterviewAPI,
    onSuccess: (res, variables) => {
      if (variables.questions) {
        // Submitted answers success
        alert("Answers submitted successfully!");
        setGeneratedAnalysis(res)
      } else {
        // Generated questions success
        setGeneratedAnalysis(res);
      }
    },
  });

  // Formik form for job info + resume upload
  const formik = useFormik({
    initialValues: {
      jobRole: "",
      jobDescription: "",
      companyName: "",
      resume: null,
    },
    validationSchema: Yup.object({
      jobRole: Yup.string().required("Job role is required"),
      jobDescription: Yup.string().required("Job description is required"),
      companyName: Yup.string().required("Company name is required"),
      resume: Yup.mixed().required("Resume is required"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("jobRole", values.jobRole);
      formData.append("jobDescription", values.jobDescription);
      formData.append("companyName", values.companyName);
      formData.append("resume", values.resume);

      mutation.mutate(formData);
      setGeneratedAnalysis(null); // reset previous analysis on new submission
    },
  });

  // Handler for submitting answers from child component
  const handleSubmitTest = (submissionData) => {
    const payload = {
      questions: submissionData.questions.filter((q) => q.answer.trim() !== ""),
    };

    if (payload.questions.length === 0) {
      alert("Please answer at least one question.");
      return;
    }

    mutation.mutate(payload);
  };

  if (isLoading) {
    return <StatusMessage type="loading" message="Loading please wait..." />;
  }

  if (isError) {
    return (
      <StatusMessage
        type="error"
        message={error?.response?.data?.message || error.message}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-2xl w-full p-6">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          AI Mock Interview
        </h2>

        {/* Profile Plan and Credit */}
        <div className="flex mt-3">
          <div className="mr-2 mb-2">
            <span className="text-sm font-semibold bg-green-200 px-4 py-2 rounded-full">
              Plan: {data?.user?.subscriptionPlan}
            </span>
          </div>
          <div className="mr-2 mb-2">
            <span className="text-sm font-semibold bg-green-200 px-4 py-2 rounded-full">
              Credit: {data?.user?.apiRequestCount} / {data?.user?.monthlyRequestCount}
            </span>
          </div>
        </div>

        {/* Status Messages for mutation */}
        {mutation.isLoading && (
          <StatusMessage type="loading" message="Loading please wait..." />
        )}

        {mutation.isSuccess && !mutation.variables?.questions && (
          <StatusMessage
            type="success"
            message="Analysis generation is successful"
          />
        )}

        {mutation.isError && (
          <StatusMessage
            type="error"
            message={
              mutation.error?.response?.data?.message || mutation.error.message
            }
          />
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="jobRole"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Job Role
            </label>
            <input
              id="jobRole"
              type="text"
              {...formik.getFieldProps("jobRole")}
              className="px-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter job role"
            />
            {formik.touched.jobRole && formik.errors.jobRole && (
              <div className="text-red-500 mt-1">{formik.errors.jobRole}</div>
            )}
          </div>

          <div>
            <label
              htmlFor="jobDescription"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Job Description
            </label>
            <textarea
              id="jobDescription"
              {...formik.getFieldProps("jobDescription")}
              className="px-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter job description"
              rows="4"
            />
            {formik.touched.jobDescription && formik.errors.jobDescription && (
              <div className="text-red-500 mt-1">{formik.errors.jobDescription}</div>
            )}
          </div>

          <div>
            <label
              htmlFor="companyName"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              {...formik.getFieldProps("companyName")}
              className="px-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter company name"
            />
            {formik.touched.companyName && formik.errors.companyName && (
              <div className="text-red-500 mt-1">{formik.errors.companyName}</div>
            )}
          </div>

          <div>
            <label
              htmlFor="resume"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Upload Resume (PDF)
            </label>
            <input
              id="resume"
              type="file"
              accept=".pdf"
              onChange={(event) => {
                formik.setFieldValue("resume", event.currentTarget.files[0]);
              }}
              className="px-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
            {formik.touched.resume && formik.errors.resume && (
              <div className="text-red-500 mt-1">{formik.errors.resume}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Start Interview
          </button>
          <Link to="/history" className="block mt-4 text-center text-indigo-600 hover:underline">
            View history
          </Link>
        </form>

        {generatedAnalysis && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Interview Questions
            </h3>
            <AnalysisResult data={generatedAnalysis} onSubmitTest={handleSubmitTest} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AiMockInterview;
