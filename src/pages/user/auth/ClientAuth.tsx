import { Activity, Eye, EyeOff, Lock, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ButtonSubmit from "../../../components/common/button/Button";

import { PUBLIC_ROUTE } from "../../../constants/routes/public.route";
import { useAuthStore, type AuthUser } from "../../../stores/auth.store";
import { decodeToken } from "../../../utils/jwt";
import { GetCurrentUserService } from "./services/getCurrentUser.service";
import { LoginAccountService } from "./services/loginAccount.service";

interface LoginFormInputs {
  username: string;
  password: string;
}

const inputClass =
  "peer w-full rounded-xl border border-outline-variant bg-white px-12 py-4 text-on-surface outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";

const labelClass =
  "absolute left-12 top-4 text-sm font-semibold text-on-surface-variant transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-focus:-top-2 peer-focus:bg-white peer-focus:px-2 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-primary";

const getRole = (scope?: string) => String(scope ?? "").trim().toUpperCase();

const UserLogin = () => {
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.login);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>({
    mode: "onChange",
  });

  const onSubmit = async ({ username, password }: LoginFormInputs) => {
    try {
      setIsSubmitting(true);
      const response = await LoginAccountService(username.trim(), password);
      const authData = response.data;

      if (!response.success || !authData?.accessToken) {
        toast.error(response.message || "Không thể đăng nhập.");
        setError("username", {
          type: "manual",
          message: "Tài khoản hoặc mật khẩu không chính xác.",
        });
        return;
      }

      const user = decodeToken(authData.accessToken);
      const role = getRole(user.scope);

      if (role === "ADMIN") {
        toast.error("Tài khoản quản trị không được đăng nhập ở trang người dùng.");
        setError("username", {
          type: "manual",
          message: "Vui lòng dùng trang đăng nhập dành cho quản trị viên.",
        });
        return;
      }

      let sessionUser: AuthUser = user;

      try {
        const currentUser = await GetCurrentUserService(authData.accessToken);

        if (currentUser) {
          sessionUser = {
            ...user,
            ...currentUser,
            id: currentUser.userId ?? user.id,
          };
        }
      } catch (profileError) {
        console.warn("Could not load user profile after login:", profileError);
      }

      loginUser(sessionUser, authData.accessToken, authData.refreshToken ?? null);
      toast.success("Đăng nhập thành công");
      navigate(PUBLIC_ROUTE.HOME);
    } catch (error) {
      console.error("User login failed:", error);
      toast.error("Tên đăng nhập hoặc mật khẩu không chính xác.");
      setError("username", {
        type: "manual",
        message: "Vui lòng kiểm tra lại thông tin đăng nhập.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-background-light px-4 py-10 md:px-8">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl border border-outline-variant bg-white shadow-2xl shadow-primary/10 lg:grid-cols-[1fr_0.92fr]">
        <div className="flex min-h-160 flex-col justify-center px-6 py-10 sm:px-10 lg:px-14">
          <div className="mb-9">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">
              Genefit Member
            </p>
            <h1 className="text-4xl font-extrabold text-on-surface">
              Đăng nhập người dùng
            </h1>
            <p className="mt-3 max-w-lg text-base leading-7 text-on-surface-variant">
              Tiếp tục theo dõi dinh dưỡng, lịch luyện tập và tiến độ sức khỏe cá nhân.
            </p>
          </div>

          <form method="POST" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative pb-5">
              <User className="absolute left-4 top-4 z-10 h-5 w-5 text-primary" />
              <input
                id="user-username"
                type="text"
                autoComplete="username"
                placeholder=" "
                {...register("username", {
                  required: "Tên đăng nhập không được để trống",
                  minLength: {
                    value: 3,
                    message: "Tên đăng nhập phải có ít nhất 3 ký tự",
                  },
                })}
                className={inputClass}
              />
              <label htmlFor="user-username" className={labelClass}>
                Tên đăng nhập
              </label>
              {errors.username && (
                <p className="absolute bottom-0 left-1 text-sm text-error">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="relative pb-5">
              <Lock className="absolute left-4 top-4 z-10 h-5 w-5 text-primary" />
              <input
                id="user-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder=" "
                {...register("password", {
                  required: "Mật khẩu không được để trống",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                })}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-4 top-4 z-10 inline-flex h-6 w-6 items-center justify-center text-on-surface-variant transition hover:text-primary"
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <label htmlFor="user-password" className={labelClass}>
                Mật khẩu
              </label>
              {errors.password && (
                <p className="absolute bottom-0 left-1 text-sm text-error">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <label className="inline-flex items-center gap-2 text-on-surface-variant">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                Ghi nhớ đăng nhập
              </label>
              <Link to={PUBLIC_ROUTE.FORGOT_PASSWORD} className="font-semibold text-primary hover:underline">
                Quên mật khẩu?
              </Link>
            </div>

            <ButtonSubmit
              label="Đăng nhập"
              icon="arrow_forward"
              loading={isSubmitting}
              className="py-4"
            />
          </form>

          <div className="mt-8 flex items-center justify-center gap-4 text-sm">
            <p className="text-on-surface-variant">
              Chưa có tài khoản?{" "}
              <Link to={PUBLIC_ROUTE.REGISTER} className="font-bold text-primary hover:underline">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>

        <div className="relative hidden min-h-160 overflow-hidden bg-primary lg:block">
          <img
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80"
            alt="Bữa ăn lành mạnh"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-br from-primary/95 via-primary/70 to-tertiary/80" />
          <div className="relative flex h-full flex-col justify-between p-10 text-white">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Activity size={18} />
              Theo dõi sức khỏe mỗi ngày
            </div>

            <div>
              <h2 className="max-w-md text-4xl font-extrabold leading-tight">
                Một tài khoản cho dinh dưỡng, luyện tập và tiến độ cá nhân.
              </h2>
              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-white/15 p-4 backdrop-blur">
                  <p className="text-2xl font-black">AI</p>
                  <p className="mt-1 text-sm text-white/80">Gợi ý bữa ăn</p>
                </div>
                <div className="rounded-xl bg-white/15 p-4 backdrop-blur">
                  <p className="text-2xl font-black">24/7</p>
                  <p className="mt-1 text-sm text-white/80">Theo dõi</p>
                </div>
                <div className="rounded-xl bg-white/15 p-4 backdrop-blur">
                  <p className="text-2xl font-black">1%</p>
                  <p className="mt-1 text-sm text-white/80">Tốt hơn mỗi ngày</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserLogin;
