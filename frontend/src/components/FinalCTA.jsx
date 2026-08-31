import { Link } from "react-router-dom";

function FinalCTA() {
  return (
    <section className="bg-career-bg px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-career-card px-6 py-20 text-center sm:px-12">

          
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-career-blue/20 blur-3xl" />

         
          <div className="relative">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-career-blue">
              Your career starts here
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Ready to build your career
              <span className="block text-career-blue">
                with confidence?
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Stop wondering what to do next. Let Career OS turn your
              career goals into a clear path forward.
            </p>
            <br></br>
            <Link to="/signup" className="mt-9 rounded-xl bg-career-blue px-7 py-3.5 font-semibold transition hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20">
              Get Started
            </Link>

          </div>


        </div>
      </div>
    </section>
  );
}

export default FinalCTA;