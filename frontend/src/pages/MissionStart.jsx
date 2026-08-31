import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getMissionDetails,
  startMission,
  completeMission,
  submitMissionProof,
  skipMission,
} from "../api/learningProgressApi";

import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Trophy,
  CheckCircle2,
  Circle,
  ExternalLink,
  BookOpen,
  Loader2,
  AlertCircle,
  Link as LinkIcon,
  FileText,
  Upload,
  Check,
} from "lucide-react";

const MissionStart = () => {
  const navigate = useNavigate();
  const { missionId } = useParams();

  const [mission, setMission] = useState(null);

  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [submittingProof, setSubmittingProof] = useState(false);
  const [skipping, setSkipping] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Proof submission state
  const [proofUrl, setProofUrl] = useState("");
  const [proofText, setProofText] = useState("");

  // Mission skip state
  const [skipReason, setSkipReason] = useState("");
  const [skipReasonError, setSkipReasonError] = useState("");

  // Fetch mission details
  const loadMission = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMissionDetails(missionId);

      console.log("Mission details:", response);

      setMission(response.data);
    } catch (error) {
      console.error("Failed to load mission:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load mission."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (missionId) {
      loadMission();
    }
  }, [missionId]);

  // Start the mission
  const handleStartMission = async () => {
    try {
      setStarting(true);
      setError("");
      setSuccess("");

      const response = await startMission(missionId);

      console.log("Mission started:", response);

      setSuccess("Mission started successfully.");

      await loadMission();
    } catch (error) {
      console.error("Failed to start mission:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to start mission."
      );
    } finally {
      setStarting(false);
    }
  };

  // Mark the mission as completed
  const handleCompleteMission = async () => {
    try {
      setCompleting(true);
      setError("");
      setSuccess("");

      const response = await completeMission(missionId);

      console.log("Mission completed:", response);

      setSuccess("Mission completed successfully.");

      await loadMission();
    } catch (error) {
      console.error("Failed to complete mission:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to complete mission."
      );
    } finally {
      setCompleting(false);
    }
  };

  // Submit mission proof
  const handleSubmitProof = async () => {
    try {
      setSubmittingProof(true);
      setError("");
      setSuccess("");

      if (!mission.proofType) {
        setError("Proof type is not configured.");
        return;
      }

      const proofData = {
        type: mission.proofType,
        url: proofUrl.trim() || null,
        text: proofText.trim() || null,
      };

      console.log("Submitting proof:", proofData);

      const response = await submitMissionProof(
        missionId,
        proofData
      );

      console.log("Proof submitted:", response);

      setSuccess(
        "Proof submitted successfully and is awaiting review."
      );

      setProofUrl("");
      setProofText("");

      await loadMission();
    } catch (error) {
      console.error("Failed to submit proof:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to submit proof."
      );
    } finally {
      setSubmittingProof(false);
    }
  };

  // Skip the mission after validating the reason
  const handleSkipMission = async () => {
    if (!skipReason.trim()) {
      setSkipReasonError("Please provide a reason for skipping.");
      return;
    }

    try {
      setSkipping(true);
      setSkipReasonError("");
      setError("");
      setSuccess("");

      const response = await skipMission(
        missionId,
        skipReason.trim()
      );

      console.log("Mission skipped:", response);

      navigate("/roadmap");
    } catch (error) {
      console.error("Failed to skip mission:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to skip mission."
      );
    } finally {
      setSkipping(false);
    }
  };

  // Show loading state while fetching the mission
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-career-bg text-white">
        <div className="flex items-center gap-3 text-slate-400">
          <Loader2 size={20} className="animate-spin" />
          Loading mission...
        </div>
      </div>
    );
  }

  // Show an error state when the mission cannot be loaded
  if (!mission) {
    return (
      <div className="min-h-screen bg-career-bg px-6 py-12 text-white">
        <div className="mx-auto max-w-3xl">
          <button
            type="button"
            onClick={() => navigate("/learning-progress")}
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle size={20} />

              <span>{error || "Mission not found."}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Determine the current mission status
  const isNotStarted =
    mission.status === "not-started";

  const isInProgress =
    mission.status === "in-progress";

  const isSubmitted =
    mission.status === "submitted" ||
    mission.status === "under-review";

  const isRejected =
    mission.status === "rejected";

  const isCompleted =
    mission.status === "completed";

  const proofRequired =
    mission.proofRequired === true;

  // Return the appropriate icon for the proof type
  const getProofIcon = () => {
    switch (mission.proofType) {
      case "github":
        return <LinkIcon size={17} />;

      case "link":
        return <LinkIcon size={17} />;

      case "file":
        return <FileText size={17} />;

      case "image":
        return <Upload size={17} />;

      case "text":
        return <FileText size={17} />;

      default:
        return <Upload size={17} />;
    }
  };

  return (
    <div className="min-h-screen bg-career-bg text-white">
      <div className="mx-auto max-w-5xl px-6 py-8">

        {/* Back navigation */}
        <button
          type="button"
          onClick={() =>
            mission.stage?.stageId
              ? navigate(
                  `/learning-progress/stages/${mission.stage.stageId}/missions`
                )
              : navigate("/learning-progress")
          }
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
        >
          <ArrowLeft
            size={17}
            className="transition group-hover:-translate-x-1"
          />

          Back to Missions
        </button>

        {/* Status messages */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/5 p-4 text-sm text-green-400">
            <Check
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>{success}</span>
          </div>
        )}

        {/* Mission header */}
        <div className="border-b border-career-border pb-8">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span>
              Stage {mission.stage?.stageOrder}
            </span>

            <span className="text-slate-700">·</span>

            <span>
              {mission.stage?.title}
            </span>

            <span className="text-slate-700">·</span>

            <span>
              Mission {mission.missionOrder}
            </span>
          </div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-career-blue/20 bg-career-blue/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-career-blue">
            <BookOpen size={14} />

            {mission.type}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {mission.title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
            {mission.description}
          </p>

          {/* Mission status */}
          <div className="mt-5">
            {isNotStarted && (
              <span className="inline-flex rounded-lg border border-slate-500/20 bg-slate-500/10 px-3 py-1.5 text-xs font-semibold text-slate-400">
                NOT STARTED
              </span>
            )}

            {isInProgress && (
              <span className="inline-flex rounded-lg border border-career-blue/20 bg-career-blue/10 px-3 py-1.5 text-xs font-semibold text-career-blue">
                IN PROGRESS
              </span>
            )}

            {isSubmitted && (
              <span className="inline-flex rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-400">
                UNDER REVIEW
              </span>
            )}

            {isRejected && (
              <span className="inline-flex rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400">
                PROOF REJECTED
              </span>
            )}

            {isCompleted && (
              <span className="inline-flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-400">
                <CheckCircle2 size={14} />

                COMPLETED
              </span>
            )}
          </div>

          {/* Mission metadata */}
          <div className="mt-7 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400">
              <span className="h-2 w-2 rounded-full bg-orange-400" />

              {mission.difficulty}
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl border border-career-border bg-career-card px-4 py-2 text-sm font-medium text-slate-300">
              <Clock3
                size={15}
                className="text-slate-400"
              />

              {mission.estimatedTime} min
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400">
              🔥

              {mission.priority}
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300">
              <Trophy size={15} />

              Career {mission.careerImpact}%
            </div>
          </div>
        </div>

        {/* Mission progress */}
        <section className="border-b border-career-border py-8">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">
                Mission Progress
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Backend tracked progress
              </p>
            </div>

            <span className="text-sm font-semibold text-career-blue">
              {mission.progress || 0}%
            </span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-career-blue transition-all duration-500"
              style={{
                width: `${mission.progress || 0}%`,
              }}
            />
          </div>
        </section>

        {/* Mission objective */}
        <section className="border-b border-career-border py-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            Your Objective
          </h2>

          <div className="mt-5 rounded-2xl border border-career-border bg-career-card p-6">
            <p className="text-sm leading-7 text-slate-400 sm:text-base">
              {mission.description}
            </p>
          </div>
        </section>

        {/* Why the mission matters */}
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

        {/* Expected outcomes */}
        <section className="border-b border-career-border py-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                Expected Outcome
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Make sure you can demonstrate each of these outcomes.
              </p>
            </div>

            <span className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-400">
              {mission.evidenceRequired?.length || 0} items
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {mission.evidenceRequired?.length > 0 ? (
              mission.evidenceRequired.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-xl border border-career-border bg-career-card p-4"
                >
                  <div className="mt-0.5 shrink-0">
                    <Circle
                      size={20}
                      className="text-slate-600"
                    />
                  </div>

                  <p className="text-sm leading-6 text-slate-300">
                    {item}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-career-border bg-career-card p-5">
                <p className="text-sm text-slate-500">
                  No specific evidence requirements have been defined
                  for this mission.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Proof submission */}
        {proofRequired && (
          <section className="border-b border-career-border py-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                  Mission Proof
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Submit evidence that you completed this mission.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-lg border border-career-blue/20 bg-career-blue/10 px-3 py-1.5 text-xs font-semibold text-career-blue">
                {getProofIcon()}

                {mission.proofType}
              </div>
            </div>

            {/* Existing proof URL */}
            {mission.proof?.url && (
              <div className="mt-5 rounded-xl border border-career-border bg-career-card p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Submitted proof
                </p>

                <a
                  href={mission.proof.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 flex items-center gap-2 break-all text-sm text-career-blue hover:underline"
                >
                  <ExternalLink size={15} />

                  {mission.proof.url}
                </a>
              </div>
            )}

            {/* Existing proof text */}
            {mission.proof?.text && (
              <div className="mt-5 rounded-xl border border-career-border bg-career-card p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Submitted text
                </p>

                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                  {mission.proof.text}
                </p>
              </div>
            )}

            {/* Reviewer feedback */}
            {mission.feedback && (
              <div className="mt-5 rounded-xl border border-career-blue/20 bg-career-blue/5 p-4">
                <p className="text-xs uppercase tracking-wider text-career-blue">
                  Reviewer Feedback
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {mission.feedback}
                </p>
              </div>
            )}

            {/* Proof rejection reason */}
            {isRejected && mission.rejectionReason && (
              <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs uppercase tracking-wider text-red-400">
                  Rejection Reason
                </p>

                <p className="mt-2 text-sm leading-6 text-red-300">
                  {mission.rejectionReason}
                </p>
              </div>
            )}

            {/* Proof form */}
            {(isInProgress || isRejected) && (
              <div className="mt-6 space-y-4">
                {["github", "link", "file", "image"].includes(
                  mission.proofType
                ) && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Proof URL
                    </label>

                    <input
                      type="url"
                      value={proofUrl}
                      onChange={(e) =>
                        setProofUrl(e.target.value)
                      }
                      placeholder={
                        mission.proofType === "github"
                          ? "https://github.com/username/repository"
                          : "https://..."
                      }
                      className="w-full rounded-xl border border-career-border bg-career-card px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-career-blue"
                    />
                  </div>
                )}

                {mission.proofType === "text" && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Your Proof
                    </label>

                    <textarea
                      value={proofText}
                      onChange={(e) =>
                        setProofText(e.target.value)
                      }
                      rows={6}
                      placeholder="Describe what you completed..."
                      className="w-full resize-none rounded-xl border border-career-border bg-career-card px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-600 focus:border-career-blue"
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSubmitProof}
                  disabled={submittingProof}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-career-blue to-career-purple px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submittingProof ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />

                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload size={16} />

                      Submit Proof
                    </>
                  )}
                </button>
              </div>
            )}
          </section>
        )}

        {/* Start mission action */}
        {isNotStarted && (
          <section className="py-8">
            <div className="rounded-2xl border border-career-blue/20 bg-career-blue/5 p-6">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-semibold text-white">
                    Ready to start?
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                    Start this mission to begin tracking your progress.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleStartMission}
                  disabled={starting}
                  className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-career-blue to-career-purple px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {starting ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />

                      Starting...
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
              </div>
            </div>
          </section>
        )}

        {/* Complete mission action */}
        {isInProgress && !proofRequired && (
          <section className="py-8">
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-semibold text-white">
                    Ready to finish?
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                    You've worked through the mission. Mark it as completed.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCompleteMission}
                  disabled={completing}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {completing ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />

                      Completing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={17} />

                      Complete Mission
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Proof review status */}
        {isSubmitted && (
          <section className="py-8">
            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
              <div className="flex items-start gap-4">
                <Clock3
                  size={22}
                  className="mt-0.5 text-yellow-400"
                />

                <div>
                  <h2 className="font-semibold text-white">
                    Proof under review
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Your proof has been submitted. You can continue once it has been reviewed.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Completed mission state */}
        {isCompleted && (
          <section className="py-8">
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <CheckCircle2
                    size={24}
                    className="mt-0.5 text-green-400"
                  />

                  <div>
                    <h2 className="font-semibold text-white">
                      Mission completed
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Great work. This mission has been recorded as completed.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    mission.stage?.stageId
                      ? navigate("/roadmap")
                      : navigate("/learning-progress")
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-career-blue to-career-purple px-5 py-3 text-sm font-semibold text-white"
                >
                  Back to Missions

                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Skip mission */}
        {(isInProgress || isRejected) && (
          <section className="border-t border-career-border py-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Need to skip this mission?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Provide a reason. You can revisit skipped missions later.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start">
              <div className="flex-1">
                <input
                  value={skipReason}
                  onChange={(e) => {
                    setSkipReason(e.target.value);
                    setSkipReasonError("");
                  }}
                  placeholder="Why are you skipping this mission?"
                  className={`w-full rounded-xl border bg-career-card px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-career-blue ${
                    skipReasonError
                      ? "border-red-500/40"
                      : "border-career-border"
                  }`}
                />

                {skipReasonError && (
                  <p className="mt-2 text-xs text-red-400">
                    {skipReasonError}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleSkipMission}
                disabled={skipping}
                className="rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10 disabled:opacity-40"
              >
                {skipping ? "Skipping..." : "Skip Mission"}
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MissionStart;