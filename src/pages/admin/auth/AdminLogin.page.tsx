import { ArrowLeft, Lock, ShieldCheck, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonSubmit from "../../../components/common/button/Button";
import { ADMIN_ROUTE } from "../../../constants/routes/admin.route";
import { PUBLIC_ROUTE } from "../../../constants/routes/public.route";
import { useAuthStore } from "../../../stores/auth.store";
import { decodeToken } from "../../../utils/jwt";
import { LoginAccountService } from "../../user/auth/services/loginAccount.service";

interface LoginFormInputs {
  username: string;
  password: string;
}

const inputClass =
  "peer w-full rounded-xl border border-slate-700 bg-slate-950/70 px-12 py-4 text-white outline-none transition placeholder:text-transparent focus:border-primary focus:ring-4 focus:ring-primary/20";

const labelClass =
  "absolute left-12 top-4 text-sm font-semibold text-slate-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-focus:-top-2 peer-focus:bg-slate-950 peer-focus:px-2 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:bg-slate-950 peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-primary";

const getRole = (scope?: string) => String(scope ?? "").trim().toUpperCase();

const AdminLogin = () => {
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.login);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      if (role !== "ADMIN") {
        toast.error("Chỉ tài khoản ADMIN mới được truy cập trang quản trị.");
        setError("username", {
          type: "manual",
          message: "Tài khoản này không có quyền quản trị.",
        });
        return;
      }

      loginUser(user, authData.accessToken, authData.refreshToken ?? null);
      toast.success("Đăng nhập quản trị thành công");
      navigate(ADMIN_ROUTE.ADMIN);
    } catch (error) {
      console.error("Admin login failed:", error);
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
    <section className="flex min-h-screen w-full items-center justify-center bg-slate-950 px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-black/40 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden bg-slate-900 p-8 lg:flex lg:flex-col lg:justify-between">
          <Link
            to={PUBLIC_ROUTE.HOME}
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"
          >
            <ArrowLeft size={16} />
            Về trang chủ
          </Link>

          <div>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-white">
              <ShieldCheck size={30} />
            </div>
            <h2 className="text-3xl font-extrabold leading-tight text-white">
              Khu vực quản trị Genefit
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Tài khoản không có quyền ADMIN sẽ bị từ chối ngay cả khi thông tin đăng nhập hợp lệ.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-2xl font-black text-white">CMS</p>
              <p className="mt-1 text-sm text-slate-400">Quản lý dữ liệu</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-2xl font-black text-white">ADMIN</p>
              <p className="mt-1 text-sm text-slate-400">Phân quyền riêng</p>
            </div>
          </div>
        </div>

        <div className="flex min-h-[620px] flex-col justify-center px-6 py-10 sm:px-10 lg:px-14">
          <div className="mb-9">
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">
              Admin Access
            </p>
            <h1 className="text-4xl font-extrabold text-white">
              Đăng nhập Admin
            </h1>
            <p className="mt-3 max-w-lg text-base leading-7 text-slate-400">
              Sử dụng tài khoản quản trị để truy cập dashboard, người dùng, thực phẩm và giao dịch.
            </p>
          </div>

          <form method="POST" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative pb-5">
              <User className="absolute left-4 top-4 z-10 h-5 w-5 text-primary" />
              <input
                id="admin-username"
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
              <label htmlFor="admin-username" className={labelClass}>
                Tên đăng nhập
              </label>
              {errors.username && (
                <p className="absolute bottom-0 left-1 text-sm text-red-300">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="relative pb-5">
              <Lock className="absolute left-4 top-4 z-10 h-5 w-5 text-primary" />
              <input
                id="admin-password"
                type="password"
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
              <label htmlFor="admin-password" className={labelClass}>
                Mật khẩu
              </label>
              {errors.password && (
                <p className="absolute bottom-0 left-1 text-sm text-red-300">
                  {errors.password.message}
                </p>
              )}
            </div>

            <ButtonSubmit
              label="Đăng nhập Admin"
              icon="shield"
              loading={isSubmitting}
              className="py-4"
            />
          </form>

          <p className="mt-8 text-sm text-slate-400">
            Không phải quản trị viên?{" "}
            <Link to={PUBLIC_ROUTE.LOGIN} className="font-bold text-primary hover:underline">
              Đăng nhập người dùng
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
