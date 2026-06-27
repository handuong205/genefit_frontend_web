import type { PlanType, UpdatePlanRequest } from "../../pages/admin/subscription/models/updateSubscription.model";


export const PLAN_TYPES: { value: PlanType; label: string }[] = [
  { value: "FREE", label: "Free" },
  { value: "WEIGHT_LOSS", label: "Weight Loss" },
  { value: "WEIGHT_GAIN", label: "Weight Gain" },
  { value: "MAINTENANCE", label: "Maintenance" },
  { value: "DIABETES", label: "Diabetes" },
  { value: "COACH", label: "Coach" },
  { value: "FAMILY", label: "Family" },
  { value: "PREMIUM", label: "Premium" },
  { value: "TRIAL_PREMIUM", label: "Trial Premium" },
];

export const BOOLEAN_FIELDS: (keyof Pick<
  UpdatePlanRequest,
  | "trial"
  | "familySharingEnabled"
  | "coachFeaturesEnabled"
  | "mealPlanEnabled"
  | "weeklyReportEnabled"
  | "monthlyReportEnabled"
  | "exportReportEnabled"
  | "macroTrackingEnabled"
  | "calorieDeficitTrackingEnabled"
  | "calorieSurplusTrackingEnabled"
  | "bloodSugarControlEnabled"
  | "active"
>)[] = [
  "trial",
  "familySharingEnabled",
  "coachFeaturesEnabled",
  "mealPlanEnabled",
  "weeklyReportEnabled",
  "monthlyReportEnabled",
  "exportReportEnabled",
  "macroTrackingEnabled",
  "calorieDeficitTrackingEnabled",
  "calorieSurplusTrackingEnabled",
  "bloodSugarControlEnabled",
  "active",
];

export const BOOLEAN_LABELS: Record<(typeof BOOLEAN_FIELDS)[number], string> = {
  trial: "Dùng thử",
  familySharingEnabled: "Chia sẻ gia đình",
  coachFeaturesEnabled: "Tính năng coach",
  mealPlanEnabled: "Kế hoạch bữa ăn",
  weeklyReportEnabled: "Báo cáo tuần",
  monthlyReportEnabled: "Báo cáo tháng",
  exportReportEnabled: "Xuất báo cáo",
  macroTrackingEnabled: "Theo dõi macro",
  calorieDeficitTrackingEnabled: "Theo dõi thâm hụt calo",
  calorieSurplusTrackingEnabled: "Theo dõi thừa calo",
  bloodSugarControlEnabled: "Kiểm soát đường huyết",
  active: "Hoạt động",
};