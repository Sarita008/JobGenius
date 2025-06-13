import React, { useEffect, useState } from "react";

const AnalysisResult = ({ data, onSubmitTest }) => {
  const { message, response = [], feedback } = data || {};
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (question, text) => {
    setAnswers((prev) => ({ ...prev, [question]: text }));
  };

  const submitTest = () => {
    const formattedAnswers = response.map((q) => ({
      question: q.question,
      type: q.type,
      answer: answers[q.question] || "",
    }));
    const submissionData = {
      questions: formattedAnswers,
      submittedAt: new Date().toISOString(),
    };
    onSubmitTest(submissionData);
  };

  // Camera setup
  useEffect(() => {
    const videoElement = document.getElementById("cameraStream");
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoElement) {
            videoElement.srcObject = stream;
          }
        })
        .catch((err) => console.error("Camera access error:", err));
    }
  }, []);

  // If feedback is present, only show the feedback screen
  if (feedback) {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-400">
          <h2 className="text-xl font-semibold text-yellow-800">{message}</h2>
          <p className="mt-4"><strong>Performance:</strong> {feedback.performance}</p>
          <p><strong>Reason:</strong> {feedback.reason}</p>
          <div className="mt-4">
            <p><strong>Improvement Suggestion:</strong></p>
            <p className="mt-1 text-gray-700 whitespace-pre-line">{feedback.improvement_suggest}</p>
          </div>
        </div>
      </div>
    );
  }

  // Normal question & answer flow
  return (
    <div className="p-6 space-y-6">
      <div className="bg-blue-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">{message}</h2>
      </div>

      <div className="fixed top-10 left-4 z-50">
        <video
          id="cameraStream"
          width="160"
          height="120"
          autoPlay
          muted
          className="rounded-md border"
        />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitTest();
        }}
        className="space-y-6 mt-28"
      >
        {response.map((q, index) => (
          <div key={index} className="bg-white p-4 shadow rounded-lg">
            <p className="font-semibold mb-2">
              Q{index + 1}. {q.question}
              <span className="text-sm text-gray-500 ml-2">({q.type})</span>
            </p>

            <textarea
              rows="4"
              className="w-full p-2 border rounded"
              placeholder="Type your answer here..."
              value={answers[q.question] || ""}
              onChange={(e) => handleAnswerChange(q.question, e.target.value)}
              required
            />
          </div>
        ))}

        <div className="text-right">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Submit Answers
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnalysisResult;
