
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  Code2,
  ExternalLink,
  FileCheck2,
  GitBranch,
  Target,
} from "lucide-react";

import { getResumeProjectById } from "../api/projectApi";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // ============================================================
  // FETCH RESUME PROJECT
  // ============================================================

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getResumeProjectById(projectId);

        setProject(response.data);
      } catch (error) {
        console.error("Failed to fetch resume project:", error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080b14] text-white">
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-8 text-center text-sm text-slate-500">
            Loading project...
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // NOT FOUND
  // ============================================================

  if (!project) {
    return (
      <div className="min-h-screen bg-[#080b14] text-white">
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">

          <button
            onClick={() => navigate("/projects")}
            className="mb-8 flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </button>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-10 text-center">

            <Code2
              size={32}
              className="mx-auto text-slate-600"
            />

            <h1 className="mt-4 text-xl font-semibold">
              Project not found
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              This project could not be found in your resume projects.
            </p>

          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // RESUME PROJECT DETAILS
  // ============================================================

  return (
    <ResumeProjectDetails
      project={project}
      navigate={navigate}
    />
  );
}


// ============================================================
// RESUME PROJECT DETAILS
// ============================================================

function ResumeProjectDetails({ project, navigate }) {
  return (
    <div className="min-h-screen bg-[#080b14] text-white">

      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">

        {/* ====================================================== */}
        {/* BACK */}
        {/* ====================================================== */}

        <button
          onClick={() => navigate("/projects")}
          className="mb-8 flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </button>


        {/* ====================================================== */}
        {/* HEADER */}
        {/* ====================================================== */}

        <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.025] p-6 sm:p-8">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <Code2 size={22} />
            </div>

            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-2">

                <h1 className="text-2xl font-bold sm:text-3xl">
                  {project.name}
                </h1>

                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                  From Resume
                </span>

              </div>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {project.description ||
                  "No project description available."}
              </p>

            </div>

          </div>

        </div>


        {/* ====================================================== */}
        {/* TECHNOLOGIES */}
        {/* ====================================================== */}

        <DetailSection
          title="Technologies"
          icon={<Code2 size={18} />}
        >

          {project.technologies?.length ? (

            <div className="flex flex-wrap gap-2">

              {project.technologies.map(
                (technology, index) => (
                  <span
                    key={`${technology}-${index}`}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.035] px-3 py-1.5 text-xs text-slate-300"
                  >
                    {technology}
                  </span>
                )
              )}

            </div>

          ) : (

            <p className="text-sm text-slate-500">
              No technologies were extracted for this project.
            </p>

          )}

        </DetailSection>


        {/* ====================================================== */}
        {/* SKILLS DEMONSTRATED */}
        {/* ====================================================== */}

        <DetailSection
          title="Skills Demonstrated"
          icon={<Target size={18} />}
        >

          {project.skills?.length ? (

            <div className="flex flex-wrap gap-2">

              {project.skills.map(
                (skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-lg border border-indigo-500/15 bg-indigo-500/10 px-3 py-1.5 text-xs text-indigo-300"
                  >
                    {skill}
                  </span>
                )
              )}

            </div>

          ) : (

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">

              <p className="text-sm text-slate-500">
                No specific skills were extracted for this project.
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Skills may be added later through project analysis.
              </p>

            </div>

          )}

        </DetailSection>


        {/* ====================================================== */}
        {/* RESUME SOURCE */}
        {/* ====================================================== */}

        <DetailSection
          title="Resume Source"
          icon={<FileCheck2 size={18} />}
        >

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <FileCheck2 size={17} />
              </div>

              <div>

                <p className="text-sm font-medium text-slate-300">
                  Extracted from Resume
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  This project was extracted from your uploaded resume
                  during resume analysis.
                </p>

              </div>

            </div>

          </div>

        </DetailSection>


        {/* ====================================================== */}
        {/* PROJECT LINKS */}
        {/* ====================================================== */}

        <DetailSection
          title="Project Links"
          icon={<ExternalLink size={18} />}
        >

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            {/* GitHub */}

            {project.github ? (

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-slate-300 transition hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white"
              >

                <GitBranch
                  size={17}
                  className="text-slate-400"
                />

                <span>View on GitHub</span>

                <ExternalLink
                  size={14}
                  className="ml-auto text-slate-500"
                />

              </a>

            ) : (

              <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-slate-500">

                <GitBranch size={17} />

                <span>GitHub link not available</span>

              </div>

            )}


            {/* Live Demo */}

            {project.liveDemo ? (

              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-slate-300 transition hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white"
              >

                <ExternalLink
                  size={17}
                  className="text-slate-400"
                />

                <span>Live Demo</span>

                <ExternalLink
                  size={14}
                  className="ml-auto text-slate-500"
                />

              </a>

            ) : (

              <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-slate-500">

                <ExternalLink size={17} />

                <span>Live demo not available</span>

              </div>

            )}

          </div>

        </DetailSection>


        {/* ====================================================== */}
        {/* PROJECT ID */}
        {/* ====================================================== */}

        <div className="mt-10 border-t border-white/[0.06] pt-5">

          <p className="text-xs text-slate-600">
            Resume Project ID
          </p>

          <p className="mt-1 break-all font-mono text-xs text-slate-500">
            {project._id}
          </p>

        </div>

      </div>
    </div>
  );
}


// ============================================================
// DETAIL SECTION
// ============================================================

function DetailSection({ title, icon, children }) {
  return (
    <section className="mt-8">

      <div className="mb-3 flex items-center gap-2">

        <span className="text-slate-400">
          {icon}
        </span>

        <h2 className="text-lg font-semibold text-white">
          {title}
        </h2>

      </div>

      {children}

    </section>
  );
}

