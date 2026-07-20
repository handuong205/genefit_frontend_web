import { motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Camera,
  Crown,
  Dumbbell,
  Edit3,
  HeartPulse,
  KeyRound,
  Loader2,
  Mail,
  Ruler,
  ShieldCheck,
  Sparkles,
  Target,
  User,
  Weight,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PUBLIC_ROUTE } from "../../constants/routes/public.route";
import {
  GetCurrentUserService,
  type CurrentUser,
} from "../user/auth/services/getCurrentUser.service";
import {
  cancelMySubscription,
  getMySubscription,
  renewMySubscription,
  type MySubscription,
} from "../subscription/services/subscriptionPricing.service";
import { useAuthStore } from "../../stores/auth.store";
import {
  updateUserAvatar,
  updateUserProfile,
} from "./services/profile.service";
import AvatarEditModal from "../../components/profile/AvatarEditModal";
import ProfileEditModal, {
  type ProfileFormState,
} from "../../components/profile/ProfileEditModal";
import ChangePasswordModal from "../../components/profile/ChangePasswordModal";
import { ChangePasswordService } from "../user/auth/services/password.service";

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  hint?: string;
};

const emptyProfileForm: ProfileFormState = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  occupation: "",
  heightCm: "",
  weightKg: "",
  age: "",
  gender: "OTHER",
  goal: "MAINTAIN",
  activityLevel: "SEDENTARY",
  targetWeightKg: "",
  targetDate: "",
  medicalConditions: "",
  allergies: "",
};

const formatDate = (value?: string | null) => {
  if (!value) return "Chưa cập nhật";

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
};

const formatText = (value?: string | null) => {
  if (!value) return "Chưa cập nhật";

  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
};

const formatNumber = (value?: number | null, suffix = "") => {
  if (value === null || value === undefined) return "Chưa cập nhật";

  return `${value.toLocaleString("vi-VN")}${suffix}`;
};

