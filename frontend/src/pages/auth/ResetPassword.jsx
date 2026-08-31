
import AuthLayout from "../../components/AuthLayout";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { resetPasswordSchema } from "../../../../shared/validators/authValidator";
import { resetPassword } from "../../api/authApi";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get token from:
  // /reset-password?token=abc123
  const resetToken = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /*
   * Validate one field using the Zod schema.
   */
  const validateField = (field, value) => {
    const result = resetPasswordSchema.shape[field].safeParse(value);

    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        [field]: result.error.issues[0].message,
      }));

      return false;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    return true;
  };

  /*
   * Validate confirm password.
   */
  const validateConfirmPassword = (value) => {
    if (value !== newPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));

      return false;
    }

    setErrors((prev) => ({
      ...prev,
      confirmPassword: "",
    }));

    return true;
  };

  /*
   * New password change.
   */
  const handlePasswordChange = (value) => {
    setNewPassword(value);

    if (errors.newPassword) {
      validateField("newPassword", value);
    }

    if (errors.confirmPassword) {
      if (value !== confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "",
        }));
      }
    }
  };

  /*
   * Confirm password change.
   */
  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);

    if (errors.confirmPassword) {
      validateConfirmPassword(value);
    }
  };

  /*
   * Submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    // Token validation
    if (!resetToken) {
      setErrors({
        form: "This password reset link is invalid or incomplete.",
      });

      return;
    }

    // Validate password
    const passwordValid = validateField(
      "newPassword",
      newPassword
    );

    // Validate confirm password
    const confirmPasswordValid =
      validateConfirmPassword(confirmPassword);

    // Stop if frontend validation fails
    if (!passwordValid || !confirmPasswordValid) {
      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword({
        resetToken,
        newPassword,
        confirmPassword,
      });

      const data = response.data;

      console.log("Status:", response.status);
      console.log("Backend response:", data);

      // Successful password reset
      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      console.error("Reset password error:", error);

      setErrors({
        form:
          error.response?.data?.message ||
          "Unable to reset your password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div>
        {!success ? (
          <>
            {/* Heading */}
            <div>
              <p className="text-sm font-medium text-career-blue">
                Password recovery
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Create a new password.
              </h1>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Choose a strong password for your Career OS
                account.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              {/* New Password */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="text-sm font-medium text-slate-300"
                >
                  New password
                </label>

                <div className="relative">
                  <input
                    id="newPassword"
                    type={
                      showPassword ? "text" : "password"
                    }
                    placeholder="Create a new password"
                    value={newPassword}
                    onChange={(e) =>
                      handlePasswordChange(e.target.value)
                    }
                    onBlur={() =>
                      validateField(
                        "newPassword",
                        newPassword
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-career-border bg-career-surface px-4 py-3.5 pr-12 text-sm text-white outline-none transition duration-200 placeholder:text-slate-700 focus:border-career-blue focus:ring-1 focus:ring-career-blue/30"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.newPassword && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-slate-300"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) =>
                      handleConfirmPasswordChange(
                        e.target.value
                      )
                    }
                    onBlur={() =>
                      validateConfirmPassword(
                        confirmPassword
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-career-border bg-career-surface px-4 py-3.5 pr-12 text-sm text-white outline-none transition duration-200 placeholder:text-slate-700 focus:border-career-blue focus:ring-1 focus:ring-career-blue/30"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Form Error */}
              {errors.form && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
                  <p className="text-sm text-red-400">
                    {errors.form}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-career-blue px-5 py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-career-purple hover:shadow-lg hover:shadow-career-purple/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Updating password..."
                  : "Reset Password"}
              </button>
            </form>

            {/* Back */}
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
          /* Success */
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-career-blue/10">
              <span className="text-2xl text-career-blue">
                ✓
              </span>
            </div>

            <p className="mt-6 text-sm font-medium text-career-blue">
              Password updated
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight">
              You're all set.
            </h1>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Your password has been successfully changed.
              You can now sign in with your new password.
            </p>

            <p className="mt-6 text-xs text-slate-600">
              Redirecting you to Sign In...
            </p>

            <Link
              to="/login"
              className="mt-6 inline-block text-sm font-medium text-career-blue transition hover:text-career-purple"
            >
              Go to Sign In
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}

export default ResetPassword;

