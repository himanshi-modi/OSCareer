
import {
  getResumeProjects,
  getCareerOSProjects,
} from "../api/projectApi";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FolderKanban,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  ArrowRight,
  Sparkles,
  Code2,
  BriefcaseBusiness,
  Target,
  ChevronRight,
} from "lucide-react";

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

export default function Projects() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("all");

  // Resume projects now come from ResumeAnalysis API
  const [resumeProjects, setResumeProjects] = useState([]);
  const [loadingResumeProjects, setLoadingResumeProjects] = useState(true);

  // CareerOS projects now come from Learning Progress API
  const [careerOSProjects, setCareerOSProjects] = useState([]);
  const [loadingCareerOSProjects, setLoadingCareerOSProjects] = useState(true);

  // ─────────────────────────────────────────────
  // FETCH RESUME PROJECTS
  // ─────────────────────────────────────────────

  useEffect(() => {
    const fetchResumeProjects = async () => {
      try {
        const response = await getResumeProjects();

        setResumeProjects(response.data || []);
      } catch (error) {
        console.error("Failed to fetch resume projects:", error);
      } finally {
        setLoadingResumeProjects(false);
      }
    };

    fetchResumeProjects();
  }, []);

  // ─────────────────────────────────────────────
  // FETCH CAREEROS PROJECTS
  // ─────────────────────────────────────────────

  useEffect(() => {
    const fetchCareerOSProjects = async () => {
      try {
        const response = await getCareerOSProjects();

        setCareerOSProjects(response.data || []);
      } catch (error) {
        console.error("Failed to fetch CareerOS projects:", error);
      } finally {
        setLoadingCareerOSProjects(false);
      }
    };

    fetchCareerOSProjects();
  }, []);

  // ─────────────────────────────────────────────
  // STATS
  // ─────────────────────────────────────────────

  const totalProjects =
    resumeProjects.length + careerOSProjects.length;

  const inProgressProjects = careerOSProjects.filter(
    (project) => project.status === "in-progress"
  ).length;

  const completedProjects = careerOSProjects.filter(
    (project) => project.progress === 100
  ).length;

  // ─────────────────────────────────────────────
  // HANDLERS
  // ─────────────────────────────────────────────

  const handleResumeProject = (projectId) => {
  navigate(`/projects/${projectId}`);
};

  const handleCareerProject = (project) => {
    if (project.status === "locked") return;

    navigate(`/learning-progress/missions/${project.missionId}`);
  };

  return (
    <div className="min-h-screen bg-[#080b14] text-white">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">

        {/* ───────────────────────────────────────── */}
        {/* HEADER */}
        {/* ───────────────────────────────────────── */}

        <div className="mb-8">
          <div className="flex items-start justify-between gap-5">
            <div>

              <div className="mb-3 flex items-center gap-2 text-sm text-slate-400">
                <FolderKanban size={16} />

                <span>CareerOS</span>

                <ChevronRight size={14} />

                <span className="text-slate-300">
                  Projects
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Projects
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Your portfolio and the projects you're building
                through your CareerOS roadmap.
              </p>

            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────── */}
        {/* STATS */}
        {/* ───────────────────────────────────────── */}

        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <StatCard
            icon={<FolderKanban size={19} />}
            value={totalProjects}
            label="Total Projects"
          />

          <StatCard
            icon={<Clock3 size={19} />}
            value={inProgressProjects}
            label="In Progress"
          />

          <StatCard
            icon={<CheckCircle2 size={19} />}
            value={completedProjects}
            label="Completed"
          />

        </div>

        {/* ───────────────────────────────────────── */}
        {/* AI RECOMMENDATION */}
        {/* ───────────────────────────────────────── */}

        <div className="mb-10 overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/[0.10] via-purple-500/[0.06] to-transparent">

          <div className="flex flex-col gap-5 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">

            <div className="flex gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                <Sparkles size={21} />
              </div>

              <div>

                <h3 className="font-semibold text-white">
                  CareerOS Recommendation
                </h3>

                <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-400">
                  You already have strong frontend and application
                  projects in your portfolio. Your next projects focus
                  on backend architecture, authentication and APIs to
                  strengthen your current skill gaps.
                </p>

              </div>

            </div>

            <button
              onClick={() => navigate("/roadmap")}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-indigo-400/20 bg-indigo-500/10 px-4 py-2.5 text-sm font-medium text-indigo-300 transition hover:bg-indigo-500/20"
            >
              View Roadmap
              <ArrowRight size={16} />
            </button>

          </div>

        </div>

        {/* ───────────────────────────────────────── */}
        {/* TABS */}
        {/* ───────────────────────────────────────── */}

        <div className="mb-8 flex items-center gap-2 border-b border-white/[0.06]">

          <TabButton
            active={activeTab === "all"}
            onClick={() => setActiveTab("all")}
          >
            All Projects
          </TabButton>

          <TabButton
            active={activeTab === "resume"}
            onClick={() => setActiveTab("resume")}
          >
            My Projects
          </TabButton>

          <TabButton
            active={activeTab === "career"}
            onClick={() => setActiveTab("career")}
          >
            CareerOS Projects
          </TabButton>

        </div>

        {/* ───────────────────────────────────────── */}
        {/* MY PROJECTS */}
        {/* ───────────────────────────────────────── */}

        {(activeTab === "all" || activeTab === "resume") && (

          <section className="mb-12">

            <SectionHeader
              icon={<BriefcaseBusiness size={18} />}
              title="My Projects"
              description="Projects you've already built"
              badge="From Resume"
            />

            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">

              {loadingResumeProjects ? (

                <div className="col-span-full rounded-2xl border border-white/[0.07] bg-white/[0.025] p-8 text-center text-sm text-slate-500">
                  Loading your resume projects...
                </div>

              ) : resumeProjects.length === 0 ? (

                <div className="col-span-full rounded-2xl border border-white/[0.07] bg-white/[0.025] p-8 text-center">

                  <Code2
                    size={28}
                    className="mx-auto text-slate-600"
                  />

                  <p className="mt-3 text-sm text-slate-400">
                    No projects found in your resume.
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Upload and analyze a resume to see your existing
                    projects here.
                  </p>

                </div>

              ) : (

                resumeProjects.map((project) => (

                  <ResumeProjectCard
                    key={project._id}
                    project={project}
                    onClick={() =>
                      handleResumeProject(project._id)
                    }
                  />

                ))

              )}

            </div>

          </section>

        )}

        {/* ───────────────────────────────────────── */}
        {/* CAREEROS PROJECTS */}
        {/* ───────────────────────────────────────── */}

        {(activeTab === "all" || activeTab === "career") && (

          <section>

            <SectionHeader
              icon={<Target size={18} />}
              title="CareerOS Projects"
              description="Projects recommended through your roadmap"
              badge="Build & Learn"
              career
            />

            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">

              {loadingCareerOSProjects ? (

                <div className="col-span-full rounded-2xl border border-white/[0.07] bg-white/[0.025] p-8 text-center text-sm text-slate-500">
                  Loading CareerOS projects...
                </div>

              ) : careerOSProjects.length === 0 ? (

                <div className="col-span-full rounded-2xl border border-white/[0.07] bg-white/[0.025] p-8 text-center">

                  <Code2
                    size={28}
                    className="mx-auto text-slate-600"
                  />

                  <p className="mt-3 text-sm text-slate-400">
                    No CareerOS projects found.
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Project missions from your roadmap will appear here.
                  </p>

                </div>

              ) : (

                careerOSProjects.map((project) => (

                  <CareerProjectCard
                    key={project.missionId}
                    project={project}
                    onClick={() =>
                      handleCareerProject(project)
                    }
                  />

                ))

              )}

            </div>

          </section>

        )}

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────

