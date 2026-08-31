
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  Brain,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Flame,
  FileText,
  Lightbulb,
  Menu,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";

import DashboardSidebar from "../components/DashboardSidebar";

import {
  getCurrentWeeklyReview,
  getWeeklyReviewStats,
} from "../api/weeklyReviewApi";

import {
  getUserStages,
  getStageMissions,
} from "../api/learningProgressApi";

function WeeklyReview() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [review, setReview] = useState(null);
  const [stats, setStats] = useState(null);

  // Actual Learning Progress missions
  const [nextWeekMissions, setNextWeekMissions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadWeeklyReview();
  }, []);

  // ============================================================
  // LOAD WEEKLY REVIEW
  // ============================================================

  const loadWeeklyReview = async () => {
    try {
      setLoading(true);
      setError("");

      // --------------------------------------------------------
      // Load Weekly Review + Stats
      // --------------------------------------------------------

      const [reviewResponse, statsResponse] =
        await Promise.all([
          getCurrentWeeklyReview(),
          getWeeklyReviewStats(),
        ]);

      console.log(
        "📊 WEEKLY REVIEW RESPONSE:",
        reviewResponse
      );

      console.log(
        "📈 WEEKLY REVIEW STATS:",
        statsResponse
      );

      const currentReview = reviewResponse?.data;
      const currentStats = statsResponse?.data;

      setReview(currentReview);
      setStats(currentStats);

      // --------------------------------------------------------
      // Load actual Learning Progress stages
      // --------------------------------------------------------

      try {
        const stagesResponse = await getUserStages();

        console.log(
          "🔥 STAGES RESPONSE:",
          stagesResponse
        );

        /*
          Expected response:

          {
            success: true,
            message: "Stages fetched successfully",
            data: {
              roadmapId: "...",
              careerProfileId: "...",
              targetCareer: "...",
              stages: [...]
            }
          }
        */

        const stages =
          stagesResponse?.data?.stages || [];

        console.log(
          "🔥 STAGES ARRAY:",
          stages
        );

        // ------------------------------------------------------
        // Find current / next available stage
        // ------------------------------------------------------

        const nextStage = stages.find(
          (stage) =>
            stage.status !== "completed" &&
            stage.status !== "skipped" &&
            stage.status !== "locked"
        );

        console.log(
          "🔥 NEXT STAGE:",
          nextStage
        );

        // No available stage
        if (!nextStage?.stageId) {
          console.log(
            "⚠️ No available next stage found"
          );

          setNextWeekMissions([]);
          return;
        }

        // ------------------------------------------------------
        // Get missions for the next/current stage
        // ------------------------------------------------------

        console.log(
          "🔥 LOADING MISSIONS FOR STAGE:",
          nextStage.stageId
        );

        const missionsResponse =
          await getStageMissions(
            nextStage.stageId
          );

        console.log(
          "🔥 NEXT STAGE MISSIONS RESPONSE:",
          missionsResponse
        );

        /*
          Expected response:

          {
            success: true,
            data: [...]
          }

          OR potentially:

          {
            success: true,
            data: {
              missions: [...]
            }
          }
        */

        let missions = [];

        if (
          Array.isArray(
            missionsResponse?.data
          )
        ) {
          missions =
            missionsResponse.data;
        } else if (
          Array.isArray(
            missionsResponse?.data?.missions
          )
        ) {
          missions =
            missionsResponse.data.missions;
        }

        console.log(
          "🎯 NEXT STAGE MISSIONS:",
          missions
        );

        // ------------------------------------------------------
        // Only show pending missions
        // ------------------------------------------------------

        const pendingMissions =
          missions.filter((mission) => {
            const status =
              mission?.status ||
              mission?.progress?.status ||
              mission?.missionProgress?.status;

            return (
              status !== "completed" &&
              status !== "skipped"
            );
          });

        console.log(
          "🎯 PENDING NEXT WEEK MISSIONS:",
          pendingMissions
        );

        // ------------------------------------------------------
        // Show maximum 3 missions
        // ------------------------------------------------------

        setNextWeekMissions(
          pendingMissions.slice(0, 3)
        );
      } catch (missionError) {
        console.error(
          "❌ Failed to load next week missions:",
          missionError
        );

        setNextWeekMissions([]);
      }
    } catch (err) {
      console.error(
        "❌ Failed to load weekly review:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to load weekly review."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-career-bg text-white">
        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() =>
            setSidebarOpen(false)
          }
        />

        <div className="lg:pl-64">
          <header className="sticky top-0 z-30 border-b border-career-border bg-career-bg/90 backdrop-blur">
            <div className="flex min-h-20 items-center justify-between px-5 sm:px-8">

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setSidebarOpen(true)
                  }
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
                <BarChart3
                  size={19}
                  className="text-career-blue"
                />

                <span className="text-base font-bold sm:text-lg">
                  Weekly Review
                </span>
              </div>

            </div>
          </header>

          <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
            <div className="flex min-h-[60vh] items-center justify-center">

              <div className="text-center">

                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-career-border border-t-career-blue" />

                <p className="mt-4 text-sm text-slate-400">
                  Loading your weekly review...
                </p>

              </div>

            </div>
          </main>
        </div>
      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <div className="min-h-screen bg-career-bg text-white">

        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() =>
            setSidebarOpen(false)
          }
        />

        <div className="lg:pl-64">

          <header className="sticky top-0 z-30 border-b border-career-border bg-career-bg/90 backdrop-blur">

            <div className="flex min-h-20 items-center justify-between px-5 sm:px-8">

              <div className="flex items-center gap-4">

                <button
                  type="button"
                  onClick={() =>
                    setSidebarOpen(true)
                  }
                  className="rounded-xl border border-career-border bg-career-surface p-2.5 text-slate-400 lg:hidden"
                >
                  <Menu size={19} />
                </button>

                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"
                >
                  <ArrowLeft size={17} />
                  Dashboard
                </Link>

              </div>

              <div className="flex items-center gap-2">

                <BarChart3
                  size={19}
                  className="text-career-blue"
                />

                <span className="text-base font-bold sm:text-lg">
                  Weekly Review
                </span>

              </div>

            </div>

          </header>

          <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">

            <div className="flex min-h-[60vh] items-center justify-center">

              <div className="max-w-md rounded-3xl border border-career-border bg-career-surface p-8 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                  <BarChart3 size={22} />
                </div>

                <h2 className="mt-5 text-xl font-bold">
                  Weekly Review Unavailable
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={loadWeeklyReview}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-career-blue px-5 py-3 text-sm font-semibold transition hover:bg-career-purple"
                >
                  Try Again
                  <ArrowRight size={16} />
                </button>

              </div>

            </div>

          </main>

        </div>

      </div>
    );
  }

  // ============================================================
  // CALCULATIONS
  // ============================================================

  const currentReadiness =
    review?.readinessScore ?? null;

  const previousReadiness =
    stats?.lastWeekReadiness ?? null;

  const readinessImprovement =
    currentReadiness !== null &&
    previousReadiness !== null
      ? currentReadiness -
        previousReadiness
      : null;

  const skillsCount =
    review?.skillsLearned?.length ?? 0;

  const projectsCount =
    review?.projectsCompleted?.length ?? 0;

  const certificatesCount =
    review?.certificatesAdded?.length ?? 0;

  const resumesCount =
    review?.resumesUpdated?.length ?? 0;

  const completedMissions =
    review?.completedMissions ?? 0;

  const totalMissions =
    review?.totalMissions ?? 0;

  // ============================================================
  // MISSION HELPERS
  // ============================================================

  const getMissionId = (mission) =>
    mission?._id ||
    mission?.missionId ||
    mission?.mission?._id;

  const getMissionTitle = (mission) =>
    mission?.title ||
    mission?.name ||
    mission?.mission?.title ||
    mission?.mission?.name ||
    "Untitled Mission";

  const getMissionDescription = (mission) =>
    mission?.description ||
    mission?.mission?.description ||
    "";

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-career-bg text-white">

      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <div className="lg:pl-64">

        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <header className="sticky top-0 z-30 border-b border-career-border bg-career-bg/90 backdrop-blur">

          <div className="flex min-h-20 items-center justify-between gap-4 px-5 sm:px-8">

            <div className="flex items-center gap-4">

              <button
                type="button"
                onClick={() =>
                  setSidebarOpen(true)
                }
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

              <BarChart3
                size={19}
                className="text-career-blue"
              />

              <span className="text-base font-bold sm:text-lg">
                Weekly Review
              </span>

            </div>

          </div>

        </header>

        <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-10">

          {/* ================================================== */}
          {/* WEEK */}
          {/* ================================================== */}

          <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Current Review
              </p>

              <h1 className="mt-2 text-xl font-bold sm:text-2xl">

                Week:{" "}

                {formatReviewDate(
                  review?.weekStartDate
                )}

                {" – "}

                {formatReviewDate(
                  review?.weekEndDate
                )}

              </h1>

            </div>

            <Link
              to="/weekly-review/history"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-career-border bg-career-surface px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-career-blue/40 hover:text-white"
            >
              <CalendarDays size={16} />
              Previous Weeks
            </Link>

          </section>

          {/* ================================================== */}
          {/* WEEKLY SUMMARY */}
          {/* ================================================== */}

          <section className="mt-10">

            <SectionHeading
              icon={<Trophy size={19} />}
              title="Weekly Summary"
            />

            <div className="mt-5 grid gap-4 sm:grid-cols-3">

              <StatCard
                label="Career Readiness"
                value={
                  currentReadiness !== null
                    ? previousReadiness !== null
                      ? `${previousReadiness}% → ${currentReadiness}%`
                      : `${currentReadiness}%`
                    : "—"
                }
                icon={<TrendingUp size={19} />}
                highlight
              />

              <StatCard
                label="Overall Improvement"
                value={
                  readinessImprovement !== null
                    ? `${
                        readinessImprovement >=
                        0
                          ? "+"
                          : ""
                      }${readinessImprovement}%`
                    : "—"
                }
                icon={<BarChart3 size={19} />}
                highlight
              />

              <StatCard
                label="Completed Missions"
                value={`${completedMissions} / ${totalMissions}`}
                icon={
                  <CheckCircle2
                    size={19}
                  />
                }
              />

            </div>

          </section>

          {/* ================================================== */}
          {/* ACHIEVEMENTS */}
          {/* ================================================== */}

          <section className="mt-10">

            <SectionHeading
              icon={<Award size={19} />}
              title="Achievements"
            />

            <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_280px]">

              <div className="rounded-3xl border border-career-border bg-career-surface p-6">

                <div className="space-y-4">

                  <Achievement
                    text={`Completed ${completedMissions} Missions`}
                  />

                  <Achievement
                    text={`Added ${skillsCount} New Skills`}
                  />

                  <Achievement
                    text={`Completed ${projectsCount} Projects`}
                  />

                  <Achievement
                    text={`Added ${certificatesCount} Certificates`}
                  />

                </div>

              </div>

              <div className="rounded-3xl border border-career-border bg-career-surface p-6">

                <div className="flex items-center gap-2">

                  <Flame
                    size={19}
                    className="text-orange-400"
                  />

                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Longest Study Streak
                  </p>

                </div>

                <p className="mt-5 text-3xl font-bold">
                  {stats?.longestStreak ?? 0} Days
                </p>

                <p className="mt-2 text-sm text-slate-500">

                  {stats?.longestStreak > 0
                    ? "Keep the streak alive."
                    : "Start building your study streak."}

                </p>

              </div>

            </div>

          </section>

          {/* ================================================== */}
          {/* PROGRESS BREAKDOWN */}
          {/* ================================================== */}

          <section className="mt-10">

            <SectionHeading
              icon={<BarChart3 size={19} />}
              title="Progress Breakdown"
            />

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              <MetricCard
                icon={
                  <CheckCircle2
                    size={18}
                  />
                }
                label="Projects Completed"
                value={projectsCount}
              />

              <MetricCard
                icon={
                  <Sparkles
                    size={18}
                  />
                }
                label="Skills Learned"
                value={skillsCount}
              />

              <MetricCard
                icon={
                  <TrendingUp
                    size={18}
                  />
                }
                label="Roadmap Progress"
                value={`${review?.roadmapProgress ?? 0}%`}
              />

              <MetricCard
                icon={
                  <FileText
                    size={18}
                  />
                }
                label="Resume Improvements"
                value={resumesCount}
              />

              <MetricCard
                icon={
                  <Award size={18} />
                }
                label="Certificates Added"
                value={certificatesCount}
              />

              <MetricCard
                icon={
                  <Clock3 size={18} />
                }
                label="Study Hours"
                value="—"
              />

            </div>

          </section>

          {/* ================================================== */}
          {/* AI INSIGHTS */}
          {/* ================================================== */}

          <section className="mt-10">

            <SectionHeading
              icon={<Brain size={19} />}
              title="AI Weekly Insights"
            />

            <div className="mt-5 grid gap-4 lg:grid-cols-3">

              {/* AI SUMMARY */}

              <InsightCard
                icon={<Trophy size={19} />}
                title="AI Summary"
                text={
                  review?.aiSummary ||
                  "AI analysis has not been generated yet."
                }
              />

              {/* AI SUGGESTIONS */}

              <InsightCard
                icon={<Lightbulb size={19} />}
                title="AI Suggestions"
                text={
                  Array.isArray(
                    review?.aiSuggestions
                  )
                    ? review.aiSuggestions
                        .map(
                          (suggestion) =>
                            `• ${suggestion}`
                        )
                        .join("\n")
                    : review?.aiSuggestions ||
                      "No AI suggestions available yet."
                }
              />

              {/* AI MOTIVATION */}

              <InsightCard
                icon={<Target size={19} />}
                title="AI Motivation"
                text={
                  review?.aiMotivation ||
                  "No AI motivation available yet."
                }
              />

            </div>

          </section>

          {/* ================================================== */}
          {/* NEXT WEEK PLAN */}
          {/* ================================================== */}

          <section className="mt-10">

            <SectionHeading
              icon={<CalendarDays size={19} />}
              title="Next Week Plan"
            />

            <div className="mt-5 rounded-3xl border border-career-border bg-career-surface p-6 sm:p-8">

              {nextWeekMissions.length > 0 ? (

                <div className="grid gap-4 md:grid-cols-3">

                  {nextWeekMissions.map(
                    (mission, index) => {

                      const missionId =
                        getMissionId(
                          mission
                        );

                      return (
                        <Link
                          key={
                            missionId ||
                            index
                          }
                          to={
                            missionId
                              ? `/learning-progress/missions/${missionId}`
                              : "/roadmap"
                          }
                          className="group rounded-2xl border border-career-border bg-career-card p-5 transition hover:border-career-blue/40 hover:bg-career-card/80"
                        >

                          <div className="flex items-center justify-between">

                            <span className="text-xs font-semibold text-career-blue">
                              MISSION{" "}
                              {String(
                                index + 1
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            <ArrowRight
                              size={16}
                              className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-career-blue"
                            />

                          </div>

                          <p className="mt-5 text-sm font-semibold leading-6">

                            {getMissionTitle(
                              mission
                            )}

                          </p>

                          {getMissionDescription(
                            mission
                          ) && (
                            <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-500">
                              {getMissionDescription(
                                mission
                              )}
                            </p>
                          )}

                        </Link>
                      );
                    }
                  )}

                </div>

              ) : (

                <div className="rounded-2xl border border-career-border bg-career-card p-6 text-center">

                  <Target
                    size={24}
                    className="mx-auto text-career-blue"
                  />

                  <p className="mt-4 text-sm font-semibold">
                    No upcoming missions found
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Continue your roadmap to unlock your next missions.
                  </p>

                  <Link
                    to="/roadmap"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-career-blue px-5 py-2.5 text-sm font-semibold transition hover:bg-career-purple"
                  >
                    Continue Roadmap
                    <ArrowRight
                      size={16}
                    />
                  </Link>

                </div>

              )}

              {/* Current readiness */}

              <div className="mt-7 flex flex-col gap-4 border-t border-career-border pt-6 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    Current Career Readiness
                  </p>

                  <p className="mt-2 text-2xl font-bold text-career-blue">

                    {currentReadiness !==
                    null
                      ? `${currentReadiness}%`
                      : "—"}

                  </p>

                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">

                  <Target size={16} />

                  Focused progress toward your goal

                </div>

              </div>

            </div>

          </section>

          {/* ================================================== */}
          {/* MOTIVATION */}
          {/* ================================================== */}

          <section className="mt-10">

            <div className="relative overflow-hidden rounded-3xl border border-career-blue/20 bg-career-surface p-6 sm:p-8">

              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-career-blue/5 blur-3xl" />

              <div className="relative flex gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-career-blue/10">

                  <Flame
                    size={20}
                    className="text-career-blue"
                  />

                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-career-blue">
                    Motivation
                  </p>

                  <p className="mt-3 text-lg font-semibold">

                    {review?.aiMotivation ||
                      "Keep building consistent progress toward your career goal."}

                  </p>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">

                    {currentReadiness !==
                    null
                      ? `Your current career readiness is ${currentReadiness}%. Keep completing roadmap missions and strengthening your skills.`
                      : "Keep completing your roadmap missions and strengthening your skills."}

                  </p>

                </div>

              </div>

            </div>

          </section>

          {/* ================================================== */}
          {/* CTA */}
          {/* ================================================== */}

          <div className="mt-10 flex justify-center">

            <Link
              to="/roadmap"
              className="inline-flex items-center gap-2 rounded-xl bg-career-blue px-6 py-3.5 text-sm font-semibold transition hover:bg-career-purple"
            >
              Continue Roadmap
              <ArrowRight size={17} />
            </Link>

          </div>

          <div className="h-10" />

        </main>

      </div>

    </div>
  );
}

