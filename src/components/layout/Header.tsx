import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTE } from "../../constants/routes/public.route";

interface IMenuItem {
  name: string;
  path: string;
}

const menuItems: IMenuItem[] = [
  { name: "Trang chủ", path: PUBLIC_ROUTE.HOME },
  { name: "Về chúng tôi", path: PUBLIC_ROUTE.ABOUT },
  { name: "Dịch vụ", path: PUBLIC_ROUTE.PRICING },
  { name: "Liên hệ", path: PUBLIC_ROUTE.CONTACT },
];

const Header = () => {
  const [activeNav, setActiveNav] = useState<string>(PUBLIC_ROUTE.HOME);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScrollPosition = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", checkScrollPosition);
    checkScrollPosition();

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  const goTo = (path: string) => {
    setActiveNav(path);
    navigate(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "py-5"
      }`}
    >
      <div className="px-10 mx-auto flex items-center justify-between h-12">
        <button
          type="button"
          onClick={() => goTo(PUBLIC_ROUTE.HOME)}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="relative flex items-start justify-center h-10 w-14 overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnd3zleee2ACYHTY5nZAPyw-CeAfPsNJy9DvdEEvCYOWWporGB77T2ugQGE4blQ0pae-t0K3R1Ami3uyG1bo85bdfpdj4qw71L5j5vlEupdKJ63i9hfINNrm8sztcV1EHxC8w_doXccb4KnO8zPUWqe3ks2yl1QhnVierZqIgDRk-URWKlPIb6IKtEjScgZTOEpAMJn-VGFcR_QXcf0zwInmVnM2wF3QTS6o5ooBXL3-Moo_A83yqsxYnqCk0UVdXTi1NTg_ikC7o"
              alt="Genifit Logo"
              className="w-full h-auto object-top -mt-1"
            />
          </div>
          <span
            className={`text-2xl font-black tracking-wider transition-colors duration-300 ${
              scrolled ? "text-primary" : "text-emerald-600"
            }`}
          >
            GENIFIT
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8 h-full">
          {menuItems.map((item) => {
            const isActive = activeNav === item.path;

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => goTo(item.path)}
                className={`cursor-pointer h-full flex items-center text-sm font-semibold tracking-wide transition-all duration-300 hover:text-emerald-500 ${
                  isActive
                    ? "text-emerald-500 border-b-2 border-emerald-500"
                    : scrolled
                      ? "text-gray-700"
                      : "text-gray-500"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(PUBLIC_ROUTE.LOGIN)}
            className={`px-5 py-2 text-sm font-semibold rounded-full border transition-all duration-300 cursor-pointer ${
              scrolled
                ? "border-gray-300 text-gray-700 hover:bg-gray-50"
                : "border-transparent text-gray-600 hover:bg-gray-100"
            }`}
          >
            Đăng nhập
          </button>

          <button
            type="button"
            onClick={() => navigate(PUBLIC_ROUTE.REGISTER)}
            className="px-5 py-2 text-sm font-semibold bg-primary text-white rounded-full shadow-sm hover:bg-primary/90 hover:shadow-primary/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            Bắt đầu
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
