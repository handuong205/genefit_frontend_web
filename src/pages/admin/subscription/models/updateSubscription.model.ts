export type PlanType =
  | "FREE"
  | "TRIAL"
  | "COACH"
  | "FAMILY"
  | "PREMIUM";

export interface UpdatePlanRequest {
  planType: PlanType;
  planName: string;
  description: string;
  price: number;
  durationDays: number;

  maxAiScansPerDay: number;
  maxHistoryViewDays: number;
  mealSuggestionLimitPerMonth: number;
  reminderLimit: number;

  maxMembers: number;
  maxClients: number;

  trial: boolean;
  familySharingEnabled: boolean;
  coachFeaturesEnabled: boolean;

  mealPlanEnabled: boolean;
  weeklyReportEnabled: boolean;
  monthlyReportEnabled: boolean;
  exportReportEnabled: boolean;

  macroTrackingEnabled: boolean;
  calorieDeficitTrackingEnabled: boolean;
  calorieSurplusTrackingEnabled: boolean;
  bloodSugarControlEnabled: boolean;

  active: boolean;
}
