function About() {
  return (
    <section
      id="about"
      className="bg-career-surface px-6 py-24 text-white sm:py-28"
    >
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-career-blue">
            About Career OS
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Your career shouldn't feel
            <span className="block text-career-blue">
              directionless.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Career OS brings your career goals, skills, projects, and
            progress together in one place — giving you a clear path
            from where you are today to where you want to go.
          </p>
        </div>

        {/* Values */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-career-border bg-career-card p-6 text-center transition duration-300 hover:-translate-y-1">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-career-blue/10 text-career-blue">
              01
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Know Your Direction
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Understand where you are and what steps will move
              you closer to your career goal.
            </p>
          </div>

          <div className="rounded-2xl border border-career-border bg-career-card p-6 text-center transition duration-300 hover:-translate-y-1">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-career-purple/10 text-career-purple">
              02
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Build With Purpose
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Turn your roadmap into meaningful projects, skills,
              and daily actions.
            </p>
          </div>

          <div className="rounded-2xl border border-career-border bg-career-card p-6 text-center transition duration-300 hover:-translate-y-1">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-career-blue/10 text-career-blue">
              03
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Track Your Growth
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              See your progress, identify gaps, and keep moving
              toward your next milestone.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;