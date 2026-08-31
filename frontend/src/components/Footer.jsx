function Footer() {
  return (
    <footer className="border-t bg-career-border bg-career-bg px-6 py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">

        
        <div>
          <p className="text-lg font-bold">
            Career<span className="text-career-blue">OS</span>
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Your career. Your roadmap. Your next move.
          </p>
        </div>

        
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">

          <a
            href="#"
            className="transition hover:text-white"
          >
            Contact
          </a>

          <a
            href="#"
            className="transition hover:text-white"
          >
            Privacy
          </a>

          <a
            href="#"
            className="transition hover:text-white"
          >
            GitHub
          </a>

          <a
            href="#"
            className="transition hover:text-white"
          >
            LinkedIn
          </a>

        </div>

      </div>

     
      <div className="mx-auto mt-8 max-w-7xl border-t bg-career-border pt-6 text-center text-sm text-slate-600">
        © 2026 Career OS. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;