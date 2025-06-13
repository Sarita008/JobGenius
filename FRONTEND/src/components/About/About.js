import React from "react";
import {
  ChatBubbleBottomCenterTextIcon,
  UserGroupIcon,
  UserCircleIcon,
  AcademicCapIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const cards = [
  {
    name: "Community & Support",
    description:
      "We foster a supportive community where job seekers and learners can connect, share experiences, and receive guidance throughout their journey.",
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    name: "Collaboration & Growth",
    description:
      "We partner with industry experts, hiring managers, and educators to ensure our platform aligns with real-world job market needs and trends.",
    icon: UserGroupIcon,
  },
  {
    name: "User-Centric Design",
    description:
      "Our platform is designed with you in mind — intuitive, accessible, and constantly evolving to meet your career goals.",
    icon: UserCircleIcon,
  },
  {
    name: "Career Empowerment",
    description:
      "We believe in unlocking potential. JobGenius equips individuals with the tools, confidence, and direction to shape successful careers.",
    icon: AcademicCapIcon,
  },
  {
    name: "Driven by Innovation",
    description:
      "Innovation is at our core. We continuously integrate the latest advancements in AI and analytics to redefine job preparation.",
    icon: SparklesIcon,
  },
  {
    name: "Trust & Data Privacy",
    description:
      "We respect your data. Our systems are secure, transparent, and compliant with industry standards to protect user information.",
    icon: ShieldCheckIcon,
  },
];

export default function AboutUs() {
  return (
    <div className="relative bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Empowering Job Seekers Through Innovation & Support
          </h2>
          <p className="mt-6 text-lg text-gray-300">
            At <span className="text-indigo-400 font-semibold">JobGenius</span>, our mission goes beyond skill analysis. We aim to build a supportive, ethical, and intelligent ecosystem that prepares individuals not just for jobs — but for meaningful careers in an evolving market.
          </p>
        </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => (
            <div
              key={card.name}
              className="flex gap-x-4 rounded-xl bg-white/5 p-6 rounded-2xl shadow-lg hover:shadow-indigo-500/20 transition duration-300 ring-1 ring-white/10"
            >
              <card.icon
                className="h-7 w-5 flex-none text-indigo-400"
                aria-hidden="true"
              />
              <div className="text-base leading-7">
                <h3 className="font-semibold text-white">{card.name}</h3>
                <p className="mt-2 text-gray-300">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
