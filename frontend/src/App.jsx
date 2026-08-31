import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landingpage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmailPending from "./pages/VerifyEmailPending";
import ResumeOnboarding from "./pages/ResumeOnboarding";
import ProfileReview from "./pages/ProfileReview";
import CareerSetup from "./pages/CareerSetup";
import Roadmap from "./pages/Roadmap";
import Projects from "./pages/Projects";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import WeeklyReview from "./pages/WeeklyReview";
import CareerTimeline from "./pages/CareerTimeline";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import OAuthSuccess from "./pages/auth/OAuthSuccess";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ResumeAnalysis from "./pages/resume/ResumeAnalysis";
import MissionDetails from "./pages/MissionDetails";
import MissionStart from "./pages/MissionStart";
import ProjectDetails from "./pages/ProjectDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-email-pending" element={<VerifyEmailPending />}/>
        <Route path="/onboarding/resume" element={<ResumeOnboarding />}/>
        <Route path="/resume/:resumeId/profile-review" element={<ProfileReview />}/>
        <Route path="/career-setup" element={<CareerSetup />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/projects" element={<Projects />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/weekly-review" element={<WeeklyReview />}/>
        <Route path="/career-timeline" element={<CareerTimeline />}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/settings" element={<Settings />}/>
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />}/>
        <Route path="/resume/:resumeId/analysis" element={<ResumeAnalysis />}/>
        <Route path="/learning-progress/missions/:missionId" element={<MissionDetails />}/>
        <Route path="/learning-progress/missions/:missionId/start"element={<MissionStart />}/>
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;