function StatCard({ icon, value, label }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-slate-300">
          {icon}
        </div>

        <span className="text-2xl font-bold text-white">
          {value}
        </span>

      </div>

      <p className="mt-4 text-sm text-slate-400">
        {label}
      </p>

    </div>
  );
}

// ─────────────────────────────────────────────
// TAB BUTTON
// ─────────────────────────────────────────────

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-3 text-sm font-medium transition ${
        active
          ? "text-white"
          : "text-slate-500 hover:text-slate-300"
      }`}
    >

      {children}

      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-indigo-400" />
      )}

    </button>
  );
}

// ─────────────────────────────────────────────
// SECTION HEADER
// ─────────────────────────────────────────────

function SectionHeader({
  icon,
  title,
  description,
  badge,
  career = false,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

      <div>

        <div className="flex items-center gap-2">

          <span
            className={`${
              career
                ? "text-indigo-400"
                : "text-emerald-400"
            }`}
          >
            {icon}
          </span>

          <h2 className="text-xl font-semibold text-white">
            {title}
          </h2>

        </div>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>

      </div>

      <span
        className={`w-fit rounded-full border px-3 py-1 text-xs font-medium ${
          career
            ? "border-indigo-500/20 bg-indigo-500/10 text-indigo-300"
            : "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
        }`}
      >
        {badge}
      </span>

    </div>
  );
}

// ─────────────────────────────────────────────
// RESUME PROJECT CARD
// ─────────────────────────────────────────────

function ResumeProjectCard({ project, onClick }) {
  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-white/[0.13] hover:bg-white/[0.035] sm:p-6">

      {/* Top */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <Code2 size={20} />
          </div>

          <div>

            <h3 className="font-semibold text-white">
              {project.name}
            </h3>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-400">

              <CheckCircle2 size={13} />

              Existing Project

            </div>

          </div>

        </div>

        <span className="rounded-full border border-emerald-500/15 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
          From Resume
        </span>

      </div>

      {/* Description */}

      <p className="mt-5 text-sm leading-6 text-slate-400">
        {project.description}
      </p>

      {/* Technologies */}

      <div className="mt-5 flex flex-wrap gap-2">

        {project.technologies?.map((tech, index) => (

          <span
            key={`${project._id}-${index}`}
            className="rounded-lg border border-white/[0.06] bg-white/[0.035] px-2.5 py-1 text-xs text-slate-300"
          >
            {tech}
          </span>

        ))}

      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-end border-t border-white/[0.06] pt-4">

        <button
          onClick={onClick}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-300 transition group-hover:text-white"
        >
          View Project

          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />

        </button>

      </div>

    </div>
  );
}

// ─────────────────────────────────────────────
// CAREEROS PROJECT CARD
// ─────────────────────────────────────────────

function CareerProjectCard({ project, onClick }) {

  const isLocked = project.status === "locked";
  const isInProgress = project.status === "in-progress";

  return (
    <div
      className={`group rounded-2xl border p-5 transition sm:p-6 ${
        isLocked
          ? "border-white/[0.05] bg-white/[0.015] opacity-70"
          : "border-indigo-500/10 bg-indigo-500/[0.025] hover:border-indigo-500/20 hover:bg-indigo-500/[0.04]"
      }`}
    >

      {/* Header */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex gap-4">

          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              isLocked
                ? "bg-white/[0.04] text-slate-500"
                : "bg-indigo-500/10 text-indigo-400"
            }`}
          >

            {isLocked ? (
              <LockKeyhole size={19} />
            ) : (
              <Code2 size={19} />
            )}

          </div>

          <div>

            <h3
              className={`font-semibold ${
                isLocked
                  ? "text-slate-400"
                  : "text-white"
              }`}
            >
              {project.title}
            </h3>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">

              <Target size={13} />

              {project.stage}

            </div>

          </div>

        </div>

        <StatusBadge status={project.status} />

      </div>

      {/* Description */}

      <p className="mt-5 text-sm leading-6 text-slate-400">
        {project.description}
      </p>

      {/* Technologies / Requirements */}

      <div className="mt-5 flex flex-wrap gap-2">

        {project.technologies?.map((tech, index) => (

          <span
            key={`${project.missionId}-${index}`}
            className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300"
          >
            {tech}
          </span>

        ))}

      </div>

      {/* Mission */}

      <div className="mt-5 rounded-xl border border-white/[0.05] bg-black/10 p-3.5">

        <p className="text-[11px] uppercase tracking-wider text-slate-600">
          Roadmap Mission
        </p>

        <p className="mt-1 text-sm text-slate-300">
          {project.mission}
        </p>

      </div>

      {/* Progress */}

      {!isLocked && (

        <div className="mt-5">

          <div className="mb-2 flex items-center justify-between">

            <span className="text-xs text-slate-500">
              Progress
            </span>

            <span className="text-xs font-medium text-slate-300">
              {project.progress}%
            </span>

          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">

            <div
              className="h-full rounded-full bg-indigo-500 transition-all"
              style={{
                width: `${project.progress}%`,
              }}
            />

          </div>

        </div>

      )}

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">

        {isLocked ? (

          <div className="flex items-center gap-2 text-xs text-slate-600">

            <LockKeyhole size={13} />

            Complete previous stage

          </div>

        ) : (

          <div className="text-xs text-slate-500">

            CareerOS Project

          </div>

        )}

        <button
          disabled={isLocked}
          onClick={onClick}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
            isLocked
              ? "cursor-not-allowed text-slate-600"
              : "bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20"
          }`}
        >

          {isInProgress ? "Continue" : "Start"}

          {!isLocked && <ArrowRight size={15} />}

        </button>

      </div>

    </div>
  );
}

// ─────────────────────────────────────────────
// STATUS BADGE
// ─────────────────────────────────────────────

function StatusBadge({ status }) {

  if (status === "locked") {
    return (
      <span className="flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-slate-500">

        <LockKeyhole size={11} />

        Locked

      </span>
    );
  }

  if (status === "in-progress") {
    return (
      <span className="flex items-center gap-1.5 rounded-full border border-indigo-500/15 bg-indigo-500/10 px-2.5 py-1 text-[11px] font-medium text-indigo-300">

        <Clock3 size={11} />

        In Progress

      </span>
    );
  }

  if (status === "completed") {
    return (
      <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">

        <CheckCircle2 size={11} />

        Completed

      </span>
    );
  }

  if (status === "submitted") {
    return (
      <span className="rounded-full border border-yellow-500/15 bg-yellow-500/10 px-2.5 py-1 text-[11px] font-medium text-yellow-300">
        Submitted
      </span>
    );
  }

  if (status === "under-review") {
    return (
      <span className="rounded-full border border-purple-500/15 bg-purple-500/10 px-2.5 py-1 text-[11px] font-medium text-purple-300">
        Under Review
      </span>
    );
  }

  if (status === "skipped") {
    return (
      <span className="rounded-full border border-orange-500/15 bg-orange-500/10 px-2.5 py-1 text-[11px] font-medium text-orange-300">
        Skipped
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span className="rounded-full border border-red-500/15 bg-red-500/10 px-2.5 py-1 text-[11px] font-medium text-red-300">
        Rejected
      </span>
    );
  }

  return (
    <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-slate-400">
      Not Started
    </span>
  );
}

