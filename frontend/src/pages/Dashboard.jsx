
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  getDashboard,
} from "../api/dashboardApi";

import {
  getRecentAchievements,
  getAchievementStats,
  evaluateAchievements,
} from "../api/achievementApi";

import {
  ArrowRight,
  Bell,
  Brain,
  CheckCircle2,
  Clock3,
  FileText,
  FolderKanban,
  Lightbulb,
  ListChecks,
  Menu,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,

  // Achievement icons
  GraduationCap,
  ClipboardCheck,
  Flame,
  Map,
  Trophy,
} from "lucide-react";

import DashboardSidebar from "../components/DashboardSidebar";


function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [dashboard, setDashboard] = useState(null);

  const [achievements, setAchievements] = useState([]);
  const [achievementStats, setAchievementStats] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        setLoading(true);
        setError("");


        /*
         * =====================================================
         * 1. LOAD MAIN DASHBOARD
         * =====================================================
         */

        const dashboardResponse = await getDashboard();

        console.log(
          "🔥 DASHBOARD RESPONSE:",
          dashboardResponse
        );

        console.log(
          "🔥 DASHBOARD DATA:",
          dashboardResponse.data
        );

        console.log(
          "🔥 DASHBOARD PAYLOAD:",
          dashboardResponse.data.data
        );


        setDashboard(
          dashboardResponse.data.data
        );


        /*
         * =====================================================
         * 2. EVALUATE ACHIEVEMENTS
         * =====================================================
         *
         * This checks the user's current progress and
         * unlocks any new achievements.
         *
         */

        try {

          const evaluateResponse =
            await evaluateAchievements();

          console.log(
            "🏆 ACHIEVEMENTS EVALUATED:",
            evaluateResponse.data
          );

        } catch (achievementError) {

          /*
           * Achievement evaluation should NOT prevent
           * the main dashboard from loading.
           */

          console.error(
            "⚠️ ACHIEVEMENT EVALUATION ERROR:",
            achievementError
          );

        }


        /*
         * =====================================================
         * 3. GET RECENT ACHIEVEMENTS
         * =====================================================
         */

        try {

          const recentResponse =
            await getRecentAchievements({
              limit: 5,
            });

          console.log(
            "🏆 RECENT ACHIEVEMENTS:",
            recentResponse.data
          );


          setAchievements(
            recentResponse.data.data || []
          );

        } catch (achievementError) {

          console.error(
            "⚠️ RECENT ACHIEVEMENTS ERROR:",
            achievementError
          );

          setAchievements([]);

        }


        /*
         * =====================================================
         * 4. GET ACHIEVEMENT STATS
         * =====================================================
         */

        try {

          const statsResponse =
            await getAchievementStats();

          console.log(
            "📊 ACHIEVEMENT STATS:",
            statsResponse.data
          );


          setAchievementStats(
            statsResponse.data.data || null
          );

        } catch (achievementError) {

          console.error(
            "⚠️ ACHIEVEMENT STATS ERROR:",
            achievementError
          );

          setAchievementStats(null);

        }

      } catch (error) {

        console.error(
          "❌ DASHBOARD ERROR:",
          error
        );

        console.error(
          "❌ STATUS:",
          error.response?.status
        );

        console.error(
          "❌ ERROR DATA:",
          error.response?.data
        );


        setError(
          error.response?.data?.message ||
          "Failed to load dashboard"
        );

      } finally {

        setLoading(false);

      }

    };


    fetchDashboard();

  }, []);


  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (loading) {

    return (
      <div className="min-h-screen bg-career-bg text-white flex items-center justify-center">

        <p className="text-slate-400">
          Loading your dashboard...
        </p>

      </div>
    );

  }


  /*
   * =========================================================
   * ERROR
   * =========================================================
   */

  if (error) {

    return (
      <div className="min-h-screen bg-career-bg text-white flex items-center justify-center">

        <p className="text-red-400">
          {error}
        </p>

      </div>
    );

  }


  if (!dashboard) {
    return null;
  }


  /*
   * =========================================================
   * DASHBOARD DATA
   * =========================================================
   */

  const readiness =
    dashboard.readiness?.currentReadiness ?? 0;

  const readinessChange =
    dashboard.readiness?.change;

  const weeklyReview =
    dashboard.weeklyReview;


  /*
   * =========================================================
   * ACHIEVEMENT DATA
   * =========================================================
   */

  const totalAchievements =
    achievementStats?.totalAchievements ?? 0;

  const totalXp =
    achievementStats?.totalXp ?? 0;


  return (

    <div className="min-h-screen bg-career-bg text-white">


      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="lg:pl-64">


        {/* ===================================================
            HEADER
        ==================================================== */}

        <header className="sticky top-0 z-30 border-b border-career-border bg-career-bg/90 backdrop-blur">

          <div className="flex h-20 items-center justify-between px-5 sm:px-8">


            <div className="flex items-center gap-4">

              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl border border-career-border bg-career-surface p-2.5 text-slate-400 transition hover:text-white lg:hidden"
              >

                <Menu size={19} />

              </button>


              <div>

                <p className="text-sm text-slate-500">

                  {new Date().toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    }
                  )}

                </p>


                <h1 className="mt-1 text-lg font-bold sm:text-xl">

                  Good Morning,{" "}

                  {dashboard.user?.username || "there"}

                </h1>

              </div>

            </div>


            <div className="flex items-center gap-2">


              <button
                type="button"
                className="relative rounded-xl border border-career-border bg-career-surface p-2.5 text-slate-400 transition hover:text-white"
              >

                <Bell size={18} />


                {dashboard.notifications?.length > 0 && (

                  <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-career-blue" />

                )}

              </button>


              <button
                type="button"
                className="hidden items-center gap-2 rounded-xl border border-career-border bg-career-surface px-3 py-2 sm:flex"
              >

                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-career-card">

                  <UserRound size={15} />

                </div>


                <span className="text-sm font-medium">

                  {dashboard.user?.username || "User"}

                </span>

              </button>

            </div>

          </div>

        </header>



        <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">


          {/* =====================================================
              TODAY'S MISSION
          ====================================================== */}

          <section>

            <div className="mb-4 flex items-center gap-2">

              <Target
                size={18}
                className="text-career-blue"
              />

              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-career-blue">

                Today's Mission

              </p>

            </div>


            <div className="relative overflow-hidden rounded-3xl border border-career-blue/25 bg-career-surface p-6 sm:p-8">

              <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-career-blue/5 blur-3xl" />


              <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">


                <div className="max-w-2xl">

                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-career-blue/10">

                      <Rocket
                        size={22}
                        className="text-career-blue"
                      />

                    </div>


                    <div>

                      <h2 className="text-xl font-bold sm:text-2xl">

                        {dashboard.todayMission?.title ||
                          "No mission available"}

                      </h2>


                      <p className="mt-2 text-sm leading-6 text-slate-400">

                        {dashboard.todayMission
                          ? `Complete this mission to make progress toward your ${dashboard.careerProfile?.targetCareer || "career"} goal.`
                          : "No mission has been assigned for today."}

                      </p>

                    </div>

                  </div>


                  {dashboard.todayMission && (

                    <div className="mt-6 flex flex-wrap gap-3">

                      <InfoPill
                        icon={<Clock3 size={14} />}
                        text={`${dashboard.todayMission.estimatedTime || 0} Minutes`}
                      />


                      <InfoPill
                        icon={<Target size={14} />}
                        text={
                          dashboard.todayMission.priority
                            ? dashboard.todayMission.priority
                                .charAt(0)
                                .toUpperCase() +
                              dashboard.todayMission.priority.slice(1)
                            : "N/A"
                        }
                      />


                      <InfoPill
                        icon={<CheckCircle2 size={14} />}
                        text={
                          dashboard.todayMission.status
                            ? dashboard.todayMission.status
                                .replace("-", " ")
                                .replace(
                                  /\b\w/g,
                                  (char) =>
                                    char.toUpperCase()
                                )
                            : "Not Started"
                        }
                      />

                    </div>

                  )}

                </div>


                {dashboard.todayMission ? (

                  <Link
                    to={`/learning-progress/missions/${dashboard.todayMission.missionId}`}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-career-blue px-5 py-3 text-sm font-semibold transition hover:bg-career-purple"
                  >

                    {dashboard.todayMission.status ===
                    "in-progress"
                      ? "Continue Mission"
                      : "Start Mission"}

                    <ArrowRight size={16} />

                  </Link>

                ) : (

                  <span className="text-sm text-slate-500">

                    No mission today

                  </span>

                )}

              </div>

            </div>

          </section>



          {/* =====================================================
              DAILY INSIGHT
          ====================================================== */}

          <section className="mt-6">

            <div className="rounded-2xl border border-career-border bg-career-surface p-5 sm:p-6">

              <div className="flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-career-blue/10">

                  <Lightbulb
                    size={19}
                    className="text-career-blue"
                  />

                </div>


                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">

                    Daily Insight

                  </p>


                  <p className="mt-2 font-semibold">

                    {readinessChange !== null &&
                    readinessChange !== undefined
                      ? readinessChange > 0
                        ? `Your career readiness improved by ${readinessChange}% this week.`
                        : readinessChange < 0
                        ? `Your career readiness changed by ${readinessChange}%.`
                        : "Your career readiness stayed the same this week."
                      : "Keep building your career readiness."}

                  </p>


                  <p className="mt-1 text-sm text-slate-400">

                    Keep building your skills and completing your missions
                    to become internship-ready.

                  </p>

                </div>

              </div>

            </div>

          </section>



          {/* =====================================================
              MILESTONE + READINESS
          ====================================================== */}

          <section className="mt-6 grid gap-6 lg:grid-cols-2">


            {/* NEXT MILESTONE */}

            <div className="rounded-3xl border border-career-border bg-career-surface p-6">

              <div className="flex items-center gap-2">

                <Target
                  size={18}
                  className="text-career-blue"
                />

                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">

                  Next Milestone

                </p>

              </div>


              <h2 className="mt-5 text-lg font-bold">

                {dashboard.nextMilestone?.title ||
                  "No upcoming milestone"}

              </h2>


              {dashboard.nextMilestone?.description && (

                <p className="mt-2 text-sm leading-6 text-slate-400">

                  {dashboard.nextMilestone.description}

                </p>

              )}


              <div className="mt-5 space-y-3">

                <div className="flex items-center justify-between text-sm">

                  <span className="text-slate-500">
                    Progress
                  </span>

                  <span className="font-medium">
                    {dashboard.nextMilestone?.progress ?? 0}%
                  </span>

                </div>


                <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                  <div
                    className="h-full rounded-full bg-career-blue"
                    style={{
                      width: `${
                        dashboard.nextMilestone?.progress ?? 0
                      }%`,
                    }}
                  />

                </div>


                <div className="flex items-center justify-between text-sm">

                  <span className="text-slate-500">
                    Estimated Duration
                  </span>

                  <span className="font-medium">

                    {dashboard.nextMilestone?.estimatedDuration ??
                      0}{" "}
                    Days

                  </span>

                </div>


                <div className="flex items-center justify-between text-sm">

                  <span className="text-slate-500">
                    Missions
                  </span>

                  <span className="font-medium">

                    {dashboard.nextMilestone?.completedMissions ??
                      0}
                    {" / "}
                    {dashboard.nextMilestone?.totalMissions ??
                      0}

                  </span>

                </div>

              </div>

            </div>



            {/* CAREER READINESS */}

            <div className="rounded-3xl border border-career-border bg-career-surface p-6">

              <div className="flex items-center gap-2">

                <TrendingUp
                  size={18}
                  className="text-career-blue"
                />

                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">

                  Career Readiness

                </p>

              </div>


              <div className="mt-5 flex items-end justify-between">

                <div>

                  <p className="text-4xl font-bold">
                    {readiness}%
                  </p>


                  <p
                    className={`mt-2 flex items-center gap-1.5 text-sm ${
                      readinessChange > 0
                        ? "text-emerald-400"
                        : readinessChange < 0
                        ? "text-red-400"
                        : "text-slate-500"
                    }`}
                  >

                    {readinessChange !== null &&
                    readinessChange !== undefined ? (

                      <>

                        <TrendingUp size={14} />

                        {readinessChange > 0
                          ? `+${readinessChange}% This Week`
                          : `${readinessChange}% This Week`}

                      </>

                    ) : (

                      "No previous week data"

                    )}

                  </p>

                </div>

              </div>


              <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">

                <div
                  className="h-full rounded-full bg-career-blue transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      Math.max(readiness, 0),
                      100
                    )}%`,
                  }}
                />

              </div>

            </div>

          </section>



          {/* =====================================================
              QUICK ACTIONS
          ====================================================== */}

          <section className="mt-8">

            <div className="mb-4 flex items-center gap-2">

              <Rocket
                size={18}
                className="text-career-blue"
              />

              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">

                Quick Actions

              </p>

            </div>


            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

              <QuickAction
                to="/roadmap"
                icon={<Target size={19} />}
                label="View Roadmap"
              />

              <QuickAction
                to="/projects"
                icon={<FolderKanban size={19} />}
                label="Analyze Project"
              />

              <QuickAction
                to="/onboarding/resume"
                icon={<FileText size={19} />}
                label="Update Resume"
              />

              <QuickAction
                to="/weekly-review"
                icon={<ListChecks size={19} />}
                label="Weekly Review"
              />

            </div>

          </section>



          {/* =====================================================
              WEEKLY SNAPSHOT
          ====================================================== */}

          <section className="mt-8">

            <div className="mb-4 flex items-center gap-2">

              <ListChecks
                size={18}
                className="text-career-blue"
              />

              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">

                Weekly Snapshot

              </p>

            </div>


            <div className="grid overflow-hidden rounded-3xl border border-career-border bg-career-surface sm:grid-cols-2 lg:grid-cols-4">


              <SnapshotItem
                icon={<CheckCircle2 size={19} />}
                label="Missions Completed"
                value={
                  weeklyReview?.completedMissions ?? 0
                }
              />


              <SnapshotItem
                icon={<TrendingUp size={19} />}
                label="Readiness Increased"
                value={
                  readinessChange !== null &&
                  readinessChange !== undefined
                    ? `${readinessChange > 0 ? "+" : ""}${readinessChange}%`
                    : "—"
                }
              />


              <SnapshotItem
                icon={<FolderKanban size={19} />}
                label="Projects Added"
                value={
                  weeklyReview?.projectsCompleted?.length ?? 0
                }
              />


              <SnapshotItem
                icon={<Sparkles size={19} />}
                label="Skills Learned"
                value={
                  weeklyReview?.skillsLearned?.length ?? 0
                }
              />

            </div>

          </section>



          {/* =====================================================
              AI CAREER GUIDANCE
          ====================================================== */}

          <section className="mt-8">

            <div className="mb-4 flex items-center gap-2">

              <Sparkles
                size={18}
                className="text-career-blue"
              />

              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">

                AI Career Guidance

              </p>

            </div>


            <div className="grid gap-6 lg:grid-cols-3">


              {/* AI SUMMARY */}

              <div className="rounded-3xl border border-career-border bg-career-surface p-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-career-blue/10">

                    <Brain
                      size={19}
                      className="text-career-blue"
                    />

                  </div>


                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">

                    Weekly AI Summary

                  </p>

                </div>


                <p className="mt-5 text-sm leading-7 text-slate-300">

                  {weeklyReview?.aiSummary ||
                    "Complete your missions and weekly review to receive personalized AI insights."}

                </p>

              </div>



              {/* AI SUGGESTIONS */}

              <div className="rounded-3xl border border-career-border bg-career-surface p-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-career-blue/10">

                    <Lightbulb
                      size={19}
                      className="text-career-blue"
                    />

                  </div>


                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">

                    AI Suggestions

                  </p>

                </div>


                {weeklyReview?.aiSuggestions?.length > 0 ? (

                  <div className="mt-5 space-y-4">

                    {weeklyReview.aiSuggestions.map(
                      (suggestion, index) => (

                        <div
                          key={index}
                          className="flex items-start gap-3"
                        >

                          <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-career-blue/10 text-xs font-semibold text-career-blue">

                            {index + 1}

                          </div>


                          <p className="text-sm leading-6 text-slate-300">

                            {suggestion}

                          </p>

                        </div>

                      )
                    )}

                  </div>

                ) : (

                  <p className="mt-5 text-sm leading-6 text-slate-500">

                    No AI suggestions available yet.

                  </p>

                )}

              </div>



              {/* AI MOTIVATION */}

              <div className="rounded-3xl border border-career-border bg-career-surface p-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-career-blue/10">

                    <Rocket
                      size={19}
                      className="text-career-blue"
                    />

                  </div>


                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">

                    AI Motivation

                  </p>

                </div>


                <p className="mt-5 text-sm leading-7 text-slate-300">

                  {weeklyReview?.aiMotivation ||
                    "Keep making consistent progress. Every completed mission moves you closer to your career goal."}

                </p>

              </div>

            </div>

          </section>



          {/* =====================================================
              ACHIEVEMENTS
          ====================================================== */}

          <section className="mt-8">


            <div className="mb-4 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <Trophy
                  size={18}
                  className="text-career-blue"
                />

                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">

                  Achievements

                </p>

              </div>

            </div>


            <div className="grid gap-6 lg:grid-cols-3">


              {/* =================================================
                  ACHIEVEMENT SUMMARY
              ================================================== */}

              <div className="rounded-3xl border border-career-border bg-career-surface p-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-career-blue/10">

                    <Trophy
                      size={19}
                      className="text-career-blue"
                    />

                  </div>


                  <div>

                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">

                      Achievement Progress

                    </p>

                    <p className="mt-1 text-sm font-semibold">

                      {totalAchievements}{" "}
                      {totalAchievements === 1
                        ? "Achievement"
                        : "Achievements"}

                    </p>

                  </div>

                </div>


                <div className="mt-6">

                  <p className="text-4xl font-bold">

                    {totalXp}

                  </p>

                  <p className="mt-1 text-sm text-slate-500">

                    Total XP Earned

                  </p>

                </div>


                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">

                  <div
                    className="h-full rounded-full bg-career-blue transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        totalAchievements * 10,
                        100
                      )}%`,
                    }}
                  />

                </div>

              </div>



              {/* =================================================
                  RECENT ACHIEVEMENTS
              ================================================== */}

              <div className="lg:col-span-2 rounded-3xl border border-career-border bg-career-surface p-6">


                <div className="flex items-center justify-between">

                  <p className="text-sm font-semibold">

                    Recent Achievements

                  </p>


                  <span className="text-xs text-slate-500">

                    Latest unlocks

                  </span>

                </div>


                {achievements.length > 0 ? (

                  <div className="mt-5 space-y-3">

                    {achievements.map(
                      (achievement) => (

                        <AchievementItem
                          key={achievement._id}
                          achievement={achievement}
                        />

                      )
                    )}

                  </div>

                ) : (

                  <div className="mt-5 rounded-2xl border border-career-border bg-career-card p-5 text-center">

                    <Trophy
                      size={24}
                      className="mx-auto text-slate-600"
                    />

                    <p className="mt-3 text-sm text-slate-400">

                      No achievements unlocked yet.

                    </p>

                    <p className="mt-1 text-xs text-slate-600">

                      Complete missions, projects and milestones
                      to unlock achievements.

                    </p>

                  </div>

                )}

              </div>

            </div>

          </section>



          {/* =====================================================
              RESUME / ROADMAP MINI STATUS
          ====================================================== */}

          <section className="mt-8 grid gap-6 lg:grid-cols-2">


            {/* RESUME */}

            <div className="rounded-3xl border border-career-border bg-career-surface p-6">

              <div className="flex items-center justify-between">


                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-career-blue/10">

                    <FileText
                      size={19}
                      className="text-career-blue"
                    />

                  </div>


                  <div>

                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">

                      Current Resume

                    </p>


                    <p className="mt-1 text-sm font-semibold">

                      {dashboard.resume?.resumeTitle ||
                        "No resume uploaded"}

                    </p>

                  </div>

                </div>


                <Link
                  to="/onboarding/resume"
                  className="text-sm text-career-blue transition hover:text-career-purple"
                >

                  Update

                </Link>

              </div>


              {dashboard.resume && (

                <div className="mt-5 space-y-2 text-sm">


                  <div className="flex justify-between">

                    <span className="text-slate-500">
                      Version
                    </span>

                    <span>
                      v{dashboard.resume.version}
                    </span>

                  </div>


                  <div className="flex justify-between">

                    <span className="text-slate-500">
                      Status
                    </span>

                    <span className="text-emerald-400">
                      Current
                    </span>

                  </div>


                  {dashboard.resume.lastAnalyzedAt && (

                    <div className="flex justify-between">

                      <span className="text-slate-500">
                        Last Analyzed
                      </span>

                      <span>

                        {new Date(
                          dashboard.resume.lastAnalyzedAt
                        ).toLocaleDateString()}

                      </span>

                    </div>

                  )}

                </div>

              )}

            </div>



            {/* ROADMAP */}

            <div className="rounded-3xl border border-career-border bg-career-surface p-6">

              <div className="flex items-center justify-between">


                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-career-blue/10">

                    <Target
                      size={19}
                      className="text-career-blue"
                    />

                  </div>


                  <div>

                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">

                      Career Roadmap

                    </p>


                    <p className="mt-1 text-sm font-semibold">

                      {dashboard.careerProfile?.targetCareer ||
                        "Career Goal"}

                    </p>

                  </div>

                </div>


                <Link
                  to="/roadmap"
                  className="text-sm text-career-blue transition hover:text-career-purple"
                >

                  View

                </Link>

              </div>


              <div className="mt-5">

                <div className="flex items-center justify-between text-sm">

                  <span className="text-slate-500">

                    Roadmap Progress

                  </span>


                  <span className="font-semibold">

                    {dashboard.roadmap?.progress ?? 0}%

                  </span>

                </div>


                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">

                  <div
                    className="h-full rounded-full bg-career-blue transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        Math.max(
                          dashboard.roadmap?.progress ?? 0,
                          0
                        ),
                        100
                      )}%`,
                    }}
                  />

                </div>


                <div className="mt-3 flex justify-between text-xs text-slate-500">

                  <span>

                    {dashboard.roadmap?.totalStages ?? 0} stages

                  </span>


                  <span>

                    {dashboard.roadmap?.status ||
                      "No status"}

                  </span>

                </div>

              </div>

            </div>

          </section>


        </main>

      </div>

    </div>

  );
}



/* =============================================================
   ACHIEVEMENT ICON MAPPING
============================================================= */

const achievementIcons = {

  Rocket,
  GraduationCap,
  FileText,
  ClipboardCheck,
  Target,
  Flame,
  Brain,
  Map,
  Trophy,

};



/* =============================================================
   ACHIEVEMENT ITEM
============================================================= */

function AchievementItem({
  achievement,
}) {

  const Icon =
    achievementIcons[
      achievement.badgeIcon
    ] || Trophy;


  return (

    <div className="flex items-center gap-4 rounded-2xl border border-career-border bg-career-card p-4">


      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{
          backgroundColor: `${achievement.badgeColor}15`,
          color: achievement.badgeColor,
        }}
      >

        <Icon size={20} />

      </div>


      <div className="min-w-0 flex-1">

        <div className="flex items-center justify-between gap-3">

          <p className="truncate text-sm font-semibold">

            {achievement.title}

          </p>


          <span className="shrink-0 text-xs font-semibold text-career-blue">

            +{achievement.xpReward} XP

          </span>

        </div>


        <p className="mt-1 text-xs leading-5 text-slate-500">

          {achievement.description}

        </p>


        {achievement.unlockedAt && (

          <p className="mt-1 text-[11px] text-slate-600">

            Unlocked{" "}

            {new Date(
              achievement.unlockedAt
            ).toLocaleDateString()}

          </p>

        )}

      </div>

    </div>

  );

}



/* =============================================================
   REUSABLE COMPONENTS
============================================================= */

function InfoPill({
  icon,
  text,
}) {

  return (

    <div className="flex items-center gap-2 rounded-lg border border-career-border bg-career-card px-3 py-2 text-xs text-slate-400">

      {icon}

      {text}

    </div>

  );

}



function QuickAction({
  to,
  icon,
  label,
}) {

  return (

    <Link
      to={to}
      className="group flex items-center justify-between rounded-2xl border border-career-border bg-career-surface p-4 transition hover:border-career-blue/40 hover:bg-career-card"
    >

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-career-blue/10 text-career-blue">

          {icon}

        </div>


        <span className="text-sm font-medium">

          {label}

        </span>

      </div>


      <ArrowRight
        size={16}
        className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-career-blue"
      />

    </Link>

  );

}



function SnapshotItem({
  icon,
  label,
  value,
}) {

  return (

    <div className="border-b border-career-border p-5 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0">

      <div className="flex items-center gap-2 text-slate-500">

        {icon}

        <span className="text-xs">

          {label}

        </span>

      </div>


      <p className="mt-3 text-2xl font-bold">

        {value}

      </p>

    </div>

  );

}



export default Dashboard;

