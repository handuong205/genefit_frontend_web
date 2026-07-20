import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Loader2,
  ScanLine,
  ShieldCheck,
  Sparkles,
  WalletCards,
  X,
} from "lucide-react";
import { useEffect } from "react";
import type { PaymentMethod } from "../../pages/subscription/services/subscriptionPricing.service";
import type { SubscriptionPlan } from "../../pages/subscription/models/subscriptionPlan.model";

interface SubscriptionConfirmModalProps {
  plan: SubscriptionPlan;
  paymentMethod: PaymentMethod;
  isProcessing?: boolean;
  onPaymentMethodChange: (paymentMethod: PaymentMethod) => void;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

const paymentOptions = [
  {
    value: "VNPAY",
    label: "VNPay",
    description: "Thanh toán qua ngân hàng, thẻ ATM hoặc QR VNPay.",
  },
  {
    value: "MOMO",
    label: "MoMo",
    description: "Thanh toán nhanh bằng ví điện tử MoMo.",
  },
];
const formatPrice = (price: number) => {
  if (!price) return "Miễn phí";

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
};

const formatPeriod = (durationDays: number) => {
  if (durationDays >= 365) return `${Math.round(durationDays / 365)} năm`;
  if (durationDays >= 28) return `${Math.round(durationDays / 30)} tháng`;
  return `${durationDays} ngày`;
};

const SubscriptionConfirmModal = ({
  plan,
  paymentMethod,
  isProcessing = false,
  onPaymentMethodChange,
  onClose,
  onConfirm,
}: SubscriptionConfirmModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isProcessing) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isProcessing, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={() => {
          if (!isProcessing) onClose();
        }}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="subscription-confirm-title"
          className="max-h-[calc(100vh-3rem)] w-full max-w-140 overflow-y-auto rounded-[28px] border border-slate-200 bg-white p-2 text-slate-950 shadow-2xl shadow-slate-950/20 dark:border-white/10 dark:bg-slate-900 dark:text-white"
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 18 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <div className="rounded-3xl bg-slate-50 p-5 dark:bg-white/5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-emerald-300">
                  <WalletCards size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase text-primary dark:text-emerald-300">
                    Xác nhận thanh toán
                  </p>
                  <h2
                    id="subscription-confirm-title"
                    className="mt-1 text-2xl font-black text-slate-950 dark:text-white"
                  >
                    Nâng cấp {plan.planName}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-200 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Đóng modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-950/60">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-black uppercase text-primary dark:bg-primary/15 dark:text-emerald-300">
                    <Sparkles size={14} />
                    {plan.planType}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {plan.description ||
                      "Gói linh hoạt cho hành trình sức khỏe cá nhân."}
                  </p>
                </div>
                <div className="shrink-0 sm:text-right">
                  <p className="text-3xl font-black text-slate-950 dark:text-white">
                    {formatPrice(plan.price)}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {formatPeriod(plan.durationDays)}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-white/5">
                  <ScanLine className="h-5 w-5 text-primary dark:text-emerald-300" />
                  <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    {plan.maxAiScansPerDay} scan/ngày
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-white/5">
                  <CalendarDays className="h-5 w-5 text-primary dark:text-emerald-300" />
                  <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    {plan.maxHistoryViewDays} ngày lịch sử
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-white/5">
                  <ShieldCheck className="h-5 w-5 text-primary dark:text-emerald-300" />
                  <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    Thanh toán bảo mật
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-black text-slate-950 dark:text-white">
                Chọn phương thức thanh toán
              </p>
              <div className="mt-3 grid gap-3">
                {paymentOptions.map((option) => {
                  const isSelected = paymentMethod === option.value;

                  const theme =
                    option.value === "VNPAY"
                      ? {
                          border: "border-blue-500",
                          bg: "bg-blue-50 dark:bg-blue-500/10",
                          ring: "ring-blue-500/20",

                          text: "text-blue-600 dark:text-blue-400",
                        }
                      : {
                          border: "border-pink-500",
                          bg: "bg-pink-50 dark:bg-pink-500/10",
                          ring: "ring-pink-500/20",

                          text: "text-pink-600 dark:text-pink-400",
                        };

                  return (
                    <motion.button
                      key={option.value}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      disabled={isProcessing}
                      onClick={() =>
                        onPaymentMethodChange(option.value as PaymentMethod)
                      }
                      className={`
        group relative flex w-full items-center gap-4
        rounded-2xl border p-4
        transition-all duration-300

        ${
          isSelected
            ? `${theme.border} ${theme.bg} ring-2 ${theme.ring} shadow-md`
            : "border-outline-variant bg-background hover:border-primary/40 hover:shadow-sm"
        }
      `}
                    >
                      {/* Logo */}
                      <div
                        className={`
          flex h-14 w-14 shrink-0 items-center justify-center
          rounded-2xl transition-all duration-300

    
        `}
                      >
                        <img
                          src={
                            option.value === "VNPAY"
                              ? "/public/vnpay.png"
                              : "/public/momo.png"
                          }
                          alt={option.label}
                          className="h-8 w-8 object-contain"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <p
                            className={`text-lg font-bold transition-colors ${
                              isSelected ? theme.text : "text-on-surface"
                            }`}
                          >
                            {option.label}
                          </p>

                          {isSelected && (
                            <span
                              className={`
                rounded-full px-2 py-0.5
                text-xs font-bold
                ${theme.bg}
                ${theme.text}
              `}
                            >
                              Đã chọn
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-sm text-on-surface-variant">
                          {option.description}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300">
              Bạn sẽ được chuyển sang cổng thanh toán sau khi xác nhận. Gói sẽ
              được kích hoạt khi giao dịch hoàn tất.
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isProcessing}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-black text-white shadow-primary transition hover:bg-primary-hover hover:shadow-primary-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isProcessing && <Loader2 className="h-4 w-4 animate-spin" />}
                <span>
                  {isProcessing ? "Đang xử lý..." : "Xác nhận thanh toán"}
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SubscriptionConfirmModal;
