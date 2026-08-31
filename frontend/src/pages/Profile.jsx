import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getProfileOverview } from "../api/profileApi";

import {
  getAchievements,
  getAchievementStats,
} from "../api/achievementApi";

import {
  getCertificates,
  updateCertificate,
  deleteCertificate,
} from "../api/certificateApi";

import {
  ArrowLeft,
  Award,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
  FileText,
  Globe,
  GraduationCap,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  Pencil,
  Phone,
  Rocket,
  Settings2,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Upload,
  User,
  GitBranch,
  Map,
  Medal,
  Sparkles,
  Flame,
  Lock,
  X,
  Save,
  Trash2,
  Code2,
  ShieldCheck,
  Database,
  Server,
  ClipboardCheck,
  BookOpen,
  Crown,
} from "lucide-react";

import DashboardSidebar from "../components/DashboardSidebar";

const achievementIcons = {
  Target,
  Map,
  Rocket,
  Trophy,
  Award,
  Medal,
  Star,
  Flame,
  Sparkles,
  Crown,
  GraduationCap,
  FileText,
  BriefcaseBusiness,
  CheckCircle2,
  TrendingUp,
  Code2,
  ShieldCheck,
  Database,
  Server,
  ClipboardCheck,
  BookOpen,
};

function getAchievementIcon(iconName) {
  return achievementIcons[iconName] || Trophy;
}

