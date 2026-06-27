import type { SubscriptionPlan } from "../../pages/admin/subscription/models/searchSubscription.model";
import type { PlanType, UpdatePlanRequest } from "../../pages/admin/subscription/models/updateSubscription.model";


export const DEFAULT_FORM_VALUES: UpdatePlanRequest = {
  planType: "FREE",
  planName: "",
  description: "",
  price: 0,
  durationDays: 0,
  aiScanLimitPerMonth: 0,
  mealSuggestionLimitPerMonth: 0,
  reminderLimit: 0,
  maxMembers: 0,
  maxClients: 0,
  trial: false,
  familySharingEnabled: false,
  coachFeaturesEnabled: false,
  mealPlanEnabled: false,
  weeklyReportEnabled: false,
  monthlyReportEnabled: false,
  exportReportEnabled: false,
  macroTrackingEnabled: false,
  calorieDeficitTrackingEnabled: false,
  calorieSurplusTrackingEnabled: false,
  bloodSugarControlEnabled: false,
  active: false,
};

export const toPlanRequest = (
  plan?: SubscriptionPlan | UpdatePlanRequest | null,
): UpdatePlanRequest => {
  const source = plan || DEFAULT_FORM_VALUES;

  return {
    planType: ((source.planType as PlanType | undefined) || DEFAULT_FORM_VALUES.planType),
    planName: source.planName ?? DEFAULT_FORM_VALUES.planName,
    description: source.description ?? DEFAULT_FORM_VALUES.description,
    price: source.price ?? DEFAULT_FORM_VALUES.price,
    durationDays: source.durationDays ?? DEFAULT_FORM_VALUES.durationDays,
    aiScanLimitPerMonth: source.aiScanLimitPerMonth ?? DEFAULT_FORM_VALUES.aiScanLimitPerMonth,
    mealSuggestionLimitPerMonth: source.mealSuggestionLimitPerMonth ?? DEFAULT_FORM_VALUES.mealSuggestionLimitPerMonth,
    reminderLimit: source.reminderLimit ?? DEFAULT_FORM_VALUES.reminderLimit,
    maxMembers: source.maxMembers ?? DEFAULT_FORM_VALUES.maxMembers,
    maxClients: source.maxClients ?? DEFAULT_FORM_VALUES.maxClients,
    trial: source.trial ?? DEFAULT_FORM_VALUES.trial,
    familySharingEnabled: source.familySharingEnabled ?? DEFAULT_FORM_VALUES.familySharingEnabled,
    coachFeaturesEnabled: source.coachFeaturesEnabled ?? DEFAULT_FORM_VALUES.coachFeaturesEnabled,
    mealPlanEnabled: source.mealPlanEnabled ?? DEFAULT_FORM_VALUES.mealPlanEnabled,
    weeklyReportEnabled: source.weeklyReportEnabled ?? DEFAULT_FORM_VALUES.weeklyReportEnabled,
    monthlyReportEnabled: source.monthlyReportEnabled ?? DEFAULT_FORM_VALUES.monthlyReportEnabled,
    exportReportEnabled: source.exportReportEnabled ?? DEFAULT_FORM_VALUES.exportReportEnabled,
    macroTrackingEnabled: source.macroTrackingEnabled ?? DEFAULT_FORM_VALUES.macroTrackingEnabled,
    calorieDeficitTrackingEnabled: source.calorieDeficitTrackingEnabled ?? DEFAULT_FORM_VALUES.calorieDeficitTrackingEnabled,
    calorieSurplusTrackingEnabled: source.calorieSurplusTrackingEnabled ?? DEFAULT_FORM_VALUES.calorieSurplusTrackingEnabled,
    bloodSugarControlEnabled: source.bloodSugarControlEnabled ?? DEFAULT_FORM_VALUES.bloodSugarControlEnabled,
    active: source.active ?? DEFAULT_FORM_VALUES.active,
  };
};