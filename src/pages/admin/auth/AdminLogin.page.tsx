import { Lock, Mail } from "lucide-react";
import ButtonSubmit from "../../../components/common/button/Button";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import { USERS } from "../../../mocks/users";
import { useAuthStore } from "../../../stores/auth.store";
import { ADMIN_ROUTE } from "../../../constants/routes/admin.route";
import { toast } from "react-toastify";



const AdminLogin = () => {
    const navigate = useNavigate();
    // const [error, setError] = useState<string>('');
    const loginUser = useAuthStore((state) => state.login);

interface LoginFormInputs {
  email: string;
  password: string;
}
    const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginFormInputs>({
    mode: 'onChange', 
  });

    const onSubmit = (data: LoginFormInputs) => {
      const {email, password} = data;
      const user = USERS.find((u) => u.email === email);

      if (!user) {
        toast.error("Tài khoản không tồn tại.");
        setError("email", {
          type: "manual",
          message: "Tài khoản không tồn tại!",
        });
        return;
      }
      if (password !== "123456") {
        toast.error("Mật khẩu không chính xác.");
        setError("password", {
          type: "manual",
          message: "Mật khẩu không chính xác!",
        });
        return;
      }
      if (user.role !== "ADMIN") {
        toast.error("Truy cập bị từ chối.");
        setError("email", {
          type: "manual",
          message: "Truy cập bị từ chối.",
        });
        return;
      }

      loginUser(user, user.token);
      navigate(ADMIN_ROUTE.ADMIN);
      toast.success("Đăng nhập thành công");
    };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex lg:grid-cols-[280px_1fr] border border-secondary w-3/5 h-4/5 rounded-2xl shadow-2xl bg-background-light dark:bg-background-dark">
        <div className="flex-1 border-r border-secondary">
          <div className="text-center mb-15">
            <h1 className="pt-15 text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Chào mừng trở lại!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Hãy đăng nhập để tiếp tục
            </p>
          </div>
          <form className="px-10 flex-col" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="relative py-2 pb-5 pt-3">
                <input
                  id="email"
                  type="email"
                  placeholder=" "
                  {...register("email", {
                    required: "Email không được để trống",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email sai định dạng (ví dụ: abc@gmail.com)",
                    },
                  })}
                  className="peer w-full px-5 py-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl outline-none transition-all duration-200 
                focus:border-primary dark:focus:border-primary focus:bg-background-light dark:focus:bg-background-dark focus:shadow-lg focus:shadow-primary/10"
                />
                <label
                  htmlFor="email"
                  className="absolute left-5 top-[1.3rem] pt-2 flex items-center gap-2 text-gray-500 dark:text-gray-400 text-base font-medium pointer-events-none transition-all duration-200 bg-gray-50 dark:bg-gray-800 px-2
                peer-placeholder-shown:top-[1.3rem] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0
                peer-focus:-top-3 peer-focus:text-base peer-focus:text-primary dark:peer-focus:text-primary peer-focus:bg-background-light dark:peer-focus:bg-background-dark peer-focus:px-2
                peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-base peer-[:not(:placeholder-shown)]:text-primary dark:peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:bg-background-light dark:peer-[:not(:placeholder-shown)]:bg-gray-900 peer-[:not(:placeholder-shown)]:px-2"
                >
                  <Mail size={18} className="text-current" />
                  Email
                </label>
                {errors.email && (
                  <p className="absolute -bottom-1 left-2 text-sm text-error pt-2">
                    {errors.email.message as string}
                  </p>
                )}
              </div>
              <div className="relative py-2 pb-5 pt-3">
                <input
                  id="password"
                  type="password"
                  placeholder=" "
                  {...register("password", {
                    required: "Mật khẩu không được để trống",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải có ít nhất 6 ký tự",
                    },
                  })}
                  className="peer w-full px-5 py-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl outline-none transition-all duration-200 
                focus:border-primary dark:focus:border-primary focus:bg-background-light dark:focus:bg-background-dark focus:shadow-lg focus:shadow-primary/10"
                />
                <label
                  htmlFor="password"
                  className="absolute left-5 top-[1.3rem] pt-2 flex items-center gap-2 text-gray-500 dark:text-gray-400 text-base font-medium pointer-events-none transition-all duration-200 bg-gray-50 dark:bg-gray-800 px-2
                peer-placeholder-shown:top-[1.3rem] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0
                peer-focus:-top-3 peer-focus:text-base peer-focus:text-primary dark:peer-focus:text-primary peer-focus:bg-background-light dark:peer-focus:bg-background-dark peer-focus:px-2
                peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-base peer-[:not(:placeholder-shown)]:text-primary dark:peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:bg-background-light dark:peer-[:not(:placeholder-shown)]:bg-gray-900 peer-[:not(:placeholder-shown)]:px-2"
                >
                  <Lock size={18} className="text-current" />
                  Mật khẩu
                </label>
                {errors.password && (
                  <p className="absolute -bottom-1 left-2 text-sm text-error pt-2">
                    {errors.password.message as string}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <div className="flex gap-2 pt-3">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm">Ghi nhớ đăng nhập</span>
              </div>
              <div className="text-right mt-2">
                <a href="#" className="text-sm text-primary hover:underline">
                  Quên mật khẩu?
                </a>
              </div>
            </div>

            <ButtonSubmit label="Đăng nhập" className="mt-10" />
          </form>
          <div className="relative my-8 ">
            <div className="absolute inset-0 flex items-center px-10">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background-light dark:bg-background-dark text-gray-500 dark:text-gray-400 font-medium">
                hoặc đăng nhập với
              </span>
            </div>
          </div>

          <div className="flex gap-4 px-10">
            <button
              className="flex flex-1 items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl 
                  hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-md group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Google
              </span>
            </button>

            {/* <button className="flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl 
                  hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-md group">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Facebook</span>
                </button> */}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center hidden lg:flex">
            Ảnh hoặc nội dung gì đó nhưng chưa thiết kế
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
