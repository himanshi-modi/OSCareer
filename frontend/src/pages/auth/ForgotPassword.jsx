
import AuthLayout from "../../components/AuthLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { forgotPassword } from "../../api/authApi";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await forgotPassword({
        email,
      });

      const data = response.data;

      console.log("Forgot password response:", data);

      setSent(true);
    } catch (error) {
  console.error("Forgot password error:", error);

  console.log("STATUS:", error.response?.status);
  console.log("BACKEND RESPONSE:", error.response?.data);
  console.log("REQUEST:", error.config?.data);

  const data = error.response?.data;

  setError(
    data?.message ||
      "Unable to send reset email. Please try again."
  );
}finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div>
        {!sent ? (
          <>
            {/* Heading */}
            <div>
              <p className="text-sm font-medium text-career-blue">
                Password recovery
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Forgot your password?
              </h1>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Enter the email associated with your Career OS account and
                we'll send you a link to reset your password.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-300"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-career-border bg-career-surface px-4 py-3.5 text-sm text-white outline-none transition duration-200 placeholder:text-slate-700 focus:border-career-blue focus:ring-1 focus:ring-career-blue/30"
                />

                {error && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-career-blue px-5 py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-career-purple hover:shadow-lg hover:shadow-career-purple/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </form>

            {/* Back to login */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Remember your password?{" "}
              <Link
                to="/login"
                className="font-medium text-career-blue transition hover:text-career-purple"
              >
                Sign In
              </Link>
            </p>
          </>
        ) : (
          <>
            {/* Success state */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-career-blue/10">
                <span className="text-2xl">✓</span>
              </div>

              <p className="mt-6 text-sm font-medium text-career-blue">
                Check your inbox
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight">
                Reset link sent
              </h1>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                If an account exists with this email, we've sent a password
                reset link to:
              </p>

              <p className="mt-3 text-sm font-medium text-slate-300">
                {email}
              </p>

              <p className="mt-4 text-xs leading-5 text-slate-600">
                The reset link will expire in 15 minutes.
              </p>

              <Link
                to="/login"
                className="mt-8 inline-block text-sm font-medium text-career-blue transition hover:text-career-purple"
              >
                ← Back to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;

