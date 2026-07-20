import {
  Broccoli,
  ChevronDown,
  CircleDollarSign,
  LayoutDashboard,
  LogOut,
  PiggyBank,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ADMIN_ROUTE } from "../../../constants/routes/admin.route";
import { AUTH_ROUTE } from "../../../constants/routes/auth.route";
import { useAuthStore } from "../../../stores/auth.store";

interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
  badge?: string;
  submenu?: NavItem[];
}

const items: NavItem[] = [
  {
    label: "Dashboard",
    path: ADMIN_ROUTE.DASHBOARD,
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: "Users",
    path: ADMIN_ROUTE.USERS,
    icon: <Users className="w-5 h-5" />,
    submenu: [
      {
        label: "All Users",
        path: ADMIN_ROUTE.USERS,
        icon: <Users className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Foods",
    path: ADMIN_ROUTE.FOODS,
    icon: <Broccoli className="w-5 h-5" />,
  },
  {
    label: "Subscriptions",
    path: ADMIN_ROUTE.SUBSCRIPTIONS,
    icon: <PiggyBank className="w-5 h-5" />,
  },
  {
    label: "Payment",
    path: ADMIN_ROUTE.PAYMENTS,
    icon: <CircleDollarSign className="w-5 h-5" />,
  },
];

const bottomNavItems: NavItem[] = [
  {
    label: "Settings",
    path: ADMIN_ROUTE.SETTINGS,
    icon: <Settings className="w-5 h-5" />,
  },
];

const AdminSidebar = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = useLocation();
  const navigate = useNavigate();

  const toggleSubmenu = (label: string) => {
    setExpandedItems((prev) => (prev.includes(label) ? [] : [label]));
  };

  const isActive = (path: string) => pathname.pathname === path;

  const handleLogout = async () => {
    await useAuthStore.getState().logout();
    navigate(AUTH_ROUTE.ADMIN_LOGIN);
    toast.success("Đăng xuất thành công");
  };

  return (
    <div className="flex flex-col h-full overflow-auto border-r border-primary rounded-r-2xl shadow-primary-lg">
      <div className="px-4 py-6 border-b border-primary">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div>
            <h1 className="font-bold text-primary">GeneFit</h1>
            <p className="text-xs text-black">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-2">
        {items.map((item) => (
          <div key={item.label}>
            {item.submenu ? (
              <>
                <button
                  type="button"
                  onClick={() => toggleSubmenu(item.label)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-color cursor-pointer ${
                    isActive(item.path)
                      ? "bg-primary text-white"
                      : "text-black hover:bg-primary hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedItems.includes(item.label) ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    expandedItems.includes(item.label)
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mt-2 border-primary pl-3 space-y-2">
                      {item.submenu.map((subitem) => (
                        <button
                          key={subitem.label}
                          type="button"
                          onClick={() => navigate(subitem.path)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${
                            isActive(subitem.path)
                              ? "bg-primary/80 text-white"
                              : "text-black hover:bg-primary/80 hover:text-white"
                          }`}
                        >
                          {subitem.icon}
                          <span>{subitem.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  navigate(item.path);
                  setExpandedItems([]);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors group hover:bg-primary hover:text-white cursor-pointer ${
                  isActive(item.path)
                    ? "bg-primary text-white"
                    : "text-black hover:bg-primary hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-red-500/20 text-red-400">
                    {item.badge}
                  </span>
                )}
              </button>
            )}
          </div>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-primary space-y-2">
        {bottomNavItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => {
              navigate(item.path);
              setExpandedItems([]);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              isActive(item.path)
                ? "bg-primary text-white"
                : "text-black hover:bg-primary hover:text-white"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
        <button
          type="button"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer text-error"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
