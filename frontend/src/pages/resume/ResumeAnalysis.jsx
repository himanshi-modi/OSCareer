import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getLatestResumeAnalysis,
} from "../../api/resumeApi";

function ResumeAnalysis() {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getLatestResumeAnalysis(resumeId);

        setAnalysis(response.data.data);
      } catch (error) {
        console.error(
          "Failed to fetch resume analysis:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Unable to load resume analysis."
        );
      } finally {
        setLoading(false);
      }
    };

    if (resumeId) {
      fetchAnalysis();
    }
  }, [resumeId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-career-bg text-white">
        <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6">
          <div className="text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-career-border border-t-career-blue" />

            <p className="mt-5 text-sm text-slate-400">
              Loading your resume analysis...
            </p>

          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-career-bg text-white">
        <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6">

          <div className="w-full rounded-2xl border border-red-500/20 bg-career-surface p-8 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              !
            </div>

            <h1 className="mt-5 text-xl font-semibold">
              Analysis unavailable
            </h1>

            <p className="mt-3 text-sm text-slate-400">
              {error}
            </p>

          </div>

        </div>
      </main>
    );
  }

  if (!analysis) {
    return null;
  }

  const {
    analysis: analysisInfo,
    scores,
    feedback,
    summary,
    aiInsights,
  } = analysis;

  return (
    <main className="min-h-screen bg-career-bg text-white">

      {/* Header */}
      <header className="border-b border-career-border">
        <div className="mx-auto max-w-6xl px-6 py-5">

          <p className="text-xl font-bold tracking-tight">
            Career<span className="text-career-blue">OS</span>
          </p>

        </div>
      </header>


      {/* Main */}
      <div className="mx-auto max-w-5xl px-6 py-14">

        {/* Heading */}
        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-career-blue">
            Resume analysis
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Here's how your resume performs
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Our AI analyzed your resume and identified its
            strengths, weaknesses, and opportunities for improvement.
          </p>

        </div>


        {/* Status */}
        <div className="mt-10 rounded-2xl border border-career-border bg-career-surface p-5">

          <div className="flex items-center gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-career-blue/10 text-career-blue">
              ✓
            </div>

            <div>

              <p className="font-semibold">
                Analysis completed
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Resume analysis version{" "}
                {analysisInfo?.version}
              </p>

            </div>

          </div>

        </div>


        {/* Scores */}
        <section className="mt-10">

          <p className="text-sm font-medium text-slate-400">
            Resume performance
          </p>

          <div className="mt-4 grid gap-5 sm:grid-cols-3">

            <ScoreCard
              title="Resume Score"
              score={scores?.resumeScore}
              description="Overall resume quality"
            />

            <ScoreCard
              title="Recruiter Score"
              score={scores?.recruiterScore}
              description="Recruiter appeal"
            />

            <ScoreCard
              title="ATS Score"
              score={scores?.atsScore}
              description="ATS compatibility"
            />

          </div>

        </section>


        {/* Summary */}
        {summary && (
          <AnalysisSection
            title="AI Summary"
            description="Overall assessment of your resume"
          >
            <p className="text-sm leading-7 text-slate-400">
              {summary}
            </p>
          </AnalysisSection>
        )}


        {/* Strengths */}
        <AnalysisSection
          title="Strengths"
          description="What your resume is doing well"
        >
          <BulletList items={feedback?.strengths} />
        </AnalysisSection>


        {/* Weaknesses */}
        <AnalysisSection
          title="Weaknesses"
          description="Areas that may reduce your resume's impact"
        >
          <BulletList items={feedback?.weaknesses} />
        </AnalysisSection>


        {/* Missing Skills */}
        <AnalysisSection
          title="Missing Skills"
          description="Skills that could strengthen your profile"
        >
          <TagList items={feedback?.missingSkills} />
        </AnalysisSection>


        {/* Improvement Areas */}
        <AnalysisSection
          title="Improvement Areas"
          description="What you should improve next"
        >
          <BulletList items={feedback?.improvementAreas} />
        </AnalysisSection>


        {/* Suggestions */}
        <AnalysisSection
          title="AI Suggestions"
          description="Actionable recommendations from CareerOS"
        >
          <BulletList items={feedback?.suggestions} />
        </AnalysisSection>


        {/* AI Insights */}
        {aiInsights && (
          <AnalysisSection
            title="AI Insights"
            description="Additional insights from your resume"
          >
            <p className="text-sm leading-7 text-slate-400">
              {typeof aiInsights === "string"
                ? aiInsights
                : JSON.stringify(aiInsights)}
            </p>
          </AnalysisSection>
        )}


        {/* Continue */}
        <div className="mt-12 border-t border-career-border pt-10">

          <div className="rounded-3xl border border-career-border bg-career-surface p-7 text-center sm:p-9">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-career-blue/10 text-career-blue">
              ✓
            </div>

            <h2 className="mt-5 text-xl font-semibold sm:text-2xl">
              Your resume has been analyzed
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Now let's review the information we extracted from
              your resume before creating your personalized career roadmap.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate(`/resume/${resumeId}/profile-review`)
              }
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-career-blue px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-career-purple"
            >
              Review My Profile

              <span>→</span>
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}


/* -------------------------------- */
/* Score Card */
/* -------------------------------- */

function ScoreCard({
  title,
  score,
  description,
}) {
  return (
    <div className="rounded-2xl border border-career-border bg-career-surface p-6">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <div className="mt-4 flex items-end gap-1">

        <span className="text-4xl font-bold text-career-blue">
          {score ?? "--"}
        </span>

        {score !== undefined && score !== null && (
          <span className="mb-1 text-sm text-slate-500">
            /100
          </span>
        )}

      </div>

      <p className="mt-2 text-xs text-slate-500">
        {description}
      </p>

    </div>
  );
}


/* -------------------------------- */
/* Analysis Section */
/* -------------------------------- */

function AnalysisSection({
  title,
  description,
  children,
}) {
  return (
    <section className="mt-10 border-t border-career-border pt-8">

      <div>

        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>

      </div>

      <div className="mt-5 rounded-2xl border border-career-border bg-career-surface p-6">
        {children}
      </div>

    </section>
  );
}


/* -------------------------------- */
/* Bullet List */
/* -------------------------------- */

function BulletList({ items }) {

  if (!items || items.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No information available.
      </p>
    );
  }

  return (
    <ul className="space-y-3">

      {items.map((item, index) => (

        <li
          key={index}
          className="flex gap-3 text-sm leading-6 text-slate-400"
        >

          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-career-blue" />

          <span>{item}</span>

        </li>

      ))}

    </ul>
  );
}


/* -------------------------------- */
/* Tag List */
/* -------------------------------- */

function TagList({ items }) {

  if (!items || items.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No missing skills identified.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">

      {items.map((item, index) => (

        <span
          key={index}
          className="rounded-xl border border-career-border bg-career-card px-3.5 py-2 text-sm text-slate-300"
        >
          {item}
        </span>

      ))}

    </div>
  );
}


export default ResumeAnalysis;