/* ============================================================
   HELPERS
============================================================ */

function formatReviewDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}

/* ============================================================
   SECTION HEADING
============================================================ */

function SectionHeading({
  icon,
  title,
}) {
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

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  icon,
  label,
  value,
  highlight = false,
}) {
  return (
    <div className="rounded-3xl border border-career-border bg-career-surface p-6">

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-career-blue/10 text-career-blue">
          {icon}
        </div>

      </div>

      <p className="mt-5 text-xs uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>

      <p
        className={`mt-2 text-2xl font-bold ${
          highlight
            ? "text-career-blue"
            : ""
        }`}
      >
        {value}
      </p>

    </div>
  );
}

/* ============================================================
   ACHIEVEMENT
============================================================ */

function Achievement({ text }) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">

        <Check
          size={16}
          className="text-emerald-400"
        />

      </div>

      <p className="text-sm text-slate-300">
        {text}
      </p>

    </div>
  );
}

/* ============================================================
   METRIC CARD
============================================================ */

function MetricCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-career-border bg-career-surface p-5">

      <div className="flex items-center gap-2 text-slate-500">

        {icon}

        <span className="text-xs">
          {label}
        </span>

      </div>

      <p className="mt-4 text-2xl font-bold">
        {value}
      </p>

    </div>
  );
}

/* ============================================================
   INSIGHT CARD
============================================================ */

function InsightCard({
  icon,
  title,
  text,
}) {
  return (
    <div className="rounded-3xl border border-career-border bg-career-surface p-6">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-career-blue/10 text-career-blue">
        {icon}
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-career-blue">
        {title}
      </p>

      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-400">
        {text}
      </p>

    </div>
  );
}

export default WeeklyReview;

