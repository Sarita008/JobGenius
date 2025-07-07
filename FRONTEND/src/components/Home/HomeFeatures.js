import React from "react";
import { ArrowRight } from "lucide-react";

export default function HomeFeatures() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#ff80b5] to-[#9089fc] py-16 px-4 sm:px-6 lg:px-8 font-inter">
      {/* Overlay for better text readability */}
      <div className="bg-black bg-opacity-60 p-10 rounded-2xl shadow-xl">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Say goodbye to job <span className="text-indigo-300">search guesswork</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-200 mb-12">
            From uncertainty and rejections to clarity and preparation – discover how JobGenius transforms your job journey
          </p>

          <div className="flex flex-col lg:flex-row justify-center items-center gap-12">
            {/* BEFORE */}
            <div className="text-center max-w-sm">
              <h3 className="text-red-300 font-semibold mb-2 text-lg uppercase tracking-wide">Before JobGenius</h3>
              <p className="text-base text-white mb-8">
                Struggling to compete in the job market without AI tools
              </p>

              <div className="space-y-6">
                <div className="border border-red-200 p-5 rounded-xl bg-white/10 backdrop-blur-md shadow-md">
                  <h4 className="text-white font-semibold text-lg">Unclear Skill Demands</h4>
                  <p className="text-gray-200 text-sm mt-1">
                    Navigating the job market without knowing current in-demand skills leads to poor targeting.
                  </p>
                </div>
                <div className="border border-red-200 p-5 rounded-xl bg-white/10 backdrop-blur-md shadow-md">
                  <h4 className="text-white font-semibold text-lg">Outdated Resume Insights</h4>
                  <p className="text-gray-200 text-sm mt-1">
                    Manual resume checks miss hidden strengths and don't match job expectations.
                  </p>
                </div>
                <div className="border border-red-200 p-5 rounded-xl bg-white/10 backdrop-blur-md shadow-md">
                  <h4 className="text-white font-semibold text-lg">Limited Interview Prep</h4>
                  <p className="text-gray-200 text-sm mt-1">
                    Without structured mock interviews, preparation remains incomplete and unfocused.
                  </p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <ArrowRight className="w-16 h-16 text-white hidden lg:block" />

            {/* AFTER */}
            <div className="text-center max-w-sm">
              <h3 className="text-green-300 font-semibold mb-2 text-lg uppercase tracking-wide">After JobGenius</h3>
              <p className="text-base text-white mb-8">
                Confidently grow with AI-powered job readiness support
              </p>

              <div className="space-y-6">
                <div className="border border-green-200 p-5 rounded-xl bg-white/10 backdrop-blur-md shadow-md">
                  <h4 className="text-white font-semibold text-lg">Real-Time Skill Trends</h4>
                  <p className="text-gray-200 text-sm mt-1">
                    Understand what skills are in demand today and in the future with AI-powered forecasting.
                  </p>
                </div>
                <div className="border border-green-200 p-5 rounded-xl bg-white/10 backdrop-blur-md shadow-md">
                  <h4 className="text-white font-semibold text-lg">AI Resume Analysis</h4>
                  <p className="text-gray-200 text-sm mt-1">
                    Instantly parse and categorize your resume using NLP to enhance relevant skills.
                  </p>
                </div>
                <div className="border border-green-200 p-5 rounded-xl bg-white/10 backdrop-blur-md shadow-md">
                  <h4 className="text-white font-semibold text-lg">Adaptive Mock Interviews</h4>
                  <p className="text-gray-200 text-sm mt-1">
                    Get role-specific practice with feedback on technical and HR interview questions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> {/* End overlay */}
    </div>
  );
}
