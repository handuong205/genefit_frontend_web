import { Activity, ArrowLeft, CheckCircle2, Eye, EyeOff, Lock, Mail, ShieldCheck, Target, User } from "lucide-react";
import { useRef, useState } from "react";
import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonSubmit from "../../../components/common/button/Button";
import { PUBLIC_ROUTE } from "../../../constants/routes/public.route";
import { updateUserProfile } from "../../profile/services/profile.service";
import { useAuthStore } from "../../../stores/auth.store";
import { decodeToken } from "../../../utils/jwt";
import type { RegisterBody } from "./models/registerBody.model";
import { LoginAccountService } from "./services/loginAccount.service";
import { OtpRequestService } from "./services/otpRequest.service";
import { RegisterAccountService } from "./services/registerAccount.service";
interface AccountFormInputs {
  username: string;
  password: string;
  confirmPassword?: string;
  email: string;
}

interface OtpFormInputs {
  otpCode: string;
}

type RegisterStep = "account" | "otp" | "profile";
type ProfileSurvey = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  heightCm: string;
  weightKg: string;
  occupation: string;
  activityLevel: "SEDENTARY" | "LIGHTLY_ACTIVE" | "MODERATELY_ACTIVE" | "VERY_ACTIVE";
  goal: "LOSE_WEIGHT" | "MAINTAIN" | "GAIN_WEIGHT";
  targetWeightKg: string;
  targetDate: string;
  medicalConditions: string;
  allergies: string;
};
const OTP_LENGTH = 6;
const createEmptyOtpDigits = () => Array<string>(OTP_LENGTH).fill("");

const todayValue = () => new Date().toISOString().slice(0, 10);

const calculateAge = (date: string) => {
  const birth = new Date(`${date}T00:00:00`);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  if (
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
  ) {
    age -= 1;
  }
  return age;
};

const splitCsv = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const inputClass =
  "peer w-full px-5 py-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl outline-none transition-all duration-200 focus:border-primary dark:focus:border-primary focus:bg-background-light dark:focus:bg-background-dark focus:shadow-lg focus:shadow-primary/10";

const labelClass =
  "absolute left-5 top-[1.3rem] pt-2 flex items-center gap-2 text-gray-500 dark:text-gray-400 text-base font-medium pointer-events-none transition-all duration-200 bg-gray-50 dark:bg-gray-800 px-2 peer-placeholder-shown:top-[1.3rem] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-focus:-top-3 peer-focus:text-base peer-focus:text-primary dark:peer-focus:text-primary peer-focus:bg-background-light dark:peer-focus:bg-background-dark peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-base peer-[:not(:placeholder-shown)]:text-primary dark:peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:bg-background-light dark:peer-[:not(:placeholder-shown)]:bg-gray-900 peer-[:not(:placeholder-shown)]:px-2";

