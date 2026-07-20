import { AnimatePresence, motion } from "framer-motion";
import { HeartPulse, Loader2, Save, X } from "lucide-react";
import type {
  ActivityLevel,
  Gender,
  GoalType,
} from "../../pages/profile/services/profile.service";

export type ProfileFormState = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  occupation: string;
  heightCm: string;
  weightKg: string;
  age: string;
  gender: Gender;
  goal: GoalType;
  activityLevel: ActivityLevel;
  targetWeightKg: string;
  targetDate: string;
  medicalConditions: string;
  allergies: string;
};

type ProfileEditModalProps = {
  form: ProfileFormState;
  isOpen: boolean;
  isSaving: boolean;
  onChange: (field: keyof ProfileFormState, value: string) => void;
  onClose: () => void;
  onSubmit: () => void | Promise<void>;
};

const genderOptions: { value: Gender; label: string }[] = [
  { value: "MALE", label: "Nam" },
  { value: "FEMALE", label: "Nữ" },
  { value: "OTHER", label: "Khác" },
];

const goalOptions: { value: GoalType; label: string }[] = [
  { value: "LOSE_WEIGHT", label: "Giảm cân" },
  { value: "GAIN_WEIGHT", label: "Tăng cân" },
  { value: "MAINTAIN", label: "Duy trì" },
];

const activityOptions: { value: ActivityLevel; label: string }[] = [
  { value: "SEDENTARY", label: "Ít vận động" },
  { value: "LIGHTLY_ACTIVE", label: "Vận động nhẹ" },
  { value: "MODERATELY_ACTIVE", label: "Vận động vừa" },
  { value: "VERY_ACTIVE", label: "Rất năng động" },
];

const fieldClass =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-white/10 dark:bg-slate-950 dark:text-white";

const ProfileEditModal = ({
  form,
  isOpen,
  isSaving,
  onChange,
  onClose,
  onSubmit,
}: ProfileEditModalProps) => {
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
            className="max-h-[calc(100vh-3rem)] w-full max-w-4xl overflow-y-auto rounded-[28px] border border-slate-200 bg-white p-6 text-slate-950 shadow-2xl dark:border-white/10 dark:bg-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-emerald-300">
                  <HeartPulse size={24} />
                </div>
                <div>
                  <p className="text-sm font-black uppercase text-primary dark:text-emerald-300">
                    Chỉnh sửa hồ sơ
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
                    Hồ sơ sức khỏe
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

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[
                ["firstName", "Tên"],
                ["lastName", "Họ"],
                ["occupation", "Nghề nghiệp"],
                ["heightCm", "Chiều cao (cm)"],
                ["weightKg", "Cân nặng (kg)"],
                ["age", "Tuổi"],
                ["targetWeightKg", "Cân nặng mục tiêu (kg)"],
              ].map(([field, label]) => (
                <label
                  key={field}
                  className="block text-sm font-bold text-slate-700 dark:text-slate-200"
                >
                  {label}
                  <input
                    value={form[field as keyof ProfileFormState]}
                    onChange={(event) =>
                      onChange(field as keyof ProfileFormState, event.target.value)
                    }
                    type={
                      ["heightCm", "weightKg", "age", "targetWeightKg"].includes(field)
                        ? "number"
                        : "text"
                    }
                    className={fieldClass}
                  />
                </label>
              ))}

              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200">
                Ngày sinh
                <input
                  value={form.dateOfBirth}
                  onChange={(event) => onChange("dateOfBirth", event.target.value)}
                  type="date"
                  className={fieldClass}
                />
              </label>

              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200">
                Ngày mục tiêu
                <input
                  value={form.targetDate}
                  onChange={(event) => onChange("targetDate", event.target.value)}
                  type="date"
                  className={fieldClass}
                />
              </label>

              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200">
                Giới tính
                <select
                  value={form.gender}
                  onChange={(event) => onChange("gender", event.target.value)}
                  className={fieldClass}
                >
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200">
                Mục tiêu
                <select
                  value={form.goal}
                  onChange={(event) => onChange("goal", event.target.value)}
                  className={fieldClass}
                >
                  {goalOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200">
                Mức độ vận động
                <select
                  value={form.activityLevel}
                  onChange={(event) => onChange("activityLevel", event.target.value)}
                  className={fieldClass}
                >
                  {activityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 xl:col-span-3">
                Tình trạng sức khỏe
                <input
                  value={form.medicalConditions}
                  onChange={(event) => onChange("medicalConditions", event.target.value)}
                  placeholder="Ví dụ: Tiểu đường, huyết áp cao"
                  className={fieldClass}
                />
              </label>

              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 xl:col-span-3">
                Dị ứng
                <input
                  value={form.allergies}
                  onChange={(event) => onChange("allergies", event.target.value)}
                  placeholder="Ví dụ: Hải sản, sữa, đậu phộng"
                  className={fieldClass}
                />
              </label>
            </div>

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
                onClick={onSubmit}
                disabled={isSaving}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-black text-white shadow-primary transition hover:bg-primary-hover disabled:opacity-70"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Lưu hồ sơ
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileEditModal;
