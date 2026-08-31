
import {
  FileText,
  ChartNoAxesColumnIncreasing,
  Rocket,
  CalendarDays,
  Sparkles,
  Route,
} from "lucide-react";

import FeatureCard from "./FeatureCard";
const features = [
  {
    icon: FileText,
    title: "Resume Analysis",
    description:
      "Analyze your resume to understand your skills, experience, strengths, and areas that need improvement.",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: "Career Readiness Score",
    description:
      "Get a clear picture of how prepared you are for your target career and what gaps you need to close.",
  },
  {
    icon: Rocket,
    title: "Personalized Projects",
    description:
      "Discover projects tailored to your skills and career goals so you can build experience that actually matters.",
  },
  {
    icon: CalendarDays,
    title: "Weekly Reviews",
    description:
      "Reflect on your progress every week, understand what's working, and stay accountable to your goals.",
  },
  {
    icon: Sparkles,
    title: "AI Suggestions",
    description:
      "Get intelligent recommendations for what to learn, build, improve, or focus on next.",
  },
  {
    icon: Route,
    title: "Career Timeline",
    description:
      "See your journey in one place — from completed missions and projects to milestones and achievements.",
  },
];
function CoreFeatures() {
  return (
    <section id="features" className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">

        
        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-career-blue">
            Core Features
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Everything you need to
            <span className="block text-career-blue">
              build your career.
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            From understanding where you stand today to knowing exactly
            what to do next, Career OS keeps your entire career journey
            in one place.
          </p>

        </div>


        {/* Feature Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

export default CoreFeatures;