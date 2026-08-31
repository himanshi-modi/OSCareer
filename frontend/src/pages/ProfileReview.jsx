import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  GraduationCap,
  BriefcaseBusiness,
  Code2,
  Award,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

import { getLatestResumeAnalysis } from "../api/resumeApi";

function ProfileReview() {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    skills: [],
    projects: [],
    experience: [],
    education: [],
    certificates: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // Fetch Resume Analysis
  // --------------------------------------------------

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getLatestResumeAnalysis(resumeId);

        const result = response.data.data;

        if (result.analysis.status !== "completed") {
          setError(
            "Resume analysis is not completed yet."
          );

          return;
        }

        setProfile({
          skills: result.extractedData?.skills || [],
          projects: result.extractedData?.projects || [],
          experience:
            result.extractedData?.experience || [],
          education:
            result.extractedData?.education || [],
          certificates:
            result.extractedData?.certificates || [],
        });
      } catch (error) {
        console.error(
          "Failed to load profile:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Unable to load your career profile."
        );
      } finally {
        setLoading(false);
      }
    };

    if (resumeId) {
      loadProfile();
    }if (resumeId) {
  loadProfile();
} else {
  setError("Resume ID is missing.");
  setLoading(false);
}
  }, [resumeId]);

  // --------------------------------------------------
  // Delete Skill
  // --------------------------------------------------

  const removeSkill = (skillId) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter(
        (skill) => skill._id !== skillId
      ),
    }));
  };

  // --------------------------------------------------
  // Delete Project
  // --------------------------------------------------

  const removeProject = (projectId) => {
    setProfile((prev) => ({
      ...prev,
      projects: prev.projects.filter(
        (project) => project._id !== projectId
      ),
    }));
  };

  // --------------------------------------------------
  // Delete Education
  // --------------------------------------------------

  const removeEducation = (educationId) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter(
        (item) => item._id !== educationId
      ),
    }));
  };

  // --------------------------------------------------
  // Delete Experience
  // --------------------------------------------------

  const removeExperience = (experienceId) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter(
        (item) => item._id !== experienceId
      ),
    }));
  };

  // --------------------------------------------------
  // Continue
  // --------------------------------------------------

  const handleContinue = () => {
    console.log(
      "Profile ready for Career Setup:",
      profile
    );

    navigate("/career-setup");
  };

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-career-bg text-white">
        <div className="flex flex-col items-center text-center">
          <LoaderCircle
            size={32}
            className="animate-spin text-career-blue"
          />

          <p className="mt-4 text-sm text-slate-400">
            Loading your career profile...
          </p>
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // Error
  // --------------------------------------------------

  if (error) {
    return (
      <main className="min-h-screen bg-career-bg text-white">
        <Header />

        <div className="mx-auto flex max-w-3xl justify-center px-6 py-20">
          <div className="w-full rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
            <AlertCircle
              size={32}
              className="mx-auto text-red-400"
            />

            <h1 className="mt-4 text-xl font-semibold">
              Something went wrong
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              {error}
            </p>

            <button
              onClick={() =>
                navigate(
                  `/resume/${resumeId}/analysis`
                )
              }
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-career-border bg-career-card px-5 py-3 text-sm font-medium transition hover:border-career-blue"
            >
              <ArrowLeft size={16} />

              Back to Analysis
            </button>
          </div>
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-career-bg text-white">
      <Header />

      <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">

        {/* ------------------------------------------------ */}
        {/* Header */}
        {/* ------------------------------------------------ */}

        <section className="max-w-3xl">

          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-career-blue">
            <CheckCircle2 size={16} />

            Profile review
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Let's make sure we got you right.
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
            We extracted the information below from
            your resume. Review it and make any
            corrections before we build your career
            roadmap.
          </p>

        </section>


        {/* ------------------------------------------------ */}
        {/* Profile Content */}
        {/* ------------------------------------------------ */}

        <div className="mt-12 space-y-8">

          {/* Skills */}

          <ProfileSection
            icon={<Code2 size={20} />}
            title="Skills"
            description="Technical skills detected from your resume."
          >

            <div className="flex flex-wrap gap-2">

              {profile.skills.length > 0 ? (
                profile.skills.map((skill) => (

                  <div
                    key={skill._id}
                    className="group flex items-center gap-2 rounded-xl border border-career-border bg-career-card px-3 py-2"
                  >

                    <span className="text-sm text-slate-200">
                      {skill.name}
                    </span>

                    {skill.category && (
                      <span className="text-[10px] text-slate-600">
                        {skill.category}
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        removeSkill(skill._id)
                      }
                      className="text-slate-600 transition hover:text-red-400"
                    >
                      <Trash2 size={13} />
                    </button>

                  </div>

                ))
              ) : (
                <EmptyState text="No skills detected." />
              )}

            </div>

            <AddButton label="Add skill" />

          </ProfileSection>


          {/* Projects */}

          <ProfileSection
            icon={<BriefcaseBusiness size={20} />}
            title="Projects"
            description="Projects extracted from your resume."
          >

            <div className="space-y-4">

              {profile.projects.length > 0 ? (
                profile.projects.map((project) => (

                  <ProjectCard
                    key={project._id}
                    project={project}
                    onDelete={() =>
                      removeProject(project._id)
                    }
                  />

                ))
              ) : (
                <EmptyState text="No projects detected." />
              )}

            </div>

            <AddButton label="Add project" />

          </ProfileSection>


          {/* Experience */}

          <ProfileSection
            icon={<BriefcaseBusiness size={20} />}
            title="Experience"
            description="Professional experience detected from your resume."
          >

            <div className="space-y-4">

              {profile.experience.length > 0 ? (
                profile.experience.map((experience) => (

                  <ExperienceCard
                    key={experience._id}
                    experience={experience}
                    onDelete={() =>
                      removeExperience(
                        experience._id
                      )
                    }
                  />

                ))
              ) : (
                <EmptyState text="No professional experience detected." />
              )}

            </div>

            <AddButton label="Add experience" />

          </ProfileSection>


          {/* Education */}

          <ProfileSection
            icon={<GraduationCap size={20} />}
            title="Education"
            description="Education history detected from your resume."
          >

            <div className="space-y-4">

              {profile.education.length > 0 ? (
                profile.education.map((education) => (

                  <EducationCard
                    key={education._id}
                    education={education}
                    onDelete={() =>
                      removeEducation(
                        education._id
                      )
                    }
                  />

                ))
              ) : (
                <EmptyState text="No education information detected." />
              )}

            </div>

            <AddButton label="Add education" />

          </ProfileSection>


          {/* Certificates */}

          <ProfileSection
            icon={<Award size={20} />}
            title="Certificates"
            description="Certifications detected from your resume."
          >

            {profile.certificates.length > 0 ? (
              <div className="space-y-4">

                {profile.certificates.map(
                  (certificate) => (

                    <div
                      key={certificate._id}
                      className="rounded-2xl border border-career-border bg-career-card p-5"
                    >
                      <p className="font-medium text-slate-200">
                        {certificate.name}
                      </p>

                      {certificate.issuer && (
                        <p className="mt-1 text-sm text-slate-500">
                          {certificate.issuer}
                        </p>
                      )}
                    </div>

                  )
                )}

              </div>
            ) : (
              <EmptyState text="No certificates detected." />
            )}

            <AddButton label="Add certificate" />

          </ProfileSection>

        </div>


        {/* ------------------------------------------------ */}
        {/* Bottom Action */}
        {/* ------------------------------------------------ */}

        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-career-border pt-8 sm:flex-row">

          <button
            type="button"
            onClick={() =>
              navigate(
                `/resume/${resumeId}/analysis`
              )
            }
            className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-200"
          >
            <ArrowLeft size={16} />

            Back to analysis
          </button>


          <button
            type="button"
            onClick={handleContinue}
            className="group inline-flex items-center gap-3 rounded-xl bg-career-blue px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Looks good — Continue

            <ArrowRight
              size={17}
              className="transition group-hover:translate-x-1"
            />
          </button>

        </div>

      </div>
    </main>
  );
}


// ==================================================
// Header
// ==================================================

function Header() {
  return (
    <header className="border-b border-career-border">
      <div className="mx-auto max-w-6xl px-6 py-5">

        <p className="text-xl font-bold tracking-tight">
          Career
          <span className="text-career-blue">
            OS
          </span>
        </p>

      </div>
    </header>
  );
}


// ==================================================
// Profile Section
// ==================================================

function ProfileSection({
  icon,
  title,
  description,
  children,
}) {
  return (
    <section className="rounded-3xl border border-career-border bg-career-surface p-6 sm:p-8">

      <div className="flex items-start gap-4">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-career-blue/10 text-career-blue">
          {icon}
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>

      </div>

      <div className="mt-6">
        {children}
      </div>

    </section>
  );
}


// ==================================================
// Project Card
// ==================================================

function ProjectCard({ project, onDelete }) {
  return (
    <div className="rounded-2xl border border-career-border bg-career-card p-5">

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">

          <h3 className="font-semibold text-slate-200">
            {project.name}
          </h3>

          {project.description && (
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {project.description}
            </p>
          )}

          {project.technologies?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">

              {project.technologies.map(
                (technology) => (

                  <span
                    key={technology}
                    className="rounded-lg bg-career-blue/10 px-2.5 py-1 text-xs text-career-blue"
                  >
                    {technology}
                  </span>

                )
              )}

            </div>
          )}

        </div>


        <div className="flex shrink-0 items-center gap-2">

          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 transition hover:bg-career-surface hover:text-slate-300"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 size={16} />
          </button>

        </div>

      </div>

    </div>
  );
}


