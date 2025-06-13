import React, { useEffect, useState, useRef } from "react";

const AnalysisResult = ({ data, onSubmitTest }) => {
  const { message, response = [] } = data || {};
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds
  const [timerStarted, setTimerStarted] = useState(false);
  const formRef = useRef();

  const isSkillEvaluation =
    response && typeof response === "object" && "skill_evaluation" in response;

  // Handle answer change
  const handleAnswerChange = (question, selected) => {
    setAnswers((prev) => ({ ...prev, [question]: selected }));
  };

  // Submit answers
  const submitTest = () => {
    const formattedAnswers = response.map((q) => ({
      question: q.question,
      options: q.options,
      selectedAnswer: answers[q.question] || null,
      difficulty: q.difficulty,
    }));
    const submissionData = {
      questions: formattedAnswers,
      submittedAt: new Date().toISOString(),
    };
    onSubmitTest(submissionData);
  };

  // Tab visibility handling
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!isSkillEvaluation && document.hidden) {
        submitTest();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isSkillEvaluation]);

  // Start timer only when questions are available
  useEffect(() => {
    if (!isSkillEvaluation && response.length > 0 && !timerStarted) {
      setTimerStarted(true);
    }
  }, [response, timerStarted, isSkillEvaluation]);

  // Timer countdown
  useEffect(() => {
    if (isSkillEvaluation || !timerStarted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          submitTest();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timerStarted, timeLeft, isSkillEvaluation]);

  // Camera access
  useEffect(() => {
    if (isSkillEvaluation) return;
    const videoElement = document.getElementById("cameraStream");
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoElement.srcObject = stream;
        })
        .catch((err) => console.error("Camera access error:", err));
    }
  }, [isSkillEvaluation]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-blue-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">{message}</h2>
      </div>

      {!isSkillEvaluation && (
        <>
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

          <div className="fixed top-10 right-4 z-50 bg-white px-4 py-2 shadow rounded">
            <p className="text-red-600 font-bold">Time Left: {formatTime(timeLeft)}</p>
          </div>

          <form
            ref={formRef}
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
                  <span className="text-sm text-gray-500 ml-2">({q.difficulty})</span>
                </p>
                <div className="space-y-2">
                  {q.options.map((option, optIdx) => (
                    <label key={optIdx} className="block">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        checked={answers[q.question] === option}
                        onChange={() => handleAnswerChange(q.question, option)}
                        className="mr-2"
                        required
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="text-right">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Submit Test
              </button>
            </div>
          </form>
        </>
      )}

      {isSkillEvaluation && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Skill Evaluation Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(response.skill_evaluation).map(([skill, score], idx) => (
              <div
                key={idx}
                className="bg-white border rounded p-3 shadow-sm flex justify-between"
              >
                <span>{skill}</span>
                <span className="font-bold">{score}/10</span>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-white p-4 rounded shadow">
            <h4 className="text-md font-semibold mb-2">Summary</h4>
            <p className="text-gray-700">{response.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResult;
