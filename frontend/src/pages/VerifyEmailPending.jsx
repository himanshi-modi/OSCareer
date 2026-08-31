
import { Link, useLocation } from "react-router-dom";
import { Mail } from "lucide-react";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { resendVerificationEmail } from "../api/authApi";

function VerifyEmailPending() {
  const location = useLocation();

  const email = location.state?.email;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResendVerification = async () => {
    if (!email) {
      setError(
        "We couldn't find your email address. Please sign up again."
      );
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await resendVerificationEmail(email);

      console.log(
        "Resend verification response:",
        response.data
      );

      setMessage(
        response.data.message ||
          "Verification email sent successfully."
      );
    } catch (error) {
      console.error(
        "Resend verification email error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center">

        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-career-blue/10">
          <Mail
            size={30}
            className="text-career-blue"
          />
        </div>

        {/* Heading */}
        <h1 className="mt-7 text-3xl font-bold tracking-tight sm:text-4xl">
          Check your email
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500">
          We've sent a verification link to
        </p>

        {/* Email */}
        {email && (
          <p className="mt-2 break-all text-sm font-medium text-slate-200">
            {email}
          </p>
        )}

        {/* Instructions */}
        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-slate-500">
          Please check your inbox and click the verification link
          to activate your Career OS account.
        </p>

        {/* Resend Section */}
        <div className="mt-8 rounded-xl border border-career-border bg-career-surface p-5">

          <p className="text-sm text-slate-400">
            Didn't receive the email?
          </p>

          <button
            type="button"
            onClick={handleResendVerification}
            disabled={loading}
            className="mt-2 text-sm font-medium text-career-blue transition hover:text-career-purple disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Sending..."
              : "Resend verification email"}
          </button>

          {/* Success message */}
          {message && (
            <p className="mt-3 text-xs text-green-400">
              {message}
            </p>
          )}

          {/* Error message */}
          {error && (
            <p className="mt-3 text-xs text-red-400">
              {error}
            </p>
          )}
        </div>

        {/* Back to login */}
        <p className="mt-8 text-sm text-slate-500">
          Already verified?{" "}
          <Link
            to="/login"
            className="font-medium text-career-blue transition hover:text-career-purple"
          >
            Sign In
          </Link>
        </p>

      </div>
    </AuthLayout>
  );
}

export default VerifyEmailPending;

