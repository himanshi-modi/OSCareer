import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function OAuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const needsOnboarding =
      searchParams.get("needsOnboarding") === "true";

    if (!accessToken || !refreshToken) {
      navigate("/login", { replace: true });
      return;
    }

    // Store authentication tokens
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    // Decide where the user should go
    if (needsOnboarding) {
      navigate("/resume-onboarding", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-career-bg flex items-center justify-center">
      <div className="text-center">
        <div className="text-lg font-medium text-white">
          Signing you in...
        </div>

        <p className="mt-2 text-sm text-slate-500">
          Please wait while we set up your Career OS.
        </p>
      </div>
    </div>
  );
}

export default OAuthSuccess;