import { useEffect, useMemo } from "react";
import { ClipboardList, Settings2, Sparkles } from "lucide-react";
import type { SubscriptionPlan } from "../../../pages/admin/subscription/models/searchSubscription.model";
import type { UpdatePlanRequest } from "../../../pages/admin/subscription/models/updateSubscription.model";
import { useAppForm } from "../../../hooks/useAppForm";
import Toggle from "../../common/form/Toggle";
import { FormInput } from "../../common/form/FormInput";
import { BOOLEAN_FIELDS, BOOLEAN_LABELS, PLAN_TYPES } from "../../../constants/subscription/subscription.constants";
import { toPlanRequest } from "../../../utils/subscription/subscription.utils";

export type SubscriptionModalProps = {
  mode: "create" | "edit" | "view";
  plan?: SubscriptionPlan | null;
  onSubmit: (data: UpdatePlanRequest) => void;
};






const SubscriptionModal = ({ mode, plan, onSubmit }: SubscriptionModalProps) => {
  const formDefaults = useMemo(() => toPlanRequest(plan), [plan]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useAppForm<UpdatePlanRequest>({
    defaultValues: formDefaults,
  });

  useEffect(() => {
    reset(formDefaults);
  }, [formDefaults, reset]);

  const isView = mode === "view";

  const processFormData = (formData: UpdatePlanRequest) => {
    onSubmit({
      planType: formData.planType,
      planName: formData.planName,
      description: formData.description,
      price: Number(formData.price),
      durationDays: Number(formData.durationDays),
      maxAiScansPerDay: Number(formData.maxAiScansPerDay),
      maxHistoryViewDays: Number(formData.maxHistoryViewDays),
      mealSuggestionLimitPerMonth: Number(formData.mealSuggestionLimitPerMonth),
      reminderLimit: Number(formData.reminderLimit),
      maxMembers: Number(formData.maxMembers),
      maxClients: Number(formData.maxClients),
      trial: Boolean(formData.trial),
      familySharingEnabled: Boolean(formData.familySharingEnabled),
      coachFeaturesEnabled: Boolean(formData.coachFeaturesEnabled),
      mealPlanEnabled: Boolean(formData.mealPlanEnabled),
      weeklyReportEnabled: Boolean(formData.weeklyReportEnabled),
      monthlyReportEnabled: Boolean(formData.monthlyReportEnabled),
      exportReportEnabled: Boolean(formData.exportReportEnabled),
      macroTrackingEnabled: Boolean(formData.macroTrackingEnabled),
      calorieDeficitTrackingEnabled: Boolean(
        formData.calorieDeficitTrackingEnabled,
      ),
      calorieSurplusTrackingEnabled: Boolean(
        formData.calorieSurplusTrackingEnabled,
      ),
      bloodSugarControlEnabled: Boolean(formData.bloodSugarControlEnabled),
      active: Boolean(formData.active),
    });
  };

  return (
    <form
      id="subscription-form"
      onSubmit={handleSubmit(processFormData)}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold text-primary uppercase">
              Thong tin goi
            </h3>
          </div>

          <div className="space-y-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-500 uppercase pb-2">
                Loai goi
              </label>
              {isView ? (
                <div className="py-2 min-h-9.5">
                  <span className="text-base font-semibold text-gray-700">
                    {plan?.planType || "Khong co"}
                  </span>
                </div>
              ) : (
                <select
                  {...register("planType", {
                    required: "Loai goi khong duoc de trong",
                  })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {PLAN_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              )}
              <div className="min-h-5 mt-1">
                {errors.planType && (
                  <p className="text-red-500 text-xs font-medium">
                    {errors.planType.message}
                  </p>
                )}
              </div>
            </div>

            <FormInput
              label="Tên gói"
              defaultValue={plan?.planName || ""}
              isDisabled={isView}
              register={register("planName", {
                required: "Ten goi khong duoc de trong",
              })}
              error={errors.planName}
            />

            <FormInput
              label="mô tả"
              type="textarea"
              defaultValue={plan?.description || ""}
              isDisabled={isView}
              register={register("description", {
                required: "Mo ta khong duoc de trong",
              })}
              error={errors.description}
            />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Settings2 className="w-6 h-6 text-accent" />
            <h3 className="text-lg font-semibold text-accent uppercase">
              Giới hạn sử dụng
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
            <FormInput
              label="Giá"
              type="number"
              step="0.01"
              defaultValue={plan?.price ?? 0}
              isDisabled={isView}
              register={register("price", {
                required: "Giá không được để trống",
                min: { value: 0, message: "Giá phải lớn hơn hoặc bằng 0" },
              })}
              error={errors.price}
            />
            <FormInput
              label="Số ngày"
              type="number"
              defaultValue={plan?.durationDays ?? 0}
              isDisabled={isView}
              register={register("durationDays", {
                required: "Số ngày không được để trống",
                min: { value: 0, message: "Số ngày phải lớn hơn hoặc bằng 0" },
              })}
              error={errors.durationDays}
            />
            <FormInput
              label="Số lượt scan mỗi ngày"
              type="number"
              defaultValue={plan?.maxAiScansPerDay ?? 0}
              isDisabled={isView}
              register={register("maxAiScansPerDay", {
                required: "Giới hạn AI scan không được để trống",
                min: { value: 0, message: "Giới hạn phải lớn hơn hoặc bằng 0" },
              })}
              error={errors.maxAiScansPerDay}
            />
            <FormInput
              label="Số ngày xem lịch sử"
              type="number"
              defaultValue={plan?.maxHistoryViewDays ?? 0}
              isDisabled={isView}
              register={register("maxHistoryViewDays", {
                required: "Giới hạn lịch sử không được để trống",
                min: { value: 0, message: "Giới hạn phải lớn hơn hoặc bằng 0" },
              })}
              error={errors.maxHistoryViewDays}
            />
            <FormInput
              label="Gợi ý bữa ăn mỗi tháng"
              type="number"
              defaultValue={plan?.mealSuggestionLimitPerMonth ?? 0}
              isDisabled={isView}
              register={register("mealSuggestionLimitPerMonth", {
                required: "Giới hạn gợi ý không được để trống",
                min: { value: 0, message: "Giới hạn phải lớn hơn hoặc bằng 0" },
              })}
              error={errors.mealSuggestionLimitPerMonth}
            />
            <FormInput
              label="Số lượt nhắc nhở"
              type="number"
              defaultValue={plan?.reminderLimit ?? 0}
              isDisabled={isView}
              register={register("reminderLimit", {
                required: "Giới hạn nhắc nhở không được để trống",
                min: { value: 0, message: "Giới hạn phải lớn hơn hoặc bằng 0" },
              })}
              error={errors.reminderLimit}
            />
            <FormInput
              label="Thành viên tối đa"
              type="number"
              defaultValue={plan?.maxMembers ?? 0}
              isDisabled={isView}
              register={register("maxMembers", {
                required: "Số thành viên không được để trống",
                min: {
                  value: 0,
                  message: "Số thành viên phải lớn hơn hoặc bằng 0",
                },
              })}
              error={errors.maxMembers}
            />
            <FormInput
              label="Clients tối đa"
              type="number"
              defaultValue={plan?.maxClients ?? 0}
              isDisabled={isView}
              register={register("maxClients", {
                required: "Số clients không được để trống",
                min: {
                  value: 0,
                  message: "Số clients phải lớn hơn hoặc bằng 0",
                },
              })}
              error={errors.maxClients}
            />
          </div>
        </section>
      </div>

      <section className="space-y-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-text-secondary" />
          <h3 className="text-lg font-semibold text-text-secondary uppercase">
            Tính năng
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BOOLEAN_FIELDS.map((field) => (
            <div
              key={field}
              className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-white px-4 py-3"
            >
              <span className="text-sm font-medium text-gray-700">
                {BOOLEAN_LABELS[field]}
              </span>
              <Toggle
                checked={Boolean(watch(field))}
                onChange={(checked) =>
                  setValue(field, checked, { shouldDirty: true })
                }
                disabled={isView}
              />
            </div>
          ))}
        </div>
      </section>
    </form>
  );
};

export default SubscriptionModal;
