import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="min-h-[calc(100vh-80px)] bg-career-bg text-white">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col items-center gap-12 px-6 py-16 lg:flex-row lg:gap-16 lg:py-20">
        <div className="w-full text-center lg:w-1/2 lg:text-left">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-career-blue">
            Your Career Operating System
          </p>
          <h1 className="text-6xl font-bold leading-[1.1] tracking-tight">
            Your career.
            <span className="block text-career-blue">
              Your roadmap.
            </span>
            Your next move.
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-center text-base leading-7 text-slate-400 sm:text-lg sm:leading-8 lg:mx-0 lg:text-left">
            Career OS turns your career goals into a personalized roadmap,
            daily missions, and measurable progress — so you always know
            what to do next.
        </p>

          
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
           <Link to="/signup" className="rounded-xl bg-career-blue px-6 py-3.5 font-semibold transition hover:bg-career-purple"> Get Started</Link>
            <a href="#how-it-works" className="rounded-xl border border-slate-700 px-6 py-3.5 font-semibold text-slate-200 transition hover:bg-slate-800">
            See How It Works
            </a>
        </div>

        </div>


       
        <div className="flex w-full justify-center lg:w-1/2">

          <div className="dashboard-entrance w-full max-w-lg rounded-3xl border border-slate-700 bg-career-card p-6 shadow-2xl">

            <p className="text-sm text-slate-400">
              YOUR CAREER
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Full Stack Developer
            </h2>

            <div className="mt-7">
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-slate-400">
                  Career Progress
                </span>

                <span className="text-sm font-semibold">
                  64%
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-800">
                <div className="progress-bar h-2 rounded-full bg-career-blue"></div>
              </div>
            </div>

            <div className="mission-entrance mt-7 rounded-2xl bg-slate-800 p-5">

              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Today's Mission
              </p>

              <h3 className="mt-2 text-lg font-semibold">
                Build a REST API with Spring Boot
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Estimated time · 45 minutes
              </p>

            </div>

            <div className="mt-5 flex gap-4">

              <div className="flex-1 rounded-2xl bg-slate-800 p-4">
                <p className="text-xs text-slate-400">
                  CURRENT STAGE
                </p>

                <p className="mt-2 font-semibold">
                  Backend Development
                </p>
              </div>

              <div className="flex-1 rounded-2xl bg-slate-800 p-4">
                <p className="text-xs text-slate-400">
                  NEXT MILESTONE
                </p>

                <p className="mt-2 font-semibold">
                  Build 3 Projects
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;