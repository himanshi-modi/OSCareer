import {
  Check,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Play,
  Target,
} from "lucide-react";

function MissionCard({ mission, onStart,onSkip }) {
  const completed =
    mission?.status === "completed" ||
    mission?.progress === 100 ||
    mission?.completed === true ||
    mission?.isCompleted === true;
    const skipped =
  mission?.status === "skipped";

  const formatValue = (value) => {
    if (!value) return "Not specified";

    return String(value)
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatTime = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "Not specified";
    }

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      return value;
    }

    if (numericValue < 60) {
      return `${numericValue} min`;
    }

    const hours = Math.floor(numericValue / 60);
    const minutes = numericValue % 60;

    if (minutes === 0) {
      return `${hours} hr`;
    }

    return `${hours} hr ${minutes} min`;
  };

  const formatImpact = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return null;
    }

    const numericValue = Number(value);

    if (!Number.isNaN(numericValue)) {
      return `+${numericValue}%`;
    }

    return String(value).startsWith("+")
      ? String(value)
      : `+${value}`;
  };

  const getDifficultyClass = () => {
    switch (mission?.difficulty) {
      case "easy":
        return "text-emerald-400";

      case "hard":
        return "text-red-400";

      case "medium":
      default:
        return "text-amber-400";
    }
  };

  const getPriorityClass = () => {
    switch (mission?.priority) {
      case "high":
        return "text-red-400";

      case "low":
        return "text-slate-400";

      case "medium":
      default:
        return "text-career-blue";
    }
  };

  return (
    <article
  className={`rounded-2xl border p-5 transition sm:p-6 ${
    completed
      ? "border-emerald-500/10 bg-emerald-500/[0.03]"
      : skipped
      ? "border-career-border bg-career-surface opacity-60"
      : "border-career-border bg-career-surface"
  }`}
>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-start gap-4">
        <div
          className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            completed
              ? "bg-emerald-500/10"
              : "bg-career-blue/10"
          }`}
        >
          {completed ? (
  <Check
    size={19}
    className="text-emerald-400"
  />
) : skipped ? (
  <Check
    size={19}
    className="text-slate-500"
  />
) : (
  <Target
    size={19}
    className="text-career-blue"
  />
)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-base font-bold text-white">
                {mission?.title || "Untitled Mission"}
              </h3>

              {mission?.description && (
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {mission.description}
                </p>
              )}
            </div>

            {completed && (
              <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <CheckCircle2 size={14} />
                Completed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          WHY IT MATTERS
      ===================================================== */}

      {mission?.whyItMatters && (
        <div className="mt-5 rounded-xl border border-career-border bg-career-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Why It Matters
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {mission.whyItMatters}
          </p>
        </div>
      )}

      {/* =====================================================
          MISSION DETAILS
      ===================================================== */}

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* DIFFICULTY */}

        <div className="rounded-xl bg-career-card px-4 py-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            Difficulty
          </p>

          <p
            className={`mt-1 text-sm font-semibold capitalize ${getDifficultyClass()}`}
          >
            {mission?.difficulty || "Medium"}
          </p>
        </div>

        {/* PRIORITY */}

        <div className="rounded-xl bg-career-card px-4 py-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            Priority
          </p>

          <p
            className={`mt-1 text-sm font-semibold capitalize ${getPriorityClass()}`}
          >
            {mission?.priority || "Medium"}
          </p>
        </div>

        {/* TIME */}

        <div className="rounded-xl bg-career-card px-4 py-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            Estimated Time
          </p>

          <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-300">
            <Clock3 size={14} />
            {formatTime(mission?.estimatedTime)}
          </p>
        </div>

        {/* TYPE */}

        <div className="rounded-xl bg-career-card px-4 py-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            Type
          </p>

          <p className="mt-1 text-sm font-semibold capitalize text-slate-300">
            {formatValue(mission?.type)}
          </p>
        </div>
      </div>

      {/* =====================================================
          CAREER IMPACT
      ===================================================== */}

      {mission?.careerImpact !== undefined &&
        mission?.careerImpact !== null && (
          <div className="mt-5 flex items-center justify-between rounded-xl border border-career-blue/10 bg-career-blue/[0.04] px-4 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Career Impact
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Completing this mission contributes to your
                career readiness.
              </p>
            </div>

            <span className="shrink-0 text-lg font-bold text-career-blue">
              {formatImpact(mission.careerImpact)}
            </span>
          </div>
        )}

      {/* =====================================================
          PROOF REQUIRED
      ===================================================== */}

      {mission?.proofRequired && (
        <div className="mt-5 border-t border-career-border pt-5">
          <div className="flex items-start gap-3">
            <FileCheck2
              size={18}
              className="mt-0.5 shrink-0 text-career-purple"
            />

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Proof Required
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Submit{" "}
                <span className="font-semibold capitalize text-slate-300">
                  {formatValue(mission?.proofType)}
                </span>{" "}
                evidence to complete this mission.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          EVIDENCE REQUIRED
      ===================================================== */}

      {Array.isArray(mission?.evidenceRequired) &&
        mission.evidenceRequired.length > 0 && (
          <div className="mt-5 border-t border-career-border pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Evidence Required
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {mission.evidenceRequired.map(
                (item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-career-border bg-career-card px-3 py-1.5 text-xs text-slate-400"
                  >
                    <Check
                      size={12}
                      className="text-career-blue"
                    />

                    {typeof item === "string"
                      ? item
                      : item?.label ||
                        item?.type ||
                        item?.name ||
                        "Evidence"}
                  </span>
                )
              )}
            </div>
          </div>
        )}

      {/* =====================================================
          ACTION
      ===================================================== */}

      <div className="mt-6 flex flex-col gap-3 border-t border-career-border pt-5 sm:flex-row">
  {!completed && !skipped ? (
    <>
      <button
        type="button"
        onClick={() => onStart?.(mission)}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-career-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
      >
        <Play size={15} />
        Start Mission
      </button>

      <button
        type="button"
        onClick={() => onSkip?.(mission)}
        className="inline-flex items-center justify-center rounded-xl border border-career-border px-5 py-2.5 text-sm font-medium text-slate-400 transition hover:border-slate-500 hover:text-slate-300"
      >
        Skip For Now
      </button>
    </>
  ) : skipped ? (
    <div className="inline-flex items-center gap-2 rounded-xl border border-career-border bg-career-surface px-5 py-2.5 text-sm font-medium text-slate-500">
      <CheckCircle2 size={16} />
      Skipped For Now
    </div>
  ) : (
    <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-2.5 text-sm font-medium text-emerald-400">
      <CheckCircle2 size={16} />
      Mission Completed
    </div>
  )}
</div>
    </article>
  );
}

export default MissionCard;