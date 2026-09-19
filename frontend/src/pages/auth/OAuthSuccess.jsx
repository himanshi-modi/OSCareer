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

    console.log("OAUTH SUCCESS PARAMS:", {
      accessTokenExists: !!accessToken,
      refreshTokenExists: !!refreshToken,
      rawNeedsOnboarding: searchParams.get("needsOnboarding"),
      needsOnboarding,
    });

    if (!accessToken || !refreshToken) {
      navigate("/login", { replace: true });
      return;
    }

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    if (needsOnboarding) {
      console.log("REDIRECTING TO ONBOARDING");

      navigate("/onboarding/resume", { replace: true });
    } else {
      console.log(" REDIRECTING TO DASHBOARD");

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