import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createCareerProfile } from "../api/careerProfileApi";

const popularCareers = [
  "MERN Stack Developer",
  "Java Backend Developer",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Python Developer",
  "Data Analyst",
  "Data Scientist",
  "DevOps Engineer",
  "Cybersecurity Engineer",
];

const goals = [
  "Internship",
  "Full-Time Job",
  "Career Switch",
  "Promotion",
  "Higher Studies",
  "Just Exploring",
];

const timelines = [
  "1 Month",
  "3 Months",
  "6 Months",
  "1 Year",
  "No Specific Timeline",
  "Custom Timeline",
];

const dailyCommitments = [
  "Less than 1 hour",
  "1–2 hours",
  "2–4 hours",
  "4+ hours",
  "Custom",
];

const educationLevels = [
  "High School",
  "Diploma",
  "Bachelor's",
  "Master's",
  "PhD",
];

const experienceLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

const internshipPreferences = [
  "Remote",
  "Onsite",
  "Hybrid",
  "No Preference",
];

/*
  Estimated total learning effort for each career.

  These are application-level estimates, not universal rules.
*/
const careerEffortHours = {
  "MERN Stack Developer": 600,
  "Java Backend Developer": 550,
  "Full Stack Developer": 700,
  "Frontend Developer": 450,
  "Backend Developer": 500,
  "Python Developer": 500,
  "Data Analyst": 450,
  "Data Scientist": 800,
  "DevOps Engineer": 650,
  "Cybersecurity Engineer": 700,
};

const mapCareerPriority = (goal) => {
  const mapping = {
    Internship: "INTERNSHIP",
    "Full-Time Job": "JOB",
    "Career Switch": "CAREER_SWITCH",
    Promotion: "JOB",
    "Higher Studies": "HIGHER_STUDIES",
    "Just Exploring": "JOB",
  };

  return mapping[goal];
};

const mapTimeline = (timeline) => {
  const mapping = {
    "1 Month": "1_MONTH",
    "3 Months": "3_MONTHS",
    "6 Months": "6_MONTHS",
    "1 Year": "12_MONTHS",
    "No Specific Timeline": "NO_TIMELINE",
  };

  return mapping[timeline];
};

const mapDailyCommitment = (
  value,
  customDailyCommitment
) => {
  const mapping = {
    "Less than 1 hour": 1,
    "1–2 hours": 2,
    "2–4 hours": 4,
    "4+ hours": 5,
  };

  if (value === "Custom") {
    return Number(customDailyCommitment);
  }

  return mapping[value];
};

const mapEducationLevel = (value) => {
  const mapping = {
    "High School": "HIGH_SCHOOL",
    "Diploma": "DIPLOMA",
    "Bachelor's": "BACHELORS",
    "Master's": "MASTERS",
    "PhD": "PHD",
  };

  return mapping[value];
};
const mapExperienceLevel = (value) => {
  const mapping = {
    Beginner: "BEGINNER",
    Intermediate: "INTERMEDIATE",
    Advanced: "ADVANCED",
  };

  return mapping[value];
};

const mapInternshipPreference = (value) => {
  const mapping = {
    Remote: "REMOTE",
    Onsite: "ONSITE",
    Hybrid: "HYBRID",
    "No Preference": "NO_PREFERENCE",
  };

  return mapping[value];
};

const getTimelineMonths = (
  timeline,
  customTimeline
) => {
  const mapping = {
    "1 Month": 1,
    "3 Months": 3,
    "6 Months": 6,
    "1 Year": 12,
  };

  if (timeline === "Custom Timeline") {
    return Number(customTimeline);
  }

  if (timeline === "No Specific Timeline") {
    return null;
  }

  return mapping[timeline];
};

const getDailyHours = (
  dailyCommitment,
  customDailyCommitment
) => {
  const mapping = {
    "Less than 1 hour": 1,
    "1–2 hours": 2,
    "2–4 hours": 4,
    "4+ hours": 5,
  };

  if (dailyCommitment === "Custom") {
    return Number(customDailyCommitment);
  }

  return mapping[dailyCommitment];
};

