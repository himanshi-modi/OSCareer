
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getActiveRoadmap,
  getRoadmapDetails,
  regenerateRoadmap,
} from "../api/roadmapApi";

import {
  getUserStages,
  getStageMissions,
  skipMission,
} from "../api/learningProgressApi";

import { getCareerProfile } from "../api/careerProfileApi";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Lock,
  Map,
  RefreshCw,
  Rocket,
  Target,
  Trophy,
} from "lucide-react";

import MissionCard from "../components/MissionCard";

function Roadmap() {
  const navigate = useNavigate();

  // ==========================================================
  // ROADMAP STATE
  // ==========================================================

  const [roadmap, setRoadmap] = useState(null);
  const [careerProfile, setCareerProfile] = useState(null);
  const [userStages, setUserStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================================
  // REGENERATE ROADMAP STATE
  // ==========================================================

  const [showRegenerateModal, setShowRegenerateModal] =
    useState(false);

  const [regenerationReason, setRegenerationReason] =
    useState("");

  const [regenerating, setRegenerating] = useState(false);

  const [regenerationError, setRegenerationError] =
    useState("");

  // ==========================================================
  // SKIP MISSION STATE
  // ==========================================================

  const [missionToSkip, setMissionToSkip] = useState(null);

  const [showSkipModal, setShowSkipModal] = useState(false);

  const [skipReason, setSkipReason] = useState("");

  const [skippingMission, setSkippingMission] = useState(false);

  const [skipError, setSkipError] = useState("");

  // ==========================================================
  // FORMAT HELPERS
  // ==========================================================

  const formatTimeline = (value) => {
    if (!value) {
      return "Not specified";
    }

    switch (value) {
      case "1_MONTH":
        return "1 Month";

      case "3_MONTHS":
        return "3 Months";

      case "6_MONTHS":
        return "6 Months";

      case "12_MONTHS":
        return "12 Months";

      case "NO_TIMELINE":
        return "No Timeline";

      case "CUSTOM":
        return "Custom";

      default:
        return value;
    }
  };

  const formatDailyCommitment = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "Not specified";
    }

    return `${value} Hours / Day`;
  };

  // ==========================================================
  // MISSION HELPERS
  // ==========================================================

  const getMissionsFromStage = (stage) => {
    return (
      stage?.missions ||
      stage?.stageMissions ||
      stage?.missionTemplates ||
      stage?.userMissions ||
      []
    );
  };

  const getMissionId = (mission) => {
    return mission?.missionId;
  };

  // ==========================================================
  // STAGE HELPERS
  // ==========================================================

  const isStageCompleted = (stage) => {
    return stage?.status === "completed";
  };

  const isStageLocked = (stage) => {
    return stage?.status === "locked";
  };

  const isStageSkipped = (stage) => {
    return stage?.status === "skipped";
  };

  const isCurrentStage = (stage) => {
    return (
      stage?.status === "in-progress" ||
      stage?.status === "not-started"
    );
  };

  // ==========================================================
  // FETCH STAGES + MISSIONS
  // ==========================================================

  const fetchStagesWithMissions = async () => {
    console.log("🔥 BEFORE getUserStages");

    const stagesResponse = await getUserStages();

    console.log("🟢 getUserStages FINISHED");
    console.log("🟢 stagesResponse:", stagesResponse);
    console.log(
      "🟢 stagesResponse.stages:",
      stagesResponse?.stages
    );
    console.log(
      "🟢 stagesResponse.data:",
      stagesResponse?.data
    );

    const stagesData =
      stagesResponse?.data?.stages ||
      stagesResponse?.data?.data?.stages ||
      stagesResponse?.stages ||
      [];

    console.log("🟡 stagesData:", stagesData);
    console.log(
      "🟡 stagesData.length:",
      stagesData.length
    );

    console.log("🔵 ABOUT TO MAP STAGES");

    const stagesWithMissions = await Promise.all(
      stagesData.map(async (stage) => {
        console.log("🔥 PROCESSING STAGE:", stage);

        console.log("STAGE ID CHECK:", {
          stageOrder: stage.stageOrder,
          stageId: stage.stageId,
          _id: stage._id,
          userStageId: stage.userStageId,
        });

        if (!stage.stageId) {
          console.error(
            "❌ NO stageId FOUND FOR STAGE:",
            stage
          );

          return {
            ...stage,
            missions: [],
          };
        }

        console.log(
          "🔴 ABOUT TO CALL getStageMissions"
        );

        console.log(
          "🔴 stage.stageId =",
          stage.stageId
        );

        const missionsResponse =
          await getStageMissions(stage.stageId);

        console.log(
          `🔥 MISSIONS RESPONSE FOR STAGE ${stage.stageOrder}:`,
          missionsResponse
        );

        const missions =
          missionsResponse?.data?.missions ||
          missionsResponse?.missions ||
          missionsResponse?.data?.data?.missions ||
          [];

        return {
          ...stage,
          missions,
        };
      })
    );

    console.log(
      "🔥 FINAL STAGES WITH MISSIONS:",
      stagesWithMissions
    );

    return stagesWithMissions;
  };

  // ==========================================================
  // FETCH ROADMAP
  // ==========================================================

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        setLoading(true);
        setError("");

        // ------------------------------------------------------
        // ACTIVE ROADMAP
        // ------------------------------------------------------

        const roadmapResponse =
          await getActiveRoadmap();

        console.log(
          "Roadmap response:",
          roadmapResponse
        );

        const roadmapId =
          roadmapResponse?.data?.roadmapId;

        if (!roadmapId) {
          throw new Error(
            "Active roadmap ID not found"
          );
        }

        // ------------------------------------------------------
        // ROADMAP DETAILS
        // ------------------------------------------------------

        const detailsResponse =
          await getRoadmapDetails(roadmapId);

        console.log(
          "Roadmap details:",
          detailsResponse
        );

        // ------------------------------------------------------
        // USER STAGES + MISSIONS
        // ------------------------------------------------------

        const stagesWithMissions =
          await fetchStagesWithMissions();

        setUserStages(stagesWithMissions);

        // ------------------------------------------------------
        // CAREER PROFILE
        // ------------------------------------------------------

        const profileResponse =
          await getCareerProfile();

        const profileData =
          profileResponse?.data?.data ??
          profileResponse?.data;

        if (!profileData) {
          throw new Error(
            "Career profile data not found"
          );
        }

        // ------------------------------------------------------
        // FINAL ROADMAP
        // ------------------------------------------------------

        const roadmapData =
          detailsResponse?.data;

        console.log(
          "FINAL ROADMAP:",
          roadmapData
        );

        console.log(
          "ROADMAP STAGES:",
          roadmapData?.stages
        );

        setRoadmap(roadmapData);
        setCareerProfile(profileData);
      } catch (error) {
        console.error(
          "Roadmap error:",
          error
        );

        console.error(
          "Backend error:",
          error.response?.data
        );

        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load roadmap."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, []);

  // ==========================================================
  // REGENERATE ROADMAP
  // ==========================================================

  const handleRegenerateRoadmap = async () => {
    try {
      setRegenerating(true);
      setRegenerationError("");

      const roadmapId =
        roadmap?._id ||
        roadmap?.roadmapId;

      if (!roadmapId) {
        throw new Error(
          "Roadmap ID not found."
        );
      }

      const response =
        await regenerateRoadmap(
          roadmapId,
          regenerationReason
        );

      console.log(
        "Roadmap regenerated:",
        response
      );

      const newRoadmapId =
        response?.data?.roadmapId;

      if (!newRoadmapId) {
        throw new Error(
          "New roadmap ID not returned."
        );
      }

      // ------------------------------------------------------
      // GET NEW ROADMAP DETAILS
      // ------------------------------------------------------

      const detailsResponse =
        await getRoadmapDetails(
          newRoadmapId
        );

      setRoadmap(
        detailsResponse?.data
      );

      // ------------------------------------------------------
      // REFRESH USER STAGES + MISSIONS
      // ------------------------------------------------------

      const stagesWithMissions =
        await fetchStagesWithMissions();

      setUserStages(stagesWithMissions);

      // ------------------------------------------------------
      // CLOSE MODAL
      // ------------------------------------------------------

      setShowRegenerateModal(false);
      setRegenerationReason("");
    } catch (error) {
      console.error(
        "Regenerate roadmap error:",
        error
      );

      setRegenerationError(
        error.response?.data?.message ||
          error.message ||
          "Failed to regenerate roadmap."
      );
    } finally {
      setRegenerating(false);
    }
  };

  // ==========================================================
  // START MISSION
  // ==========================================================

  const handleStartMission = (mission) => {
    console.log(
      "🔥 COMPLETE MISSION OBJECT:",
      mission
    );

    console.log(
      "🔥 MISSION KEYS:",
      Object.keys(mission || {})
    );

    const missionId =
      getMissionId(mission);

    if (!missionId) {
      console.warn(
        "❌ Mission Template ID not found:",
        mission
      );
      return;
    }

    console.log(
      "🚀 Navigating to mission details:",
      missionId
    );

    navigate(
      `/learning-progress/missions/${missionId}`
    );
  };

  // ==========================================================
  // OPEN SKIP MISSION MODAL
  // ==========================================================

  const handleSkipMission = (mission) => {
    console.log(
      "⏭️ SKIP MISSION:",
      mission
    );

    const missionId =
      getMissionId(mission);

    if (!missionId) {
      console.warn(
        "❌ Mission ID not found:",
        mission
      );
      return;
    }

    setMissionToSkip(mission);
    setSkipReason("");
    setSkipError("");
    setShowSkipModal(true);
  };

  // ==========================================================
  // CONFIRM SKIP MISSION
  // ==========================================================

  const handleConfirmSkipMission = async () => {
    const missionId =
      getMissionId(missionToSkip);

    if (!missionId) {
      setSkipError(
        "Mission ID not found."
      );
      return;
    }

    if (!skipReason.trim()) {
      setSkipError(
        "Please provide a reason for skipping this mission."
      );
      return;
    }

    try {
      setSkippingMission(true);
      setSkipError("");

      console.log(
        "⏭️ Calling skipMission:",
        {
          missionId,
          reason: skipReason,
        }
      );

      await skipMission(
        missionId,
        skipReason.trim()
      );

      console.log(
        "✅ Mission skipped successfully"
      );

      // ------------------------------------------------------
      // UPDATE UI IMMEDIATELY
      // ------------------------------------------------------

      setUserStages((previousStages) =>
        previousStages.map((stage) => ({
          ...stage,

          missions: getMissionsFromStage(
            stage
          ).map((mission) => {
            if (
              getMissionId(mission) ===
              missionId
            ) {
              return {
                ...mission,
                status: "skipped",
              };
            }

            return mission;
          }),
        }))
      );

      // ------------------------------------------------------
      // CLOSE MODAL
      // ------------------------------------------------------

      setShowSkipModal(false);
      setMissionToSkip(null);
      setSkipReason("");
    } catch (error) {
      console.error(
        "❌ Skip mission error:",
        error
      );

      console.error(
        "Backend skip error:",
        error.response?.data
      );

      setSkipError(
        error.response?.data?.message ||
          error.message ||
          "Failed to skip mission."
      );
    } finally {
      setSkippingMission(false);
    }
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-career-bg text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-career-border border-t-career-blue" />

          <p className="text-sm text-slate-400">
            Loading your roadmap...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-career-bg px-6 text-white">
        <div className="max-w-md text-center">
          <p className="text-red-400">
            {error}
          </p>

          <Link
            to="/dashboard"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-career-border px-5 py-3 text-sm text-slate-300 transition hover:border-career-blue hover:text-career-blue"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================================
  // NO ROADMAP
  // ==========================================================

  if (!roadmap) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-career-bg text-white">
        <div className="text-center">
          <Map
            size={32}
            className="mx-auto mb-4 text-slate-500"
          />

          <p className="text-slate-400">
            No roadmap found.
          </p>

          <Link
            to="/dashboard"
            className="mt-5 inline-flex items-center gap-2 text-sm text-career-blue"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================================
  // ROADMAP VALUES
  // ==========================================================

  const overallProgress =
    Number(roadmap?.progress) || 0;

  const stages = userStages;

  const completedStages =
    roadmap?.completedStages ??
    stages.filter(
      (stage) =>
        stage.status === "completed"
    ).length;

  const totalStages =
    roadmap?.totalStages ??
    stages.length;

  const currentStage =
    stages.find(
      (stage) =>
        stage.status === "in-progress" ||
        stage.status === "not-started"
    );

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="min-h-screen bg-career-bg text-white">

      {/* =====================================================
          TOP NAV
      ===================================================== */}

      <header className="border-b border-career-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>

          <div className="flex items-center gap-2">
            <Map
              size={18}
              className="text-career-blue"
            />

            <span className="text-sm font-semibold">
              My Roadmap
            </span>
          </div>

        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-5xl px-6 py-10">

        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <div className="flex items-center gap-3">
          <Map
            size={24}
            className="text-career-blue"
          />

          <h1 className="text-3xl font-bold">
            My Roadmap
          </h1>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          Your personalized path toward your career goal.
        </p>

        {/* ===================================================
            GOAL
        =================================================== */}

        <section className="mt-8 border-b border-career-border pb-8">

          <div className="grid gap-6 sm:grid-cols-3">

            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Target size={15} />
                Goal
              </p>

              <p className="mt-2 text-base font-semibold text-white">
                {careerProfile?.targetCareer ||
                  roadmap?.targetCareer ||
                  "Not specified"}
              </p>
            </div>

            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <CalendarDays size={15} />
                Target Timeline
              </p>

              <p className="mt-2 text-base font-semibold text-white">
                {formatTimeline(
                  careerProfile?.targetTimeline
                )}
              </p>
            </div>

            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Clock3 size={15} />
                Daily Commitment
              </p>

              <p className="mt-2 text-base font-semibold text-white">
                {formatDailyCommitment(
                  careerProfile?.dailyCommitment
                )}
              </p>
            </div>

          </div>

          <div className="mt-6">
            <Link
              to="/career-setup?mode=edit"
              className="inline-flex items-center gap-2 rounded-xl border border-career-border px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-career-blue hover:text-career-blue"
            >
              Edit Goal
            </Link>
          </div>

        </section>

        {/* ===================================================
            OVERALL PROGRESS
        =================================================== */}

        <section className="border-b border-career-border py-8">

          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">
              Overall Progress
            </p>

            <span className="text-xl font-bold text-career-blue">
              {overallProgress}%
            </span>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-career-blue transition-all duration-700"
              style={{
                width: `${overallProgress}%`,
              }}
            />
          </div>

          <div className="mt-3 flex justify-between text-xs text-slate-500">
            <span>
              {completedStages} completed
            </span>

            <span>
              {totalStages} total stages
            </span>
          </div>

        </section>

        {/* ===================================================
            STAGES
        =================================================== */}

        <section className="mt-10">

          {stages.map((stage, stageIndex) => {
            const completed =
              isStageCompleted(stage);

            const locked =
              isStageLocked(stage);

            const current =
              isCurrentStage(stage);

            const skipped =
              isStageSkipped(stage);

            const missions =
              getMissionsFromStage(stage);

            console.log(
              `STAGE ${stage.stageOrder} MISSIONS:`,
              missions
            );

            console.log(
              "FULL STAGE:",
              stage
            );

            const stageProgress =
              Number(stage?.progress) || 0;

            const stageImpact =
              stage?.careerImpact ??
              stage?.readinessImpact ??
              stage?.estimatedCareerImpact;

            const readinessBefore =
              stage?.careerReadinessBefore ??
              stage?.readinessBefore;

            const readinessAfter =
              stage?.careerReadinessAfter ??
              stage?.readinessAfter;

            return (
              <div
                key={
                  stage.stageId ||
                  stage._id ||
                  stageIndex
                }
                className="border-b border-career-border py-8 first:pt-0"
              >

                {/* =================================================
                    STAGE HEADER
                ================================================= */}

                <div className="flex items-start justify-between gap-5">

                  <div className="flex items-start gap-3">

                    <div className="mt-0.5 shrink-0">
                      {completed ? (
                        <CheckCircle2
                          size={22}
                          className="text-emerald-400"
                        />
                      ) : locked ? (
                        <Lock
                          size={20}
                          className="text-slate-600"
                        />
                      ) : current ? (
                        <Rocket
                          size={21}
                          className="text-career-blue"
                        />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-slate-500" />
                      )}
                    </div>

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <h2
                          className={`text-lg font-bold sm:text-xl ${
                            locked
                              ? "text-slate-500"
                              : "text-white"
                          }`}
                        >
                          STAGE {stage.stageOrder}
                          {" — "}
                          {stage.title}
                        </h2>

                        {completed && (
                          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-400">
                            Completed
                          </span>
                        )}

                        {current && (
                          <span className="rounded-full border border-career-blue/20 bg-career-blue/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-career-blue">
                            Current Stage
                          </span>
                        )}

                        {skipped && (
                          <span className="rounded-full border border-slate-500/20 bg-slate-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            Skipped
                          </span>
                        )}

                      </div>

                      {stage.description && (
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                          {stage.description}
                        </p>
                      )}

                    </div>
                  </div>

                  {!locked && (
                    <span
                      className={`shrink-0 text-sm font-bold ${
                        completed
                          ? "text-emerald-400"
                          : "text-career-blue"
                      }`}
                    >
                      {stageProgress}%
                    </span>
                  )}

                </div>

                {/* =================================================
                    LOCKED
                ================================================= */}

                {locked && (
                  <div className="mt-6 ml-8 rounded-2xl border border-career-border bg-career-surface/50 p-5">

                    <div className="flex items-center gap-3">

                      <Lock
                        size={18}
                        className="text-slate-600"
                      />

                      <div>
                        <p className="text-sm font-semibold text-slate-400">
                          Locked
                        </p>

                        <p className="mt-1 text-sm text-slate-600">
                          {stage.unlockRequirement ||
                            `Complete Stage ${
                              stage.stageOrder - 1
                            } to unlock.`}
                        </p>
                      </div>

                    </div>
                  </div>
                )}

                {/* =================================================
                    COMPLETED STAGE
                ================================================= */}

                {completed && (
                  <div className="mt-6 ml-8">

                    <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03] p-5">

                      <div className="flex items-start gap-3">

                        <Trophy
                          size={21}
                          className="mt-0.5 shrink-0 text-emerald-400"
                        />

                        <div>
                          <p className="font-semibold text-white">
                            Stage Completed
                          </p>

                          <p className="mt-1 text-sm leading-6 text-slate-400">
                            You've successfully completed the{" "}
                            {stage.title} stage.
                          </p>
                        </div>

                      </div>

                      {(readinessBefore !==
                        undefined ||
                        readinessAfter !==
                          undefined) && (
                        <div className="mt-5 border-t border-career-border pt-4">

                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Career Readiness
                          </p>

                          <p className="mt-2 text-lg font-bold text-white">

                            {readinessBefore ?? "—"}%

                            <span className="mx-2 text-slate-600">
                              →
                            </span>

                            <span className="text-emerald-400">
                              {readinessAfter ?? "—"}%
                            </span>

                          </p>

                        </div>
                      )}

                      {stageImpact !==
                        undefined &&
                        stageImpact !== null && (
                          <p className="mt-3 text-xs text-slate-500">
                            Estimated career impact:{" "}
                            <span className="font-semibold text-emerald-400">
                              {String(stageImpact).startsWith("+")
                                ? stageImpact
                                : `+${stageImpact}%`}
                            </span>
                          </p>
                        )}

                    </div>
                  </div>
                )}

                {/* =================================================
                    CURRENT STAGE
                ================================================= */}

                {current && (
                  <div className="mt-6 ml-8">

                    {/* STAGE PROGRESS */}

                    <div className="mb-7">

                      <div className="flex items-center justify-between">

                        <p className="text-sm font-medium text-slate-400">
                          Stage Progress
                        </p>

                        <p className="text-sm font-bold text-career-blue">
                          {stageProgress}%
                        </p>

                      </div>

                      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-800">

                        <div
                          className="h-full rounded-full bg-career-blue transition-all duration-700"
                          style={{
                            width: `${stageProgress}%`,
                          }}
                        />

                      </div>

                    </div>

                    {/* =================================================
                        MISSIONS
                    ================================================= */}

                    <div>

                      <div className="mb-5 flex items-center justify-between">

                        <div>
                          <h3 className="text-sm font-semibold text-white">
                            Missions
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            Complete these missions to progress
                            through this stage.
                          </p>
                        </div>

                        <span className="text-xs text-slate-500">
                          {missions.length}{" "}
                          {missions.length === 1
                            ? "mission"
                            : "missions"}
                        </span>

                      </div>

                      {missions.length > 0 ? (
                        <div className="space-y-5">

                          {missions.map(
                            (
                              mission,
                              missionIndex
                            ) => (
                              <MissionCard
                                key={
                                  getMissionId(
                                    mission
                                  ) ||
                                  missionIndex
                                }
                                mission={mission}
                                onStart={
                                  handleStartMission
                                }
                                onSkip={
                                  handleSkipMission
                                }
                                skipping={
                                  skippingMission
                                }
                              />
                            )
                          )}

                        </div>
                      ) : (
                        <div className="rounded-2xl border border-career-border bg-career-surface p-6">

                          <p className="text-sm font-semibold text-white">
                            Missions are being prepared.
                          </p>

                          <p className="mt-2 text-sm leading-6 text-slate-500">
                            Your missions will appear here
                            once this stage has been initialized.
                          </p>

                        </div>
                      )}

                    </div>

                  </div>
                )}

                {/* =================================================
                    SKIPPED STAGE
                ================================================= */}

                {skipped && (
                  <div className="mt-5 ml-8 text-sm text-slate-500">
                    This stage was skipped during roadmap
                    personalization.
                  </div>
                )}

              </div>
            );
          })}

        </section>

        {/* ===================================================
            CONTINUE MESSAGE
        =================================================== */}

        {currentStage &&
          stages.length > 0 && (
            <section className="mt-8 border-b border-career-border pb-8">

              <div className="rounded-2xl border border-career-border bg-career-surface p-6">

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-career-purple/10">

                    <Rocket
                      size={20}
                      className="text-career-purple"
                    />

                  </div>

                  <div>

                    <p className="font-semibold text-white">
                      Keep going.
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Complete your current stage to unlock
                      the next part of your career path.
                    </p>

                  </div>

                </div>

              </div>

            </section>
          )}

        {/* ===================================================
            BOTTOM ACTIONS
        =================================================== */}

        <section className="mt-10 border-t border-career-border pt-8">

          <p className="text-center text-sm text-slate-500">
            Need a different learning path?
          </p>

          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              to="/career-setup?mode=edit"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-career-border px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-career-blue hover:text-career-blue"
            >
              Edit Goal
            </Link>

            <button
              type="button"
              onClick={() => {
                setRegenerationError("");
                setRegenerationReason("");
                setShowRegenerateModal(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-career-border px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-career-blue hover:text-career-blue"
            >
              <RefreshCw size={15} />
              Regenerate Roadmap
            </button>

          </div>

        </section>

      </main>

      {/* =====================================================
          REGENERATE MODAL
      ===================================================== */}

      {showRegenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">

          <div className="w-full max-w-lg rounded-3xl border border-career-border bg-career-surface p-6 shadow-2xl">

            <div className="flex items-start justify-between gap-5">

              <div>
                <h2 className="text-xl font-bold text-white">
                  Regenerate Your Roadmap
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Tell Career OS why you want to change your
                  learning path. Your reason will be used to
                  personalize the new roadmap.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!regenerating) {
                    setShowRegenerateModal(false);
                    setRegenerationReason("");
                    setRegenerationError("");
                  }
                }}
                className="text-slate-500 transition hover:text-white"
              >
                ✕
              </button>

            </div>

            {/* REASON */}

            <div className="mt-6">

              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Why do you want to regenerate?
              </label>

              <textarea
                value={regenerationReason}
                onChange={(event) =>
                  setRegenerationReason(
                    event.target.value
                  )
                }
                placeholder="For example: I already know JavaScript and React, so I want to skip beginner topics and focus more on backend development."
                rows={5}
                className="mt-2 w-full resize-none rounded-xl border border-career-border bg-career-card px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-600 focus:border-career-purple"
              />

            </div>

            {/* ERROR */}

            {regenerationError && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3">

                <p className="text-sm text-red-400">
                  {regenerationError}
                </p>

              </div>
            )}

            {/* ACTIONS */}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() => {
                  setShowRegenerateModal(false);
                  setRegenerationReason("");
                  setRegenerationError("");
                }}
                disabled={regenerating}
                className="rounded-xl border border-career-border px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-career-blue hover:text-career-blue disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleRegenerateRoadmap}
                disabled={
                  regenerating ||
                  !regenerationReason.trim()
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-career-purple px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {regenerating ? (
                  <>
                    <RefreshCw
                      size={15}
                      className="animate-spin"
                    />

                    Regenerating...
                  </>
                ) : (
                  <>
                    <RefreshCw size={15} />

                    Regenerate Roadmap
                  </>
                )}

              </button>

            </div>

          </div>
        </div>
      )}

      {/* =====================================================
          SKIP MISSION MODAL
      ===================================================== */}

      {showSkipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">

          <div className="w-full max-w-lg rounded-3xl border border-career-border bg-career-surface p-6 shadow-2xl">

            {/* HEADER */}

            <div className="flex items-start justify-between gap-5">

              <div>
                <h2 className="text-xl font-bold text-white">
                  Skip This Mission?
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Tell us why you want to skip this mission.
                  This helps Career OS understand your learning
                  preferences.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!skippingMission) {
                    setShowSkipModal(false);
                    setMissionToSkip(null);
                    setSkipReason("");
                    setSkipError("");
                  }
                }}
                className="text-slate-500 transition hover:text-white"
              >
                ✕
              </button>

            </div>

            {/* MISSION */}

            {missionToSkip && (
              <div className="mt-5 rounded-xl border border-career-border bg-career-card px-4 py-3">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Mission
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  {missionToSkip.title}
                </p>

              </div>
            )}

            {/* REASON */}

            <div className="mt-6">

              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Why are you skipping this mission?
              </label>

              <textarea
                value={skipReason}
                onChange={(event) =>
                  setSkipReason(
                    event.target.value
                  )
                }
                placeholder="For example: I already know this topic, so I want to focus on the next mission."
                rows={5}
                className="mt-2 w-full resize-none rounded-xl border border-career-border bg-career-card px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-600 focus:border-career-blue"
              />

            </div>

            {/* ERROR */}

            {skipError && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3">

                <p className="text-sm text-red-400">
                  {skipError}
                </p>

              </div>
            )}

            {/* ACTIONS */}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() => {
                  if (!skippingMission) {
                    setShowSkipModal(false);
                    setMissionToSkip(null);
                    setSkipReason("");
                    setSkipError("");
                  }
                }}
                disabled={skippingMission}
                className="rounded-xl border border-career-border px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-career-blue hover:text-career-blue disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleConfirmSkipMission
                }
                disabled={
                  skippingMission ||
                  !skipReason.trim()
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-career-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {skippingMission ? (
                  <>
                    <RefreshCw
                      size={15}
                      className="animate-spin"
                    />

                    Skipping...
                  </>
                ) : (
                  "Skip Mission"
                )}

              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Roadmap;

