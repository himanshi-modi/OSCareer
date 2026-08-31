import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b bg-career-border bg-career-bg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

       
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-career-blue">
            <span className="text-lg font-bold text-white">C</span>
          </div>

          <span className="text-xl font-bold tracking-tight text-white">
            Career OS
          </span>
        </div>

        
        <div className="flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-medium text-slate-300 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#about"
            className="text-sm font-medium text-slate-300 transition hover:text-white"
          >
            About
          </a>

          <Link
            to="/login"
            className="text-sm font-medium text-slate-300 transition hover:text-white"
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-career-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;