const getDisplayName = (user?: CurrentUser | null) => {
  const profile = user?.userProfile;
  const profileName = [profile?.firstName, profile?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  return profileName || user?.fullName || user?.name || user?.username || "Genefit Member";
};

const getInitials = (name: string) => {
  const words = name.split(" ").filter(Boolean);

  return (words[0]?.[0] ?? "G").toUpperCase() + (words[1]?.[0] ?? "").toUpperCase();
};

const toCsv = (items?: string[] | null) => items?.join(", ") ?? "";

const fromCsv = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const StatCard = ({ icon, label, value, hint }: StatCardProps) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-emerald-300">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-1 truncate text-xl font-black text-slate-950 dark:text-white">{value}</p>
      </div>
    </div>
    {hint && <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">{hint}</p>}
  </div>
);

const ProfilePage = () => {
  const token = useAuthStore((state) => state.token);
  const setStoreUser = useAuthStore((state) => state.setUser);
  const [profileUser, setProfileUser] = useState<CurrentUser | null>(null);
  const [subscription, setSubscription] = useState<MySubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingAvatar, setIsSavingAvatar] = useState(false);
  const [isRenewingSubscription, setIsRenewingSubscription] = useState(false);
  const [isCancellingSubscription, setIsCancellingSubscription] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [profileForm, setProfileForm] = useState<ProfileFormState>(emptyProfileForm);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(PUBLIC_ROUTE.LOGIN);
      return;
    }

    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const [userResponse, subscriptionResponse] = await Promise.allSettled([
          GetCurrentUserService(token),
          getMySubscription(token),
        ]);

        if (userResponse.status === "fulfilled" && userResponse.value) {
          setProfileUser(userResponse.value);
          setStoreUser(userResponse.value);
        } else {
          setErrorMessage("Không thể tải thông tin hồ sơ.");
        }

        if (subscriptionResponse.status === "fulfilled") {
          setSubscription(subscriptionResponse.value);
        } else {
          setSubscription(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadProfile();
  }, [navigate, setStoreUser, token]);

  const displayName = getDisplayName(profileUser);
  const initials = getInitials(displayName);
  const profile = profileUser?.userProfile;
  const avatarUrl = profile?.avatarUrl || profileUser?.avatarUrl;

  useEffect(() => {
    if (!profileUser) return;

    const currentProfile = profileUser.userProfile;
    setProfileForm({
      firstName: currentProfile?.firstName ?? "",
      lastName: currentProfile?.lastName ?? "",
      dateOfBirth: currentProfile?.dateOfBirth ?? "",
      occupation: currentProfile?.occupation ?? "",
      heightCm: currentProfile?.heightCm?.toString() ?? "",
      weightKg: currentProfile?.weightKg?.toString() ?? "",
      age: currentProfile?.age?.toString() ?? "",
      gender: (currentProfile?.gender as ProfileFormState["gender"] | undefined) ?? "OTHER",
      goal: (currentProfile?.goal as ProfileFormState["goal"] | undefined) ?? "MAINTAIN",
      activityLevel:
        (currentProfile?.activityLevel as ProfileFormState["activityLevel"] | undefined) ??
        "SEDENTARY",
      targetWeightKg: currentProfile?.targetWeightKg?.toString() ?? "",
      targetDate: currentProfile?.targetDate ?? "",
      medicalConditions: toCsv(currentProfile?.medicalConditions),
      allergies: toCsv(currentProfile?.allergies),
    });
  }, [profileUser]);

  const updateProfileForm = (field: keyof ProfileFormState, value: string) => {
    setProfileForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSaveAvatar = async (avatarUrlToSave: string) => {
    if (!token) return;

    const nextAvatarUrl = avatarUrlToSave.trim();

    if (!nextAvatarUrl) {
      toast.error("Avatar URL không được để trống.");
      return;
    }

    try {
      setIsSavingAvatar(true);
      const savedAvatarUrl = await updateUserAvatar({
        accessToken: token,
        avatarUrl: nextAvatarUrl,
      });

      setProfileUser((current) => {
        if (!current) return current;

        const updatedUser = {
          ...current,
          avatarUrl: savedAvatarUrl,
          userProfile: {
            ...current.userProfile,
            avatarUrl: savedAvatarUrl,
          },
        };
        setStoreUser(updatedUser);
        return updatedUser;
      });
      setIsAvatarModalOpen(false);
      toast.success("Cập nhật avatar thành công.");
    } catch (error) {
      console.error("Could not update avatar:", error);
      toast.error("Không thể cập nhật avatar. Vui lòng thử lại.");
    } finally {
      setIsSavingAvatar(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!token) return;

    try {
      setIsSavingProfile(true);
      const updatedProfile = await updateUserProfile({
        accessToken: token,
        body: {
          firstName: profileForm.firstName.trim(),
          lastName: profileForm.lastName.trim(),
          dateOfBirth: profileForm.dateOfBirth || undefined,
          occupation: profileForm.occupation.trim(),
          heightCm: Number(profileForm.heightCm),
          weightKg: Number(profileForm.weightKg),
          age: Number(profileForm.age),
          gender: profileForm.gender,
          goal: profileForm.goal,
          activityLevel: profileForm.activityLevel,
          targetWeightKg: profileForm.targetWeightKg
            ? Number(profileForm.targetWeightKg)
            : undefined,
          targetDate: profileForm.targetDate || undefined,
          medicalConditions: fromCsv(profileForm.medicalConditions),
          allergies: fromCsv(profileForm.allergies),
        },
      });

      if (updatedProfile) {
        setProfileUser((current) => {
          if (!current) return current;

          const updatedUser = {
            ...current,
            userProfile: {
              ...current.userProfile,
              ...updatedProfile,
            },
          };
          setStoreUser(updatedUser);
          return updatedUser;
        });
      }

      setIsProfileModalOpen(false);
      toast.success("Cập nhật hồ sơ thành công.");
    } catch (error) {
      console.error("Could not update profile:", error);
      toast.error("Không thể cập nhật hồ sơ. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const refreshSubscription = async () => {
    if (!token) return;

    try {
      const nextSubscription = await getMySubscription(token);
      setSubscription(nextSubscription);
    } catch {
      setSubscription(null);
    }
  };

  const handleRenewSubscription = async () => {
    if (!token || !subscription) return;

    try {
      setIsRenewingSubscription(true);
      const response = await renewMySubscription(token);

      if (response?.requiresPayment && response.paymentUrl) {
        window.open(response.paymentUrl, "_blank", "noopener,noreferrer");
        toast.info("Vui lòng hoàn tất thanh toán để gia hạn gói.");
        return;
      }

      toast.success("Gia hạn gói thành công.");
      await refreshSubscription();
    } catch (error) {
      console.error("Could not renew subscription:", error);
      toast.error("Không thể gia hạn gói. Vui lòng thử lại.");
    } finally {
      setIsRenewingSubscription(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!token || !subscription) return;

    const confirmed = window.confirm(
      "Bạn chắc chắn muốn hủy gói hiện tại? Sau khi hủy, bạn mới có thể đăng ký gói khác.",
    );

    if (!confirmed) return;

    try {
      setIsCancellingSubscription(true);
      const response = await cancelMySubscription(token);
      toast.success(response?.refundMessage || "Hủy gói thành công.");
      await refreshSubscription();
    } catch (error) {
      console.error("Could not cancel subscription:", error);
      toast.error("Không thể hủy gói. Vui lòng thử lại.");
    } finally {
      setIsCancellingSubscription(false);
    }
  };

  const handleChangePassword = async (oldPassword: string, newPassword: string) => {
    try {
      setIsChangingPassword(true);
      await ChangePasswordService({ oldPassword, newPassword });
      setIsPasswordModalOpen(false);
      toast.success("Đổi mật khẩu thành công.");
    } catch (error) {
      console.error("Could not change password:", error);
      toast.error("Không thể đổi mật khẩu. Vui lòng kiểm tra mật khẩu hiện tại.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const healthStats = useMemo(
    () => [
      {
        icon: <Weight size={22} />,
        label: "Cân nặng",
        value: formatNumber(profile?.weightKg, " kg"),
        hint: `Mục tiêu: ${formatNumber(profile?.targetWeightKg, " kg")}`,
      },
      {
        icon: <Ruler size={22} />,
        label: "Chiều cao",
        value: formatNumber(profile?.heightCm, " cm"),
        hint: `Cân nặng ban đầu: ${formatNumber(profile?.initialWeight, " kg")}`,
      },
      {
        icon: <Activity size={22} />,
        label: "Hoạt động",
        value: formatText(profile?.activityLevel),
        hint: `Calories mục tiêu: ${formatNumber(profile?.baseTargetCalorie, " kcal")}`,
      },
      {
        icon: <Target size={22} />,
        label: "Mục tiêu",
        value: formatText(profile?.goal),
        hint: `Ngày đích: ${formatDate(profile?.targetDate)}`,
      },
    ],
    [profile],
  );

  if (isLoading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-background-light px-4 dark:bg-slate-950">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:text-slate-200">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          Đang tải hồ sơ...
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-background-light px-4 py-12 text-slate-950 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {errorMessage && (
          <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-200">
            {errorMessage}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900"
        >
          <div className="bg-linear-to-br from-primary/15 via-accent-soft to-white p-6 dark:from-primary/20 dark:via-slate-900 dark:to-slate-900 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => setIsAvatarModalOpen(true)}
                  className="group relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-4xl font-black text-white shadow-lg ring-4 ring-white/80 transition hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-primary/25 dark:ring-white/10"
                  aria-label="Chỉnh sửa avatar"
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    initials
                  )}
                  <span className="absolute inset-x-0 bottom-0 flex h-9 items-center justify-center bg-slate-950/55 opacity-0 transition group-hover:opacity-100">
                    <Camera size={18} />
                  </span>
                </button>
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-black uppercase text-primary shadow-sm dark:bg-white/10 dark:text-emerald-300">
                    <Sparkles size={14} />
                    Hồ sơ Genefit
                  </div>
                  <h1 className="mt-4 text-4xl font-black tracking-normal text-slate-950 dark:text-white sm:text-5xl">
                    {displayName}
                  </h1>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    <span className="inline-flex items-center gap-2">
                      <Mail size={16} />
                      {profileUser?.email || profileUser?.username || "Chưa cập nhật email"}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <User size={16} />
                      {formatText(profile?.gender)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-primary hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-white/10 dark:bg-white/10 dark:text-white"
                  aria-label="Đổi mật khẩu"
                  title="Đổi mật khẩu"
                >
                  <KeyRound size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(true)}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-primary transition hover:bg-primary-hover hover:shadow-primary-lg focus:outline-none focus:ring-4 focus:ring-primary/20"
                  aria-label="Chỉnh sửa hồ sơ"
                  title="Chỉnh sửa hồ sơ"
                >
                  <Edit3 size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {healthStats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <HeartPulse className="h-6 w-6 text-primary dark:text-emerald-300" />
                  <h2 className="text-xl font-black text-slate-950 dark:text-white">
                    Sức khỏe & mục tiêu
                  </h2>
                </div>
                <div className="mt-5 grid gap-3 text-sm">
                  {[
                    ["Tuổi", formatNumber(profile?.age)],
                    ["Ngày sinh", formatDate(profile?.dateOfBirth)],
                    ["Nghề nghiệp", profile?.occupation || "Chưa cập nhật"],
                    ["Bắt đầu mục tiêu", formatDate(profile?.goalStartDate)],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-white/5"
                    >
                      <span className="text-slate-500 dark:text-slate-400">{label}</span>
                      <span className="text-right font-bold text-slate-900 dark:text-white">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-primary dark:text-emerald-300" />
                  <h2 className="text-xl font-black text-slate-950 dark:text-white">
                    Lưu ý cá nhân
                  </h2>
                </div>
                <div className="mt-5 space-y-5">
                  <div>
                    <p className="text-sm font-black text-slate-950 dark:text-white">
                      Tình trạng sức khỏe
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(profile?.medicalConditions?.length
                        ? profile.medicalConditions
                        : ["Chưa cập nhật"]
                      ).map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-950 dark:text-white">
                      Dị ứng
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(profile?.allergies?.length ? profile.allergies : ["Chưa cập nhật"]).map(
                        (item) => (
                          <span
                            key={item}
                            className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300"
                          >
                            {item}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[28px] border border-primary/25 bg-white p-6 shadow-sm ring-2 ring-primary/10 dark:border-primary/30 dark:bg-slate-900 dark:ring-primary/20">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-emerald-300">
                    <Crown size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase text-primary dark:text-emerald-300">
                      Subscription
                    </p>
                    <h2 className="text-xl font-black text-slate-950 dark:text-white">
                      {subscription?.planName ?? "Chưa có gói active"}
                    </h2>
                  </div>
                </div>
                <ShieldCheck className="h-6 w-6 text-primary dark:text-emerald-300" />
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {subscription?.description ||
                  "Nâng cấp gói để mở khóa thêm giới hạn AI, báo cáo và công cụ theo dõi chuyên sâu."}
              </p>
              {subscription?.active && subscription.planType.toUpperCase() !== "FREE" && (
                <p className="mt-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold leading-6 text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">
                  Bạn cần hủy gói hiện tại trước khi đăng ký một gói khác.
                </p>
              )}

              <div className="mt-5 space-y-3 text-sm">
                {[
                  ["Trạng thái", subscription?.status ?? "Chưa active"],
                  ["Ngày bắt đầu", formatDate(subscription?.startDate)],
                  ["Ngày hết hạn", formatDate(subscription?.endDate)],
                  [
                    "Scan AI/ngày",
                    subscription
                      ? subscription.maxAiScansPerDay.toLocaleString("vi-VN")
                      : "Chưa có",
                  ],
                  [
                    "Gợi ý bữa ăn/tháng",
                    subscription
                      ? subscription.mealSuggestionLimitPerMonth.toLocaleString("vi-VN")
                      : "Chưa có",
                  ],
                  [
                    "Nhắc nhở",
                    subscription ? subscription.reminderLimit.toLocaleString("vi-VN") : "Chưa có",
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-white/5"
                  >
                    <span className="text-slate-500 dark:text-slate-400">{label}</span>
                    <span className="text-right font-bold text-slate-900 dark:text-white">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {subscription ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <button
                    type="button"
                    onClick={handleRenewSubscription}
                    disabled={isRenewingSubscription || isCancellingSubscription}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-black text-white shadow-primary transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isRenewingSubscription ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ArrowRight size={18} />
                    )}
                    Gia hạn gói
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelSubscription}
                    disabled={isRenewingSubscription || isCancellingSubscription}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 text-sm font-black text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-70 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-200 dark:hover:bg-red-500/15"
                  >
                    {isCancellingSubscription ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ShieldCheck size={18} />
                    )}
                    Hủy gói
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate(PUBLIC_ROUTE.PRICING)}
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-primary dark:bg-white dark:text-slate-950 dark:hover:bg-emerald-100"
                >
                  Nâng cấp ngay
                  <ArrowRight size={18} />
                </button>
              )}
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <Dumbbell className="h-6 w-6 text-primary dark:text-emerald-300" />
                <h2 className="text-xl font-black text-slate-950 dark:text-white">
                  Quyền lợi đang bật
                </h2>
              </div>
              <div className="mt-5 space-y-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                {[
                  ["Kế hoạch bữa ăn", subscription?.mealPlanEnabled],
                  ["Báo cáo tuần", subscription?.weeklyReportEnabled],
                  ["Báo cáo tháng", subscription?.monthlyReportEnabled],
                  ["Xuất báo cáo", subscription?.exportReportEnabled],
                  ["Theo dõi macro", subscription?.macroTrackingEnabled],
                  ["Tính năng coach", subscription?.coachFeaturesEnabled],
                ].map(([label, enabled]) => (
                  <div key={String(label)} className="flex items-center gap-3">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full ${
                        enabled
                          ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-emerald-300"
                          : "bg-slate-100 text-slate-400 dark:bg-white/10 dark:text-slate-500"
                      }`}
                    >
                      <ShieldCheck size={13} />
                    </span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <ProfileEditModal
        form={profileForm}
        isOpen={isProfileModalOpen}
        isSaving={isSavingProfile}
        onChange={updateProfileForm}
        onClose={() => {
          if (!isSavingProfile) setIsProfileModalOpen(false);
        }}
        onSubmit={handleSaveProfile}
      />

      <AvatarEditModal
        avatarUrl={avatarUrl}
        initials={initials}
        isOpen={isAvatarModalOpen}
        isSaving={isSavingAvatar}
        onClose={() => {
          if (!isSavingAvatar) setIsAvatarModalOpen(false);
        }}
        onSave={handleSaveAvatar}
      />

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        isSaving={isChangingPassword}
        onClose={() => {
          if (!isChangingPassword) setIsPasswordModalOpen(false);
        }}
        onSubmit={handleChangePassword}
      />
    </section>
  );
};

export default ProfilePage;