function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [profile, setProfile] = useState(null);

  const [achievements, setAchievements] = useState([]);
  const [achievementStats, setAchievementStats] = useState(null);

  const [certificates, setCertificates] = useState([]);

  const [loading, setLoading] = useState(true);
  const [certificateLoading, setCertificateLoading] = useState(false);

  const [editingCertificate, setEditingCertificate] = useState(null);

  const [certificateForm, setCertificateForm] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    credentialUrl: "",
  });

  // Fetch profile information
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const response = await getProfileOverview();

        console.log("PROFILE API RESPONSE:", response);

        const profileData =
          response?.data?.data || response?.data;

        setProfile(profileData);

        console.log("SKILLS DATA:", profileData?.skills);
        console.log("PROJECTS DATA:", profileData?.projects);
      } catch (error) {
        console.error("PROFILE API ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Fetch achievements and achievement statistics
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const [achievementResponse, statsResponse] =
          await Promise.all([
            getAchievements({
              page: 1,
              limit: 100,
              sortBy: "unlockedAt",
              order: "desc",
            }),
            getAchievementStats(),
          ]);

        console.log(
          "ACHIEVEMENTS API RESPONSE:",
          achievementResponse
        );

        console.log(
          "ACHIEVEMENT STATS RESPONSE:",
          statsResponse
        );

        const achievementData =
          achievementResponse?.data?.data ||
          achievementResponse?.data ||
          [];

        const statsData =
          statsResponse?.data?.data ||
          statsResponse?.data ||
          null;

        setAchievements(
          Array.isArray(achievementData)
            ? achievementData
            : []
        );

        setAchievementStats(statsData);
      } catch (error) {
        console.error(
          "ACHIEVEMENTS API ERROR:",
          error
        );

        setAchievements([]);
      }
    };

    fetchAchievements();
  }, []);

  // Fetch certificates
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setCertificateLoading(true);

        const response = await getCertificates({
          page: 1,
          limit: 100,
        });

        console.log(
          "CERTIFICATES API RESPONSE:",
          response
        );

        const certificateData =
          response?.data?.data ||
          response?.data ||
          [];

        setCertificates(
          Array.isArray(certificateData)
            ? certificateData
            : []
        );
      } catch (error) {
        console.error(
          "CERTIFICATES API ERROR:",
          error
        );

        setCertificates([]);
      } finally {
        setCertificateLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  // Delete a certificate
  const handleDeleteCertificate = async (
    certificateId
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this certificate?"
    );

    if (!confirmed) return;

    try {
      await deleteCertificate(certificateId);

      setCertificates((previous) =>
        previous.filter(
          (certificate) =>
            certificate._id !== certificateId
        )
      );

      console.log(
        "Certificate deleted successfully."
      );
    } catch (error) {
      console.error(
        "DELETE CERTIFICATE ERROR:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to delete certificate."
      );
    }
  };

  // Populate the certificate edit form
  const handleEditCertificate = (certificate) => {
    setEditingCertificate(certificate);

    setCertificateForm({
      title: certificate?.title || "",
      issuer: certificate?.issuer || "",
      issueDate: certificate?.issueDate
        ? String(certificate.issueDate).slice(0, 10)
        : "",
      credentialUrl:
        certificate?.credentialUrl ||
        certificate?.certificateUrl ||
        "",
    });
  };

  // Update the selected certificate
  const handleUpdateCertificate = async (event) => {
    event.preventDefault();

    if (!editingCertificate?._id) return;

    try {
      const response = await updateCertificate(
        editingCertificate._id,
        certificateForm
      );

      console.log(
        "UPDATE CERTIFICATE RESPONSE:",
        response
      );

      const updatedCertificate =
        response?.data?.data ||
        response?.data;

      setCertificates((previous) =>
        previous.map((certificate) =>
          certificate._id === editingCertificate._id
            ? {
                ...certificate,
                ...updatedCertificate,
              }
            : certificate
        )
      );

      setEditingCertificate(null);

      setCertificateForm({
        title: "",
        issuer: "",
        issueDate: "",
        credentialUrl: "",
      });
    } catch (error) {
      console.error(
        "UPDATE CERTIFICATE ERROR:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to update certificate."
      );
    }
  };

  // Group available skills by category
  const validSkills = Array.isArray(
    profile?.skills?.skills
  )
    ? profile.skills.skills.filter(
        (item) => item?.skill?.name
      )
    : [];

  const groupedSkills = validSkills.reduce(
    (groups, item) => {
      const category =
        item?.skill?.category || "other";

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(item.skill.name);

      return groups;
    },
    {}
  );

  const categoryLabels = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    security: "Security",
    devops: "DevOps",
    testing: "Testing",
    other: "Other",
  };

  return (
    <div className="min-h-screen bg-career-bg text-white">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-64">
        {/* Page header */}
        <header className="sticky top-0 z-30 border-b border-career-border bg-career-bg/90 backdrop-blur">
          <div className="flex min-h-20 items-center justify-between px-5 sm:px-8">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  setSidebarOpen(true)
                }
                className="rounded-xl border border-career-border bg-career-surface p-2.5 text-slate-400 transition hover:text-white lg:hidden"
              >
                <Menu size={19} />
              </button>

              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
              >
                <ArrowLeft size={17} />
                Dashboard
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <User
                size={19}
                className="text-career-blue"
              />

              <span className="text-base font-bold sm:text-lg">
                My Profile
              </span>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-10">
          {/* Profile overview */}
          <section className="rounded-3xl border border-career-border bg-career-surface p-6 sm:p-8">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-career-blue/40 bg-career-card">
                  <User
                    size={38}
                    className="text-slate-500"
                  />
                </div>

                <div className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border-4 border-career-surface bg-career-blue">
                  <CheckCircle2
                    size={14}
                    className="text-white"
                  />
                </div>
              </div>

              <h1 className="mt-5 text-2xl font-bold">
                {profile?.user?.name ||
                  "Your Name"}
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                {profile?.careerProfile
                  ?.targetCareer ||
                  "Career not set"}
              </p>

              <div className="mt-5 flex items-center gap-2 rounded-full border border-career-blue/20 bg-career-blue/10 px-4 py-2">
                <TrendingUp
                  size={15}
                  className="text-career-blue"
                />

                <span className="text-sm text-slate-300">
                  Career Readiness:
                </span>

                <span className="font-bold text-career-blue">
                  72%
                </span>
              </div>
            </div>
          </section>

          {/* Personal information */}
          <ProfileSection
            icon={<User size={19} />}
            title="Personal Information"
            action="Edit Information"
            actionIcon={<Pencil size={15} />}
          >
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <InfoItem
                icon={<User size={16} />}
                label="Name"
                value={
                  profile?.user?.name ||
                  "Your Name"
                }
              />

              <InfoItem
                icon={<Mail size={16} />}
                label="Email"
                value={
                  profile?.user?.email ||
                  "Not provided"
                }
              />

              <InfoItem
                icon={<Phone size={16} />}
                label="Phone"
                value={
                  profile?.user?.phone ||
                  "Not provided"
                }
              />

              <InfoItem
                icon={<MapPin size={16} />}
                label="Location"
                value={
                  profile?.user?.location ||
                  "Not provided"
                }
              />

              <InfoItem
                icon={
                  <span className="text-xs font-bold">
                    in
                  </span>
                }
                label="LinkedIn Profile"
                value={
                  profile?.user?.linkedin ||
                  "Not provided"
                }
                link
              />

              <InfoItem
                icon={
                  <span className="text-xs font-bold">
                    GH
                  </span>
                }
                label="GitHub Profile"
                value={
                  profile?.user?.github ||
                  "Not provided"
                }
                link
              />

              <InfoItem
                icon={<Globe size={16} />}
                label="Portfolio Website"
                value={
                  profile?.user?.portfolio ||
                  "Not provided"
                }
                link
              />
            </div>
          </ProfileSection>

          {/* Career information */}
          <ProfileSection
            icon={<Target size={19} />}
            title="Career Information"
            action="Update Career Goal"
            actionIcon={
              <Settings2 size={15} />
            }
          >
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <InfoItem
                label="Target Career"
                value={
                  profile?.careerProfile
                    ?.targetCareer ||
                  "Not provided"
                }
              />

              <InfoItem
                label="Current Goal"
                value={
                  profile?.careerProfile
                    ?.currentGoal ||
                  "Not provided"
                }
              />

              <InfoItem
                label="Target Timeline"
                value={
                  profile?.careerProfile
                    ?.targetTimeline ||
                  "Not provided"
                }
              />

              <InfoItem
                label="Daily Commitment"
                value={
                  profile?.careerProfile
                    ?.dailyCommitment
                    ? `${profile.careerProfile.dailyCommitment} Hours / Day`
                    : "Not provided"
                }
              />
            </div>
          </ProfileSection>

          {/* Skills */}
          <ProfileSection
            icon={<Star size={19} />}
            title="Skills"
            action="Manage Skills"
            actionIcon={
              <Settings2 size={15} />
            }
          >
            {validSkills.length === 0 ? (
              <div className="rounded-2xl border border-career-border bg-career-card p-6 text-center">
                <Star
                  size={28}
                  className="mx-auto text-slate-600"
                />

                <p className="mt-3 text-sm font-medium text-slate-300">
                  No skills found
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Upload or update your resume
                  to add skills.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {Object.entries(
                  groupedSkills
                ).map(
                  ([category, skills]) => (
                    <SkillGroup
                      key={category}
                      title={
                        categoryLabels[
                          category
                        ] || category
                      }
                      skills={[
                        ...new Set(skills),
                      ]}
                    />
                  )
                )}
              </div>
            )}
          </ProfileSection>

          {/* Projects */}
          <ProfileSection
            icon={
              <BriefcaseBusiness size={19} />
            }
            title="Projects"
            action="View All Projects"
            actionIcon={
              <ArrowLeft
                size={15}
                className="rotate-180"
              />
            }
          >
            {Array.isArray(
              profile?.projects
            ) &&
            profile.projects.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {profile.projects.map(
                  (project) => (
                    <ProjectCard
                      key={project._id}
                      project={project}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-career-border bg-career-card p-8 text-center">
                <BriefcaseBusiness
                  size={32}
                  className="mx-auto text-slate-600"
                />

                <p className="mt-3 text-sm font-semibold text-slate-300">
                  No projects found
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Projects from your resume
                  will appear here.
                </p>
              </div>
            )}
          </ProfileSection>

          {/* Certificates */}
          <ProfileSection
            icon={
              <GraduationCap size={19} />
            }
            title="Certificates"
            action="Manage Certificates"
            actionIcon={
              <Settings2 size={15} />
            }
          >
            {certificateLoading ? (
              <div className="rounded-2xl border border-career-border bg-career-card p-8 text-center">
                <p className="text-sm text-slate-400">
                  Loading certificates...
                </p>
              </div>
            ) : certificates.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {certificates.map(
                  (certificate) => (
                    <CertificateCard
                      key={certificate._id}
                      certificate={
                        certificate
                      }
                      onEdit={
                        handleEditCertificate
                      }
                      onDelete={
                        handleDeleteCertificate
                      }
                    />
                  )
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-career-border bg-career-card p-6 text-center">
                <GraduationCap
                  size={28}
                  className="mx-auto text-slate-600"
                />

                <p className="mt-3 text-sm font-medium text-slate-300">
                  No certificates found
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Add your certificates to
                  strengthen your profile.
                </p>
              </div>
            )}
          </ProfileSection>

          {/* Achievements */}
          <ProfileSection
            icon={<Trophy size={19} />}
            title="Achievements"
          >
            {achievementStats && (
              <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <AchievementStat
                  icon={<Trophy size={17} />}
                  label="Achievements"
                  value={
                    achievementStats.totalAchievements ??
                    achievements.length
                  }
                />

                <AchievementStat
                  icon={<Sparkles size={17} />}
                  label="Total XP"
                  value={
                    achievementStats.totalXp ??
                    0
                  }
                />

                <AchievementStat
                  icon={<Medal size={17} />}
                  label="Rare"
                  value={
                    achievementStats
                      ?.rarity?.rare ?? 0
                  }
                />

                <AchievementStat
                  icon={<Crown size={17} />}
                  label="Legendary"
                  value={
                    achievementStats
                      ?.rarity?.legendary ?? 0
                  }
                />
              </div>
            )}

            {achievements.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {achievements.map(
                  (achievement) => (
                    <AchievementCard
                      key={
                        achievement._id
                      }
                      achievement={
                        achievement
                      }
                    />
                  )
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-career-border bg-career-card p-8 text-center">
                <Trophy
                  size={32}
                  className="mx-auto text-slate-600"
                />

                <p className="mt-3 text-sm font-semibold text-slate-300">
                  No achievements unlocked
                  yet
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Complete missions, projects,
                  certificates and roadmap
                  stages to unlock achievements.
                </p>
              </div>
            )}
          </ProfileSection>

          {/* Profile summary */}
          <ProfileSection
            icon={<BarChart3 size={19} />}
            title="Profile Summary"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <SummaryCard
                label="Resume Score"
                value="88 / 100"
              />

              <SummaryCard
                label="Projects Completed"
                value={
                  profile?.projects
                    ?.length ?? 0
                }
              />

              <SummaryCard
                label="Skills"
                value={
                  profile?.skills
                    ?.totalSkills ?? 0
                }
              />

              <SummaryCard
                label="Achievements"
                value={
                  achievementStats
                    ?.totalAchievements ??
                  achievements.length
                }
              />

              <SummaryCard
                label="Career Readiness"
                value="72%"
                highlight
              />
            </div>
          </ProfileSection>

          {/* AI profile insights */}
          <ProfileSection
            icon={<Lightbulb size={19} />}
            title="AI Profile Insights"
          >
            <div className="grid gap-4 md:grid-cols-3">
              <InsightCard
                label="Strengths"
                value="Backend Development"
              />

              <InsightCard
                label="Needs Improvement"
                value="System Design"
              />

              <InsightCard
                label="Recommended Focus"
                value="Interview Preparation"
              />
            </div>

            <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-career-border bg-career-card p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-slate-500">
                  Estimated Next Milestone
                </p>

                <p className="mt-1 text-sm font-semibold">
                  2 Weeks Away
                </p>
              </div>

              <TrendingUp
                size={20}
                className="text-career-blue"
              />
            </div>
          </ProfileSection>

          {/* Resume */}
          <ProfileSection
            icon={<FileText size={19} />}
            title="Resume"
          >
            <div className="flex flex-col gap-6 rounded-2xl border border-career-border bg-career-card p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-career-blue/10">
                  <FileText
                    size={20}
                    className="text-career-blue"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Current Resume
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    {profile?.latestResume
                      ?.fileName ||
                      "resume.pdf"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {profile?.latestResume
                      ?.lastAnalyzedAt
                      ? `Last Analyzed · ${formatDate(
                          profile.latestResume
                            .lastAnalyzedAt
                        )}`
                      : "Not analyzed yet"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {profile?.latestResume
                  ?.fileUrl && (
                  <a
                    href={
                      profile.latestResume
                        .fileUrl
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-career-border px-4 py-2.5 text-center text-sm font-medium text-slate-300 transition hover:border-career-blue hover:text-white"
                  >
                    View Resume
                  </a>
                )}

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl bg-career-blue px-4 py-2.5 text-sm font-semibold transition hover:bg-career-purple"
                >
                  <Upload size={15} />
                  Upload New Resume
                </button>
              </div>
            </div>
          </ProfileSection>

          <div className="h-10" />
        </main>
      </div>

      {/* Certificate edit modal */}
      {editingCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-career-border bg-career-surface p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  Edit Certificate
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Update your certificate
                  information.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditingCertificate(null)
                }
                className="rounded-xl border border-career-border bg-career-card p-2 text-slate-400 transition hover:text-white"
              >
                <X size={17} />
              </button>
            </div>

            <form
              onSubmit={
                handleUpdateCertificate
              }
              className="space-y-4"
            >
              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Certificate Title
                </label>

                <input
                  type="text"
                  value={
                    certificateForm.title
                  }
                  onChange={(event) =>
                    setCertificateForm(
                      (previous) => ({
                        ...previous,
                        title:
                          event.target.value,
                      })
                    )
                  }
                  className="w-full rounded-xl border border-career-border bg-career-card px-4 py-3 text-sm text-white outline-none transition focus:border-career-blue"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Issuer
                </label>

                <input
                  type="text"
                  value={
                    certificateForm.issuer
                  }
                  onChange={(event) =>
                    setCertificateForm(
                      (previous) => ({
                        ...previous,
                        issuer:
                          event.target.value,
                      })
                    )
                  }
                  className="w-full rounded-xl border border-career-border bg-career-card px-4 py-3 text-sm text-white outline-none transition focus:border-career-blue"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Issue Date
                </label>

                <input
                  type="date"
                  value={
                    certificateForm.issueDate
                  }
                  onChange={(event) =>
                    setCertificateForm(
                      (previous) => ({
                        ...previous,
                        issueDate:
                          event.target.value,
                      })
                    )
                  }
                  className="w-full rounded-xl border border-career-border bg-career-card px-4 py-3 text-sm text-white outline-none transition focus:border-career-blue"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Credential URL
                </label>

                <input
                  type="url"
                  value={
                    certificateForm.credentialUrl
                  }
                  onChange={(event) =>
                    setCertificateForm(
                      (previous) => ({
                        ...previous,
                        credentialUrl:
                          event.target.value,
                      })
                    )
                  }
                  className="w-full rounded-xl border border-career-border bg-career-card px-4 py-3 text-sm text-white outline-none transition focus:border-career-blue"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() =>
                    setEditingCertificate(null)
                  }
                  className="rounded-xl border border-career-border px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-career-blue px-5 py-2.5 text-sm font-semibold transition hover:bg-career-purple"
                >
                  <Save size={15} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileSection({
  icon,
  title,
  action,
  actionIcon,
  children,
}) {
  return (
    <section className="mt-8 rounded-3xl border border-career-border bg-career-surface p-6 sm:p-7">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-career-blue/10 text-career-blue">
            {icon}
          </div>

          <h2 className="text-lg font-bold">
            {title}
          </h2>
        </div>

        {action && (
          <button
            type="button"
            className="flex w-fit items-center gap-2 rounded-xl border border-career-border bg-career-card px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-career-blue hover:text-white"
          >
            {actionIcon}
            {action}
          </button>
        )}
      </div>

      {children}
    </section>
  );
}

function InfoItem({
  icon,
  label,
  value,
  link = false,
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-slate-500">
        {icon}

        <p className="text-xs">
          {label}
        </p>
      </div>

      <p
        className={`mt-2 break-words text-sm font-medium ${
          link
            ? "text-career-blue"
            : "text-slate-200"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function SkillGroup({ title, skills }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        {title}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg border border-career-border bg-career-card px-3 py-1.5 text-xs font-medium text-slate-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const technologies = Array.isArray(
    project?.technologies
  )
    ? project.technologies
    : [];

  return (
    <div className="group flex h-full flex-col rounded-2xl border border-career-border bg-career-card p-5 transition duration-200 hover:-translate-y-1 hover:border-career-blue/40">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-career-blue/10">
          <BriefcaseBusiness
            size={18}
            className="text-career-blue"
          />
        </div>

        <span className="rounded-full border border-career-blue/20 bg-career-blue/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-career-blue">
          Resume Project
        </span>
      </div>

      <h3 className="mt-4 text-sm font-bold leading-6 text-white">
        {project?.name ||
          "Untitled Project"}
      </h3>

      <p className="mt-2 line-clamp-5 text-xs leading-5 text-slate-400">
        {project?.description ||
          "No project description available."}
      </p>

      {technologies.length > 0 && (
        <div className="mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            Technologies
          </p>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {technologies.map(
              (technology) => (
                <span
                  key={technology}
                  className="rounded-md border border-career-border bg-career-surface px-2 py-1 text-[10px] font-medium text-slate-300"
                >
                  {technology}
                </span>
              )
            )}
          </div>
        </div>
      )}

      {(project?.githubUrl ||
        project?.liveUrl) && (
        <div className="mt-auto flex gap-2 pt-5">
          {project?.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-career-border px-3 py-2 text-[11px] font-semibold text-slate-300 transition hover:border-career-blue hover:text-white"
            >
              <GitBranch size={13} />
              GitHub
            </a>
          )}

          {project?.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-career-border px-3 py-2 text-[11px] font-semibold text-slate-300 transition hover:border-career-blue hover:text-white"
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
        </div>
      )}

      {!project?.githubUrl &&
        !project?.liveUrl && (
          <div className="mt-auto pt-5">
            <span className="text-[10px] text-slate-600">
              Links not provided
            </span>
          </div>
        )}
    </div>
  );
}

function CertificateCard({
  certificate,
  onEdit,
  onDelete,
}) {
  return (
    <div className="group relative flex flex-col rounded-2xl border border-career-border bg-career-card p-5 transition hover:border-career-blue/40">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-career-blue/10">
          <GraduationCap
            size={18}
            className="text-career-blue"
          />
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            onClick={() =>
              onEdit(certificate)
            }
            className="rounded-lg p-2 text-slate-500 transition hover:bg-career-surface hover:text-career-blue"
            title="Edit certificate"
          >
            <Pencil size={14} />
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(certificate._id)
            }
            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
            title="Delete certificate"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <h3 className="mt-4 text-sm font-bold leading-6 text-white">
        {certificate?.title ||
          "Untitled Certificate"}
      </h3>

      {certificate?.issuer && (
        <p className="mt-1 text-xs text-slate-400">
          {certificate.issuer}
        </p>
      )}

      {certificate?.issueDate && (
        <p className="mt-2 text-[11px] text-slate-500">
          Issued ·{" "}
          {formatDate(
            certificate.issueDate
          )}
        </p>
      )}

      {(certificate?.credentialUrl ||
        certificate?.certificateUrl) && (
        <a
          href={
            certificate.credentialUrl ||
            certificate.certificateUrl
          }
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex w-fit items-center gap-1.5 text-xs font-semibold text-career-blue transition hover:text-white"
        >
          View Credential
          <ExternalLink size={13} />
        </a>
      )}
    </div>
  );
}

function AchievementCard({
  achievement,
}) {
  const Icon = getAchievementIcon(
    achievement?.badgeIcon
  );

  const rarity = (
    achievement?.rarity || "common"
  ).toLowerCase();

  const rarityClasses = {
    common:
      "border-slate-600/40 bg-slate-500/10 text-slate-300",

    rare:
      "border-blue-500/30 bg-blue-500/10 text-blue-300",

    epic:
      "border-purple-500/30 bg-purple-500/10 text-purple-300",

    legendary:
      "border-amber-500/30 bg-amber-500/10 text-amber-300",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-career-border bg-career-card p-5 transition duration-200 hover:-translate-y-1 hover:border-career-blue/40">
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `${achievement?.badgeColor || "#3B82F6"}18`,
            color:
              achievement?.badgeColor ||
              "#3B82F6",
          }}
        >
          <Icon size={20} />
        </div>

        <span
          className={`rounded-full border px-2 py-1 text-[9px] font-bold uppercase tracking-wide ${
            rarityClasses[rarity] ||
            rarityClasses.common
          }`}
        >
          {rarity}
        </span>
      </div>

      <h3 className="mt-4 text-sm font-bold leading-6 text-white">
        {achievement?.title ||
          "Achievement"}
      </h3>

      <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-400">
        {achievement?.description ||
          "Achievement unlocked."}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-career-border pt-3">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
          <CheckCircle2 size={12} />

          {achievement?.unlockedAt
            ? formatDate(
                achievement.unlockedAt
              )
            : "Unlocked"}
        </div>

        <span className="text-xs font-bold text-career-blue">
          +{achievement?.xpReward || 0} XP
        </span>
      </div>
    </div>
  );
}

function AchievementStat({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-career-border bg-career-card p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-career-blue/10 text-career-blue">
        {icon}
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.1em] text-slate-500">
          {label}
        </p>

        <p className="mt-1 text-lg font-bold text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  highlight = false,
}) {
  return (
    <div className="rounded-2xl border border-career-border bg-career-card p-5">
      <p className="text-xs leading-5 text-slate-500">
        {label}
      </p>

      <p
        className={`mt-3 text-xl font-bold ${
          highlight
            ? "text-career-blue"
            : "text-slate-100"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function InsightCard({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-career-border bg-career-card p-5">
      <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
        {label}
      </p>

      <p className="mt-3 text-sm font-semibold leading-6 text-slate-200">
        {value}
      </p>
    </div>
  );
}

function formatDate(date) {
  if (!date) return "Unknown";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

export default Profile;