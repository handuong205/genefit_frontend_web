import {
  BellRing,
  CalendarDays,
  CreditCard,
  Crown,
  LogOut,
  Sparkles,
  UserCog,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { AuthUser } from "../../stores/auth.store";
import type { MySubscription } from "../../pages/subscription/services/subscriptionPricing.service";

type UserProfileDropdownProps = {
  user: AuthUser;
  currentSubscription?: MySubscription | null;
  onManageAccount: () => void;
  onManageSubscription: () => void;
  onSignOut: () => void | Promise<void>;
};

type ProfileAvatarProps = {
  avatarUrl?: string | null;
  initials: string;
  sizeClass: string;
  textClass: string;
};

const getStringValue = (value: unknown): string => {
  return typeof value === "string" ? value.trim() : "";
};

const getDisplayName = (user: AuthUser): string => {
  const firstName = getStringValue(user.userProfile?.firstName);
  const lastName = getStringValue(user.userProfile?.lastName);
  const profileName = [firstName, lastName].filter(Boolean).join(" ");

  return (
    profileName ||
    getStringValue(user.fullName) ||
    getStringValue(user.name) ||
    getStringValue(user.username) ||
    getStringValue(user.sub) ||
    "bạn"
  );
};

const getEmail = (user: AuthUser): string => {
  return (
    getStringValue(user.email) ||
    getStringValue(user.username) ||
    getStringValue(user.sub)
  );
};

const getAvatarUrl = (user: AuthUser): string => {
  return (
    getStringValue(user.avatarUrl) ||
    getStringValue(user.userProfile?.avatarUrl)
  );
};

const getInitials = (name: string): string => {
  const words = name
    .split(" ")
    .map((word) => word.trim())
    .filter(Boolean);

  if (!words.length) return "G";

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const formatSubscriptionDate = (value?: string) => {
  if (!value) return "";

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
};

const ProfileAvatar = ({
  avatarUrl,
  initials,
  sizeClass,
  textClass,
}: ProfileAvatarProps) => {
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(avatarUrl) && !hasError;

  useEffect(() => {
    setHasError(false);
  }, [avatarUrl]);

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10 ${sizeClass}`}
    >
      {showImage && (
        <img
          src={avatarUrl ?? undefined}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setHasError(true)}
        />
      )}
      <span className={`font-bold ${textClass}`}>{initials}</span>
    </span>
  );
};

const UserProfileDropdown = ({
  user,
  currentSubscription,
  onManageAccount,
  onManageSubscription,
  onSignOut,
}: UserProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const displayName = getDisplayName(user);
  const email = getEmail(user);
  const avatarUrl = getAvatarUrl(user);
  const initials = getInitials(displayName);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const runAction = async (action: () => void | Promise<void>) => {
    setIsOpen(false);
    await action();
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full p-0.5 transition duration-200 hover:bg-black/5 focus:outline-none focus:ring-4 focus:ring-primary/20 dark:hover:bg-white/10"
        aria-label="Mở menu tài khoản"
        aria-expanded={isOpen}
      >
        <ProfileAvatar
          avatarUrl={avatarUrl}
          initials={initials}
          sizeClass="h-10 w-10"
          textClass="text-sm"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+12px)] z-50 w-[min(420px,calc(100vw-2rem))] max-h-[calc(100vh-96px)] overflow-y-auto rounded-3xl account-menu-surface p-2 transition duration-200">
          <div className="sticky top-0 z-10 rounded-t-[20px]  px-4 pb-4 pt-3">
            <div className="relative flex min-h-10 items-center justify-center">
              {/* <p className="max-w-80 truncate text-sm font-medium text-(--account-menu-muted)">
                {email}
              </p> */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute right-0 inline-flex h-9 w-9 items-center justify-center rounded-full text-(--account-menu-muted) transition duration-200 hover:bg-black/5 hover:text-(--account-menu-text) focus:outline-none focus:ring-4 focus:ring-primary/20 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Đóng menu tài khoản"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="px-5 pb-5 text-center">
            <div className="flex justify-center">
              <ProfileAvatar
                avatarUrl={avatarUrl}
                initials={initials}
                sizeClass="h-24 w-24"
                textClass="text-3xl"
              />
            </div>

            <h2 className="mt-4 text-2xl font-semibold text-(--account-menu-text) dark:text-white">
              Hi, {displayName}!
            </h2>
            <p className="mt-2 text-sm text-(--account-menu-muted)">
              {email || "Tài khoản đã đăng nhập"}
            </p>

            {currentSubscription && (
              <div className="mx-auto mt-4 flex max-w-sm items-center gap-3 rounded-[20px] border border-(--account-menu-border) bg-white px-4 py-3 text-left shadow-sm dark:bg-white/5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-yellow-500 dark:bg-primary/20 dark:text-primary-fixed-dim">
                  <Crown size={21} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-(--account-menu-text) dark:text-white">
                    {currentSubscription?.planName ?? "Chưa có gói active"}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-(--account-menu-muted)">
                    <CalendarDays size={13} />
                    <span className="truncate">
                      {currentSubscription?.endDate
                        ? `Hết hạn ${formatSubscriptionDate(currentSubscription.endDate)}`
                        : "Nâng cấp để mở khóa thêm tính năng"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => runAction(onManageAccount)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-(--account-menu-border) bg-white px-4 text-sm font-semibold text-primary transition duration-200 hover:bg-primary/10 hover:shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/20 dark:bg-white/5 dark:text-primary-fixed-dim dark:hover:bg-primary/20"
              >
                <UserCog size={18} />
                <span>Quản lý tài khoản</span>
              </button>
              <button
                type="button"
                onClick={() => runAction(onManageSubscription)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-white shadow-primary transition duration-200 hover:bg-primary/90 hover:shadow-primary-lg focus:outline-none focus:ring-4 focus:ring-primary/20"
              >
                <CreditCard size={18} />
                <span>Quản lý gói đăng ký</span>
              </button>
            </div>
          </div>

          {!currentSubscription && (
            <div className="mx-3 rounded-[22px] account-menu-card p-4 text-left">
              <div className="flex gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-fixed-dim">
                  <BellRing size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-warning" />
                    <h3 className="text-base font-bold text-(--account-menu-text) dark:text-white">
                      Nâng cấp trải nghiệm của bạn
                    </h3>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-(--account-menu-muted) dark:text-slate-300">
                    Đồng bộ hồ sơ và gói đăng ký để nhận đề xuất dinh dưỡng, mục
                    tiêu và theo dõi phù hợp hơn.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-(--account-menu-muted) transition duration-200 hover:bg-black/5 hover:text-(--account-menu-text) dark:hover:bg-white/10 dark:hover:text-white"
                >
                  Để sau
                </button>
                <button
                  type="button"
                  onClick={() => runAction(onManageAccount)}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-primary transition duration-200 hover:bg-primary/10 dark:text-primary-fixed-dim dark:hover:bg-primary/20"
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          )}

          <div className="mt-3 border-t border-(--account-menu-border) p-2 dark:border-white/10">
            <button
              type="button"
              onClick={() => runAction(onSignOut)}
              className="flex min-h-12 w-full items-center gap-3 rounded-2xl px-4 text-left text-sm font-semibold text-error transition duration-200 hover:bg-error/10 focus:outline-none focus:ring-4 focus:ring-error/10 dark:text-red-300 dark:hover:bg-red-500/15"
            >
              <LogOut size={19} />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
