function AuthDashboard() {
  return (
    <div className="auth-dashboard-entrance">

      
      <div className="rounded-3xl border border-career-border bg-career-card p-6 shadow-2xl shadow-black/30">

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Career OS
            </p>

            <h3 className="mt-1 text-lg font-semibold">
              Your Progress
            </h3>
          </div>

          <div className="rounded-xl bg-career-blue/10 px-3 py-2 text-sm font-semibold text-career-blue">
            64%
          </div>
        </div>


        
        <div className="mt-7">
          <div className="mb-2 flex justify-between">
            <span className="text-sm text-slate-400">
              Career Readiness
            </span>

            <span className="text-sm font-semibold">
              64%
            </span>
          </div>

          <div className="h-2 rounded-full bg-slate-800">
            <div className="h-2 w-[64%] rounded-full bg-career-blue" />
          </div>
        </div>


        
        <div className="mt-7 rounded-2xl border border-career-border bg-career-surface p-5">

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Today's Mission
          </p>

          <h4 className="mt-2 font-semibold">
            Build a REST API with Spring Boot
          </h4>

          <p className="mt-2 text-sm text-slate-500">
            45 minutes · Backend Development
          </p>

        </div>


        
        <div className="mt-5 grid grid-cols-2 gap-4">

          <div className="rounded-2xl border border-career-border bg-career-surface p-4">
            <p className="text-xs text-slate-500">
              PROJECTS
            </p>

            <p className="mt-2 text-xl font-bold">
              8
            </p>
          </div>

          <div className="rounded-2xl border border-career-border bg-career-surface p-4">
            <p className="text-xs text-slate-500">
              SKILLS
            </p>

            <p className="mt-2 text-xl font-bold">
              14
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AuthDashboard;