
import AuthLayout from "../components/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { registerSchema } from "../../../shared/validators/authValidator";
import { registerUser } from "../api/authApi";

const GoogleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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
    width="20"
    height="20"
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
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameValid = validateField("name", name);
    const usernameValid = validateField("username", username);
    const emailValid = validateField("email", email);
    const passwordValid = validateField("password", password);

    let confirmPasswordValid = true;

    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));

      confirmPasswordValid = false;
    } else {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "",
      }));
    }

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
      const response = await registerUser({
        name,
        username,
        email,
        password,
        confirmPassword,
      });

      console.log("Backend response:", response);

      navigate("/verify-email-pending", {
        state: {
          email,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);

      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (field, value, setter) => {
    setter(value);

    if (errors[field]) {
      validateField(field, value);
    }
  };

  return (
    <AuthLayout>
      <div>
        {/* Heading */}
        <div>
          <p className="text-sm font-medium text-career-blue">
            Get started
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Build your career with clarity.
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            Create your Career OS account and start building your
            personalized career journey.
          </p>
        </div>

        {/* Social Login */}
        <div className="mt-8 space-y-3">
          {/* Google */}
          <button
            type="button"
            onClick={() => {
              window.location.href =
                "http://localhost:8080/api/v1/auth/google";
            }}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-career-border bg-career-surface px-5 py-3.5 text-sm font-medium text-slate-200 transition duration-200 hover:border-slate-600 hover:bg-career-card"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* LinkedIn */}
          <button
            type="button"
            onClick={() => {
              window.location.href =
                "http://localhost:8080/api/v1/auth/linkedin";
            }}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-career-border bg-career-surface px-5 py-3.5 text-sm font-medium text-slate-200 transition duration-200 hover:border-slate-600 hover:bg-career-card"
          >
            <LinkedInIcon />
            Continue with LinkedIn
          </button>
        </div>

        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-career-border" />

          <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.15em] text-slate-600">
            or continue with email
          </span>

          <div className="h-px flex-1 bg-career-border" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-slate-300"
            >
              Full name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) =>
                handleFieldChange(
                  "name",
                  e.target.value,
                  setName
                )
              }
              onBlur={() => validateField("name", name)}
              className="mt-2 w-full rounded-xl border border-career-border bg-career-surface px-4 py-3.5 text-sm text-white outline-none transition duration-200 placeholder:text-slate-700 focus:border-career-blue focus:ring-1 focus:ring-career-blue/30"
            />

            {errors.name && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
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
              onChange={(e) =>
                handleFieldChange(
                  "email",
                  e.target.value,
                  setEmail
                )
              }
              onBlur={() => validateField("email", email)}
              className="mt-2 w-full rounded-xl border border-career-border bg-career-surface px-4 py-3.5 text-sm text-white outline-none transition duration-200 placeholder:text-slate-700 focus:border-career-blue focus:ring-1 focus:ring-career-blue/30"
            />

            {errors.email && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-slate-300"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
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
              className="mt-2 w-full rounded-xl border border-career-border bg-career-surface px-4 py-3.5 text-sm text-white outline-none transition duration-200 placeholder:text-slate-700 focus:border-career-blue focus:ring-1 focus:ring-career-blue/30"
            />

            {errors.username && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.username}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-300"
            >
              Password
            </label>

            <div className="relative mt-2">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => {
                  const value = e.target.value;

                  setPassword(value);

                  if (errors.password) {
                    validateField("password", value);
                  }

                  if (errors.confirmPassword) {
                    if (value !== confirmPassword) {
                      setErrors((prev) => ({
                        ...prev,
                        confirmPassword:
                          "Passwords do not match",
                      }));
                    } else {
                      setErrors((prev) => ({
                        ...prev,
                        confirmPassword: "",
                      }));
                    }
                  }
                }}
                onBlur={() =>
                  validateField("password", password)
                }
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onSelect={(e) => e.preventDefault()}
                className="w-full rounded-xl border border-career-border bg-career-surface px-4 py-3.5 pr-12 text-sm text-white outline-none transition duration-200 placeholder:text-slate-700 focus:border-career-blue focus:ring-1 focus:ring-career-blue/30"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
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

            {errors.password && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.password}
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

            <div className="relative mt-2">
              <input
                id="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => {
                  const value = e.target.value;

                  setConfirmPassword(value);

                  if (errors.confirmPassword) {
                    if (password !== value) {
                      setErrors((prev) => ({
                        ...prev,
                        confirmPassword:
                          "Passwords do not match",
                      }));
                    } else {
                      setErrors((prev) => ({
                        ...prev,
                        confirmPassword: "",
                      }));
                    }
                  }
                }}
                onBlur={() => {
                  if (password !== confirmPassword) {
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword:
                        "Passwords do not match",
                    }));
                  } else {
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: "",
                    }));
                  }
                }}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onSelect={(e) => e.preventDefault()}
                className="w-full rounded-xl border border-career-border bg-career-surface px-4 py-3.5 pr-12 text-sm text-white outline-none transition duration-200 placeholder:text-slate-700 focus:border-career-blue focus:ring-1 focus:ring-career-blue/30"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
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

            {errors.confirmPassword && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Create Account */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-career-blue px-5 py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-career-purple hover:shadow-lg hover:shadow-career-purple/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Creating account..."
              : "Create Account"}
          </button>
        </form>

        {/* Login */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{" "}

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

export default Signup;

