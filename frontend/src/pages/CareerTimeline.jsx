import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  Award,
  BarChart3,
  Brain,
   CalendarDays,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  Circle,
  FileText,
  Flag,
  Flame,
  Lightbulb,
  Lock,
  Menu,
  Rocket,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Upload,
} from "lucide-react";

import DashboardSidebar from "../components/DashboardSidebar";

function CareerTimeline() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Projects",
    "Roadmap",
    "Resume",
    "Achievements",
    "Career Readiness",
  ];

  return (
    <div className="min-h-screen bg-career-bg text-white">

      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-64">

        {/* Header */}

        <header className="sticky top-0 z-30 border-b border-career-border bg-career-bg/90 backdrop-blur">

          <div className="flex min-h-20 items-center justify-between gap-4 px-5 sm:px-8">

            <div className="flex items-center gap-4">

              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl border border-career-border bg-career-surface p-2.5 text-slate-400 transition hover:text-white lg:hidden"
              >
                <Menu size={19} />
              </button>

              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
              >
                <ArrowLeft size={17} />
                Dashboard
              </Link>

            </div>

            <div className="flex items-center gap-2">

              <TrendingUp
                size={19}
                className="text-career-blue"
              />

              <span className="text-base font-bold sm:text-lg">
                Career Timeline
              </span>

            </div>

          </div>

        </header>


        <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-10">

          {/* Page Heading */}

          <section>

            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-career-blue">
              Your Journey
            </p>

            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              Career Journey
            </h1>

          </section>


          {/* Career Overview */}

          <section className="mt-7 rounded-3xl border border-career-border bg-career-surface p-6 sm:p-8">

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

              <OverviewItem
                label="Started On"
                value="10 January 2026"
                icon={<Flag size={17} />}
              />

              <OverviewItem
                label="Current Goal"
                value="Full Stack Developer Internship"
                icon={<Target size={17} />}
              />

              <OverviewItem
                label="Current Career Readiness"
                value="72%"
                icon={<TrendingUp size={17} />}
                highlight
              />

              <OverviewItem
                label="Estimated Goal Completion"
                value="September 2026"
                icon={<CheckCircle2 size={17} />}
              />

            </div>

          </section>


          {/* Career Journey */}

          <section className="mt-12">

            <SectionHeading
              icon={<Rocket size={19} />}
              title="Your Career Journey"
            />


            <div className="mt-8">

              <TimelineMonth
                month="January 2026"
                color="blue"
                icon={<Rocket size={17} />}
                events={[
                  {
                    icon: <Rocket size={16} />,
                    text: "Joined CareerOS",
                    type: "default",
                  },
                  {
                    icon: <Upload size={16} />,
                    text: "Uploaded Resume",
                    type: "resume",
                  },
                  {
                    icon: <Brain size={16} />,
                    text: "Resume Successfully Analyzed",
                    type: "resume",
                  },
                  {
                    icon: <Target size={16} />,
                    text: "Career Goal Selected",
                    type: "roadmap",
                  },
                ]}
              />


              <TimelineMonth
                month="February 2026"
                color="green"
                icon={<CheckCircle2 size={17} />}
                events={[
                  {
                    icon: <CheckCircle2 size={16} />,
                    text: "Foundation Stage Completed",
                    type: "roadmap",
                  },
                  {
                    icon: <Award size={16} />,
                    text: "First 7-Day Study Streak",
                    type: "achievement",
                  },
                  {
                    icon: <Star size={16} />,
                    text: "Career Readiness",
                    detail: "18% → 32%",
                    type: "readiness",
                  },
                ]}
              />


              <TimelineMonth
                month="March 2026"
                color="blue"
                icon={<BriefcaseBusiness size={17} />}
                events={[
                  {
                    icon: <BriefcaseBusiness size={16} />,
                    text: "Built Expense Tracker",
                    type: "project",
                  },
                  {
                    icon: <BarChart3 size={16} />,
                    text: "Recruiter Score",
                    detail: "84 / 100",
                    type: "project",
                  },
                  {
                    icon: <Rocket size={16} />,
                    text: "Started MERN Development",
                    type: "roadmap",
                  },
                ]}
              />


              <TimelineMonth
                month="April 2026"
                color="purple"
                icon={<Lock size={17} />}
                events={[
                  {
                    icon: <Lock size={16} />,
                    text: "JWT Authentication Completed",
                    type: "project",
                  },
                  {
                    icon: <Trophy size={16} />,
                    text: "Stage Challenge Completed",
                    type: "achievement",
                  },
                  {
                    icon: <TrendingUp size={16} />,
                    text: "Career Readiness",
                    detail: "32% → 47%",
                    type: "readiness",
                  },
                ]}
              />


              <TimelineMonth
                month="May 2026"
                color="orange"
                icon={<FileText size={17} />}
                events={[
                  {
                    icon: <FileText size={16} />,
                    text: "Resume Improved",
                    type: "resume",
                  },
                  {
                    icon: <TrendingUp size={16} />,
                    text: "Recruiter Score Increased",
                    type: "readiness",
                  },
                ]}
              />


              {/* Next Milestone */}

              <div className="relative pl-12 sm:pl-16">

                <TimelineNode color="gray" />

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-slate-400">
                    <Flag size={17} />
                  </div>

                  <h3 className="text-base font-bold text-slate-400">
                    Next Milestone
                  </h3>

                </div>


                <div className="mt-4 rounded-3xl border border-dashed border-career-border bg-career-surface p-6">

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-career-blue/10">
                        <Target
                          size={18}
                          className="text-career-blue"
                        />
                      </div>

                      <div>

                        <p className="text-sm font-semibold">
                          Interview Preparation
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Estimated Time Remaining
                        </p>

                      </div>

                    </div>


                    <p className="text-sm font-semibold text-career-blue">
                      3 Weeks
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* Career Milestones */}

          <section className="mt-12">

            <SectionHeading
              icon={<Trophy size={19} />}
              title="Career Milestones"
            />


            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

              <Milestone
                icon={<Star size={17} />}
                text="First Project Completed"
              />

              <Milestone
                icon={<Flame size={17} />}
                text="7-Day Study Streak"
              />

              <Milestone
                icon={<BarChart3 size={17} />}
                text="First Recruiter Score above 80"
              />

              <Milestone
                icon={<TrendingUp size={17} />}
                text="Career Readiness crossed 50%"
              />

              <Milestone
                icon={<Award size={17} />}
                text="Foundation Stage Completed"
              />

              <Milestone
                icon={<Trophy size={17} />}
                text="MERN Development Completed"
              />

            </div>

          </section>


          {/* Career Readiness Growth */}

          <section className="mt-12">

            <SectionHeading
              icon={<TrendingUp size={19} />}
              title="Career Readiness Growth"
            />


            <div className="mt-5 rounded-3xl border border-career-border bg-career-surface p-6 sm:p-8">

              <div className="flex items-end justify-between gap-4">

                <GrowthItem
                  month="Jan"
                  value="18%"
                />

                <GrowthArrow />

                <GrowthItem
                  month="Feb"
                  value="32%"
                />

                <GrowthArrow />

                <GrowthItem
                  month="Mar"
                  value="47%"
                />

                <GrowthArrow />

                <GrowthItem
                  month="Apr"
                  value="61%"
                />

                <GrowthArrow />

                <GrowthItem
                  month="May"
                  value="72%"
                  active
                />

              </div>


              <div className="mt-8 h-2 overflow-hidden rounded-full bg-slate-800">

                <div
                  className="h-full rounded-full bg-career-blue"
                  style={{ width: "72%" }}
                />

              </div>

            </div>

          </section>


          {/* AI Journey Reflection */}

          <section className="mt-12">

            <SectionHeading
              icon={<Brain size={19} />}
              title="AI Journey Reflection"
            />


            <div className="mt-5 rounded-3xl border border-career-border bg-career-surface p-6 sm:p-8">

              <p className="text-sm text-slate-500">
                Since joining CareerOS:
              </p>


              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <ReflectionStat
                  label="Missions Completed"
                  value="18"
                />

                <ReflectionStat
                  label="Projects Built"
                  value="5"
                />

                <ReflectionStat
                  label="Skills Learned"
                  value="24"
                />

                <ReflectionStat
                  label="Study Hours"
                  value="86"
                />

              </div>


              <div className="mt-8 grid gap-4 border-t border-career-border pt-8 md:grid-cols-3">

                <ReflectionInsight
                  label="Biggest Strength"
                  value="Backend Development"
                />

                <ReflectionInsight
                  label="Needs More Focus"
                  value="System Design"
                />

                <ReflectionInsight
                  label="Biggest Achievement"
                  value="Completed MERN Development Stage."
                />

              </div>

            </div>

          </section>


          {/* Future Projection */}

          <section className="mt-12">

            <SectionHeading
              icon={<Rocket size={19} />}
              title="Future Projection"
            />


            <div className="relative mt-5 overflow-hidden rounded-3xl border border-career-blue/20 bg-career-surface p-6 sm:p-8">

              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-career-blue/5 blur-3xl" />


              <div className="relative grid gap-8 md:grid-cols-2">

                <ProjectionItem
                  label="Current Progress Speed"
                  value="≈ +6% Career Readiness / Week"
                />

                <ProjectionItem
                  label="Estimated Goal Completion"
                  value="September 2026"
                  highlight
                />

              </div>


              <div className="relative mt-8 flex items-start gap-3 rounded-2xl border border-career-border bg-career-card p-5">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-career-blue/10">

                  <Lightbulb
                    size={17}
                    className="text-career-blue"
                  />

                </div>


                <p className="text-sm leading-6 text-slate-400">
                  If you study one extra hour every day, you could
                  reach your goal approximately{" "}
                  <span className="font-semibold text-white">
                    3 weeks earlier.
                  </span>
                </p>

              </div>

            </div>

          </section>


          {/* Upcoming Goals */}

          <section className="mt-12">

            <SectionHeading
              icon={<Target size={19} />}
              title="Upcoming Goals"
            />


            <div className="mt-5 rounded-3xl border border-career-border bg-career-surface p-6">

              <div className="grid gap-3 sm:grid-cols-2">

                <GoalItem text="Complete Interview Preparation" />

                <GoalItem text="Build Final Portfolio Project" />

                <GoalItem text="Achieve 90+ Recruiter Score" />

                <GoalItem text="Become Internship Ready" />

              </div>

            </div>

          </section>


          {/* Filters */}

          <section className="mt-12">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-2">

                <CalendarDays
                  size={18}
                  className="text-career-blue"
                />

                <h2 className="font-bold">
                  View Timeline
                </h2>

              </div>


              <div className="relative">

                <select
                  value={activeFilter}
                  onChange={(event) =>
                    setActiveFilter(event.target.value)
                  }
                  className="appearance-none rounded-xl border border-career-border bg-career-surface py-2.5 pl-4 pr-10 text-sm text-slate-300 outline-none transition focus:border-career-blue"
                >
                  {filters.map((filter) => (
                    <option
                      key={filter}
                      value={filter}
                      className="bg-career-surface"
                    >
                      {filter}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

              </div>

            </div>

          </section>


          <div className="h-12" />

        </main>

      </div>

    </div>
  );
}


/* -------------------------------- */
/* Section Heading                  */
/* -------------------------------- */

function SectionHeading({ icon, title }) {
  return (
    <div className="flex items-center gap-3">

      <div className="text-career-blue">
        {icon}
      </div>

      <h2 className="text-lg font-bold">
        {title}
      </h2>

    </div>
  );
}


/* -------------------------------- */
/* Overview                         */
/* -------------------------------- */

function OverviewItem({
  icon,
  label,
  value,
  highlight = false,
}) {
  return (
    <div>

      <div className="flex items-center gap-2 text-slate-500">

        {icon}

        <span className="text-xs">
          {label}
        </span>

      </div>

      <p
        className={`mt-3 leading-6 ${
          highlight
            ? "text-2xl font-bold text-career-blue"
            : "text-sm font-semibold text-slate-200"
        }`}
      >
        {value}
      </p>

    </div>
  );
}


/* -------------------------------- */
/* Timeline Month                   */
/* -------------------------------- */

function TimelineMonth({
  month,
  color,
  icon,
  events,
}) {
  const colors = {
    blue: {
      node: "bg-career-blue",
      icon: "bg-career-blue/10 text-career-blue",
      title: "text-career-blue",
    },

    green: {
      node: "bg-emerald-400",
      icon: "bg-emerald-400/10 text-emerald-300",
      title: "text-emerald-300",
    },

    purple: {
      node: "bg-career-purple",
      icon: "bg-career-purple/10 text-purple-300",
      title: "text-purple-300",
    },

    orange: {
      node: "bg-orange-400",
      icon: "bg-orange-400/10 text-orange-300",
      title: "text-orange-300",
    },
  };

  const theme = colors[color] || colors.blue;

  return (
    <div className="relative pb-10 pl-12 sm:pl-16">

      <TimelineNode color={theme.node} />


      <div className="flex items-center gap-3">

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${theme.icon}`}
        >
          {icon}
        </div>

        <h3 className={`text-base font-bold ${theme.title}`}>
          {month}
        </h3>

      </div>


      <div className="mt-5 space-y-3">

        {events.map((event, index) => (
          <TimelineEvent
            key={index}
            {...event}
          />
        ))}

      </div>

    </div>
  );
}


/* -------------------------------- */
/* Timeline Node                    */
/* -------------------------------- */

function TimelineNode({ color }) {
  return (
    <div
      className={`absolute left-[10px] top-1 z-10 h-5 w-5 rounded-full ring-4 ring-career-bg sm:left-[16px] ${color}`}
    />
  );
}


/* -------------------------------- */
/* Timeline Event                   */
/* -------------------------------- */

function TimelineEvent({
  icon,
  text,
  detail,
  type,
}) {
  const typeClasses = {
    default: "text-slate-300",
    resume: "text-blue-300",
    roadmap: "text-career-blue",
    project: "text-purple-300",
    achievement: "text-amber-300",
    readiness: "text-emerald-300",
  };

  return (
    <div className="flex items-start gap-3">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-career-card text-slate-400">
        {icon}
      </div>


      <div className="pt-1">

        <p className={`text-sm font-medium ${typeClasses[type]}`}>
          {text}
        </p>

        {detail && (
          <p className="mt-1 text-sm font-semibold text-career-blue">
            {detail}
          </p>
        )}

      </div>

    </div>
  );
}


/* -------------------------------- */
/* Milestone                        */
/* -------------------------------- */

function Milestone({ icon, text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-career-border bg-career-surface p-4">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-career-blue/10 text-career-blue">
        {icon}
      </div>

      <p className="text-sm font-medium text-slate-300">
        {text}
      </p>

      <Check
        size={16}
        className="ml-auto text-emerald-400"
      />

    </div>
  );
}


/* -------------------------------- */
/* Growth                           */
/* -------------------------------- */

function GrowthItem({
  month,
  value,
  active = false,
}) {
  return (
    <div className="text-center">

      <p className="text-xs text-slate-500">
        {month}
      </p>

      <p
        className={`mt-2 text-sm font-bold sm:text-lg ${
          active
            ? "text-career-blue"
            : "text-slate-300"
        }`}
      >
        {value}
      </p>

    </div>
  );
}


function GrowthArrow() {
  return (
    <div className="mb-1 hidden text-slate-600 sm:block">
      →
    </div>
  );
}


/* -------------------------------- */
/* Reflection                       */
/* -------------------------------- */

function ReflectionStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-career-border bg-career-card p-5">

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-3 text-2xl font-bold">
        {value}
      </p>

    </div>
  );
}


function ReflectionInsight({ label, value }) {
  return (
    <div>

      <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">
        {value}
      </p>

    </div>
  );
}


/* -------------------------------- */
/* Projection                       */
/* -------------------------------- */

function ProjectionItem({
  label,
  value,
  highlight = false,
}) {
  return (
    <div>

      <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>

      <p
        className={`mt-3 text-xl font-bold ${
          highlight ? "text-career-blue" : ""
        }`}
      >
        {value}
      </p>

    </div>
  );
}


/* -------------------------------- */
/* Upcoming Goals                   */
/* -------------------------------- */

function GoalItem({ text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-career-border bg-career-card p-4">

      <Circle
        size={17}
        className="shrink-0 text-slate-600"
      />

      <p className="text-sm text-slate-300">
        {text}
      </p>

    </div>
  );
}


export default CareerTimeline;