// ==================================================
// Experience Card
// ==================================================

function ExperienceCard({ experience, onDelete }) {
  return (
    <div className="rounded-2xl border border-career-border bg-career-card p-5">

      <div className="flex items-start justify-between gap-4">

        <div>

          <h3 className="font-semibold text-slate-200">
            {experience.role ||
              experience.position ||
              "Experience"}
          </h3>

          {experience.company && (
            <p className="mt-1 text-sm text-slate-500">
              {experience.company}
            </p>
          )}

        </div>

        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <Trash2 size={16} />
        </button>

      </div>

    </div>
  );
}


// ==================================================
// Education Card
// ==================================================

function EducationCard({ education, onDelete }) {
  return (
    <div className="rounded-2xl border border-career-border bg-career-card p-5">

      <div className="flex items-start justify-between gap-4">

        <div>

          <h3 className="font-semibold text-slate-200">
            {education.degree ||
              "Education"}
          </h3>

          {education.institution && (
            <p className="mt-1 text-sm text-slate-400">
              {education.institution}
            </p>
          )}

          {education.fieldOfStudy && (
            <p className="mt-1 text-xs text-slate-600">
              {education.fieldOfStudy}
            </p>
          )}

          {education.endDate && (
            <p className="mt-3 text-xs text-slate-600">
              {formatDate(education.endDate)}
            </p>
          )}

        </div>

        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <Trash2 size={16} />
        </button>

      </div>

    </div>
  );
}


// ==================================================
// Empty State
// ==================================================

function EmptyState({ text }) {
  return (
    <div className="rounded-2xl border border-dashed border-career-border bg-career-card/50 p-5 text-sm text-slate-600">
      {text}
    </div>
  );
}


// ==================================================
// Add Button
// ==================================================

function AddButton({ label }) {
  return (
    <button
      type="button"
      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-career-blue transition hover:opacity-80"
    >
      <Plus size={16} />

      {label}
    </button>
  );
}


// ==================================================
// Date Formatter
// ==================================================

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString(
    "en-US",
    {
      month: "short",
      year: "numeric",
    }
  );
}


export default ProfileReview;