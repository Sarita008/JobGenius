import React from "react";

const AnalysisResult = ({ data }) => {
  // Extracting data safely
  const {
    message,
    response: {
      ATS_Analysis = {},
      Skill_Analysis = {},
      Acceptance_Probability,
      Improvement_Recommendations = {},
      Roadmap = {},
      Company_Insights = {},
    } = {},
  } = data || {}; // Destructure safely, fallback to empty objects

  const {
    Score,
    Categories = {},
    Improvements = [],
  } = ATS_Analysis;
  const {
    Current_Proficiency = {},
    Job_Required_Proficiency = {},
  } = Skill_Analysis;

  const {
    Time_Based = {},
  } = Roadmap;

  const {
    Fit_for_Career,
    Reasons = [],
    Impact,
  } = Company_Insights;

  return (
    <div className="p-6 space-y-4">
      {/* Message */}
      <div className="bg-blue-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">{message}</h2>
      </div>

      {/* ATS Analysis */}
      {ATS_Analysis && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">ATS Analysis</h3>
          <p>Score: {Score}</p>
          <div>
            {Categories && Object.entries(Categories).length > 0 ? (
              Object.entries(Categories).map(([key, value]) => (
                <p key={key}>
                  {key.replace(/_/g, " ")}: {value}
                </p>
              ))
            ) : (
              <p>No categories data available.</p>
            )}
          </div>
          <div>
            <h4 className="font-medium">Improvement Recommendations</h4>
            {Array.isArray(Improvements) && Improvements.length > 0 ? (
              Improvements.map((improvement, index) => (
                <p key={index} className="list-decimal pl-5">
                  {improvement}
                </p>
              ))
            ) : (
              <p>No improvement recommendations available.</p>
            )}
          </div>
        </div>
      )}

      {/* Skill Analysis */}
      {Skill_Analysis && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Skill Analysis</h3>
          <div>
            <h4 className="font-medium">Current Proficiency</h4>
            {Current_Proficiency && Object.entries(Current_Proficiency).length > 0 ? (
              Object.entries(Current_Proficiency).map(([skill, level]) => (
                <p key={skill}>
                  {skill}: {level}
                </p>
              ))
            ) : (
              <p>No current proficiency data available.</p>
            )}
          </div>
          <div>
            <h4 className="font-medium">Job Required Proficiency</h4>
            {Job_Required_Proficiency && Object.entries(Job_Required_Proficiency).length > 0 ? (
              Object.entries(Job_Required_Proficiency).map(([skill, level]) => (
                <p key={skill}>
                  {skill}: {level}
                </p>
              ))
            ) : (
              <p>No job-required proficiency data available.</p>
            )}
          </div>
        </div>
      )}

      {/* Acceptance Probability */}
      {Acceptance_Probability && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Acceptance Probability</h3>
          <p>{Acceptance_Probability}</p>
        </div>
      )}

      {/* Improvement Recommendations */}
      {Improvement_Recommendations && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Improvement Recommendations</h3>
          <div>
            <h4 className="font-medium">Current Skills</h4>
            {Improvement_Recommendations.Current_Skills && Object.entries(Improvement_Recommendations.Current_Skills).length > 0 ? (
              Object.entries(Improvement_Recommendations.Current_Skills).map(([skill, level]) => (
                <p key={skill}>
                  {skill}: {level}
                </p>
              ))
            ) : (
              <p>No current skills data available.</p>
            )}
          </div>
          <div>
            <h4 className="font-medium">New Skills</h4>
            {Improvement_Recommendations.New_Skills && Object.entries(Improvement_Recommendations.New_Skills).length > 0 ? (
              Object.entries(Improvement_Recommendations.New_Skills).map(([skill, level]) => (
                <p key={skill}>
                  {skill}: {level}
                </p>
              ))
            ) : (
              <p>No new skills data available.</p>
            )}
          </div>
        </div>
      )}

      {/* Roadmap */}
      {Time_Based?.Hours && Object.keys(Time_Based.Hours).length > 0 && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Roadmap</h3>
          {/* Loop through each key (Day_1, Day_2, ...) inside Hours */}
          {Object.entries(Time_Based.Hours).map(([day, tasks], index) => (
            <div key={index} className="mb-6">
              <h4 className="font-medium text-xl">{day}</h4>
              <div className="space-y-4">
                {/* Check if tasks are available for the day */}
                {Array.isArray(tasks) && tasks.length > 0 ? (
                  tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="bg-white p-4 rounded-md shadow-sm">
                      <p>{task}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No tasks available for this day.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}



      {/* Company Insights */}
      {Company_Insights && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Company Insights</h3>
          <div>
            <p>Fit for Career: {Fit_for_Career ? "Yes" : "No"}</p>
            {Array.isArray(Reasons) && Reasons.length > 0 && (
              <div>
                <h4 className="font-medium">Reasons</h4>
                {Reasons.map((reason, index) => (
                  <p key={index}>- {reason}</p>
                ))}
              </div>
            )}
            <div>
              <h4 className="font-medium">Impact</h4>
              <p>{Impact}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResult;

