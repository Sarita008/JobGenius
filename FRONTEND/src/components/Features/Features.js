import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
  UserCircleIcon,
  LightBulbIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "AI Job Search",
    description:
      "Provides tailored insights and real-time solutions using AI, helping users and employers bridge skill gaps effectively.",
    href: "/ai-job-search",
    icon: CloudArrowUpIcon,
  },
   {
    name: "AI Mock Interview Practice",
    description:
      "Conducts realistic, role-specific mock interviews and provides feedback on technical, HR, and behavioral rounds.",
    href: "/ai-mock-interview",
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    name: "AI Skill Assessment Test",
    description:
      "Generates dynamic, AI-driven quizzes based on resume data and job trends to assess strengths and weak points.",
    href: "/ai-skill-assessment",
    icon: UserCircleIcon,
  },
  {
    name: "Skill Analyses",
    description:
      "Evaluates current skills against job market needs to identify gaps and recommend personalized upskilling paths.",
    href: "/ai-mock-interview",
    icon: ArrowPathIcon,
  },
  {
    name: "Resume analyses",
    description:
      "Uses Google Gemini AI to predict future in-demand skills based on tech trends and job market evolution.",
    href: "/analyse-job",
    icon: LightBulbIcon,
  },
  {
    name: "AI generated roadmap",
    description:
      "Uses NLP to extract key skills, experience, and qualifications from resumes for a structured skill evaluation.",
    href: "/analyse-job",
    icon: LockClosedIcon,
  },
  
];

export default function AppFeatures() {
  return (
  <div className="relative isolate min-h-screen bg-gradient-to-r from-[#ff80b5] to-[#9089fc] font-inter px-4 pt-32 pb-12 sm:px-6 lg:px-8 flex justify-center items-start">
     {/* Dark overlay like FreeTrial */}
  <div className="absolute inset-0 bg-black bg-opacity-60 -z-10"></div> 
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Improve faster
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to get a new Job
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            The "JobGenius" platform uses AI to help job seekers bridge skill gaps, forecast future opportunities, and prepare with personalized tools—empowering users for the evolving job market.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-none">
            {features.map((feature) => (
             <div
                key={feature.name}
                className="flex flex-col gap-y-2 rounded-xl bg-white/5 p-6 rounded-2xl shadow-lg hover:shadow-indigo-500/20 transition duration-300 ring-1 ring-white/10"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <feature.icon
                    className="h-6 w-6 flex-none text-indigo-400"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a
                      href={feature.href}
                      className="text-sm font-semibold leading-6 text-indigo-400"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
