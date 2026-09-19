import AuthLayout from "../components/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, Check, ArrowRight, Loader2 } from "lucide-react";
import { registerSchema } from "../../../shared/validators/authValidator";
import { registerUser } from "../api/authApi";

const GoogleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M21.805 12.23c0-.79-.07-1.55-.205-2.28H12v4.31h5.5a4.7 4.7 0 0 1-2.04 3.08v2.56h3.3c1.93-1.78 3.045-4.4 3.045-7.67Z"
      fill="#4285F4"
    />
    <path
      d="M12 22c2.76 0 5.07-.91 6.76-2.47l-3.3-2.56c-.91.61-2.07.97-3.46.97-2.66 0-4.91-1.8-5.72-4.22H2.87v2.64A10.2 10.2 0 0 0 12 22Z"
      fill="#34A853"
    />
    <path
      d="M6.28 13.72A6.13 6.13 0 0 1 5.96 12c0-.6.11-1.18.32-1.72V7.64H2.87A10 10 0 0 0 1.8 12c0 1.61.39 3.13 1.07 4.36l3.41-2.64Z"
      fill="#FBBC05"
    />
    <path
      d="M12 6.06c1.5 0 2.85.52 3.91 1.54l2.93-2.93C17.06 3.04 14.76 2 12 2a10.2 10.2 0 0 0-9.13 5.64l3.41 2.64C7.09 7.86 9.34 6.06 12 6.06Z"
      fill="#EA4335"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="4"
      fill="#0A66C2"
    />
    <path
      d="M7.2 9.8H9.8V17H7.2V9.8ZM8.5 6.4C7.67 6.4 7 7.07 7 7.9C7 8.73 7.67 9.4 8.5 9.4C9.33 9.4 10 8.73 10 7.9C10 7.07 9.33 6.4 8.5 6.4Z"
      fill="white"
    />
    <path
      d="M11.2 9.8H13.7V10.78H13.74C14.09 10.1 14.94 9.45 16.08 9.45C18.7 9.45 19.2 11.18 19.2 13.43V17H16.6V13.83C16.6 13.08 16.59 12.12 15.57 12.12C14.54 12.12 14.38 12.92 14.38 13.76V17H11.8L11.2 9.8Z"
      fill="white"
    />
  </svg>
);

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [signupError, setSignupError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateField = (field, value) => {
    const result = registerSchema.shape[field].safeParse(value);

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

  const validateConfirmPassword = (value = confirmPassword) => {
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Please confirm your password",
      }));

      return false;
    }

    if (password !== value) {
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

  const handleFieldChange = (field, value, setter) => {
    setter(value);

    if (errors[field]) {
      validateField(field, value);
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);

    if (errors.password) {
      validateField("password", value);
    }

    if (confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          value === confirmPassword ? "" : "Passwords do not match",
      }));
    }
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);

    if (value) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          password === value ? "" : "Passwords do not match",
      }));
    } else if (errors.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Please confirm your password",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSignupError("");

    const nameValid = validateField("name", name);
    const usernameValid = validateField("username", username);
    const emailValid = validateField("email", email);
    const passwordValid = validateField("password", password);
    const confirmPasswordValid = validateConfirmPassword();

    if (
      !nameValid ||
      !usernameValid ||
      !emailValid ||
      !passwordValid ||
      !confirmPasswordValid
    ) {
      return;
    }

    setIsSubmitting(true);

    try {
      await registerUser({
        name,
        username,
        email,
        password,
        confirmPassword,
      });

      navigate("/verify-email-pending", {
        state: { email },
      });
    } catch (error) {
      console.error("Registration error:", error);

      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      if (status === 409) {
        setSignupError(
          message || "An account with this email already exists."
        );
      } else {
        setSignupError(
          message || "Something went wrong. Please try again."
        );
      }

      setIsSubmitting(false);
    }
  };

  const passwordStrength = (() => {
    if (!password) return 0;

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  })();

  const strengthLabel =
    passwordStrength === 0
      ? ""
      : passwordStrength <= 2
        ? "Weak"
        : passwordStrength <= 3
          ? "Fair"
          : passwordStrength === 4
            ? "Good"
            : "Strong";

  const strengthWidth = `${(passwordStrength / 5) * 100}%`;

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength === 3) return "bg-amber-400";
    if (passwordStrength === 4) return "bg-career-blue";
    return "bg-emerald-400";
  };

  const inputBase =
    "w-full rounded-xl border bg-career-surface px-4 py-3.5 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-600";

  const getInputClass = (field) => {
    if (errors[field]) {
      return `${inputBase} border-red-500/60 focus:border-red-400 focus:ring-4 focus:ring-red-500/10`;
    }

    if (
      field === "confirmPassword" &&
      confirmPassword &&
      !errors.confirmPassword
    ) {
      return `${inputBase} border-emerald-500/50 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10`;
    }

    return `${inputBase} border-career-border focus:border-career-blue focus:ring-4 focus:ring-career-blue/10`;
  };

  return (
    <AuthLayout>
      <div className="animate-[fadeIn_0.4s_ease-out]">

        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center rounded-full border border-career-blue/20 bg-career-blue/10 px-3 py-1.5">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-career-blue shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-career-blue">
              Get started
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-[2.15rem] sm:leading-tight">
            Build your career
            <span className="block bg-gradient-to-r from-white via-slate-200 to-career-blue bg-clip-text text-transparent">
              with clarity.
            </span>
          </h1>

          <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
            Create your Career OS account and start building a
            personalized career journey around your goals.
          </p>
        </div>

        {/* OAuth buttons */}
        <div className="grid gap-3 sm:grid-cols-2">

          <button
            type="button"
            onClick={() => {
              window.location.href =
                `${import.meta.env.VITE_API_URL}/api/v1/auth/google`;
            }}
            className="group flex min-h-[50px] items-center justify-center gap-2.5 rounded-xl border border-career-border bg-career-surface px-4 text-sm font-medium text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-600 hover:bg-career-card hover:shadow-lg hover:shadow-black/10 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-career-blue/10"
          >
            <GoogleIcon />
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href =
                `${import.meta.env.VITE_API_URL}/api/v1/auth/linkedin`;
            }}
            className="group flex min-h-[50px] items-center justify-center gap-2.5 rounded-xl border border-career-border bg-career-surface px-4 text-sm font-medium text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-600 hover:bg-career-card hover:shadow-lg hover:shadow-black/10 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-career-blue/10"
          >
            <LinkedInIcon />
            <span>LinkedIn</span>
          </button>

        </div>

        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-career-border" />

          <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
            or continue with email
          </span>

          <div className="h-px flex-1 bg-career-border" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Full name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={name}
              onChange={(e) =>
                handleFieldChange("name", e.target.value, setName)
              }
              onBlur={() => validateField("name", name)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={getInputClass("name")}
            />

            {errors.name && (
              <p
                id="name-error"
                className="mt-2 text-xs font-medium text-red-400"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setSignupError("");
                handleFieldChange(
                  "email",
                  e.target.value,
                  setEmail
                );
              }}
              onBlur={() => validateField("email", email)}
              aria-invalid={!!errors.email || !!signupError}
              aria-describedby={
                errors.email || signupError
                  ? "email-error"
                  : undefined
              }
              className={getInputClass("email")}
            />

            {errors.email && (
              <p
                id="email-error"
                className="mt-2 text-xs font-medium text-red-400"
              >
                {errors.email}
              </p>
            )}

            {signupError && !errors.email && (
              <div
                id="email-error"
                className="mt-2 rounded-lg border border-red-500/15 bg-red-500/5 px-3 py-2.5"
              >
                <p className="text-xs leading-5 text-red-300">
                  {signupError}{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-career-blue transition hover:text-career-purple"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            )}
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Choose a username"
              value={username}
              onChange={(e) =>
                handleFieldChange(
                  "username",
                  e.target.value,
                  setUsername
                )
              }
              onBlur={() =>
                validateField("username", username)
              }
              aria-invalid={!!errors.username}
              aria-describedby={
                errors.username ? "username-error" : undefined
              }
              className={getInputClass("username")}
            />

            {errors.username && (
              <p
                id="username-error"
                className="mt-2 text-xs font-medium text-red-400"
              >
                {errors.username}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-300"
              >
                Password
              </label>

              {passwordStrength > 0 && (
                <span
                  className={`text-[11px] font-semibold ${
                    passwordStrength <= 2
                      ? "text-red-400"
                      : passwordStrength === 3
                        ? "text-amber-400"
                        : passwordStrength === 4
                          ? "text-career-blue"
                          : "text-emerald-400"
                  }`}
                >
                  {strengthLabel}
                </span>
              )}
            </div>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  handlePasswordChange(e.target.value)
                }
                onBlur={() =>
                  validateField("password", password)
                }
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password
                    ? "password-error"
                    : undefined
                }
                className={`${getInputClass(
                  "password"
                )} pr-12`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-career-blue/30"
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

            {/* Password strength */}
            {password && (
              <div className="mt-2.5">
                <div className="h-1 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${getStrengthColor()}`}
                    style={{ width: strengthWidth }}
                  />
                </div>

                <p className="mt-2 text-[11px] text-slate-600">
                  Use 8+ characters with uppercase, lowercase,
                  numbers and symbols.
                </p>
              </div>
            )}

            {errors.password && (
              <p
                id="password-error"
                className="mt-2 text-xs font-medium text-red-400"
              >
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Confirm password
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                autoComplete="new-password"
                placeholder="Confirm your password"
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
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword
                    ? "confirm-password-error"
                    : undefined
                }
                className={`${getInputClass(
                  "confirmPassword"
                )} pr-12`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-career-blue/30"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {confirmPassword &&
              !errors.confirmPassword &&
              password === confirmPassword && (
                <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                  <Check size={14} />
                  Passwords match
                </div>
              )}

            {errors.confirmPassword && (
              <p
                id="confirm-password-error"
                className="mt-2 text-xs font-medium text-red-400"
              >
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group mt-2 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-career-blue px-5 text-sm font-semibold text-white shadow-lg shadow-career-blue/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-career-purple hover:shadow-xl hover:shadow-career-purple/20 active:translate-y-0 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />
                Creating your account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </>
            )}
          </button>
        </form>

        {/* Login */}
        <p className="mt-7 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-career-blue transition hover:text-career-purple"
          >
            Sign in
          </Link>
        </p>

        {/* Privacy */}
        <p className="mx-auto mt-5 max-w-sm text-center text-[11px] leading-5 text-slate-700">
          By creating an account, you agree to use Career OS
          responsibly and understand that your career data is
          securely stored.
        </p>
      </div>
    </AuthLayout>
  );
}

export default Signup;