import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Check,
  Crown,
  FileText,
  History,
  Loader2,
  RefreshCw,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PUBLIC_ROUTE } from "../../constants/routes/public.route";
import { useAuthStore } from "../../stores/auth.store";
import {
  getActiveSubscriptionPlans,
  getMySubscription,
  initSubscriptionPayment,
  type MySubscription,
  type PaymentMethod,
} from "./services/subscriptionPricing.service";
import type { SubscriptionPlan } from "./models/subscriptionPlan.model";
import SubscriptionConfirmModal from "../../components/subscription/SubscriptionConfirmModal";

type FeatureItem = {
  label: string;
  available: boolean;
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const formatPrice = (price: number) => {
  if (!price) return "Miễn phí";

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
};

const formatPeriod = (durationDays: number) => {
  if (!durationDays) return "";
  if (durationDays >= 365) return "/năm";
  if (durationDays >= 28) return "/tháng";
  return `/${durationDays} ngày`;
};

const formatLimit = (value: number, unit: string) => {
  if (value < 0) return `Không giới hạn ${unit}`;
  if (value === 0) return `Không có ${unit}`;
  return `${value.toLocaleString("vi-VN")} ${unit}`;
};

const getPlanBadge = (plan: SubscriptionPlan, index: number) => {
  if (plan.planType.toUpperCase().includes("PREMIUM")) return "Phổ biến";
  if (plan.trial) return "Dùng thử";
  if (index === 1) return "Đề xuất";
  return "";
};

const getFeatureItems = (plan: SubscriptionPlan): FeatureItem[] => [
  {
    label: formatLimit(plan.maxAiScansPerDay, "lượt scan AI mỗi ngày"),
    available: plan.maxAiScansPerDay !== 0,
  },
  {
    label: formatLimit(plan.mealSuggestionLimitPerMonth, "gợi ý bữa ăn mỗi tháng"),
    available: plan.mealSuggestionLimitPerMonth !== 0,
  },
  {
    label: formatLimit(plan.reminderLimit, "nhắc nhở sức khỏe"),
    available: plan.reminderLimit !== 0,
  },
  {
    label: `${plan.maxHistoryViewDays.toLocaleString("vi-VN")} ngày lịch sử theo dõi`,
    available: plan.maxHistoryViewDays > 0,
  },
  {
    label: plan.mealPlanEnabled ? "Kế hoạch bữa ăn thông minh" : "Kế hoạch bữa ăn cơ bản",
    available: plan.mealPlanEnabled,
  },
  {
    label: "Theo dõi macro, thâm hụt và thặng dư calo",
    available:
      plan.macroTrackingEnabled ||
      plan.calorieDeficitTrackingEnabled ||
      plan.calorieSurplusTrackingEnabled,
  },
  {
    label: "Báo cáo tuần, tháng và xuất dữ liệu",
    available:
      plan.weeklyReportEnabled || plan.monthlyReportEnabled || plan.exportReportEnabled,
  },
  {
    label: "Chia sẻ gia đình và tính năng coach",
    available: plan.familySharingEnabled || plan.coachFeaturesEnabled,
  },
];

const hasLockedPaidSubscription = (subscription: MySubscription | null) => {
  if (!subscription?.active) return false;

  return subscription.planType.toUpperCase() !== "FREE";
};

const PricingSkeleton = () => (
  <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
    {[0, 1, 2].map((item) => (
      <div
        key={item}
        className="h-full rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900"
      >
        <div className="h-7 w-28 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
        <div className="mt-8 h-10 w-44 animate-pulse rounded-xl bg-slate-200 dark:bg-white/10" />
        <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-white/10" />
        <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
        <div className="mt-8 space-y-3">
          {[0, 1, 2, 3, 4].map((row) => (
            <div key={row} className="h-5 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
          ))}
        </div>
      </div>
    ))}
  </div>
);

const SubscriptionUpgradePage = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("VNPAY");
  const [processingPlanId, setProcessingPlanId] = useState<number | null>(null);
  const token = useAuthStore((state) => state.token);
  const [currentSubscription, setCurrentSubscription] =
    useState<MySubscription | null>(null);
  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPlans = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const activePlans = await getActiveSubscriptionPlans();
        setPlans(activePlans);
      } catch (error) {
        console.error("Could not load active subscription plans:", error);
        setErrorMessage("Không thể tải danh sách gói. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadPlans();
  }, []);

  useEffect(() => {
    const loadCurrentSubscription = async () => {
      if (!token) {
        setCurrentSubscription(null);
        return;
      }

      try {
        setIsSubscriptionLoading(true);
        const subscription = await getMySubscription(token);
        setCurrentSubscription(subscription);
      } catch (error) {
        setCurrentSubscription(null);
        console.warn("Could not load current subscription:", error);
      } finally {
        setIsSubscriptionLoading(false);
      }
    };

    void loadCurrentSubscription();
  }, [token]);

  const sortedPlans = useMemo(() => {
    return [...plans].sort((first, second) => first.price - second.price);
  }, [plans]);

  const isPlanSwitchLocked = hasLockedPaidSubscription(currentSubscription);

  const handleChoosePlan = async (plan: SubscriptionPlan) => {
    if (currentSubscription?.planId === plan.planId) {
      toast.info("Bạn đang sử dụng gói này.");
      return;
    }

    if (isPlanSwitchLocked) {
      toast.info("Vui lòng hủy gói hiện tại trước khi đăng ký gói khác.");
      return;
    }

    if (!plan.price) {
      navigate(token ? PUBLIC_ROUTE.HOME : PUBLIC_ROUTE.REGISTER);
      return;
    }

    if (!token) {
      toast.info("Vui lòng đăng nhập để nâng cấp gói.");
      navigate(PUBLIC_ROUTE.LOGIN);
      return;
    } 
      setConfirmModalOpen(true);
      setSelectedPlan(plan);
      
  };

  const handleCloseConfirmModal = () => {
    if (processingPlanId !== null) return;

    setConfirmModalOpen(false);
    setSelectedPlan(null);
  };

  const handleConfirmPayment = async () => {
    if (!selectedPlan || !token) {
      return;
    }

    try {
      setProcessingPlanId(selectedPlan.planId);
      const payment = await initSubscriptionPayment({
        accessToken: token,
        paymentMethod,
        planId: selectedPlan.planId,
      });

      if (payment.payUrl) {
        window.open(payment.payUrl, "_blank", "noopener,noreferrer");
        setConfirmModalOpen(false);
        return;
      }

      toast.success("Yêu cầu thanh toán đã được tạo thành công.");
      setConfirmModalOpen(false);
      setSelectedPlan(null);
    } catch (error) {
      console.error("Could not initialize subscription payment:", error);
      toast.error("Không thể khởi tạo thanh toán. Vui lòng thử lại.");
    } finally {
      setProcessingPlanId(null);
    }
  };

  return (
    <section className="w-full bg-background-light px-4 py-16 text-slate-950 dark:bg-slate-950 dark:text-white sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent-soft px-4 py-2 text-sm font-semibold text-primary dark:border-primary/30 dark:bg-primary/10 dark:text-emerald-300">
            <Sparkles size={16} />
            Premium Genefit
          </div>
          <h1 className="text-4xl font-black tracking-normal text-slate-950 dark:text-white sm:text-5xl lg:text-[48px] lg:leading-tight">
            Nâng cấp gói của bạn
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Chọn gói phù hợp với mục tiêu sức khỏe và nhu cầu sử dụng của bạn.
          </p>
        </motion.div>

        {token && (
          <div className="mx-auto mt-10 max-w-3xl rounded-[24px] border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-emerald-300">
                  <Crown size={24} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-950 dark:text-white">
                    Gói hiện tại
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {isSubscriptionLoading
                      ? "Đang kiểm tra gói đăng ký..."
                      : currentSubscription
                        ? `${currentSubscription.planName} • ${currentSubscription.status}`
                        : "Bạn chưa có gói active."}
                  </p>
                  {isPlanSwitchLocked && (
                    <p className="mt-2 text-xs font-semibold text-amber-700 dark:text-amber-300">
                      Bạn cần hủy gói hiện tại trước khi đăng ký gói khác.
                    </p>
                  )}
                </div>
              </div>
              {currentSubscription?.endDate && (
                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 dark:bg-white/10 dark:text-slate-200">
                  Hết hạn{" "}
                  {new Intl.DateTimeFormat("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }).format(new Date(currentSubscription.endDate))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-8">
          {isLoading && <PricingSkeleton />}

          {!isLoading && errorMessage && (
            <div className="mx-auto max-w-xl rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-200">
              <p className="font-semibold">{errorMessage}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700"
              >
                <RefreshCw size={16} />
                Tải lại
              </button>
            </div>
          )}

          {!isLoading && !errorMessage && sortedPlans.length === 0 && (
            <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-white/10 dark:bg-slate-900">
              <Crown className="mx-auto h-10 w-10 text-primary dark:text-emerald-300" />
              <h2 className="mt-4 text-xl font-black text-slate-950 dark:text-white">
                Chưa có gói đang mở bán
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Genefit sẽ cập nhật các gói mới trong thời gian tới.
              </p>
            </div>
          )}

          {!isLoading && !errorMessage && sortedPlans.length > 0 && (
            <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
              {sortedPlans.map((plan, index) => {
                const badge = getPlanBadge(plan, index);
                const isHighlighted = badge === "Phổ biến" || badge === "Đề xuất";
                const isProcessing = processingPlanId === plan.planId;
                const isCurrentPlan = currentSubscription?.planId === plan.planId;
                const isLockedByActivePlan = isPlanSwitchLocked && !isCurrentPlan;

                return (
                  <motion.article
                    key={plan.planId}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
                    className={`relative flex h-full flex-col overflow-hidden rounded-[28px] border p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                      isHighlighted
                        ? "border-primary bg-white ring-2 ring-primary/15 dark:border-primary dark:bg-slate-900 dark:ring-primary/25"
                        : "border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900"
                    }`}
                  >
                    {(isHighlighted || isCurrentPlan) && (
                      <div
                        className={`absolute right-5 top-5 rounded-full px-3 py-1 text-xs font-black uppercase ${
                          isCurrentPlan
                            ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                            : "bg-primary text-white"
                        }`}
                      >
                        {isCurrentPlan ? "Đang dùng" : badge}
                      </div>
                    )}

                    <div className="flex items-start gap-3 pr-24">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-emerald-300">
                        {plan.planType.toUpperCase().includes("FAMILY") ? (
                          <Users size={24} />
                        ) : plan.planType.toUpperCase().includes("FREE") ? (
                          <ShieldCheck size={24} />
                        ) : (
                          <Crown size={24} />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase text-primary dark:text-emerald-300">
                          {plan.planType}
                        </p>
                        <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
                          {plan.planName}
                        </h2>
                      </div>
                    </div>

                    <p className="mt-5 min-h-12 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {plan.description || "Gói linh hoạt cho hành trình sức khỏe cá nhân."}
                    </p>

                    <div className="mt-6 flex items-end gap-2">
                      <span className="text-4xl font-black text-slate-950 dark:text-white">
                        {formatPrice(plan.price)}
                      </span>
                      <span className="pb-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                        {formatPeriod(plan.durationDays)}
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-2">
                      <div className="rounded-2xl bg-slate-50 p-3 dark:bg-white/5">
                        <ScanLine className="h-5 w-5 text-primary dark:text-emerald-300" />
                        <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                          {plan.maxAiScansPerDay} scan/ngày
                        </p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-3 dark:bg-white/5">
                        <History className="h-5 w-5 text-primary dark:text-emerald-300" />
                        <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                          {plan.maxHistoryViewDays} ngày
                        </p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-3 dark:bg-white/5">
                        <Bell className="h-5 w-5 text-primary dark:text-emerald-300" />
                        <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                          {plan.reminderLimit} nhắc
                        </p>
                      </div>
                    </div>

                    <ul className="mt-6 flex-1 space-y-3">
                      {getFeatureItems(plan).map((feature) => (
                        <li
                          key={feature.label}
                          className={`flex gap-3 text-sm leading-6 ${
                            feature.available
                              ? "text-slate-700 dark:text-slate-200"
                              : "text-slate-400 dark:text-slate-500"
                          }`}
                        >
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                              feature.available
                                ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-emerald-300"
                                : "bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-500"
                            }`}
                          >
                            <Check size={14} />
                          </span>
                          <span>{feature.label}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => handleChoosePlan(plan)}
                      disabled={isProcessing || isCurrentPlan || isLockedByActivePlan}
                      className={`mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-black transition duration-200 disabled:cursor-not-allowed disabled:opacity-70 ${
                        isHighlighted
                          ? "bg-primary text-white shadow-primary hover:bg-primary-hover hover:shadow-primary-lg"
                          : "border border-slate-200 bg-slate-950 text-white hover:bg-primary dark:border-white/10 dark:bg-white dark:text-slate-950 dark:hover:bg-emerald-100"
                      }`}
                    >
                      {isProcessing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : plan.price ? (
                        <Zap className="h-4 w-4" />
                      ) : (
                        <FileText className="h-4 w-4" />
                      )}
                      <span>
                        {isCurrentPlan
                          ? "Gói hiện tại"
                          : isLockedByActivePlan
                            ? "Cần hủy gói hiện tại"
                          : plan.price
                            ? "Nâng cấp ngay"
                            : "Bắt đầu miễn phí"}
                      </span>
                      {!isProcessing && <ArrowRight className="h-4 w-4" />}
                    </button>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {confirmModalOpen && selectedPlan && (
        <SubscriptionConfirmModal
          plan={selectedPlan}
          paymentMethod={paymentMethod}
          isProcessing={processingPlanId === selectedPlan.planId}
          onPaymentMethodChange={setPaymentMethod}
          onClose={handleCloseConfirmModal}
          onConfirm={handleConfirmPayment}
        />
      )}
    </section>
  );
};

export default SubscriptionUpgradePage;
