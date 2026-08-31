
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { verifyEmail } from "../api/authApi";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  const verificationStarted = useRef(false);

  useEffect(() => {
    if (verificationStarted.current) return;

    verificationStarted.current = true;

    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Verification token is missing.");
        return;
      }

      try {
        const response = await verifyEmail(token);

        console.log("Verification response:", response.data);

        setStatus("success");
        setMessage(
          response.data.message || "Your email has been verified successfully."
        );
      } catch (error) {
        console.error("Email verification error:", error);

        setStatus("error");

        setMessage(
          error.response?.data?.message ||
            "Unable to verify your email. Please try again."
        );
      }
    };

    verify();
  }, [token]);

  return (
    <AuthLayout>
      <div className="text-center">

        {status === "verifying" && (
          <>
            <p className="text-sm font-medium text-career-blue">
              Verifying email
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              Verifying your email...
            </h1>

            <p className="mt-4 text-sm text-slate-500">
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <p className="text-sm font-medium text-green-400">
              Email verified
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              You're all set!
            </h1>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              {message}
            </p>

            <Link
              to="/login"
              className="mt-8 inline-block w-full rounded-xl bg-career-blue px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-career-purple"
            >
              Continue to Sign In
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <p className="text-sm font-medium text-red-400">
              Verification failed
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              We couldn't verify your email
            </h1>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              {message}
            </p>

            <Link
              to="/login"
              className="mt-8 inline-block w-full rounded-xl border border-career-border bg-career-surface px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-career-card"
            >
              Back to Sign In
            </Link>
          </>
        )}

      </div>
    </AuthLayout>
  );
}

export default VerifyEmail;
