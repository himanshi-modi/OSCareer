function AuthLayout({ children }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-career-bg text-white">

      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-career-blue/10 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-career-purple/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Very subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-6 sm:py-14">

        <div className="w-full max-w-[460px]">

          {/* Logo */}
          <div className="mb-9 text-center">
            <Link
              to="/"
              className="group inline-flex items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-career-blue/10 ring-1 ring-career-blue/20 transition duration-200 group-hover:bg-career-blue/15">
                <div className="h-2.5 w-2.5 rounded-full bg-career-blue shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
              </div>

              <span className="text-xl font-bold tracking-tight text-white">
                Career<span className="text-career-blue">OS</span>
              </span>
            </Link>
          </div>

          {/* Auth surface */}
          <div className="rounded-2xl border border-career-border/80 bg-career-bg/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">

            {children}

          </div>

          {/* Bottom branding */}
          <div className="mt-6 text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-700">
              Your career. One system.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}

export default AuthLayout;