function CareerSetup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const resumeStatus =
    searchParams.get("resumeStatus") || "uploaded";

  const [step, setStep] = useState(0);

  const [career, setCareer] = useState("");
  const [searchCareer, setSearchCareer] = useState("");

  const [goal, setGoal] = useState("");

  const [timeline, setTimeline] = useState("");
  const [customTimeline, setCustomTimeline] = useState("");

  const [dailyCommitment, setDailyCommitment] =
    useState("");

  const [customDailyCommitment, setCustomDailyCommitment] =
    useState("");

  const [showRealityCheck, setShowRealityCheck] =
    useState(false);

  const [realityCheckData, setRealityCheckData] =
    useState(null);

  const [isGenerating, setIsGenerating] =
    useState(false);

  const [completedSteps, setCompletedSteps] =
    useState([]);

  const [educationLevel, setEducationLevel] =
    useState("");

  const [currentYear, setCurrentYear] =
    useState("");

  const [experienceLevel, setExperienceLevel] =
    useState("");

  const [internshipPreference, setInternshipPreference] =
    useState("No Preference");

  const filteredCareers = popularCareers.filter((item) =>
    item
      .toLowerCase()
      .includes(searchCareer.toLowerCase())
  );

  const selectCareer = (selectedCareer) => {
    setCareer(selectedCareer);
  };

  /*
    Calculate whether the selected timeline and
    daily commitment are realistic.
  */
  const calculateTimelineReality = () => {
    if (
      !career ||
      !timeline ||
      !dailyCommitment ||
      !experienceLevel
    ) {
      return null;
    }

    /*
      No deadline means there is nothing to compare.
    */
    if (timeline === "No Specific Timeline") {
      return {
        realistic: true,
        requiredHours: careerEffortHours[career],
        availableHours: null,
        requiredDailyHours: null,
        timelineMonths: null,
        dailyHours: getDailyHours(
          dailyCommitment,
          customDailyCommitment
        ),
      };
    }

    const requiredHours =
      careerEffortHours[career];

    const timelineMonths = getTimelineMonths(
      timeline,
      customTimeline
    );

    const dailyHours = getDailyHours(
      dailyCommitment,
      customDailyCommitment
    );

    if (!timelineMonths || !dailyHours) {
      return null;
    }

    /*
      Total theoretical available hours.
    */
    const totalAvailableHours =
      timelineMonths * 30 * dailyHours;

    /*
      Assume approximately 80% of theoretical time
      can realistically be used for focused learning.
    */
    const realisticAvailableHours =
      totalAvailableHours * 0.8;

    /*
      More experienced users generally need less
      foundational learning time.
    */
    const experienceMultiplier = {
      Beginner: 1,
      Intermediate: 0.75,
      Advanced: 0.55,
    };

    const adjustedRequiredHours =
      requiredHours *
      (experienceMultiplier[experienceLevel] || 1);

    /*
      How many hours/day would realistically be
      needed to complete the required effort?
    */
    const requiredDailyHours =
      adjustedRequiredHours /
      (timelineMonths * 30 * 0.8);

    return {
      realistic:
        realisticAvailableHours >=
        adjustedRequiredHours,

      requiredHours:
        Math.round(adjustedRequiredHours),

      availableHours:
        Math.round(realisticAvailableHours),

      requiredDailyHours:
        Math.ceil(requiredDailyHours * 2) / 2,

      timelineMonths,

      dailyHours,
    };
  };

  const completeStep = (nextStep) => {
    setCompletedSteps((prev) => {
      if (prev.includes(step)) {
        return prev;
      }

      return [...prev, step];
    });

    setStep(nextStep);
  };

  const handleCareerContinue = () => {
    if (!career) return;

    completeStep(2);
  };

  const handleGoalContinue = () => {
    if (!goal) return;

    completeStep(3);
  };

  const handleTimelineContinue = () => {
    if (!timeline) return;

    if (
      timeline === "Custom Timeline" &&
      !customTimeline.trim()
    ) {
      return;
    }

    completeStep(4);
  };

  const handleDailyCommitment = () => {
    if (!dailyCommitment) return;

    if (
      dailyCommitment === "Custom" &&
      !customDailyCommitment
    ) {
      return;
    }

    completeStep(5);
  };

  /*
    Reality check happens after Question 6,
    because experience level is required.
  */
  const handleExperienceContinue = () => {
    if (!experienceLevel) return;

    const reality = calculateTimelineReality();

    if (reality && !reality.realistic) {
      setRealityCheckData(reality);
      setShowRealityCheck(true);
      return;
    }

    completeStep(7);
  };

  const generateRoadmap = async () => {
    setShowRealityCheck(false);
    setIsGenerating(true);

    try {
      const payload = {
    targetCareer: career,

    currentGoal: goal,

    careerPriority: mapCareerPriority(goal),

    targetTimeline:
        timeline === "Custom Timeline"
            ? "CUSTOM"
            : timeline === "No Specific Timeline"
                ? "NO_TIMELINE"
                : mapTimeline(timeline),

    customTimelineMonths:
        timeline === "Custom Timeline"
            ? Number(customTimeline)
            : null,

    dailyCommitment:
        mapDailyCommitment(
            dailyCommitment,
            customDailyCommitment
        ),

    educationLevel:
        mapEducationLevel(educationLevel),

    currentYear:
        educationLevel === "Bachelor's"
            ? Number(currentYear)
            : undefined,

    experienceLevel:
        mapExperienceLevel(experienceLevel),

    internshipPreference:
        mapInternshipPreference(internshipPreference),
};

      console.log(
        "Creating career profile:",
        payload
      );

      await createCareerProfile(payload);

      navigate("/roadmap");
    } catch (error) {
      console.error(
        "Career profile creation failed:",
        error
      );

      setIsGenerating(false);

      // Later we can show proper error UI.
    }
  };

  const handleKeepPlan = () => {
    generateRoadmap();
  };

  const handleAdjustTimeline = () => {
    setShowRealityCheck(false);
    setStep(3);
  };

  const handleChangeDailyHours = () => {
    setShowRealityCheck(false);
    setStep(4);
  };

  /*
    INTRO SCREEN
  */
  if (step === 0) {
    return (
      <div className="min-h-screen bg-career-bg text-white">

        <header className="border-b border-career-border">
          <div className="mx-auto max-w-7xl px-6 py-5">
            <div className="text-xl font-bold">
              Career{" "}
              <span className="text-career-blue">
                OS
              </span>
            </div>
          </div>
        </header>

        <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6">

          <div className="w-full max-w-2xl text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-career-blue/10 text-3xl">
              🧭
            </div>

            <h1 className="mt-7 text-3xl font-bold tracking-tight sm:text-4xl">
              Let's build your career journey.
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-400">
              We'll ask a few quick questions to
              personalize your roadmap.
            </p>

            <p className="mt-5 text-sm text-slate-500">
              Estimated time: 1 minute
            </p>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="mt-8 rounded-xl bg-career-blue px-7 py-3.5 font-semibold transition-all duration-300 hover:bg-career-purple hover:shadow-lg"
            >
              Let's Begin
            </button>

          </div>

        </main>

      </div>
    );
  }

  /*
    ROADMAP GENERATION SCREEN
  */
  if (isGenerating) {
    return (
      <div className="min-h-screen bg-career-bg text-white">

        <header className="border-b border-career-border">
          <div className="mx-auto max-w-7xl px-6 py-5">
            <div className="text-xl font-bold">
              Career{" "}
              <span className="text-career-blue">
                OS
              </span>
            </div>
          </div>
        </header>

        <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6">

          <div className="w-full max-w-xl text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-career-blue/10 text-3xl">
              🧠
            </div>

            <h1 className="mt-7 text-2xl font-bold sm:text-3xl">
              Creating your personalized roadmap...
            </h1>

            <div className="mx-auto mt-10 max-w-md space-y-5 text-left">

              <GenerationStep
                text="Understanding your profile"
                delay="0s"
              />

              <GenerationStep
                text="Matching career requirements"
                delay="0.8s"
              />

              <GenerationStep
                text="Finding skill gaps"
                delay="1.6s"
              />

              <GenerationStep
                text="Planning milestones"
                delay="2.4s"
              />

            </div>

            <p className="mt-8 text-sm text-slate-500">
              Almost done...
            </p>

          </div>

        </main>

      </div>
    );
  }

  /*
    REALITY CHECK
  */
  if (showRealityCheck) {
    return (
      <div className="min-h-screen bg-career-bg text-white">

        <header className="border-b border-career-border">
          <div className="mx-auto max-w-7xl px-6 py-5">
            <div className="text-xl font-bold">
              Career{" "}
              <span className="text-career-blue">
                OS
              </span>
            </div>
          </div>
        </header>

        <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">

          <div className="w-full max-w-2xl">

            <div className="rounded-3xl border border-career-border bg-career-surface p-7 sm:p-9">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-xl">
                ⚠️
              </div>

              <h1 className="mt-6 text-2xl font-bold">
                Reality Check
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Based on your current profile and
                the commitment you've selected, this
                timeline may be difficult to achieve.
              </p>

              <div className="mt-7 space-y-4 rounded-2xl border border-career-border bg-career-card p-5">

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Target
                  </p>

                  <p className="mt-1 font-medium">
                    {career}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Goal
                  </p>

                  <p className="mt-1 font-medium">
                    {goal}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Timeline
                  </p>

                  <p className="mt-1 font-medium">
                    {timeline === "Custom Timeline"
                      ? `${customTimeline} Months`
                      : timeline}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Daily Time
                  </p>

                  <p className="mt-1 font-medium">
                    {dailyCommitment === "Custom"
                      ? `${customDailyCommitment} hours/day`
                      : dailyCommitment}
                  </p>
                </div>

              </div>

              <div className="mt-6 rounded-2xl border border-career-border bg-career-card p-5">

                <p className="text-sm leading-6 text-slate-300">
                  Your goal may require approximately{" "}
                  <span className="font-semibold text-white">
                    {
                      realityCheckData?.requiredDailyHours
                    }{" "}
                    hours/day
                  </span>{" "}
                  to achieve within your selected
                  timeline. Based on your current
                  commitment, you have about{" "}
                  <span className="font-semibold text-white">
                    {realityCheckData?.dailyHours}{" "}
                    hours/day
                  </span>{" "}
                  available.
                </p>

              </div>

              <p className="mt-6 text-sm text-slate-400">
                What would you like to do?
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">

                <button
                  type="button"
                  onClick={handleKeepPlan}
                  className="rounded-xl bg-career-blue px-4 py-3 text-sm font-semibold transition hover:bg-career-purple"
                >
                  Keep My Plan
                </button>

                <button
                  type="button"
                  onClick={handleAdjustTimeline}
                  className="rounded-xl border border-career-border px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-career-blue"
                >
                  Adjust Timeline
                </button>

                <button
                  type="button"
                  onClick={handleChangeDailyHours}
                  className="rounded-xl border border-career-border px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-career-blue"
                >
                  Change Daily Hours
                </button>

              </div>

            </div>

          </div>

        </main>

      </div>
    );
  }

  /*
    MAIN QUESTIONS
  */
  return (
    <div className="min-h-screen bg-career-bg text-white">

      {/* Navbar */}

      <header className="border-b border-career-border">

        <div className="mx-auto max-w-4xl px-6 py-5">

          <div className="text-xl font-bold">
            Career{" "}
            <span className="text-career-blue">
              OS
            </span>
          </div>

        </div>

      </header>

      <main className="mx-auto w-full max-w-3xl px-6 py-12">

        {/* Progress */}

        <div className="mb-10">

          <div className="flex items-center justify-between">

            <p className="text-sm font-medium text-slate-400">
              Question {step} of 7
            </p>

            <p className="text-sm text-slate-500">
              {Math.round((step / 7) * 100)}%
            </p>

          </div>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">

            <div
              className="h-full rounded-full bg-career-blue transition-all duration-500"
              style={{
                width: `${(step / 7) * 100}%`,
              }}
            />

          </div>

        </div>

        {/* QUESTION 1 */}

        {step === 1 && (

          <section className="animate-[fadeUp_0.5s_ease-out]">

            <div className="text-3xl">
              🎯
            </div>

            <h1 className="mt-5 text-2xl font-bold sm:text-3xl">
              What career are you aiming for?
            </h1>

            {/* Search */}

            <div className="relative mt-8">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                🔍
              </span>

              <input
                type="text"
                value={searchCareer}
                onChange={(e) =>
                  setSearchCareer(e.target.value)
                }
                placeholder="Search Career..."
                className="w-full rounded-xl border border-career-border bg-career-surface py-3.5 pl-12 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-career-blue"
              />

            </div>

            <p className="mt-7 text-sm font-semibold text-slate-400">
              Available Career Paths
            </p>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">

              {filteredCareers.map((item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() => selectCareer(item)}
                  className={`rounded-xl border p-4 text-left text-sm transition ${
                    career === item
                      ? "border-career-blue bg-career-blue/10 text-white"
                      : "border-career-border bg-career-surface text-slate-300 hover:border-slate-600"
                  }`}
                >

                  <span className="mr-3">
                    {career === item ? "✓" : "□"}
                  </span>

                  {item}

                </button>

              ))}

            </div>

            <div className="mt-10 flex justify-end">

              <button
                type="button"
                disabled={!career}
                onClick={handleCareerContinue}
                className="rounded-xl bg-career-blue px-6 py-3 font-semibold transition hover:bg-career-purple disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue →
              </button>

            </div>

          </section>

        )}

        {/* QUESTION 2 */}

        {step === 2 && (

          <section className="animate-[fadeUp_0.5s_ease-out]">

            <div className="text-3xl">
              🏆
            </div>

            <h1 className="mt-5 text-2xl font-bold sm:text-3xl">
              What's your current goal?
            </h1>

            <div className="mt-8 space-y-3">

              {goals.map((item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() => setGoal(item)}
                  className={`flex w-full items-center rounded-xl border p-4 text-left text-sm transition ${
                    goal === item
                      ? "border-career-blue bg-career-blue/10 text-white"
                      : "border-career-border bg-career-surface text-slate-300 hover:border-slate-600"
                  }`}
                >

                  <span className="mr-3 text-lg">
                    {goal === item ? "●" : "○"}
                  </span>

                  {item}

                </button>

              ))}

            </div>

            <div className="mt-10 flex justify-end">

              <button
                type="button"
                disabled={!goal}
                onClick={handleGoalContinue}
                className="rounded-xl bg-career-blue px-6 py-3 font-semibold transition hover:bg-career-purple disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue →
              </button>

            </div>

          </section>

        )}

        {/* QUESTION 3 */}

        {step === 3 && (

          <section className="animate-[fadeUp_0.5s_ease-out]">

            <div className="text-3xl">
              🗓️
            </div>

            <h1 className="mt-5 text-2xl font-bold sm:text-3xl">
              When do you want to achieve this goal?
            </h1>

            <div className="mt-8 space-y-3">

              {timelines.map((item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() => setTimeline(item)}
                  className={`flex w-full items-center rounded-xl border p-4 text-left text-sm transition ${
                    timeline === item
                      ? "border-career-blue bg-career-blue/10 text-white"
                      : "border-career-border bg-career-surface text-slate-300 hover:border-slate-600"
                  }`}
                >

                  <span className="mr-3 text-lg">
                    {timeline === item
                      ? "●"
                      : "○"}
                  </span>

                  {item}

                </button>

              ))}

            </div>

            {/* Custom Timeline */}

            {timeline === "Custom Timeline" && (

              <div className="mt-5 rounded-2xl border border-career-border bg-career-surface p-5">

                <p className="text-sm font-medium">
                  Enter Timeline
                </p>

                <div className="mt-3 flex items-center gap-3">

                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={customTimeline}
                    onChange={(e) =>
                      setCustomTimeline(
                        e.target.value
                      )
                    }
                    placeholder="2"
                    className="w-24 rounded-xl border border-career-border bg-career-card px-4 py-3 text-white outline-none focus:border-career-blue"
                  />

                  <span className="text-sm text-slate-400">
                    Months
                  </span>

                </div>

              </div>

            )}

            <div className="mt-10 flex justify-end">

              <button
                type="button"
                disabled={
                  !timeline ||
                  (timeline === "Custom Timeline" &&
                    !customTimeline)
                }
                onClick={handleTimelineContinue}
                className="rounded-xl bg-career-blue px-6 py-3 font-semibold transition hover:bg-career-purple disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue →
              </button>

            </div>

          </section>

        )}

        {/* QUESTION 4 */}

        {step === 4 && (

          <section className="animate-[fadeUp_0.5s_ease-out]">

            <div className="text-3xl">
              ⏰
            </div>

            <h1 className="mt-5 text-2xl font-bold sm:text-3xl">
              How much time can you invest daily?
            </h1>

            <div className="mt-8 space-y-3">

              {dailyCommitments.map((item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setDailyCommitment(item)
                  }
                  className={`flex w-full items-center rounded-xl border p-4 text-left text-sm transition ${
                    dailyCommitment === item
                      ? "border-career-blue bg-career-blue/10 text-white"
                      : "border-career-border bg-career-surface text-slate-300 hover:border-slate-600"
                  }`}
                >

                  <span className="mr-3 text-lg">
                    {dailyCommitment === item
                      ? "●"
                      : "○"}
                  </span>

                  {item}

                </button>

              ))}

              {dailyCommitment === "Custom" && (

                <div className="mt-5 rounded-2xl border border-career-border bg-career-surface p-5">

                  <p className="text-sm font-medium">
                    How many hours can you commit each day?
                  </p>

                  <div className="mt-3 flex items-center gap-3">

                    <input
                      type="number"
                      min="1"
                      max="12"
                      step="0.5"
                      value={customDailyCommitment}
                      onChange={(e) =>
                        setCustomDailyCommitment(
                          e.target.value
                        )
                      }
                      placeholder="3"
                      className="w-28 rounded-xl border border-career-border bg-career-card px-4 py-3 text-white outline-none focus:border-career-blue"
                    />

                    <span className="text-sm text-slate-400">
                      hours/day
                    </span>

                  </div>

                </div>

              )}

            </div>

            <div className="mt-10 flex justify-end">

              <button
                type="button"
                disabled={
                  !dailyCommitment ||
                  (dailyCommitment === "Custom" &&
                    !customDailyCommitment)
                }
                onClick={handleDailyCommitment}
                className="rounded-xl bg-career-blue px-6 py-3 font-semibold transition hover:bg-career-purple disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue →
              </button>

            </div>

          </section>

        )}

        {/* QUESTION 5 */}

        {step === 5 && (

          <section className="animate-[fadeUp_0.5s_ease-out]">

            <div className="text-3xl">
              🎓
            </div>

            <h1 className="mt-5 text-2xl font-bold sm:text-3xl">
              What's your highest education level?
            </h1>

            <div className="mt-8 space-y-3">

              {educationLevels.map((item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setEducationLevel(item)
                  }
                  className={`flex w-full items-center rounded-xl border p-4 text-left text-sm transition ${
                    educationLevel === item
                      ? "border-career-blue bg-career-blue/10 text-white"
                      : "border-career-border bg-career-surface text-slate-300 hover:border-slate-600"
                  }`}
                >

                  <span className="mr-3 text-lg">
                    {educationLevel === item
                      ? "●"
                      : "○"}
                  </span>

                  {item}

                </button>

              ))}

            </div>

            {educationLevel === "Bachelor's" && (

              <div className="mt-5 rounded-2xl border border-career-border bg-career-surface p-5">

                <p className="text-sm font-medium">
                  Which year are you currently in?
                </p>

                <select
                  value={currentYear}
                  onChange={(e) =>
                    setCurrentYear(e.target.value)
                  }
                  className="mt-3 w-full rounded-xl border border-career-border bg-career-card px-4 py-3 text-sm text-white outline-none focus:border-career-blue"
                >

                  <option value="">
                    Select year
                  </option>

                  <option value="1">
                    1st Year
                  </option>

                  <option value="2">
                    2nd Year
                  </option>

                  <option value="3">
                    3rd Year
                  </option>

                  <option value="4">
                    4th Year
                  </option>

                </select>

              </div>

            )}

            <div className="mt-10 flex justify-end">

              <button
                type="button"
                disabled={
                  !educationLevel ||
                  (educationLevel === "Bachelor's" &&
                    !currentYear)
                }
                onClick={() => completeStep(6)}
                className="rounded-xl bg-career-blue px-6 py-3 font-semibold transition hover:bg-career-purple disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue →
              </button>

            </div>

          </section>

        )}

        {/* QUESTION 6 */}

        {step === 6 && (

          <section className="animate-[fadeUp_0.5s_ease-out]">

            <div className="text-3xl">
              💼
            </div>

            <h1 className="mt-5 text-2xl font-bold sm:text-3xl">
              How would you describe your current experience?
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              This helps us decide where your roadmap
              should begin.
            </p>

            <div className="mt-8 space-y-3">

              {experienceLevels.map((item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setExperienceLevel(item)
                  }
                  className={`flex w-full items-center rounded-xl border p-4 text-left text-sm transition ${
                    experienceLevel === item
                      ? "border-career-blue bg-career-blue/10 text-white"
                      : "border-career-border bg-career-surface text-slate-300 hover:border-slate-600"
                  }`}
                >

                  <span className="mr-3 text-lg">
                    {experienceLevel === item
                      ? "●"
                      : "○"}
                  </span>

                  {item}

                </button>

              ))}

            </div>

            <div className="mt-10 flex justify-end">

              <button
                type="button"
                disabled={!experienceLevel}
                onClick={handleExperienceContinue}
                className="rounded-xl bg-career-blue px-6 py-3 font-semibold transition hover:bg-career-purple disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue →
              </button>

            </div>

          </section>

        )}

        {/* QUESTION 7 */}

        {step === 7 && (

          <section className="animate-[fadeUp_0.5s_ease-out]">

            <div className="text-3xl">
              🌐
            </div>

            <h1 className="mt-5 text-2xl font-bold sm:text-3xl">
              What type of work environment do you prefer?
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              You can change this preference later.
            </p>

            <div className="mt-8 space-y-3">

              {internshipPreferences.map((item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setInternshipPreference(item)
                  }
                  className={`flex w-full items-center rounded-xl border p-4 text-left text-sm transition ${
                    internshipPreference === item
                      ? "border-career-blue bg-career-blue/10 text-white"
                      : "border-career-border bg-career-surface text-slate-300 hover:border-slate-600"
                  }`}
                >

                  <span className="mr-3 text-lg">
                    {internshipPreference === item
                      ? "●"
                      : "○"}
                  </span>

                  {item}

                </button>

              ))}

            </div>

            <div className="mt-10 flex justify-end">

              <button
                type="button"
                disabled={!internshipPreference}
                onClick={generateRoadmap}
                className="rounded-xl bg-career-blue px-6 py-3 font-semibold transition hover:bg-career-purple disabled:cursor-not-allowed disabled:opacity-40"
              >
                Generate My Roadmap 🚀
              </button>

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

/*
  Roadmap generation animation
*/
function GenerationStep({ text, delay }) {
  return (
    <div
      className="flex items-center gap-3 opacity-0 [animation:fadeUp_0.5s_ease-out_forwards]"
      style={{
        animationDelay: delay,
      }}
    >

      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-career-blue/10 text-xs text-career-blue">
        ✓
      </div>

      <p className="text-sm text-slate-300">
        {text}
      </p>

    </div>
  );
}

export default CareerSetup;