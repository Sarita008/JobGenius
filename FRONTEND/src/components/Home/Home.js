import HomeFeatures from "./HomeFeatures";
import FreeTrial from "./FreeTrial";
import ai from "../../assets/ai.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* Hero Section (Styled same as FreeTrial.jsx) */}
      <div className="relative isolate overflow-hidden bg-gradient-to-r from-[#ff80b5] to-[#9089fc] font-inter">
        {/* Background Image */}
        <img
          src={ai}
          alt="ai"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />

        {/* Dark overlay like FreeTrial */}
        <div className="absolute inset-0 -z-10 bg-black bg-opacity-60"></div>

        {/* Main Hero Content */}
        <div className="mx-auto max-w-3xl px-6 py-28 sm:py-40 lg:py-48 text-center">
          {/* Promo Badge */}
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-4 py-1.5 text-sm font-medium text-gray-300 ring-1 ring-white/10 hover:ring-white/20">
              Discover how JobGenius can boost your career —{" "}
              <a href="/features" className="font-semibold text-white ml-1 underline">
                Explore Features
              </a>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            JobGenius
          </h1>

          {/* Sub Text */}
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            JobGenius is an AI platform that helps users identify skill gaps, get job
            recommendations, take AI Skill Assessments, and prepare for interviews.
            Powered by Google Gemini AI, it analyzes market trends and delivers
            personalized insights to boost employability.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="free-plan"
              className="rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              Start 3 Day Free Trial
            </Link>
            <Link
              to="free-plan"
              className="text-sm font-medium text-white hover:underline"
            >
              Sign in <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <HomeFeatures />

      {/* CTA Section */}
      <FreeTrial />
    </>
  );
}
