
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getCurrentUser,
  updateProfile,
  deleteAccount,
  logoutUser,
  logoutAll,
  changePassword,
} from "../api/authApi";

import {
  getCareerProfile,
  updateCareerProfile,
} from "../api/careerProfileApi";

import {
  getNotifications,
  getUnreadNotificationCount,
  getNotificationDetails,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  clearAllNotifications,
} from "../api/notificationApi";

import {
  ArrowLeft,
  Bell,
  Bot,
  Check,
  CircleHelp,
  Download,
  FileText,
  Menu,
  Palette,
  Settings as SettingsIcon,
  Shield,
  Trash2,
  User,
  BriefcaseBusiness,
  Database,
  Save,
  Loader2,
  AlertCircle,
  Lock,
  ChevronDown,
  ChevronUp,
  LogOut,
  Globe,
  CheckCheck,
  Eye,
  X,
} from "lucide-react";

import DashboardSidebar from "../components/DashboardSidebar";

function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    phone: "",
    location: "",
    profilePicture: "",
  });

  const [loadingUser, setLoadingUser] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);

  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");


  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  

  const [activeSecurityAction, setActiveSecurityAction] =
    useState(null);

  

  const [loggingOut, setLoggingOut] = useState(false);
  const [loggingOutAll, setLoggingOutAll] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [deleteError, setDeleteError] = useState("");


  const [careerProfile, setCareerProfile] = useState(null);
  const [loadingCareerProfile, setLoadingCareerProfile] =
    useState(true);

  const [careerProfileError, setCareerProfileError] =
    useState("");

  const [editingCareerProfile, setEditingCareerProfile] =
    useState(false);

  const [savingCareerProfile, setSavingCareerProfile] =
    useState(false);

  const [careerProfileSuccess, setCareerProfileSuccess] =
    useState("");

  const [careerForm, setCareerForm] = useState({
    targetCareer: "",
    currentGoal: "",
    careerPriority: "",
    internshipPreference: "",
    targetTimeline: "",
    customTimelineMonths: "",
    dailyCommitment: "",
    educationLevel: "",
    currentYear: "",
    experienceLevel: "",
  });

  

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [loadingNotifications, setLoadingNotifications] =
    useState(true);

  const [notificationError, setNotificationError] =
    useState("");

  const [notificationActionLoading, setNotificationActionLoading] =
    useState("");

  const [selectedNotification, setSelectedNotification] =
    useState(null);

  const [loadingNotificationDetails, setLoadingNotificationDetails] =
    useState(false);

  
  const [aiSettings, setAiSettings] = useState({
    suggestions: true,
    weeklyReview: true,
    projectAnalysis: true,
  });

  const [aiFeedback, setAiFeedback] = useState("detailed");

  

  const [theme, setTheme] = useState("dark");
  const [accentColor, setAccentColor] = useState("blue");
  const [fontSize, setFontSize] = useState("medium");

  
  const [privacy, setPrivacy] = useState({
    anonymousData: true,
    publicProfile: false,
    aiRecommendations: true,
  });

  

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoadingUser(true);
        setProfileError("");

        const response = await getCurrentUser();

        console.log("CURRENT USER RESPONSE:", response);

        const currentUser = response.data?.data;

        if (!currentUser) {
          throw new Error("User data not found.");
        }

        setUser(currentUser);

        setFormData({
          name: currentUser.name || "",
          username: currentUser.username || "",
          bio: currentUser.bio || "",
          phone: currentUser.phone || "",
          location: currentUser.location || "",
          profilePicture: currentUser.profilePicture || "",
        });
      } catch (error) {
        console.error("GET CURRENT USER ERROR:", error);

        setProfileError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load account information."
        );
      } finally {
        setLoadingUser(false);
      }
    };

    fetchCurrentUser();
  }, []);


  useEffect(() => {
    const fetchCareerProfile = async () => {
      try {
        setLoadingCareerProfile(true);
        setCareerProfileError("");

        const response = await getCareerProfile();

        console.log(
          "CAREER PROFILE RESPONSE:",
          response
        );

        const profile = response.data?.data;

        if (!profile) {
          throw new Error("Career profile not found.");
        }

        setCareerProfile(profile);

        setCareerForm({
          targetCareer: profile.targetCareer || "",
          currentGoal: profile.currentGoal || "",
          careerPriority: profile.careerPriority || "",
          internshipPreference:
            profile.internshipPreference || "",
          targetTimeline: profile.targetTimeline || "",
          customTimelineMonths:
            profile.customTimelineMonths ?? "",
          dailyCommitment:
            profile.dailyCommitment ?? "",
          educationLevel:
            profile.educationLevel || "",
          currentYear:
            profile.currentYear ?? "",
          experienceLevel:
            profile.experienceLevel || "",
        });
      } catch (error) {
        console.error(
          "GET CAREER PROFILE ERROR:",
          error
        );

        setCareerProfileError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load career preferences."
        );
      } finally {
        setLoadingCareerProfile(false);
      }
    };

    fetchCareerProfile();
  }, []);

  
  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoadingNotifications(true);
      setNotificationError("");

      const response = await getNotifications();

      console.log(
        "NOTIFICATIONS RESPONSE:",
        response
      );

      const notificationData =
        response.data?.data;

      let notificationList = [];

      if (Array.isArray(notificationData)) {
        notificationList = notificationData;
      } else if (
        Array.isArray(notificationData?.notifications)
      ) {
        notificationList =
          notificationData.notifications;
      } else if (
        Array.isArray(response.data?.notifications)
      ) {
        notificationList =
          response.data.notifications;
      }

      setNotifications(notificationList);
    } catch (error) {
      console.error(
        "GET NOTIFICATIONS ERROR:",
        error
      );

      setNotificationError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load notifications."
      );
    } finally {
      setLoadingNotifications(false);
    }
  };

  
  const fetchUnreadCount = async () => {
    try {
      const response =
        await getUnreadNotificationCount();

      console.log(
        "UNREAD NOTIFICATION COUNT RESPONSE:",
        response
      );

      const data = response.data?.data;

      const count =
        typeof data === "number"
          ? data
          : data?.count ??
            data?.unreadCount ??
            response.data?.unreadCount ??
            0;

      setUnreadCount(Number(count) || 0);
    } catch (error) {
      console.error(
        "GET UNREAD COUNT ERROR:",
        error
      );
    }
  };


  const handleViewNotification = async (
    notification
  ) => {
    const notificationId =
      notification?._id ||
      notification?.id ||
      notification?.notificationId;

    if (!notificationId) {
      return;
    }

    try {
      setLoadingNotificationDetails(true);

      const response =
        await getNotificationDetails(
          notificationId
        );

      console.log(
        "NOTIFICATION DETAILS RESPONSE:",
        response
      );

      const details =
        response.data?.data ||
        response.data?.notification ||
        response.data;

      setSelectedNotification(details);

      if (
        notification.isRead === false ||
        notification.read === false
      ) {
        await handleMarkNotificationAsRead(
          notificationId
        );
      }
    } catch (error) {
      console.error(
        "GET NOTIFICATION DETAILS ERROR:",
        error
      );

      setNotificationError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load notification details."
      );
    } finally {
      setLoadingNotificationDetails(false);
    }
  };

 

  const handleMarkNotificationAsRead = async (
    notificationId
  ) => {
    if (!notificationId) {
      return;
    }

    try {
      setNotificationActionLoading(
        `read-${notificationId}`
      );

      const response =
        await markNotificationAsRead(
          notificationId
        );

      console.log(
        "MARK NOTIFICATION READ RESPONSE:",
        response
      );

      setNotifications((prev) =>
        prev.map((notification) => {
          const id =
            notification?._id ||
            notification?.id ||
            notification?.notificationId;

          if (id !== notificationId) {
            return notification;
          }

          return {
            ...notification,
            isRead: true,
            read: true,
          };
        })
      );

      setUnreadCount((prev) =>
        prev > 0 ? prev - 1 : 0
      );
    } catch (error) {
      console.error(
        "MARK NOTIFICATION READ ERROR:",
        error
      );

      setNotificationError(
        error.response?.data?.message ||
          error.message ||
          "Failed to mark notification as read."
      );
    } finally {
      setNotificationActionLoading("");
    }
  };

  

  const handleMarkAllNotificationsAsRead =
    async () => {
      if (unreadCount === 0) {
        return;
      }

      try {
        setNotificationActionLoading(
          "read-all"
        );

        const response =
          await markAllNotificationsAsRead();

        console.log(
          "MARK ALL NOTIFICATIONS READ RESPONSE:",
          response
        );

        setNotifications((prev) =>
          prev.map((notification) => ({
            ...notification,
            isRead: true,
            read: true,
          }))
        );

        setUnreadCount(0);
      } catch (error) {
        console.error(
          "MARK ALL NOTIFICATIONS READ ERROR:",
          error
        );

        setNotificationError(
          error.response?.data?.message ||
            error.message ||
            "Failed to mark all notifications as read."
        );
      } finally {
        setNotificationActionLoading("");
      }
    };

  
  const handleDeleteNotification = async (
    notificationId
  ) => {
    if (!notificationId) {
      return;
    }

    const confirmed = window.confirm(
      "Delete this notification?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setNotificationActionLoading(
        `delete-${notificationId}`
      );

      await deleteNotification(
        notificationId
      );

      const deletedNotification =
        notifications.find((notification) => {
          const id =
            notification?._id ||
            notification?.id ||
            notification?.notificationId;

          return id === notificationId;
        });

      setNotifications((prev) =>
        prev.filter((notification) => {
          const id =
            notification?._id ||
            notification?.id ||
            notification?.notificationId;

          return id !== notificationId;
        })
      );

      if (
        deletedNotification &&
        (
          deletedNotification.isRead === false ||
          deletedNotification.read === false
        )
      ) {
        setUnreadCount((prev) =>
          prev > 0 ? prev - 1 : 0
        );
      }

      if (
        selectedNotification?._id ===
        notificationId
      ) {
        setSelectedNotification(null);
      }
    } catch (error) {
      console.error(
        "DELETE NOTIFICATION ERROR:",
        error
      );

      setNotificationError(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete notification."
      );
    } finally {
      setNotificationActionLoading("");
    }
  };


  const handleClearAllNotifications =
    async () => {
      if (notifications.length === 0) {
        return;
      }

      const confirmed = window.confirm(
        "Are you sure you want to clear all notifications?"
      );

      if (!confirmed) {
        return;
      }

      try {
        setNotificationActionLoading(
          "clear-all"
        );

        const response =
          await clearAllNotifications();

        console.log(
          "CLEAR ALL NOTIFICATIONS RESPONSE:",
          response
        );

        setNotifications([]);
        setUnreadCount(0);
        setSelectedNotification(null);
      } catch (error) {
        console.error(
          "CLEAR ALL NOTIFICATIONS ERROR:",
          error
        );

        setNotificationError(
          error.response?.data?.message ||
            error.message ||
            "Failed to clear notifications."
        );
      } finally {
        setNotificationActionLoading("");
      }
    };

  
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setProfileSuccess("");
    setProfileError("");
  };


  const handleUpdateProfile = async (
    event
  ) => {
    event.preventDefault();

    try {
      setSavingProfile(true);
      setProfileError("");
      setProfileSuccess("");

      const payload = {
        name: formData.name.trim(),
        username:
          formData.username.trim().toLowerCase(),
        bio: formData.bio.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
      };

      if (formData.profilePicture.trim()) {
        payload.profilePicture =
          formData.profilePicture.trim();
      }

      console.log(
        "UPDATE PROFILE PAYLOAD:",
        payload
      );

      const response =
        await updateProfile(payload);

      console.log(
        "UPDATE PROFILE RESPONSE:",
        response
      );

      const updatedUser =
        response.data?.data;

      if (updatedUser) {
        setUser((prev) => ({
          ...prev,
          ...updatedUser,
        }));

        setFormData((prev) => ({
          ...prev,
          name:
            updatedUser.name ?? prev.name,
          username:
            updatedUser.username ??
            prev.username,
          bio:
            updatedUser.bio ?? prev.bio,
          phone:
            updatedUser.phone ?? prev.phone,
          location:
            updatedUser.location ??
            prev.location,
          profilePicture:
            updatedUser.profilePicture ??
            prev.profilePicture,
        }));
      }

      setProfileSuccess(
        response.data?.message ||
          "Profile updated successfully."
      );
    } catch (error) {
      console.error(
        "UPDATE PROFILE ERROR:",
        error
      );

      setProfileError(
        error.response?.data?.message ||
          error.message ||
          "Failed to update profile."
      );
    } finally {
      setSavingProfile(false);
    }
  };

  

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPasswordError("");
    setPasswordSuccess("");
  };

 

  const handleChangePassword = async (
    event
  ) => {
    event.preventDefault();

    setPasswordError("");
    setPasswordSuccess("");

    if (!passwordData.oldPassword.trim()) {
      setPasswordError(
        "Please enter your current password."
      );
      return;
    }

    if (!passwordData.newPassword.trim()) {
      setPasswordError(
        "Please enter a new password."
      );
      return;
    }

    if (
      !passwordData.confirmNewPassword.trim()
    ) {
      setPasswordError(
        "Please confirm your new password."
      );
      return;
    }

    if (
      passwordData.newPassword !==
      passwordData.confirmNewPassword
    ) {
      setPasswordError(
        "Passwords do not match."
      );
      return;
    }

    try {
      setChangingPassword(true);

      const response =
        await changePassword({
          oldPassword:
            passwordData.oldPassword,
          newPassword:
            passwordData.newPassword,
          confirmNewPassword:
            passwordData.confirmNewPassword,
        });

      console.log(
        "CHANGE PASSWORD RESPONSE:",
        response
      );

      setPasswordSuccess(
        response.data?.message ||
          "Password changed successfully."
      );

      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      console.error(
        "CHANGE PASSWORD ERROR:",
        error
      );

      setPasswordError(
        error.response?.data?.message ||
          error.message ||
          "Failed to change password."
      );
    } finally {
      setChangingPassword(false);
    }
  };

  

  const openSecurityAction = (action) => {
    setActiveSecurityAction((prev) =>
      prev === action ? null : action
    );

    setPasswordError("");
    setPasswordSuccess("");
  };

  
  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await logoutUser();

      window.location.href = "/login";
    } catch (error) {
      console.error("LOGOUT ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Failed to logout. Please try again."
      );

      setLoggingOut(false);
    }
  };

  
  const handleLogoutAll = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to log out from all devices?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoggingOutAll(true);

      await logoutAll();

      window.location.href = "/login";
    } catch (error) {
      console.error(
        "LOGOUT ALL ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to logout from all devices."
      );

      setLoggingOutAll(false);
    }
  };

 

  const handleDeleteAccount = async () => {
    if (!deletePassword.trim()) {
      setDeleteError(
        "Please enter your password."
      );
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingAccount(true);
      setDeleteError("");

      const response =
        await deleteAccount(deletePassword);

      console.log(
        "DELETE ACCOUNT RESPONSE:",
        response
      );

      alert(
        response.data?.message ||
          "Your account has been deleted successfully."
      );

      window.location.href = "/login";
    } catch (error) {
      console.error(
        "DELETE ACCOUNT ERROR:",
        error
      );

      setDeleteError(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete account."
      );
    } finally {
      setDeletingAccount(false);
    }
  };

 

  const handleCareerProfileChange = (
    event
  ) => {
    const { name, value } = event.target;

    setCareerForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setCareerProfileSuccess("");
    setCareerProfileError("");
  };

 
  const handleEditCareerProfile = () => {
    if (!careerProfile) {
      return;
    }

    setCareerForm({
      targetCareer:
        careerProfile.targetCareer || "",
      currentGoal:
        careerProfile.currentGoal || "",
      careerPriority:
        careerProfile.careerPriority || "",
      internshipPreference:
        careerProfile.internshipPreference || "",
      targetTimeline:
        careerProfile.targetTimeline || "",
      customTimelineMonths:
        careerProfile.customTimelineMonths ?? "",
      dailyCommitment:
        careerProfile.dailyCommitment ?? "",
      educationLevel:
        careerProfile.educationLevel || "",
      currentYear:
        careerProfile.currentYear ?? "",
      experienceLevel:
        careerProfile.experienceLevel || "",
    });

    setCareerProfileSuccess("");
    setCareerProfileError("");
    setEditingCareerProfile(true);
  };

  

  const handleSaveCareerProfile = async (
    event
  ) => {
    event.preventDefault();

    try {
      setSavingCareerProfile(true);
      setCareerProfileError("");
      setCareerProfileSuccess("");

      const payload = {
        targetCareer:
          careerForm.targetCareer.trim(),

        currentGoal:
          careerForm.currentGoal.trim(),

        careerPriority:
          careerForm.careerPriority,

        internshipPreference:
          careerForm.internshipPreference,

        targetTimeline:
          careerForm.targetTimeline,

        dailyCommitment:
          Number(
            careerForm.dailyCommitment
          ),

        educationLevel:
          careerForm.educationLevel,

        currentYear:
          Number(careerForm.currentYear),

        experienceLevel:
          careerForm.experienceLevel,
      };

      if (
        careerForm.targetTimeline ===
          "CUSTOM" &&
        careerForm.customTimelineMonths
      ) {
        payload.customTimelineMonths =
          Number(
            careerForm.customTimelineMonths
          );
      }

      console.log(
        "UPDATE CAREER PROFILE PAYLOAD:",
        payload
      );

      const response =
        await updateCareerProfile(
          payload
        );

      console.log(
        "UPDATE CAREER PROFILE RESPONSE:",
        response
      );

      const updatedProfile =
        response.data?.data;

      if (updatedProfile) {
        setCareerProfile(
          updatedProfile
        );

        setCareerForm({
          targetCareer:
            updatedProfile.targetCareer ||
            "",
          currentGoal:
            updatedProfile.currentGoal ||
            "",
          careerPriority:
            updatedProfile.careerPriority ||
            "",
          internshipPreference:
            updatedProfile.internshipPreference ||
            "",
          targetTimeline:
            updatedProfile.targetTimeline ||
            "",
          customTimelineMonths:
            updatedProfile.customTimelineMonths ??
            "",
          dailyCommitment:
            updatedProfile.dailyCommitment ??
            "",
          educationLevel:
            updatedProfile.educationLevel ||
            "",
          currentYear:
            updatedProfile.currentYear ??
            "",
          experienceLevel:
            updatedProfile.experienceLevel ||
            "",
        });
      }

      setCareerProfileSuccess(
        response.data?.message ||
          "Career preferences updated successfully."
      );

      setEditingCareerProfile(false);
    } catch (error) {
      console.error(
        "UPDATE CAREER PROFILE ERROR:",
        error
      );

      setCareerProfileError(
        error.response?.data?.message ||
          error.message ||
          "Failed to update career preferences."
      );
    } finally {
      setSavingCareerProfile(false);
    }
  };

 

  const toggleSetting = (
    setter,
    key
  ) => {
    setter((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  
  const formatEnum = (value) => {
    if (!value) {
      return "Not set";
    }

    return value
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  const formatTimeline = (profile) => {
    if (!profile) {
      return "Not set";
    }

    if (
      profile.targetTimeline ===
        "CUSTOM" &&
      profile.customTimelineMonths
    ) {
      return `${profile.customTimelineMonths} Months`;
    }

    return formatEnum(
      profile.targetTimeline
    );
  };

 

  const getNotificationId = (
    notification
  ) =>
    notification?._id ||
    notification?.id ||
    notification?.notificationId;

  const getNotificationTitle = (
    notification
  ) =>
    notification?.title ||
    notification?.subject ||
    notification?.type
      ? formatEnum(notification.type)
      : "Notification";

  const getNotificationMessage = (
    notification
  ) =>
    notification?.message ||
    notification?.body ||
    notification?.description ||
    "You have a new notification.";

  const isNotificationRead = (
    notification
  ) =>
    notification?.isRead === true ||
    notification?.read === true;

  const formatNotificationDate = (
    notification
  ) => {
    const date =
      notification?.createdAt ||
      notification?.created_at ||
      notification?.date;

    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleString(
      undefined,
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  

  return (
    <div className="min-h-screen bg-career-bg text-white">

      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <div className="lg:pl-64">

        
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

              <SettingsIcon
                size={19}
                className="text-career-blue"
              />

              <span className="text-base font-bold sm:text-lg">
                Settings
              </span>

            </div>

          </div>

        </header>

        <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:py-10">

          

          <div className="mb-8">

            <h1 className="text-2xl font-bold sm:text-3xl">
              Manage your CareerOS preferences
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Control your account, notifications,
              career preferences and AI experience.
            </p>

          </div>

         
          <SettingsSection
            icon={<User size={19} />}
            title="Account"
          >

            {loadingUser ? (
              <div className="flex items-center justify-center py-10">

                <Loader2
                  size={24}
                  className="animate-spin text-career-blue"
                />

              </div>
            ) : (
              <form
                onSubmit={
                  handleUpdateProfile
                }
              >

                <div className="space-y-6">

                  <FormField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />

                  <FormField
                    label="Username"
                    name="username"
                    value={
                      formData.username
                    }
                    onChange={handleChange}
                    placeholder="Enter your username"
                  />

                  <div>

                    <label className="text-xs font-medium text-slate-500">
                      Email Address
                    </label>

                    <input
                      type="email"
                      value={
                        user?.email || ""
                      }
                      disabled
                      className="mt-2 w-full cursor-not-allowed rounded-xl border border-career-border bg-career-bg px-4 py-3 text-sm text-slate-500 outline-none"
                    />

                    <p className="mt-1 text-xs text-slate-600">
                      Email address cannot be changed here.
                    </p>

                  </div>

                  <div>

                    <label
                      htmlFor="bio"
                      className="text-xs font-medium text-slate-500"
                    >
                      Bio
                    </label>

                    <textarea
                      id="bio"
                      name="bio"
                      value={
                        formData.bio
                      }
                      onChange={handleChange}
                      maxLength={300}
                      rows={4}
                      placeholder="Tell us a little about yourself..."
                      className="mt-2 w-full resize-none rounded-xl border border-career-border bg-career-bg px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-career-blue"
                    />

                    <p className="mt-1 text-right text-xs text-slate-600">
                      {
                        formData.bio
                          .length
                      }
                      /300
                    </p>

                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">

                    <FormField
                      label="Phone"
                      name="phone"
                      value={
                        formData.phone
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter your phone number"
                    />

                    <FormField
                      label="Location"
                      name="location"
                      value={
                        formData.location
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="e.g. Pune, India"
                    />

                  </div>

                  <FormField
                    label="Profile Picture URL"
                    name="profilePicture"
                    value={
                      formData.profilePicture
                    }
                    onChange={handleChange}
                    placeholder="https://example.com/profile.jpg"
                    type="url"
                  />

                  {profileError && (
                    <MessageBox
                      type="error"
                      message={
                        profileError
                      }
                    />
                  )}

                  {profileSuccess && (
                    <MessageBox
                      type="success"
                      message={
                        profileSuccess
                      }
                    />
                  )}

                  <button
                    type="submit"
                    disabled={
                      savingProfile
                    }
                    className="flex items-center justify-center gap-2 rounded-xl bg-career-blue px-5 py-3 text-sm font-semibold transition hover:bg-career-purple disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {savingProfile ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Save Profile
                      </>
                    )}

                  </button>

                </div>

              </form>
            )}

          </SettingsSection>

         
          <SettingsSection
            icon={<Lock size={19} />}
            title="Security"
          >

            <p className="mb-4 text-sm text-slate-400">
              Manage your password and active account
              sessions.
            </p>

            <div className="overflow-hidden rounded-2xl border border-career-border">

              {/* CHANGE PASSWORD */}

              <button
                type="button"
                onClick={() =>
                  openSecurityAction(
                    "password"
                  )
                }
                className="flex w-full items-center justify-between border-b border-career-border px-5 py-4 text-left transition hover:bg-career-card"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-career-blue/10 text-career-blue">
                    <Lock size={17} />
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-slate-200">
                      Change Password
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Update your account password
                    </p>

                  </div>

                </div>

                {activeSecurityAction ===
                "password" ? (
                  <ChevronUp
                    size={18}
                    className="text-slate-500"
                  />
                ) : (
                  <ChevronDown
                    size={18}
                    className="text-slate-500"
                  />
                )}

              </button>

              {activeSecurityAction ===
                "password" && (
                <div className="border-b border-career-border bg-career-bg/50 p-5">

                  <form
                    onSubmit={
                      handleChangePassword
                    }
                    className="space-y-4"
                  >

                    <FormField
                      label="Current Password"
                      name="oldPassword"
                      type="password"
                      value={
                        passwordData.oldPassword
                      }
                      onChange={
                        handlePasswordChange
                      }
                      placeholder="Enter your current password"
                    />

                    <FormField
                      label="New Password"
                      name="newPassword"
                      type="password"
                      value={
                        passwordData.newPassword
                      }
                      onChange={
                        handlePasswordChange
                      }
                      placeholder="Enter your new password"
                    />

                    <FormField
                      label="Confirm New Password"
                      name="confirmNewPassword"
                      type="password"
                      value={
                        passwordData.confirmNewPassword
                      }
                      onChange={
                        handlePasswordChange
                      }
                      placeholder="Confirm your new password"
                    />

                    {passwordError && (
                      <MessageBox
                        type="error"
                        message={
                          passwordError
                        }
                      />
                    )}

                    {passwordSuccess && (
                      <MessageBox
                        type="success"
                        message={
                          passwordSuccess
                        }
                      />
                    )}

                    <button
                      type="submit"
                      disabled={
                        changingPassword
                      }
                      className="flex items-center justify-center gap-2 rounded-xl bg-career-blue px-5 py-3 text-sm font-semibold transition hover:bg-career-purple disabled:cursor-not-allowed disabled:opacity-60"
                    >

                      {changingPassword ? (
                        <>
                          <Loader2
                            size={16}
                            className="animate-spin"
                          />
                          Changing Password...
                        </>
                      ) : (
                        <>
                          <Lock size={16} />
                          Change Password
                        </>
                      )}

                    </button>

                  </form>

                </div>
              )}

              {/* LOGOUT */}

              <button
                type="button"
                onClick={() =>
                  openSecurityAction(
                    "logout"
                  )
                }
                disabled={
                  loggingOut ||
                  loggingOutAll
                }
                className="flex w-full items-center justify-between border-b border-career-border px-5 py-4 text-left transition hover:bg-career-card disabled:opacity-50"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-500/10 text-slate-400">
                    <LogOut size={17} />
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-slate-200">
                      Log Out
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Sign out from this device
                    </p>

                  </div>

                </div>

                {activeSecurityAction ===
                "logout" ? (
                  <ChevronUp
                    size={18}
                    className="text-slate-500"
                  />
                ) : (
                  <ChevronDown
                    size={18}
                    className="text-slate-500"
                  />
                )}

              </button>

              {activeSecurityAction ===
                "logout" && (
                <div className="border-b border-career-border bg-career-bg/50 p-5">

                  <p className="text-sm text-slate-400">
                    You will be signed out of
                    this device.
                  </p>

                  <button
                    type="button"
                    onClick={
                      handleLogout
                    }
                    disabled={
                      loggingOut ||
                      loggingOutAll
                    }
                    className="mt-4 flex items-center gap-2 rounded-xl border border-career-border px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-career-blue hover:text-white disabled:opacity-50"
                  >

                    {loggingOut ? (
                      <>
                        <Loader2
                          size={15}
                          className="animate-spin"
                        />
                        Logging out...
                      </>
                    ) : (
                      <>
                        <LogOut size={15} />
                        Confirm Log Out
                      </>
                    )}

                  </button>

                </div>
              )}

              {/* LOGOUT ALL */}

              <button
                type="button"
                onClick={() =>
                  openSecurityAction(
                    "logoutAll"
                  )
                }
                disabled={
                  loggingOut ||
                  loggingOutAll
                }
                className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-career-card disabled:opacity-50"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                    <Globe size={17} />
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-slate-200">
                      Log Out of All Devices
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      End all active sessions
                    </p>

                  </div>

                </div>

                {activeSecurityAction ===
                "logoutAll" ? (
                  <ChevronUp
                    size={18}
                    className="text-slate-500"
                  />
                ) : (
                  <ChevronDown
                    size={18}
                    className="text-slate-500"
                  />
                )}

              </button>

              {activeSecurityAction ===
                "logoutAll" && (
                <div className="bg-career-bg/50 p-5">

                  <p className="text-sm text-slate-400">
                    This will sign you out from
                    every active device.
                  </p>

                  <button
                    type="button"
                    onClick={
                      handleLogoutAll
                    }
                    disabled={
                      loggingOut ||
                      loggingOutAll
                    }
                    className="mt-4 flex items-center gap-2 rounded-xl border border-amber-500/20 px-4 py-2.5 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/10 disabled:opacity-50"
                  >

                    {loggingOutAll ? (
                      <>
                        <Loader2
                          size={15}
                          className="animate-spin"
                        />
                        Logging out everywhere...
                      </>
                    ) : (
                      <>
                        <Globe size={15} />
                        Confirm Log Out Everywhere
                      </>
                    )}

                  </button>

                </div>
              )}

            </div>

          </SettingsSection>

         

          <SettingsSection
            icon={<Trash2 size={19} />}
            title="Danger Zone"
          >

            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">

              <div className="flex items-start gap-3">

                <Trash2
                  size={18}
                  className="mt-0.5 text-red-400"
                />

                <div>

                  <p className="text-sm font-semibold text-red-300">
                    Delete Account
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Permanently delete your CareerOS
                    account and all associated data.
                  </p>

                </div>

              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">

                <input
                  type="password"
                  value={
                    deletePassword
                  }
                  onChange={(event) => {
                    setDeletePassword(
                      event.target.value
                    );
                    setDeleteError("");
                  }}
                  placeholder="Enter your password"
                  className="flex-1 rounded-xl border border-red-500/20 bg-career-bg px-4 py-2.5 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-red-500/40"
                />

                <button
                  type="button"
                  onClick={
                    handleDeleteAccount
                  }
                  disabled={
                    deletingAccount
                  }
                  className="rounded-xl border border-red-500/30 px-4 py-2.5 text-xs font-semibold text-red-300 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deletingAccount
                    ? "Deleting..."
                    : "Delete Account"}
                </button>

              </div>

              {deleteError && (
                <p className="mt-3 text-xs text-red-400">
                  {deleteError}
                </p>
              )}

            </div>

          </SettingsSection>

          
          <SettingsSection
            icon={<Bell size={19} />}
            title="Notifications"
          >

            {/* NOTIFICATION HEADER */}

            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-sm text-slate-400">
                  Notifications generated by CareerOS.
                </p>

                <div className="mt-2 flex items-center gap-2">

                  <span className="rounded-full bg-career-blue/10 px-2.5 py-1 text-xs font-semibold text-career-blue">
                    {unreadCount} unread
                  </span>

                  <span className="text-xs text-slate-600">
                    {notifications.length} total
                  </span>

                </div>

              </div>

              <div className="flex flex-wrap gap-2">

                <button
                  type="button"
                  onClick={
                    handleMarkAllNotificationsAsRead
                  }
                  disabled={
                    unreadCount === 0 ||
                    notificationActionLoading ===
                      "read-all"
                  }
                  className="flex items-center gap-2 rounded-xl border border-career-border bg-career-card px-3.5 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-career-blue hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >

                  {notificationActionLoading ===
                  "read-all" ? (
                    <Loader2
                      size={14}
                      className="animate-spin"
                    />
                  ) : (
                    <CheckCheck size={14} />
                  )}

                  Mark all as read

                </button>

                <button
                  type="button"
                  onClick={
                    handleClearAllNotifications
                  }
                  disabled={
                    notifications.length === 0 ||
                    notificationActionLoading ===
                      "clear-all"
                  }
                  className="flex items-center gap-2 rounded-xl border border-red-500/20 px-3.5 py-2.5 text-xs font-semibold text-red-300 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                >

                  {notificationActionLoading ===
                  "clear-all" ? (
                    <Loader2
                      size={14}
                      className="animate-spin"
                    />
                  ) : (
                    <Trash2 size={14} />
                  )}

                  Clear all

                </button>

              </div>

            </div>

            {notificationError && (
              <div className="mb-5">
                <MessageBox
                  type="error"
                  message={
                    notificationError
                  }
                />
              </div>
            )}

            {/* NOTIFICATIONS LIST */}

            {loadingNotifications ? (
              <div className="flex items-center justify-center rounded-2xl border border-career-border bg-career-bg/40 py-12">

                <div className="flex items-center gap-3 text-sm text-slate-400">

                  <Loader2
                    size={20}
                    className="animate-spin text-career-blue"
                  />

                  Loading notifications...

                </div>

              </div>
            ) : notifications.length ===
              0 ? (
              <div className="rounded-2xl border border-career-border bg-career-bg/40 px-5 py-12 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-career-blue/10 text-career-blue">

                  <Bell size={22} />

                </div>

                <p className="mt-4 text-sm font-semibold text-slate-300">
                  No notifications yet
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  CareerOS notifications will appear here.
                </p>

              </div>
            ) : (
              <div className="space-y-2">

                {notifications.map(
                  (notification) => {
                    const notificationId =
                      getNotificationId(
                        notification
                      );

                    const read =
                      isNotificationRead(
                        notification
                      );

                    const actionLoading =
                      notificationActionLoading;

                    return (
                      <div
                        key={
                          notificationId ||
                          Math.random()
                        }
                        className={`group rounded-2xl border p-4 transition ${
                          read
                            ? "border-career-border bg-career-card/40"
                            : "border-career-blue/20 bg-career-blue/5"
                        }`}
                      >

                        <div className="flex items-start gap-3">

                          {/* UNREAD INDICATOR */}

                          <div
                            className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                              read
                                ? "bg-slate-700"
                                : "bg-career-blue"
                            }`}
                          />

                          <div className="min-w-0 flex-1">

                            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">

                              <div>

                                <p
                                  className={`text-sm font-semibold ${
                                    read
                                      ? "text-slate-300"
                                      : "text-white"
                                  }`}
                                >
                                  {getNotificationTitle(
                                    notification
                                  )}
                                </p>

                                {formatNotificationDate(
                                  notification
                                ) && (
                                  <p className="mt-1 text-[11px] text-slate-600">
                                    {formatNotificationDate(
                                      notification
                                    )}
                                  </p>
                                )}

                              </div>

                              {!read && (
                                <span className="w-fit rounded-full bg-career-blue/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-career-blue">
                                  New
                                </span>
                              )}

                            </div>

                            <p className="mt-2 text-sm leading-6 text-slate-400">
                              {getNotificationMessage(
                                notification
                              )}
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-2">

                              <button
                                type="button"
                                onClick={() =>
                                  handleViewNotification(
                                    notification
                                  )
                                }
                                disabled={
                                  loadingNotificationDetails
                                }
                                className="flex items-center gap-1.5 rounded-lg border border-career-border px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:border-career-blue hover:text-white"
                              >

                                <Eye size={13} />

                                View

                              </button>

                              {!read && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleMarkNotificationAsRead(
                                      notificationId
                                    )
                                  }
                                  disabled={
                                    actionLoading ===
                                    `read-${notificationId}`
                                  }
                                  className="flex items-center gap-1.5 rounded-lg border border-career-blue/20 px-3 py-1.5 text-xs font-medium text-career-blue transition hover:bg-career-blue/10 disabled:opacity-50"
                                >

                                  {actionLoading ===
                                  `read-${notificationId}` ? (
                                    <Loader2
                                      size={13}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <Check size={13} />
                                  )}

                                  Mark read

                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteNotification(
                                    notificationId
                                  )
                                }
                                disabled={
                                  actionLoading ===
                                  `delete-${notificationId}`
                                }
                                className="flex items-center gap-1.5 rounded-lg border border-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                              >

                                {actionLoading ===
                                `delete-${notificationId}` ? (
                                  <Loader2
                                    size={13}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <Trash2 size={13} />
                                )}

                                Delete

                              </button>

                            </div>

                          </div>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>
            )}

          </SettingsSection>

          

          {selectedNotification && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">

              <div className="w-full max-w-lg rounded-3xl border border-career-border bg-career-surface p-6 shadow-2xl">

                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-career-blue/10 text-career-blue">

                      <Bell size={18} />

                    </div>

                    <div>

                      <h3 className="text-base font-bold text-white">
                        {getNotificationTitle(
                          selectedNotification
                        )}
                      </h3>

                      {formatNotificationDate(
                        selectedNotification
                      ) && (
                        <p className="mt-1 text-xs text-slate-600">
                          {formatNotificationDate(
                            selectedNotification
                          )}
                        </p>
                      )}

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedNotification(
                        null
                      )
                    }
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-career-card hover:text-white"
                  >
                    <X size={18} />
                  </button>

                </div>

                <div className="mt-6 rounded-2xl border border-career-border bg-career-bg/50 p-4">

                  {loadingNotificationDetails ? (
                    <div className="flex items-center justify-center py-6">

                      <Loader2
                        size={20}
                        className="animate-spin text-career-blue"
                      />

                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap text-sm leading-6 text-slate-300">
                      {getNotificationMessage(
                        selectedNotification
                      )}
                    </p>
                  )}

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedNotification(
                      null
                    )
                  }
                  className="mt-5 w-full rounded-xl border border-career-border px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-career-blue hover:text-white"
                >
                  Close
                </button>

              </div>

            </div>
          )}

          
          <SettingsSection
            icon={
              <BriefcaseBusiness size={19} />
            }
            title="Career Preferences"
          >

            {loadingCareerProfile ? (
              <div className="flex items-center justify-center py-10">

                <Loader2
                  size={24}
                  className="animate-spin text-career-blue"
                />

              </div>
            ) : careerProfileError &&
              !careerProfile ? (
              <MessageBox
                type="error"
                message={
                  careerProfileError
                }
              />
            ) : (
              <>
                {!editingCareerProfile && (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">

                      <PreferenceItem
                        label="Target Career"
                        value={
                          careerProfile
                            ?.targetCareer ||
                          "Not set"
                        }
                      />

                      <PreferenceItem
                        label="Current Goal"
                        value={
                          careerProfile
                            ?.currentGoal ||
                          "Not set"
                        }
                      />

                      <PreferenceItem
                        label="Target Timeline"
                        value={formatTimeline(
                          careerProfile
                        )}
                      />

                      <PreferenceItem
                        label="Daily Commitment"
                        value={
                          careerProfile
                            ? `${careerProfile.dailyCommitment} Hours / Day`
                            : "Not set"
                        }
                      />

                    </div>

                    {careerProfileSuccess && (
                      <div className="mt-5">
                        <MessageBox
                          type="success"
                          message={
                            careerProfileSuccess
                          }
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={
                        handleEditCareerProfile
                      }
                      className="mt-6 flex items-center gap-2 rounded-xl border border-career-border bg-career-card px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-career-blue hover:text-white"
                    >
                      <SettingsIcon
                        size={15}
                      />
                      Update Preferences
                    </button>
                  </>
                )}

                {editingCareerProfile && (
                  <form
                    onSubmit={
                      handleSaveCareerProfile
                    }
                    className="space-y-6"
                  >

                    <div className="grid gap-5 sm:grid-cols-2">

                      <SelectField
                        label="Target Career"
                        name="targetCareer"
                        value={
                          careerForm.targetCareer
                        }
                        onChange={
                          handleCareerProfileChange
                        }
                        options={[
                          {
                            value:
                              "MERN Stack Developer",
                            label:
                              "MERN Stack Developer",
                          },
                          {
                            value:
                              "Java Backend Developer",
                            label:
                              "Java Backend Developer",
                          },
                          {
                            value:
                              "Frontend Developer",
                            label:
                              "Frontend Developer",
                          },
                          {
                            value:
                              "Backend Developer",
                            label:
                              "Backend Developer",
                          },
                          {
                            value:
                              "Full Stack Developer",
                            label:
                              "Full Stack Developer",
                          },
                          {
                            value:
                              "Data Analyst",
                            label:
                              "Data Analyst",
                          },
                          {
                            value:
                              "Data Scientist",
                            label:
                              "Data Scientist",
                          },
                        ]}
                      />

                      <SelectField
                        label="Current Goal"
                        name="currentGoal"
                        value={
                          careerForm.currentGoal
                        }
                        onChange={
                          handleCareerProfileChange
                        }
                        options={[
                          {
                            value:
                              "Internship",
                            label:
                              "Internship",
                          },
                          {
                            value:
                              "Job",
                            label:
                              "Job",
                          },
                          {
                            value:
                              "Skill Development",
                            label:
                              "Skill Development",
                          },
                          {
                            value:
                              "Career Switch",
                            label:
                              "Career Switch",
                          },
                        ]}
                      />

                      <SelectField
                        label="Career Priority"
                        name="careerPriority"
                        value={
                          careerForm.careerPriority
                        }
                        onChange={
                          handleCareerProfileChange
                        }
                        options={[
                          {
                            value:
                              "INTERNSHIP",
                            label:
                              "Internship",
                          },
                          {
                            value:
                              "JOB",
                            label: "Job",
                          },
                          {
                            value:
                              "SKILL_DEVELOPMENT",
                            label:
                              "Skill Development",
                          },
                          {
                            value:
                              "CAREER_SWITCH",
                            label:
                              "Career Switch",
                          },
                        ]}
                      />

                      <SelectField
                        label="Internship Preference"
                        name="internshipPreference"
                        value={
                          careerForm.internshipPreference
                        }
                        onChange={
                          handleCareerProfileChange
                        }
                        options={[
                          {
                            value:
                              "NO_PREFERENCE",
                            label:
                              "No Preference",
                          },
                          {
                            value:
                              "REMOTE",
                            label:
                              "Remote",
                          },
                          {
                            value:
                              "HYBRID",
                            label:
                              "Hybrid",
                          },
                          {
                            value:
                              "ONSITE",
                            label:
                              "On-site",
                          },
                        ]}
                      />

                      <SelectField
                        label="Target Timeline"
                        name="targetTimeline"
                        value={
                          careerForm.targetTimeline
                        }
                        onChange={
                          handleCareerProfileChange
                        }
                        options={[
                          {
                            value:
                              "3_MONTHS",
                            label:
                              "3 Months",
                          },
                          {
                            value:
                              "6_MONTHS",
                            label:
                              "6 Months",
                          },
                          {
                            value:
                              "12_MONTHS",
                            label:
                              "12 Months",
                          },
                          {
                            value:
                              "CUSTOM",
                            label:
                              "Custom",
                          },
                        ]}
                      />

                      <FormField
                        label="Daily Commitment (Hours)"
                        name="dailyCommitment"
                        type="number"
                        value={
                          careerForm.dailyCommitment
                        }
                        onChange={
                          handleCareerProfileChange
                        }
                        placeholder="e.g. 5"
                      />

                      <SelectField
                        label="Education Level"
                        name="educationLevel"
                        value={
                          careerForm.educationLevel
                        }
                        onChange={
                          handleCareerProfileChange
                        }
                        options={[
                          {
                            value:
                              "HIGH_SCHOOL",
                            label:
                              "High School",
                          },
                          {
                            value:
                              "DIPLOMA",
                            label:
                              "Diploma",
                          },
                          {
                            value:
                              "BACHELORS",
                            label:
                              "Bachelor's",
                          },
                          {
                            value:
                              "MASTERS",
                            label:
                              "Master's",
                          },
                          {
                            value:
                              "PHD",
                            label:
                              "PhD",
                          },
                        ]}
                      />

                      <FormField
                        label="Current Year"
                        name="currentYear"
                        type="number"
                        value={
                          careerForm.currentYear
                        }
                        onChange={
                          handleCareerProfileChange
                        }
                        placeholder="e.g. 3"
                      />

                      <SelectField
                        label="Experience Level"
                        name="experienceLevel"
                        value={
                          careerForm.experienceLevel
                        }
                        onChange={
                          handleCareerProfileChange
                        }
                        options={[
                          {
                            value:
                              "BEGINNER",
                            label:
                              "Beginner",
                          },
                          {
                            value:
                              "INTERMEDIATE",
                            label:
                              "Intermediate",
                          },
                          {
                            value:
                              "ADVANCED",
                            label:
                              "Advanced",
                          },
                        ]}
                      />

                    </div>

                    {careerForm.targetTimeline ===
                      "CUSTOM" && (
                      <FormField
                        label="Custom Timeline (Months)"
                        name="customTimelineMonths"
                        type="number"
                        value={
                          careerForm.customTimelineMonths
                        }
                        onChange={
                          handleCareerProfileChange
                        }
                        placeholder="e.g. 9"
                      />
                    )}

                    {careerProfileError && (
                      <MessageBox
                        type="error"
                        message={
                          careerProfileError
                        }
                      />
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row">

                      <button
                        type="submit"
                        disabled={
                          savingCareerProfile
                        }
                        className="flex items-center justify-center gap-2 rounded-xl bg-career-blue px-5 py-3 text-sm font-semibold transition hover:bg-career-purple disabled:cursor-not-allowed disabled:opacity-60"
                      >

                        {savingCareerProfile ? (
                          <>
                            <Loader2
                              size={16}
                              className="animate-spin"
                            />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save size={16} />
                            Save Preferences
                          </>
                        )}

                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setEditingCareerProfile(
                            false
                          )
                        }
                        disabled={
                          savingCareerProfile
                        }
                        className="rounded-xl border border-career-border px-5 py-3 text-sm font-semibold text-slate-400 transition hover:text-white disabled:opacity-50"
                      >
                        Cancel
                      </button>

                    </div>

                  </form>
                )}

              </>
            )}

          </SettingsSection>

          
          <SettingsSection
            icon={<Bot size={19} />}
            title="AI Settings"
          >

            <div>

              <p className="text-sm font-semibold">
                AI Feedback Level
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">

                <RadioCard
                  label="Basic"
                  selected={
                    aiFeedback === "basic"
                  }
                  onClick={() =>
                    setAiFeedback("basic")
                  }
                />

                <RadioCard
                  label="Detailed"
                  selected={
                    aiFeedback === "detailed"
                  }
                  onClick={() =>
                    setAiFeedback("detailed")
                  }
                />

                <RadioCard
                  label="Expert"
                  selected={
                    aiFeedback === "expert"
                  }
                  onClick={() =>
                    setAiFeedback("expert")
                  }
                />

              </div>

            </div>

            <div className="mt-7 space-y-1">

              <ToggleRow
                label="Career Suggestions"
                checked={
                  aiSettings.suggestions
                }
                onChange={() =>
                  toggleSetting(
                    setAiSettings,
                    "suggestions"
                  )
                }
              />

              <ToggleRow
                label="Weekly AI Review"
                checked={
                  aiSettings.weeklyReview
                }
                onChange={() =>
                  toggleSetting(
                    setAiSettings,
                    "weeklyReview"
                  )
                }
              />

              <ToggleRow
                label="Project Analysis"
                checked={
                  aiSettings.projectAnalysis
                }
                onChange={() =>
                  toggleSetting(
                    setAiSettings,
                    "projectAnalysis"
                  )
                }
              />

            </div>

          </SettingsSection>

          

          <SettingsSection
            icon={<Palette size={19} />}
            title="Appearance"
          >

            <div>

              <p className="text-sm font-semibold">
                Theme
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">

                <RadioCard
                  label="Light"
                  selected={
                    theme === "light"
                  }
                  onClick={() =>
                    setTheme("light")
                  }
                />

                <RadioCard
                  label="Dark"
                  selected={
                    theme === "dark"
                  }
                  onClick={() =>
                    setTheme("dark")
                  }
                />

                <RadioCard
                  label="System Default"
                  selected={
                    theme === "system"
                  }
                  onClick={() =>
                    setTheme("system")
                  }
                />

              </div>

            </div>

            <div className="mt-7">

              <p className="text-sm font-semibold">
                Accent Color
              </p>

              <div className="mt-3 flex flex-wrap gap-3">

                {[
                  "blue",
                  "purple",
                ].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() =>
                      setAccentColor(
                        color
                      )
                    }
                    className={`rounded-xl border px-4 py-2.5 text-sm font-medium capitalize transition ${
                      accentColor === color
                        ? "border-career-blue bg-career-blue/10 text-white"
                        : "border-career-border bg-career-card text-slate-400 hover:text-white"
                    }`}
                  >
                    {color}
                  </button>
                ))}

              </div>

            </div>

            <div className="mt-7">

              <p className="text-sm font-semibold">
                Font Size
              </p>

              <div className="mt-3 grid gap-3 sm:grid-cols-3">

                {[
                  "small",
                  "medium",
                  "large",
                ].map((size) => (
                  <RadioCard
                    key={size}
                    label={size}
                    selected={
                      fontSize === size
                    }
                    onClick={() =>
                      setFontSize(size)
                    }
                    capitalize
                  />
                ))}

              </div>

            </div>

          </SettingsSection>

          
          <SettingsSection
            icon={<Shield size={19} />}
            title="Privacy"
          >

            <div className="space-y-1">

              <ToggleRow
                label="Share Anonymous Usage Data"
                checked={
                  privacy.anonymousData
                }
                onChange={() =>
                  toggleSetting(
                    setPrivacy,
                    "anonymousData"
                  )
                }
              />

              <ToggleRow
                label="Make My Profile Public"
                checked={
                  privacy.publicProfile
                }
                onChange={() =>
                  toggleSetting(
                    setPrivacy,
                    "publicProfile"
                  )
                }
              />

              <ToggleRow
                label="Allow AI To Improve Recommendations"
                checked={
                  privacy.aiRecommendations
                }
                onChange={() =>
                  toggleSetting(
                    setPrivacy,
                    "aiRecommendations"
                  )
                }
              />

            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border border-career-border bg-career-card px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-career-blue hover:text-white"
              >
                <Download size={15} />
                Download My Data
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
              >
                <Trash2 size={15} />
                Delete All Career Data
              </button>

            </div>

          </SettingsSection>

          
          <SettingsSection
            icon={<Database size={19} />}
            title="Data Management"
          >

            <div className="grid gap-3 sm:grid-cols-2">

              <ActionButton
                icon={
                  <FileText size={17} />
                }
                text="Export Progress Report"
              />

              <ActionButton
                icon={
                  <Download size={17} />
                }
                text="Download Resume History"
              />

              <ActionButton
                icon={
                  <FileText size={17} />
                }
                text="Download Weekly Reviews"
              />

              <ActionButton
                icon={
                  <Database size={17} />
                }
                text="Backup Career Data"
              />

            </div>

          </SettingsSection>

          

          <SettingsSection
            icon={<CircleHelp size={19} />}
            title="Help & Support"
          >

            <div className="grid gap-3 sm:grid-cols-2">

              <ActionButton text="Help Center" />
              <ActionButton text="Report a Bug" />
              <ActionButton text="Request a Feature" />
              <ActionButton text="Contact Support" />
              <ActionButton text="About CareerOS" />

            </div>

            <div className="mt-6 border-t border-career-border pt-5">

              <p className="text-xs text-slate-500">
                CareerOS
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Version 1.0
              </p>

            </div>

          </SettingsSection>

          <div className="h-12" />

        </main>

      </div>

    </div>
  );
}


function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="text-xs font-medium text-slate-500"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-career-border bg-career-bg px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-career-blue"
      />

    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="text-xs font-medium text-slate-500"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-xl border border-career-border bg-career-bg px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-career-blue"
      >

        <option value="">
          Select {label}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}

      </select>

    </div>
  );
}


function SettingsSection({
  icon,
  title,
  children,
}) {
  return (
    <section className="mb-7 rounded-3xl border border-career-border bg-career-surface p-6 sm:p-7">

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-career-blue/10 text-career-blue">
          {icon}
        </div>

        <h2 className="text-lg font-bold">
          {title}
        </h2>

      </div>

      {children}

    </section>
  );
}


function MessageBox({
  type,
  message,
}) {
  const isSuccess =
    type === "success";

  return (
    <div
      className={`flex items-start gap-2 rounded-xl border p-4 ${
        isSuccess
          ? "border-emerald-500/20 bg-emerald-500/5"
          : "border-red-500/20 bg-red-500/5"
      }`}
    >

      {isSuccess ? (
        <Check
          size={17}
          className="mt-0.5 shrink-0 text-emerald-400"
        />
      ) : (
        <AlertCircle
          size={17}
          className="mt-0.5 shrink-0 text-red-400"
        />
      )}

      <p
        className={`text-sm ${
          isSuccess
            ? "text-emerald-300"
            : "text-red-300"
        }`}
      >
        {message}
      </p>

    </div>
  );
}



function ToggleRow({
  label,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-xl px-2 py-3 transition hover:bg-career-card">

      <p className="text-sm text-slate-300">
        {label}
      </p>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked
            ? "bg-career-blue"
            : "bg-slate-700"
        }`}
      >

        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />

      </button>

    </div>
  );
}



function RadioCard({
  label,
  selected,
  onClick,
  capitalize = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
        selected
          ? "border-career-blue bg-career-blue/10"
          : "border-career-border bg-career-card hover:border-slate-600"
      }`}
    >

      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
          selected
            ? "border-career-blue"
            : "border-slate-600"
        }`}
      >

        {selected && (
          <span className="h-2 w-2 rounded-full bg-career-blue" />
        )}

      </span>

      <span
        className={`text-sm font-medium ${
          selected
            ? "text-white"
            : "text-slate-400"
        } ${
          capitalize
            ? "capitalize"
            : ""
        }`}
      >
        {label}
      </span>

    </button>
  );
}



function PreferenceItem({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-career-border bg-career-card p-5">

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-slate-200">
        {value}
      </p>

    </div>
  );
}



function ActionButton({
  icon,
  text,
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-3 rounded-xl border border-career-border bg-career-card p-4 text-left text-sm font-medium text-slate-300 transition hover:border-career-blue hover:text-white"
    >

      {icon && (
        <span className="text-career-blue">
          {icon}
        </span>
      )}

      {text}

    </button>
  );
}

export default Settings;

