import React from "react";
import { ArrowRight } from "lucide-react";

export default function HomeFeatures() {
  return (
    <div className="min-h-screen bg-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-4xl font-bold tracking-tight text-white mb-4"> 
        Say goodbye to job <span className="text-indigo-400">search guesswork</span>
      </h2>

        <p className="text-lg text-gray-500 mb-12">
          From uncertainty and rejections to clarity and preparation – discover how JobGenius transforms your job journey
        </p>

        <div className="flex justify-center items-center gap-10">
          {/* BEFORE JOBGENIUS */}
          <div className="text-center">
            <h3 className="text-red-600 font-bold mb-1 text-lg">BEFORE JOBGENIUS</h3>
            <p className="text-base text-white mb-10">Struggling to compete in the job market without AI tools</p>
            <div className="space-y-6">
              <div className="border border-red-200 p-4 rounded-xl shadow-sm">
                <h4 className="font-semibold text-white">Unclear Skill Demands</h4>
                <p className="text-gray-500 text-sm">
                  Navigating the job market without knowing current in-demand skills leads to poor targeting.
                </p>
              </div>
              <div className="border border-red-200 p-4 rounded-xl shadow-sm">
                <h4 className="font-semibold text-white">Outdated Resume Insights</h4>
                <p className="text-gray-500 text-sm">
                  Manual resume checks miss hidden strengths and don't match job expectations.
                </p>
              </div>
              <div className="border border-red-200 p-4 rounded-xl shadow-sm">
                <h4 className="font-semibold text-white">Limited Interview Prep</h4>
                <p className="text-gray-500 text-sm">
                  Without structured mock interviews, preparation remains incomplete and unfocused.
                </p>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center items-center">
            <ArrowRight className="w-20 h-20 text-gray-400 mt-20" />
          </div>

          {/* AFTER JOBGENIUS */}
          <div className="text-center">
            <h3 className="text-green-600 font-bold mb-1 text-lg">AFTER JOBGENIUS</h3>
            <p className="text-base text-white mb-10">Confidently grow with AI-powered job readiness support</p>
            <div className="space-y-6">
              <div className="border border-green-200 p-4 rounded-xl shadow-sm">
                <h4 className="font-semibold text-white">Real-Time Skill Trends</h4>
                <p className="text-gray-500 text-sm">
                  Understand what skills are in demand today and in the future with AI-powered forecasting.
                </p>
              </div>
              <div className="border border-green-200 p-4 rounded-xl shadow-sm">
                <h4 className="font-semibold text-white">AI Resume Analysis</h4>
                <p className="text-gray-500 text-sm">
                Instantly parse and categorize your resume using NLP to enhance relevant skills.
                </p>
              </div>
              <div className="border border-green-200 p-4 rounded-xl shadow-sm">
                <h4 className="font-semibold text-white">Adaptive Mock Interviews</h4>
                <p className="text-gray-500 text-sm">
                Get role-specific practice with feedback on technical and HR interview questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
