import React from "react";

const AnalysisResult = ({ data }) => {
  const { message, response = [] } = data || {};

  return (
    <div className="p-6 space-y-4">
      {/* Message */}
      <div className="bg-blue-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">{message}</h2>
      </div>

      {/* Job Listings */}
      {Array.isArray(response) && response.length > 0 ? (
        <div className="space-y-4">
          {response.map((job, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">{job.job_role}</h3>
              <p className="text-gray-700 mt-2">{job.job_description}</p>
              <p className="mt-2 text-sm text-gray-600">
                <strong>Company:</strong> {job.company_name}
              </p>
              <a
                href={job.apply_link.startsWith("http") ? job.apply_link : `https://${job.apply_link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Apply Here
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No job listings found.</p>
      )}
    </div>
  );
};

export default AnalysisResult;
