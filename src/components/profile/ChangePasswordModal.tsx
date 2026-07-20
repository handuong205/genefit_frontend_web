import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Lock, Save, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

type ChangePasswordModalProps = {
  isOpen: boolean;
  isSaving: boolean;
  onClose: () => void;
  onSubmit: (oldPassword: string, newPassword: string) => void | Promise<void>;
};

const fieldClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-12 py-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-slate-950 dark:text-white";

const ChangePasswordModal = ({
  isOpen,
  isSaving,
  onClose,
  onSubmit,
}: ChangePasswordModalProps) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState({
    old: false,
    next: false,
    confirm: false,
  });

  const submit = async () => {
    if (!oldPassword) {
      setError("Mật khẩu hiện tại không được để trống.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Mật khẩu mới phải có ít nhất 8 ký tự.");
      return;
    }

    if (newPassword === oldPassword) {
      setError("Mật khẩu mới cần khác mật khẩu hiện tại.");
      return;
    }

    if (confirmPassword !== newPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setError("");
    await onSubmit(oldPassword, newPassword);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const PasswordField = ({
    id,
    label,
    icon,
    isVisible,
    value,
    onChange,
    onToggle,
  }: {
    id: string;
    label: string;
    icon: ReactNode;
    isVisible: boolean;
    value: string;
    onChange: (value: string) => void;
    onToggle: () => void;
  }) => (
    <label className="block text-sm font-bold text-slate-700 dark:text-slate-200">
      {label}
      <div className="relative mt-2">
        <span className="absolute left-4 top-3.5 text-primary">{icon}</span>
        <input
          id={id}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            setError("");
          }}
          type={isVisible ? "text" : "password"}
          className={fieldClass}
          autoComplete="off"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-3.5 text-slate-500 transition hover:text-primary dark:text-slate-400"
          aria-label={isVisible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        >
          {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </label>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => {
            if (!isSaving) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg rounded-[28px] border border-slate-200 bg-white p-6 text-slate-950 shadow-2xl dark:border-white/10 dark:bg-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-emerald-300">
                  <Lock size={24} />
                </div>
                <div>
                  <p className="text-sm font-black uppercase text-primary dark:text-emerald-300">
                    Bảo mật
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
                    Đổi mật khẩu
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 disabled:opacity-60 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Đóng"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <PasswordField
                id="old-password"
                label="Mật khẩu hiện tại"
                icon={<Lock size={18} />}
                isVisible={visible.old}
                value={oldPassword}
                onChange={setOldPassword}
                onToggle={() => setVisible((current) => ({ ...current, old: !current.old }))}
              />
              <PasswordField
                id="new-password"
                label="Mật khẩu mới"
                icon={<ShieldCheck size={18} />}
                isVisible={visible.next}
                value={newPassword}
                onChange={setNewPassword}
                onToggle={() => setVisible((current) => ({ ...current, next: !current.next }))}
              />
              <PasswordField
                id="confirm-password"
                label="Xác nhận mật khẩu mới"
                icon={<ShieldCheck size={18} />}
                isVisible={visible.confirm}
                value={confirmPassword}
                onChange={setConfirmPassword}
                onToggle={() =>
                  setVisible((current) => ({ ...current, confirm: !current.confirm }))
                }
              />
            </div>

            {error && (
              <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-200">
                {error}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={isSaving}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-black text-white shadow-primary transition hover:bg-primary-hover disabled:opacity-70"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Đổi mật khẩu
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChangePasswordModal;
