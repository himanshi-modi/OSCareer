import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  uploadResume,
  startResumeAnalysis,
  getLatestResumeAnalysis,
} from "../api/resumeApi";

import {
  Upload,
  FileText,
  Check,
  LoaderCircle,
  Circle,
  AlertCircle,
} from "lucide-react";

function ResumeOnboarding() {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [analysisStatus, setAnalysisStatus] = useState(null);
  const [error, setError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setResume(file);
    setError("");
    setAnalysis(null);
    setAnalysisStatus(null);
    setIsAnalyzing(true);

    try {
      
      console.log("Uploading resume...");
      const uploadResponse = await uploadResume(file);

      console.log(
        "Resume upload response:",
        uploadResponse.data
      );

      const uploadedResume =
        uploadResponse.data.data;

      const id = uploadedResume.id;

      console.log(
        "Resume uploaded successfully:",
        uploadedResume
      );

      setResumeId(id);


      // -----------------------------
      // Start AI analysis
      // -----------------------------

      console.log(
        "Starting resume analysis..."
      );

      const analysisResponse =
        await startResumeAnalysis(id);

      console.log(
        "Resume analysis started:",
        analysisResponse.data
      );

      setAnalysisStatus(
        analysisResponse.data.data.analysisStatus
      );

    } catch (error) {
      console.error(
        "Resume upload/analysis failed:",
        error
      );

      setResume(null);
      setResumeId(null);
      setAnalysisStatus(null);
      setIsAnalyzing(false);

      setError(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    }
  };
  const handleContinueWithoutResume = () => {
  navigate("/career-setup?resumeStatus=skipped");
  };
  useEffect(() => {
    if (!resumeId) return;

    let intervalId;

    const checkAnalysisStatus = async () => {
      try {
        console.log(
          "Checking analysis status..."
        );

        const response =
          await getLatestResumeAnalysis(
            resumeId
          );

        const result = response.data.data;

        console.log(
          "Analysis status:",
          result.analysis.status
        );

        setAnalysisStatus(
          result.analysis.status
        );


        // -----------------------------
        // Analysis completed
        // -----------------------------

        if (result.analysis.status === "completed") {
  console.log(
    "Resume analysis completed:",
    result
  );

  setAnalysis(result);
  setIsAnalyzing(false);

  clearInterval(intervalId);

  navigate(`/resume/${resumeId}/analysis`);
}


        // -----------------------------
        // Analysis failed
        // -----------------------------

        if (
          result.analysis.status ===
          "failed"
        ) {
          console.error(
            "Resume analysis failed:",
            result.errorMessage
          );

          setError(
            result.errorMessage ||
            "Resume analysis failed."
          );

          setIsAnalyzing(false);

          clearInterval(intervalId);
        }

      } catch (error) {

        // 404 can happen before the
        // analysis record is available.
        console.log(
          "Waiting for analysis...",
          error.response?.data?.message
        );
      }
    };


    // Check immediately
    checkAnalysisStatus();


    // Then check every 2 seconds
    intervalId = setInterval(
      checkAnalysisStatus,
      2000
    );


    return () => {
      clearInterval(intervalId);
    };

  }, [resumeId]);


  // --------------------------------------------------
  // STEP 3: UI
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-career-bg text-white">

      {/* Header */}

      <header className="border-b border-career-border">

        <div className="mx-auto max-w-7xl px-6 py-5">

          <p className="text-xl font-bold tracking-tight">

            Career
            <span className="text-career-blue">
              OS
            </span>

          </p>

        </div>

      </header>


      {/* Main Content */}

      <div
        className={`mx-auto max-w-7xl px-6 py-14 lg:py-20 ${
          isAnalyzing || analysis
            ? "grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20"
            : "flex justify-center"
        }`}
      >

        {/* LEFT */}

        <section
          className={
            isAnalyzing || analysis
              ? "w-full"
              : "w-full max-w-2xl text-center"
          }
        >

          {/* Small Heading */}

          <p className="text-sm font-semibold uppercase text-center tracking-[0.2em] text-career-blue">

            Career onboarding

          </p>


          {/* Heading */}

          <h1 className="mt-4 text-4xl font-bold text-center tracking-tight sm:text-5xl">

            Upload your resume

          </h1>


          {/* Description */}

          <p className="mt-5 max-w-xl text-center text-base leading-7 text-slate-400 sm:text-lg">

            Let's understand your current profile
            and build a roadmap tailored just for you.

          </p>


          {/* Error */}

          {error && (

            <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">

              <AlertCircle size={18} />

              <span>{error}</span>

            </div>

          )}


          {/* Upload Area */}

          <div className="mt-10">

            {!resume ? (

              <label className="group block cursor-pointer">

                <div className="rounded-3xl border border-dashed border-career-border bg-career-surface p-8 text-center transition duration-300 hover:border-career-blue hover:bg-career-card sm:p-12">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-career-blue/10 text-career-blue transition group-hover:bg-career-blue/20">

                    <Upload size={24} />

                  </div>


                  <h2 className="mt-6 text-lg font-semibold">

                    Drag and Drop Resume here

                  </h2>


                  <p className="mt-2 text-sm text-slate-500">

                    or

                  </p>


                  <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-career-border bg-career-card px-5 py-3 text-sm font-medium text-slate-200 transition group-hover:border-slate-600">

                    <FileText size={17} />

                    Browse file

                  </div>


                  <p className="mt-5 text-xs text-slate-600">

                    Supported: PDF, DOC, DOCX

                  </p>

                </div>


                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />

              </label>

            ) : (

              <div className="rounded-3xl border border-career-border bg-career-surface p-7">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-career-blue/10 text-career-blue">

                    <FileText size={22} />

                  </div>


                  <div className="min-w-0">

                    <p className="truncate font-semibold text-slate-200">

                      {resume.name}

                    </p>

                    <p className="mt-1 text-sm text-slate-500">

                      Resume uploaded

                    </p>

                  </div>

                </div>


                {/* Current status */}

                {isAnalyzing && (

                  <div className="mt-6 flex items-center gap-3 text-sm text-career-blue">

                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />

                    {analysisStatus === "pending"
                      ? "Preparing analysis..."
                      : "Analysing resume..."
                    }

                  </div>

                )}


                {analysisStatus === "completed" && (

                  <div className="mt-6 flex items-center gap-3 text-sm text-green-400">

                    <Check size={18} />

                    Resume analysis completed

                  </div>

                )}

              </div>

            )}

          </div>


          {/* Continue Without Resume */}

          {!resume && (

            <button
            type="button"
            onClick={handleContinueWithoutResume}
            className="mt-6 text-sm text-slate-500 transition hover:text-career-blue"
            >
              Don't have a resume?{" "}
              <span className="font-medium text-slate-300">Continue without resume</span>
            </button>

          )}

        </section>


        {/* RIGHT SIDE */}

        {isAnalyzing && (

          <section className="w-full">

            <div className="animate-fade-in rounded-3xl border border-career-border bg-career-surface p-8">

              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">

                Resume uploaded

              </p>


              <h2 className="mt-3 text-2xl font-bold">

                Analysing...

              </h2>


              <p className="mt-2 text-sm leading-6 text-slate-500">

                We're understanding your experience
                and building your career profile.

              </p>


              <div className="mt-8 space-y-5">

                <AnalysisStep
                  label="Extracting resume text"
                  active={
                    analysisStatus ===
                    "processing"
                  }
                />

                <AnalysisStep
                  label="Finding your skills"
                  active={
                    analysisStatus ===
                    "processing"
                  }
                />

                <AnalysisStep
                  label="Analyzing your projects"
                  active={
                    analysisStatus ===
                    "processing"
                  }
                />

                <AnalysisStep
                  label="Building career profile"
                  active={
                    analysisStatus ===
                    "processing"
                  }
                />

              </div>


              <p className="mt-8 text-sm font-medium text-career-blue">

                {analysisStatus === "pending"
                  ? "Preparing analysis..."
                  : "Almost ready..."
                }

              </p>

            </div>

          </section>

        )}


        {/* RIGHT SIDE - COMPLETED */}

        {analysis && (

          <section className="w-full">

            <div className="animate-fade-in rounded-3xl border border-career-border bg-career-surface p-8">

              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-green-400">

                Analysis complete

              </p>


              <h2 className="mt-3 text-2xl font-bold">

                Your resume is analyzed ✓

              </h2>


              <p className="mt-2 text-sm leading-6 text-slate-500">

                Here's what our AI found from your resume.

              </p>


              {/* Scores */}

              <div className="mt-8 grid grid-cols-3 gap-3">

                <ScoreCard
                  label="Resume"
                  score={analysis.scores.resumeScore}
                />

                <ScoreCard
                  label="Recruiter"
                  score={analysis.scores.recruiterScore}
                />

                <ScoreCard
                  label="ATS"
                  score={analysis.scores.atsScore}
                />

              </div>


              {/* Summary */}

              <div className="mt-8">

                <p className="text-sm font-medium text-slate-300">

                  AI Summary

                </p>

                <p className="mt-2 text-sm leading-6 text-slate-400">

                  {analysis.summary}

                </p>

              </div>


              {/* Skills */}

              {analysis.extractedData?.skills?.length > 0 && (

                <div className="mt-6">

                  <p className="text-sm font-medium text-slate-300">

                    Skills detected

                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">

                    {analysis.extractedData.skills
                      .slice(0, 8)
                      .map((skill) => (

                        <span
                          key={`${skill.name}-${skill.category}`}
                          className="rounded-lg bg-career-blue/10 px-3 py-1.5 text-xs text-career-blue"
                        >
                          {skill.name}
                        </span>

                      ))}

                  </div>

                </div>

              )}

            </div>

          </section>

        )}

      </div>

    </main>
  );
}


// --------------------------------------------------
// Analysis Step
// --------------------------------------------------

function AnalysisStep({ label, active }) {

  return (

    <div className="flex items-center gap-4">

      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          active
            ? "bg-career-blue/10 text-career-blue"
            : "bg-career-card text-slate-600"
        }`}
      >

        {active ? (
          <Check size={17} />
        ) : (
          <Circle size={10} />
        )}

      </div>


      <span
        className={
          active
            ? "text-sm font-medium text-slate-200"
            : "text-sm text-slate-600"
        }
      >

        {label}

      </span>

    </div>

  );
}


// --------------------------------------------------
// Score Card
// --------------------------------------------------

function ScoreCard({ label, score }) {

  return (

    <div className="rounded-2xl border border-career-border bg-career-card p-4 text-center">

      <p className="text-xs text-slate-500">

        {label}

      </p>

      <p className="mt-2 text-2xl font-bold text-career-blue">

        {score ?? "--"}

      </p>

      <p className="text-[10px] text-slate-600">

        / 100

      </p>

    </div>

  );
}


export default ResumeOnboarding;