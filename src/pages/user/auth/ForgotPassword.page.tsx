import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonSubmit from "../../../components/common/button/Button";
import { PUBLIC_ROUTE } from "../../../constants/routes/public.route";
import {
  ForgotPasswordOtpService,
  ResetPasswordService,
} from "./services/password.service";

type ForgotStep = "email" | "otp" | "password";

const OTP_LENGTH = 6;
const createEmptyOtpDigits = () => Array<string>(OTP_LENGTH).fill("");
const isValidEmail = (email: string) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

const inputClass =
  "peer w-full rounded-xl border border-outline-variant bg-white px-12 py-4 text-on-surface outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";

const labelClass =
  "absolute left-12 top-4 text-sm font-semibold text-on-surface-variant transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-focus:-top-2 peer-focus:bg-white peer-focus:px-2 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-primary";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<ForgotStep>("email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpDigits, setOtpDigits] = useState(createEmptyOtpDigits);
  const [otpError, setOtpError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const otpInputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const otpCode = useMemo(() => otpDigits.join(""), [otpDigits]);
  const currentStepIndex = step === "email" ? 0 : step === "otp" ? 1 : 2;

  const handleSendOtp = async () => {
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setEmailError("Email không được để trống");
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setEmailError("Email sai định dạng, ví dụ abc@gmail.com");
      return;
    }

    try {
      setIsSendingOtp(true);
      setEmailError("");
      await ForgotPasswordOtpService(normalizedEmail);
      setEmail(normalizedEmail);
      setOtpDigits(createEmptyOtpDigits());
      setOtpError("");
      setStep("otp");
      toast.success("OTP đã được gửi đến email của bạn");
    } catch (error) {
      console.error("Forgot password OTP failed:", error);
      toast.error("Không thể gửi OTP. Vui lòng thử lại.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const syncOtpDigits = (digits: string[]) => {
    setOtpDigits(digits);
    setOtpError("");
  };

  const handleOtpDigitChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, "").split("");
    const nextDigits = [...otpDigits];

    if (digits.length > 1) {
      digits.slice(0, OTP_LENGTH).forEach((digit, digitIndex) => {
        nextDigits[digitIndex] = digit;
      });
      syncOtpDigits(nextDigits);
      otpInputRefs.current[Math.min(digits.length, OTP_LENGTH) - 1]?.focus();
      return;
    }

    nextDigits[index] = digits[0] ?? "";
    syncOtpDigits(nextDigits);

    if (digits[0] && index < OTP_LENGTH - 1) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otpDigits[index]) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
      .split("");
    const nextDigits = createEmptyOtpDigits();

    pastedDigits.forEach((digit, index) => {
      nextDigits[index] = digit;
    });
    syncOtpDigits(nextDigits);
    otpInputRefs.current[Math.min(pastedDigits.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleConfirmOtp = () => {
    if (!/^[0-9]{6}$/.test(otpCode)) {
      setOtpError("OTP phải gồm 6 chữ số");
      return;
    }

    setStep("password");
  };

  const validatePassword = () => {
    let isValid = true;

    if (!newPassword) {
      setPasswordError("Mật khẩu mới không được để trống");
      isValid = false;
    } else if (newPassword.length < 8) {
      setPasswordError("Mật khẩu mới phải có ít nhất 8 ký tự");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Vui lòng xác nhận mật khẩu mới");
      isValid = false;
    } else if (confirmPassword !== newPassword) {
      setConfirmPasswordError("Mật khẩu xác nhận không khớp");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleResetPassword = async () => {
    if (!validatePassword()) return;

    try {
      setIsResetting(true);
      await ResetPasswordService({ email, otpCode, newPassword });
      toast.success("Đổi mật khẩu thành công. Vui lòng đăng nhập lại.");
      navigate(PUBLIC_ROUTE.LOGIN);
    } catch (error) {
      console.error("Reset password failed:", error);
      toast.error("Không thể đổi mật khẩu. Vui lòng kiểm tra OTP và thử lại.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-background-light px-4 py-10">
      <div className="w-full max-w-3xl rounded-3xl border border-outline-variant bg-white p-6 shadow-2xl shadow-primary/10 sm:p-10">
        <Link
          to={PUBLIC_ROUTE.LOGIN}
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
        >
          <ArrowLeft size={17} />
          Quay lại đăng nhập
        </Link>

        <div className="mt-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white">
            <Lock size={32} />
          </div>
          <h1 className="mt-5 text-4xl font-black text-on-surface">Quên mật khẩu</h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-on-surface-variant">
            {step === "email"
              ? "Nhập email tài khoản để nhận mã OTP khôi phục."
              : step === "otp"
                ? `Nhập mã OTP đã gửi đến ${email}.`
                : "Tạo mật khẩu mới và xác nhận lại để hoàn tất."}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`h-2 rounded-full ${
                index <= currentStepIndex ? "bg-primary" : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        <div className="mt-8">
          {step === "email" && (
            <div className="space-y-6">
              <div className="relative pb-5">
                <Mail className="absolute left-4 top-4 z-10 h-5 w-5 text-primary" />
                <input
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setEmailError("");
                  }}
                  type="email"
                  placeholder=" "
                  className={inputClass}
                />
                <label className={labelClass}>Email</label>
                {emailError && (
                  <p className="absolute bottom-0 left-1 text-sm text-error">{emailError}</p>
                )}
              </div>
              <ButtonSubmit
                type="button"
                label="Gửi OTP"
                loading={isSendingOtp}
                onClick={handleSendOtp}
                className="py-4"
              />
            </div>
          )}

          {step === "otp" && (
            <div>
              <button
                type="button"
                onClick={() => setStep("email")}
                className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
              >
                <ArrowLeft size={16} />
                Sửa email
              </button>
              <div className="mb-6 rounded-2xl bg-primary/10 px-4 py-3 text-sm text-slate-700">
                OTP đã được gửi đến <span className="font-bold text-primary">{email}</span>
              </div>
              <div className="grid grid-cols-6 gap-3">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      otpInputRefs.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={digit}
                    onChange={(event) => handleOtpDigitChange(index, event)}
                    onKeyDown={(event) => handleOtpKeyDown(index, event)}
                    onPaste={handleOtpPaste}
                    className="h-14 w-full rounded-2xl border-2 border-gray-200 bg-gray-50 text-center text-xl font-bold text-gray-900 outline-none transition-all duration-200 focus:border-primary focus:bg-background-light focus:shadow-lg focus:shadow-primary/10"
                    aria-label={`OTP digit ${index + 1}`}
                  />
                ))}
              </div>
              {otpError && <p className="mt-2 text-sm text-error">{otpError}</p>}
              <ButtonSubmit
                type="button"
                label="Tiếp tục"
                onClick={handleConfirmOtp}
                className="mt-8 py-4"
              />
            </div>
          )}

          {step === "password" && (
            <div className="space-y-6">
              <div className="relative pb-5">
                <Lock className="absolute left-4 top-4 z-10 h-5 w-5 text-primary" />
                <input
                  value={newPassword}
                  onChange={(event) => {
                    setNewPassword(event.target.value);
                    setPasswordError("");
                    setConfirmPasswordError("");
                  }}
                  type={showNewPassword ? "text" : "password"}
                  placeholder=" "
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((current) => !current)}
                  className="absolute right-4 top-4 z-10 text-on-surface-variant hover:text-primary"
                  aria-label={showNewPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <label className={labelClass}>Mật khẩu mới</label>
                {passwordError && (
                  <p className="absolute bottom-0 left-1 text-sm text-error">{passwordError}</p>
                )}
              </div>

              <div className="relative pb-5">
                <ShieldCheck className="absolute left-4 top-4 z-10 h-5 w-5 text-primary" />
                <input
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setConfirmPasswordError("");
                  }}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder=" "
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((current) => !current)}
                  className="absolute right-4 top-4 z-10 text-on-surface-variant hover:text-primary"
                  aria-label={
                    showConfirmPassword ? "Ẩn mật khẩu xác nhận" : "Hiện mật khẩu xác nhận"
                  }
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <label className={labelClass}>Xác nhận mật khẩu mới</label>
                {confirmPasswordError && (
                  <p className="absolute bottom-0 left-1 text-sm text-error">
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              <ButtonSubmit
                type="button"
                label="Đổi mật khẩu"
                loading={isResetting}
                onClick={handleResetPassword}
                className="py-4"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
