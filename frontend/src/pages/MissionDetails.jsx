import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Trophy,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Circle,
} from "lucide-react";

import {
  getMissionDetails,
  startMission,
} from "../api/learningProgressApi";

const MissionDetails = () => {
  const navigate = useNavigate();
  const { missionId } = useParams();

  const [startingMission, setStartingMission] = useState(false);
  const [startError, setStartError] = useState("");

  const [mission, setMission] = useState(null);
  const [proof, setProof] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ============================================================
     START MISSION
  ============================================================ */

  const handleStartMission = async () => {
    try {
      setStartingMission(true);
      setStartError("");

      const response = await startMission(missionId);

      console.log("✅ Start mission response:", response);

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to start mission."
        );
      }

      navigate(
        `/learning-progress/missions/${missionId}/start`
      );
    } catch (err) {
      console.error("❌ FAILED TO START MISSION");
      console.error("Error:", err);
      console.error("Status:", err?.response?.status);
      console.error(
        "Response:",
        err?.response?.data
      );
      console.error(
        "URL:",
        err?.config?.url
      );

      setStartError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to start mission."
      );
    } finally {
      setStartingMission(false);
    }
  };

  /* ============================================================
     FETCH MISSION DETAILS
  ============================================================ */

  useEffect(() => {
    const fetchMissionDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getMissionDetails(missionId);

        console.log(
          "✅ Mission details response:",
          response
        );

        /*
          getMissionDetails() already returns response.data
          from Axios.

          Therefore the structure is:

          response = {
            success: true,
            message: "...",
            data: {
              missionId: "...",
              title: "...",
              ...
            }
          }
        */

        if (!response?.success) {
          throw new Error(
            response?.message ||
              "Failed to fetch mission details."
          );
        }

        setMission(response.data);
      } catch (err) {
        console.error(
          "❌ Failed to fetch mission details:",
          err
        );

        console.error(
          "Status:",
          err?.response?.status
        );

        console.error(
          "Response:",
          err?.response?.data
        );

        console.error(
          "URL:",
          err?.config?.url
        );

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Unable to load mission details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (missionId) {
      fetchMissionDetails();
    }
  }, [missionId]);

  /* ============================================================
     LOADING
  ============================================================ */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-career-bg text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            size={28}
            className="animate-spin text-career-blue"
          />

          <p className="text-sm text-slate-400">
            Loading mission...
          </p>
        </div>
      </div>
    );
  }

  /* ============================================================
     ERROR
  ============================================================ */

  if (error || !mission) {
    return (
      <div className="min-h-screen bg-career-bg px-6 py-8 text-white">
        <div className="mx-auto max-w-5xl">
          <button
            onClick={() => navigate(-1)}
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
          >
            <ArrowLeft
              size={17}
              className="transition group-hover:-translate-x-1"
            />

            Back to Roadmap
          </button>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0 text-red-400"
              />

              <div>
                <h2 className="font-semibold text-white">
                  Unable to load mission
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {error ||
                    "Mission details could not be found."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================
     DERIVED VALUES
  ============================================================ */

  const progress = mission.progress ?? 0;

  const formattedStatus =
    mission.status
      ?.replace(/-/g, " ")
      ?.replace(/\b\w/g, (char) =>
        char.toUpperCase()
      ) || "Not Started";

  const formattedDifficulty =
    mission.difficulty
      ?.replace(/-/g, " ")
      ?.replace(/\b\w/g, (char) =>
        char.toUpperCase()
      ) || "Unknown";

  const formattedPriority =
    mission.priority
      ?.replace(/-/g, " ")
      ?.replace(/\b\w/g, (char) =>
        char.toUpperCase()
      ) || "Normal";

  const isCompleted =
    mission.status === "completed";

  const isInProgress =
    mission.status === "in-progress";

  const isSkipped =
    mission.status === "skipped";

  const isUnderReview =
    mission.status === "under-review";

  const isRejected =
    mission.status === "rejected";

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="min-h-screen bg-career-bg text-white">
      <div className="mx-auto max-w-5xl px-6 py-8">

        {/* ======================================================
            BACK TO ROADMAP
        ====================================================== */}

        <button
          onClick={() => navigate(-1)}
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
        >
          <ArrowLeft
            size={17}
            className="transition group-hover:-translate-x-1"
          />

          Back to Roadmap
        </button>

        {/* ======================================================
            MISSION HEADER
        ====================================================== */}

        <div className="border-b border-career-border pb-8">

          {/* Stage / Mission */}

          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span>
              Stage {mission.stage?.stageOrder}
            </span>

            <span className="text-slate-700">
              ·
            </span>

            <span>
              {mission.stage?.title}
            </span>

            <span className="text-slate-700">
              ·
            </span>

            <span>
              Mission {mission.missionOrder}
            </span>
          </div>

          {/* Title */}

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {mission.title}
          </h1>

          {/* Description */}

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
            {mission.description}
          </p>

          {/* ====================================================
              META BADGES
          ==================================================== */}

          <div className="mt-7 flex flex-wrap gap-3">

            {/* Difficulty */}

            <div className="inline-flex items-center gap-2 rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400">
              <span className="h-2 w-2 rounded-full bg-orange-400" />

              {formattedDifficulty}
            </div>

            {/* Time */}

            <div className="inline-flex items-center gap-2 rounded-xl border border-career-border bg-career-card px-4 py-2 text-sm font-medium text-slate-300">
              <Clock3
                size={15}
                className="text-slate-400"
              />

              {mission.estimatedTime} min
            </div>

            {/* Priority */}

            <div className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400">
              <span>🔥</span>

              {formattedPriority}
            </div>

            {/* Career Impact */}

            <div className="inline-flex items-center gap-2 rounded-xl border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300">
              <Trophy size={15} />

              Career {mission.careerImpact}%
            </div>
          </div>
        </div>

        {/* ======================================================
            MISSION CONTENT
        ====================================================== */}

        <div className="border-b border-career-border py-8">

          {/* ====================================================
              YOUR PROGRESS
          ==================================================== */}

          <section className="border-b border-career-border pb-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">
                Your Progress
              </h2>

              <span className="text-sm font-semibold text-career-blue">
                {progress}%
              </span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-career-blue transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </section>

          {/* ====================================================
              WHY THIS MATTERS
          ==================================================== */}

          {mission.whyItMatters && (
            <section className="border-b border-career-border py-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                Why This Matters
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
                {mission.whyItMatters}
              </p>
            </section>
          )}

          {/* ====================================================
              WHAT YOU NEED TO DO
          ==================================================== */}

          <section className="border-b border-career-border py-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              What You Need To Do
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
              {mission.description}
            </p>

            {/* Mission Information */}

            <div className="mt-6">
              <h3 className="mb-4 text-sm font-semibold text-white">
                Mission Details
              </h3>

              <div className="space-y-3">

                {/* Mission Type */}

                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-700">
                    <Circle
                      size={10}
                      className="text-slate-600"
                    />
                  </div>

                  <span className="text-sm text-slate-300">
                    Mission type:{" "}
                    <span className="text-slate-400">
                      {mission.type}
                    </span>
                  </span>
                </div>

                {/* Estimated Time */}

                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-700">
                    <Circle
                      size={10}
                      className="text-slate-600"
                    />
                  </div>

                  <span className="text-sm text-slate-300">
                    Estimated time:{" "}
                    <span className="text-slate-400">
                      {mission.estimatedTime} minutes
                    </span>
                  </span>
                </div>

                {/* Career Impact */}

                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-700">
                    <Circle
                      size={10}
                      className="text-slate-600"
                    />
                  </div>

                  <span className="text-sm text-slate-300">
                    Career impact:{" "}
                    <span className="text-slate-400">
                      {mission.careerImpact}%
                    </span>
                  </span>
                </div>

              </div>
            </div>
          </section>

          {/* ====================================================
              EVIDENCE / PROOF
          ==================================================== */}

          {mission.proofRequired && (
            <section className="border-b border-career-border py-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                Evidence / Proof
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                Submit your work as{" "}
                {mission.proofType === "github"
                  ? "a GitHub repository."
                  : `proof using ${mission.proofType}.`}
              </p>

              {/* Existing Submitted Proof */}

              {mission.proof?.status !==
                "not-submitted" &&
                mission.proof?.url && (
                  <div className="mt-4 rounded-xl border border-career-border bg-career-card p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Submitted Proof
                    </p>

                    <a
                      href={mission.proof.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 block break-all text-sm text-career-blue hover:underline"
                    >
                      {mission.proof.url}
                    </a>

                    <p className="mt-2 text-xs text-slate-500">
                      Status:{" "}
                      {mission.proof.status}
                    </p>
                  </div>
                )}

              {/* Proof Input */}

              {!isCompleted &&
                !isUnderReview &&
                mission.proof?.status !==
                  "approved" && (
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={proof}
                        onChange={(e) =>
                          setProof(e.target.value)
                        }
                        placeholder={
                          mission.proofType ===
                          "github"
                            ? "GitHub Repository URL"
                            : "Submit your proof"
                        }
                        className="w-full rounded-xl border border-career-border bg-career-card py-3.5 pl-4 pr-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-career-blue"
                      />
                    </div>

                    <button
                      type="button"
                      disabled={!proof.trim()}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-career-blue px-5 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Submit Proof
                    </button>
                  </div>
                )}
            </section>
          )}

          {/* ====================================================
              NO PROOF REQUIRED
          ==================================================== */}

          {!mission.proofRequired && (
            <section className="border-b border-career-border py-8">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle2
                    size={17}
                    className="text-emerald-400"
                  />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-slate-300">
                    No Proof Required
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    This mission does not require you to
                    submit evidence. Complete the mission
                    when you have finished the work.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* ====================================================
              MISSION STATUS
          ==================================================== */}

          <section className="pt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Mission Status
            </h2>

            {/* Status */}

            <div className="mt-4 flex items-center gap-3">
              <div
                className={`h-2.5 w-2.5 rounded-full shadow-lg ${
                  isCompleted
                    ? "bg-emerald-400 shadow-emerald-400/30"
                    : isRejected
                    ? "bg-red-400 shadow-red-400/30"
                    : isSkipped
                    ? "bg-slate-500 shadow-slate-500/30"
                    : isUnderReview
                    ? "bg-yellow-400 shadow-yellow-400/30"
                    : "bg-career-blue shadow-career-blue/30"
                }`}
              />

              <span
                className={`text-sm font-medium ${
                  isCompleted
                    ? "text-emerald-400"
                    : isRejected
                    ? "text-red-400"
                    : isSkipped
                    ? "text-slate-400"
                    : isUnderReview
                    ? "text-yellow-400"
                    : "text-career-blue"
                }`}
              >
                {formattedStatus}
              </span>
            </div>

            {/* Feedback */}

            {mission.feedback && (
              <div className="mt-5 rounded-xl border border-career-border bg-career-card p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Feedback
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {mission.feedback}
                </p>
              </div>
            )}

            {/* Rejection Reason */}

            {mission.rejectionReason && (
              <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Rejection Reason
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {mission.rejectionReason}
                </p>
              </div>
            )}
            {/* Skip Reason */}

{isSkipped && (
  <div className="mt-5 rounded-xl border border-slate-500/20 bg-slate-500/5 p-4">
    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
      Skip Reason
    </p>

    <p className="mt-2 text-sm leading-6 text-slate-400">
      {mission.skipReason ||
        "No reason was provided."}
    </p>
  </div>
)}

            {/* ==================================================
                MISSION ACTION
            ================================================== */}

            {startError && (
              <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-sm text-red-400">
                  {startError}
                </p>
              </div>
            )}

            <div className="mt-7 flex justify-end">

              {/* Not Started */}

              {mission.status === "not-started" && (
                <button
                  type="button"
                  onClick={handleStartMission}
                  disabled={startingMission}
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-career-blue to-career-purple px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {startingMission ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />

                      Starting Mission...
                    </>
                  ) : (
                    <>
                      Start Mission

                      <ArrowRight
                        size={16}
                        className="transition group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              )}

              {/* In Progress */}

              {mission.status === "in-progress" && (
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/learning-progress/missions/${missionId}/start`
                    )
                  }
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-career-blue to-career-purple px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Continue Mission

                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </button>
              )}

              {/* Completed */}

              {mission.status === "completed" && (
                <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-6 py-3.5 text-sm font-semibold text-emerald-400">
                  <CheckCircle2 size={17} />

                  Mission Completed
                </div>
              )}
              {/* Skipped */}

{mission.status === "skipped" && (
  <button
    type="button"
    onClick={() => navigate("/roadmap")}
    className="inline-flex items-center gap-2 rounded-xl border border-career-border bg-career-card px-6 py-3.5 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
  >
    Back to Roadmap

    <ArrowRight size={16} />
  </button>
)}

            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MissionDetails;