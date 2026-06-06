import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-primary text-white py-10 sm:py-14 lg:py-16 px-4 sm:px-6">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-12 rounded-full flex items-center justify-center text-background-dark">
              {/* <img
                className=" rounded-full"
                src="https://res.cloudinary.com/du261e4fa/image/upload/v1774666883/customers/Logo_ugca79.png"
                alt="Logo"
              /> */}
              <div className="relative flex items-center justify-center h-10 w-10 bg-emerald-500 rounded-full shadow-sm group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-bold text-xl">G</span>
          </div>
            </div>
            <div>
              <h1 className="text-xl text-white font-extrabold tracking-tight">
                GeneFit
              </h1>
              {/* <p className="text-[10px] text-slate-100 dark:text-[#b8ad9d] uppercase tracking-wider">
               
              </p> */}
            </div>
          </div>
          <p className="text-white max-w-md mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
            Hệ thống hỗ trợ sức khỏe qua cách ăn uống lành mạnh, mang đến trải nghiệm khách hàng tinh tế.
          </p>
          <div className="flex gap-4">
            <a
              className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
              onClick={() => navigate("#")}
            >
              <span className="material-symbols-outlined text-sm">
                social_leaderboard
              </span>
            </a>
            <a
              className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
              onClick={() => navigate("#")}
            >
              <span className="material-symbols-outlined text-sm">camera</span>
            </a>
            <a
              className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
              onClick={() => navigate("#")}
            >
              <span className="material-symbols-outlined text-sm">share</span>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4 sm:mb-6">Khám phá</h4>
          <ul className="space-y-4 text-white/60 text-sm">
            <li>
              <a className="hover:text-secondary transition-colors cursor-pointer" onClick={() => navigate("#")}>
                Về GeneFit
              </a>
            </li>
            <li>
              <a className="hover:text-secondary transition-colors cursor-pointer" onClick={() => navigate("#")}>
                Mô hình
              </a>
            </li>
            <li>
              <a className="hover:text-secondary transition-colors cursor-pointer" onClick={() => navigate("#")}>
                Hỗ trợ
              </a>
            </li>
            <li>
              <a className="hover:text-secondary transition-colors cursor-pointer" onClick={() => navigate("#")}>
                Quy trình vận hành
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4 sm:mb-6">Liên hệ</h4>
          <ul className="space-y-4 text-white/60 text-sm">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-white">
                location_on
              </span>
              <span>
                FPT Software HCM - Lô T2, Đường D1, Khu Công Nghệ Cao, Quận 9,
                TP. Hồ Chí Minh
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-white">
                call
              </span>
              <span>(+84) 243 768 9048 (24/7)</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-white">
                mail
              </span>
              <span>healthy@genefit.vn</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
