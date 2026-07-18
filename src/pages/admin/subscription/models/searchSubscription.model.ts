export interface SubscriptionPlan {
  planId: number;
  planType: string;
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

export interface PageInfo {
  pageNum: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

export interface GetPlansResponse {
  data: SubscriptionPlan[];
  pagination?: PageInfo;
}
