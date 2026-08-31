import StepCard from "./StepCard";

const steps = [
  {
    number: "01",
    title: "Upload Resume",
    description:
      "Upload your resume and let Career OS understand your current skills, experience, projects, and career profile.",
  },
  {
    number: "02",
    title: "Get Personalized Roadmap",
    description:
      "Based on your goals and current skills, Career OS creates a personalized roadmap showing what you should focus on next.",
  },
  {
    number: "03",
    title: "Achieve Your Goal",
    description:
      "Complete daily missions, build projects, track your progress, and keep moving toward your career goal.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-career-bg px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">

        
        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-career-blue">
            How Career OS Works
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            From where you are to where
            <span className="block text-career-blue">
              you want to be.
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Career OS understands where you are today and helps you take
            the right steps toward your career goal.
          </p>

        </div>

       
        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {steps.map((step) => (
            <StepCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;