const UserRegisterPage = () => {
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.login);
  const [step, setStep] = useState<RegisterStep>("account");
  const [pendingAccount, setPendingAccount] = useState<AccountFormInputs | null>(null);
  const [registeredAccessToken, setRegisteredAccessToken] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpDigits, setOtpDigits] = useState<string[]>(createEmptyOtpDigits);
  const [profileSurvey, setProfileSurvey] = useState<ProfileSurvey>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "OTHER",
    heightCm: "165",
    weightKg: "60",
    occupation: "",
    activityLevel: "SEDENTARY",
    goal: "MAINTAIN",
    targetWeightKg: "",
    targetDate: "",
    medicalConditions: "",
    allergies: "",
  });
  const otpInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const {
    register: registerAccountField,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors },
    getValues,
  } = useForm<AccountFormInputs>({
    mode: "onChange",
  });

  const {
    register: registerOtpField,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
    reset: resetOtpForm,
    setValue: setOtpValue,
  } = useForm<OtpFormInputs>({
    mode: "onChange",
    defaultValues: {
      otpCode: "",
    },
  });

  const syncOtpCode = (digits: string[]) => {
    setOtpDigits(digits);
    setOtpValue("otpCode", digits.join(""), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleOtpDigitChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const digit = event.target.value.replace(/\D/g, "").slice(-1);
    const nextDigits = [...otpDigits];
    nextDigits[index] = digit;
    syncOtpCode(nextDigits);

    if (digit && index < OTP_LENGTH - 1) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Backspace" || otpDigits[index]) {
      return;
    }

    otpInputRefs.current[index - 1]?.focus();
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

    syncOtpCode(nextDigits);
    const focusIndex = Math.min(pastedDigits.length, OTP_LENGTH - 1);
    otpInputRefs.current[focusIndex]?.focus();
  };

  const handleRequestOtp = async (data: AccountFormInputs) => {
    try {
      setIsSendingOtp(true);
      setPendingAccount(data);
      await OtpRequestService(data.email);
      resetOtpForm();
      syncOtpCode(createEmptyOtpDigits());
      setStep("otp");
      toast.success("OTP đã được gửi đến email của bạn");
    } catch (error) {
      toast.error("Không thể gửi OTP. Vui lòng thử lại.");
      console.error("Request OTP failed:", error);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleRegister = async ({ otpCode }: OtpFormInputs) => {
    if (!pendingAccount) {
      toast.error("Vui lòng nhập thông tin tài khoản trước");
      setStep("account");
      return;
    }

    const registerBody: RegisterBody = {
      username: pendingAccount.username,
      passwordHash: pendingAccount.password,
      email: pendingAccount.email,
      otpCode,
    };

    try {
      setIsRegistering(true);
      await RegisterAccountService(registerBody);
      const loginResponse = await LoginAccountService(
        pendingAccount.username,
        pendingAccount.password,
      );
      const authData = loginResponse.data;

      if (!loginResponse.success || !authData?.accessToken) {
        toast.success("Đăng ký thành công. Vui lòng đăng nhập để hoàn tất hồ sơ.");
        navigate(PUBLIC_ROUTE.LOGIN);
        return;
      }

      const user = decodeToken(authData.accessToken);
      loginUser(user, authData.accessToken, authData.refreshToken ?? null, true);
      setRegisteredAccessToken(authData.accessToken);
      toast.success("Đăng ký thành công. Hãy hoàn tất hồ sơ sức khỏe.");
      setStep("profile");
    } catch (error) {
      toast.error("Đăng ký thất bại. Vui lòng kiểm tra OTP và thử lại.");
      console.error("Register failed:", error);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleBackToAccount = () => {
    setStep("account");
    resetOtpForm();
    syncOtpCode(createEmptyOtpDigits());
  };

  const updateSurvey = (field: keyof ProfileSurvey, value: string) => {
    setProfileSurvey((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSaveProfileSurvey = async () => {
    const accessToken = registeredAccessToken || useAuthStore.getState().token;

    if (!accessToken) {
      toast.error("Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.");
      navigate(PUBLIC_ROUTE.LOGIN);
      return;
    }

    if (!profileSurvey.firstName.trim() || !profileSurvey.lastName.trim()) {
      toast.error("Vui lòng nhập đầy đủ họ và tên.");
      return;
    }

    if (!profileSurvey.dateOfBirth) {
      toast.error("Vui lòng chọn ngày sinh.");
      return;
    }

    if (!profileSurvey.occupation.trim()) {
      toast.error("Vui lòng nhập nghề nghiệp hiện tại.");
      return;
    }

    const weight = Number(profileSurvey.weightKg);
    const targetWeight = Number(profileSurvey.targetWeightKg);

    if (
      profileSurvey.goal !== "MAINTAIN" &&
      (!Number.isFinite(targetWeight) ||
        (profileSurvey.goal === "LOSE_WEIGHT" && targetWeight >= weight) ||
        (profileSurvey.goal === "GAIN_WEIGHT" && targetWeight <= weight))
    ) {
      toast.error("Cân nặng mục tiêu chưa phù hợp với mục tiêu đã chọn.");
      return;
    }

    if (!profileSurvey.targetDate || profileSurvey.targetDate <= todayValue()) {
      toast.error("Vui lòng chọn ngày hoàn thành trong tương lai.");
      return;
    }

    try {
      setIsSavingProfile(true);
      await updateUserProfile({
        accessToken,
        body: {
          firstName: profileSurvey.firstName.trim(),
          lastName: profileSurvey.lastName.trim(),
          dateOfBirth: profileSurvey.dateOfBirth,
          age: calculateAge(profileSurvey.dateOfBirth),
          gender: profileSurvey.gender,
          heightCm: Number(profileSurvey.heightCm),
          weightKg: weight,
          occupation: profileSurvey.occupation.trim(),
          activityLevel: profileSurvey.activityLevel,
          goal: profileSurvey.goal,
          targetDate: profileSurvey.targetDate,
          targetWeightKg:
            profileSurvey.goal === "MAINTAIN" ? undefined : targetWeight,
          medicalConditions: splitCsv(profileSurvey.medicalConditions),
          allergies: splitCsv(profileSurvey.allergies),
        },
      });
      toast.success("Hoàn tất hồ sơ sức khỏe");
      navigate(PUBLIC_ROUTE.HOME);
    } catch (error) {
      console.error("Create profile after register failed:", error);
      toast.error("Chưa thể lưu hồ sơ. Vui lòng thử lại.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4 py-8">
      <div className="flex w-full max-w-5xl min-h-115 border border-secondary rounded-2xl shadow-2xl bg-background-light dark:bg-background-dark overflow-hidden">
        <div className="hidden lg:flex flex-1 flex-col justify-between bg-primary/10 border-r border-secondary px-8 py-10">
          <div className="rounded-3xl bg-white/80 p-6 shadow-xl shadow-primary/10">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-2xl font-bold text-on-surface">
              Tạo hồ sơ sức khỏe cá nhân
            </h3>
            <p className="mt-3 text-sm leading-6 text-on-surface-variant">
              Sau khi xác thực email, Genefit sẽ giúp bạn lưu mục tiêu, theo dõi bữa ăn và cập nhật tiến độ mỗi ngày.
            </p>
            <div className="mt-6 space-y-4">
              {["Xác thực bằng OTP qua email", "Theo dõi dữ liệu dinh dưỡng", "Cá nhân hóa mục tiêu sức khỏe"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-semibold text-on-surface">
                  <CheckCircle2 size={18} className="text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="max-w-sm">
            <p className="text-sm font-semibold text-primary mb-4">
              Genefit
            </p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Bắt đầu hành trình sức khỏe của bạn
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base">
              Tạo tài khoản và xác thực email để sử dụng các tính năng cá nhân hóa.
            </p>
          </div>
        </div>

        <div className="flex-1">
          <div className="text-center mb-10">
            <h1 className="pt-12 text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Đăng ký
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {step === "account"
                ? "Nhập thông tin tài khoản để nhận OTP"
                : step === "otp"
                  ? "Nhập mã OTP đã gửi đến email của bạn"
                  : "Trả lời vài câu hỏi để cá nhân hóa Genefit"}
            </p>
          </div>

          <div className="px-8 md:px-10 pb-10">
            <div className="mb-8 grid grid-cols-3 gap-3">
              <div className={`h-2 rounded-full ${step === "account" ? "bg-primary" : "bg-primary/50"}`} />
              <div className={`h-2 rounded-full ${step === "otp" ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"}`} />
              <div className={`h-2 rounded-full ${step === "profile" ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"}`} />
            </div>

            {step === "account" ? (
              <form className="flex-col" method="POST" onSubmit={handleAccountSubmit(handleRequestOtp)}>
                <div className="flex flex-col gap-6">
                  <div className="relative py-2 pb-2 pt-3">
                    <input
                      id="username"
                      type="text"
                      placeholder=" "
                      {...registerAccountField("username", {
                        required: "Tên tài khoản không được để trống",
                        minLength: {
                          value: 8,
                          message: "Tên tài khoản phải có ít nhất 8 ký tự",
                        },
                      })}
                      className={inputClass}
                    />
                    <label htmlFor="username" className={labelClass}>
                      <User size={18} className="text-current" />
                      Tên tài khoản
                    </label>
                    {accountErrors.username && (
                      <p className="absolute -bottom-4 left-2 text-sm text-error pt-2">
                        {accountErrors.username.message}
                      </p>
                    )}
                  </div>

                  <div className="relative py-2 pb-2 pt-3">
                    <input
                      id="email"
                      type="email"
                      placeholder=" "
                      {...registerAccountField("email", {
                        required: "Email không được để trống",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email sai định dạng (ví dụ: abc@gmail.com)",
                        },
                      })}
                      className={inputClass}
                    />
                    <label htmlFor="email" className={labelClass}>
                      <Mail size={18} className="text-current" />
                      Email
                    </label>
                    {accountErrors.email && (
                      <p className="absolute -bottom-4 left-2 text-sm text-error pt-2">
                        {accountErrors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="relative py-2 pb-2 pt-3">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder=" "
                      {...registerAccountField("password", {
                        required: "Mật khẩu không được để trống",
                        minLength: {
                          value: 8,
                          message: "Mật khẩu phải có ít nhất 8 ký tự",
                        },
                      })}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-4 top-[1.45rem] z-10 inline-flex h-6 w-6 items-center justify-center text-gray-500 transition hover:text-primary dark:text-gray-400"
                      aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <label htmlFor="password" className={labelClass}>
                      <Lock size={18} className="text-current" />
                      Mật khẩu
                    </label>
                    {accountErrors.password && (
                      <p className="absolute -bottom-4 left-2 text-sm text-error pt-2">
                        {accountErrors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="relative py-2 pb-2 pt-3">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder=" "
                      {...registerAccountField("confirmPassword", {
                        required: "Xác nhận mật khẩu không được để trống",
                        validate: (value) =>
                          value === getValues("password") || "Mật khẩu xác nhận không khớp",
                      })}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((current) => !current)}
                      className="absolute right-4 top-[1.45rem] z-10 inline-flex h-6 w-6 items-center justify-center text-gray-500 transition hover:text-primary dark:text-gray-400"
                      aria-label={showConfirmPassword ? "Ẩn mật khẩu xác nhận" : "Hiện mật khẩu xác nhận"}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <label htmlFor="confirmPassword" className={labelClass}>
                      <Lock size={18} className="text-current" />
                      Xác nhận mật khẩu
                    </label>
                    {accountErrors.confirmPassword && (
                      <p className="absolute -bottom-4 left-2 text-sm text-error pt-2">
                        {accountErrors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <ButtonSubmit label="Nhận OTP" className="mt-8" loading={isSendingOtp} />
              </form>
            ) : step === "otp" ? (
              <form className="flex-col" method="POST" onSubmit={handleOtpSubmit(handleRegister)}>
                <button
                  type="button"
                  onClick={handleBackToAccount}
                  className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  <ArrowLeft size={16} />
                  Sửa thông tin tài khoản
                </button>

                <div className="rounded-xl bg-primary/10 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 mb-6">
                  OTP đã được gửi đến <span className="font-semibold text-primary">{pendingAccount?.email}</span>
                </div>

                <div className="relative py-2 pb-5 pt-3">
                  <div className="mb-3 flex items-center gap-2 text-gray-500 dark:text-gray-400 text-base font-medium">
                    <ShieldCheck size={18} className="text-current" />
                    OTP
                  </div>
                  <input
                    type="hidden"
                    {...registerOtpField("otpCode", {
                      required: "OTP không được để trống",
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "OTP phải gồm 6 chữ số",
                      },
                    })}
                  />
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
                        className="h-14 w-full rounded-2xl border-2 border-gray-200 bg-gray-50 text-center text-xl font-bold text-gray-900 outline-none transition-all duration-200 focus:border-primary focus:bg-background-light focus:shadow-lg focus:shadow-primary/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary dark:focus:bg-background-dark"
                        aria-label={`OTP digit ${index + 1}`}
                      />
                    ))}
                  </div>
                  {otpErrors.otpCode && (
                    <p className="absolute -bottom-1 left-2 text-sm text-error pt-2">
                      {otpErrors.otpCode.message}
                    </p>
                  )}
                </div>

                <ButtonSubmit label="Đăng ký" className="mt-8" loading={isRegistering} />
              </form>
            ) : (
              <div className="space-y-6">
                <div className="rounded-3xl border border-primary/15 bg-primary/5 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                      <Activity size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase text-primary">
                        Thiết lập hồ sơ
                      </p>
                      <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                        Một vài câu hỏi nhanh
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    value={profileSurvey.lastName}
                    onChange={(event) => updateSurvey("lastName", event.target.value)}
                    placeholder="Họ & tên đệm"
                    className={inputClass}
                  />
                  <input
                    value={profileSurvey.firstName}
                    onChange={(event) => updateSurvey("firstName", event.target.value)}
                    placeholder="Tên"
                    className={inputClass}
                  />
                  <input
                    value={profileSurvey.dateOfBirth}
                    onChange={(event) => updateSurvey("dateOfBirth", event.target.value)}
                    type="date"
                    className={inputClass}
                  />
                  <select
                    value={profileSurvey.gender}
                    onChange={(event) => updateSurvey("gender", event.target.value)}
                    className={inputClass}
                  >
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                    <option value="OTHER">Khác</option>
                  </select>
                  <input
                    value={profileSurvey.heightCm}
                    onChange={(event) => updateSurvey("heightCm", event.target.value)}
                    type="number"
                    placeholder="Chiều cao (cm)"
                    className={inputClass}
                  />
                  <input
                    value={profileSurvey.weightKg}
                    onChange={(event) => updateSurvey("weightKg", event.target.value)}
                    type="number"
                    placeholder="Cân nặng hiện tại (kg)"
                    className={inputClass}
                  />
                  <input
                    value={profileSurvey.occupation}
                    onChange={(event) => updateSurvey("occupation", event.target.value)}
                    placeholder="Nghề nghiệp hiện tại"
                    className={inputClass}
                  />
                  <select
                    value={profileSurvey.activityLevel}
                    onChange={(event) => updateSurvey("activityLevel", event.target.value)}
                    className={inputClass}
                  >
                    <option value="SEDENTARY">Ít vận động</option>
                    <option value="LIGHTLY_ACTIVE">Vận động nhẹ</option>
                    <option value="MODERATELY_ACTIVE">Vận động vừa</option>
                    <option value="VERY_ACTIVE">Vận động nhiều</option>
                  </select>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
                    <Target size={18} className="text-primary" />
                    Mục tiêu sức khỏe
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    {[
                      ["LOSE_WEIGHT", "Giảm cân"],
                      ["MAINTAIN", "Duy trì"],
                      ["GAIN_WEIGHT", "Tăng cân"],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => updateSurvey("goal", value)}
                        className={`rounded-2xl border px-4 py-4 text-sm font-black transition ${
                          profileSurvey.goal === value
                            ? "border-primary bg-primary text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {profileSurvey.goal !== "MAINTAIN" && (
                    <input
                      value={profileSurvey.targetWeightKg}
                      onChange={(event) => updateSurvey("targetWeightKg", event.target.value)}
                      type="number"
                      placeholder="Cân nặng mục tiêu (kg)"
                      className={inputClass}
                    />
                  )}
                  <input
                    value={profileSurvey.targetDate}
                    onChange={(event) => updateSurvey("targetDate", event.target.value)}
                    type="date"
                    min={todayValue()}
                    className={inputClass}
                  />
                  <input
                    value={profileSurvey.medicalConditions}
                    onChange={(event) => updateSurvey("medicalConditions", event.target.value)}
                    placeholder="Bệnh lý cần chú ý, cách nhau bằng dấu phẩy"
                    className={inputClass}
                  />
                  <input
                    value={profileSurvey.allergies}
                    onChange={(event) => updateSurvey("allergies", event.target.value)}
                    placeholder="Dị ứng thực phẩm, cách nhau bằng dấu phẩy"
                    className={inputClass}
                  />
                </div>

                <ButtonSubmit
                  label="Hoàn tất hồ sơ"
                  className="mt-2"
                  loading={isSavingProfile}
                  onClick={handleSaveProfileSurvey}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterPage;
