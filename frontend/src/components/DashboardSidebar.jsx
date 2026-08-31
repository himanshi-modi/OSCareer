import { NavLink } from "react-router-dom";
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Map,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Roadmap",
    path: "/roadmap",
    icon: Map,
  },
  {
    label: "My Projects",
    path: "/projects",
    icon: Target,
  },
  {
    label: "Career Timeline",
    path: "/career-timeline",
    icon: TrendingUp,
  },
  {
    label: "Resume",
    path: "/onboarding/resume",
    icon: FileText,
  },
  {
    label: "Weekly Reviews",
    path: "/weekly-review",
    icon: BarChart3,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function DashboardSidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-64
          flex-col border-r border-career-border
          bg-career-surface transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}

        <div className="flex h-20 items-center justify-between border-b border-career-border px-6">
          <NavLink
            to="/"
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-career-blue/10">
              <Sparkles
                size={19}
                className="text-career-blue"
              />
            </div>

            <span className="text-lg font-bold tracking-tight">
              Career<span className="text-career-blue">OS</span>
            </span>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-career-card hover:text-white lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex-1 px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
            Workspace
          </p>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-career-blue/10 text-career-blue"
                        : "text-slate-400 hover:bg-career-card hover:text-white"
                    }`
                  }
                >
                  <Icon size={18} />
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom */}

        <div className="border-t border-career-border p-4">
          <div className="rounded-2xl border border-career-border bg-career-card p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-career-blue/10">
                <Sparkles
                  size={15}
                  className="text-career-blue"
                />
              </div>

              <div>
                <p className="text-xs font-semibold">
                  Career Readiness
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Keep building 🚀
                </p>
              </div>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-career-blue"
                style={{ width: "72%" }}
              />
            </div>

            <p className="mt-2 text-right text-xs font-semibold text-career-blue">
              72%
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default DashboardSidebar;