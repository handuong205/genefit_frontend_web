import { axiosClient } from "../../../api/axios.config";
import type { SubscriptionPlan } from "../models/subscriptionPlan.model";

export type PaymentMethod = "VNPAY" | "MOMO";

export type MySubscription = {
  subscriptionId: number;
  planId: number;
  planType: string;
  planName: string;
  description?: string | null;
  active: boolean;
  status: string;
  startDate: string;
  endDate: string;
  maxAiScansPerDay: number;
  maxHistoryViewDays: number;
  mealSuggestionLimitPerMonth: number;
  reminderLimit: number;
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
};



export type PaymentResponse = {
  orderCode: string;
  payUrl: string;
};

export type CancelSubscriptionResponse = {
  subscriptionId: number;
  subscriptionStatus: string;
  startDate: string;
  endDate: string;
  cancelledAt: string;
  usedDays: number;
  refundEligible: boolean;
  refundStatus?: string | null;
  refundPercent?: number | null;
  refundAmount?: number | null;
  refundMessage?: string | null;
};

export type RenewSubscriptionResponse = {
  requiresPayment: boolean;
  paymentUrl?: string | null;
  subscription?: {
    subscriptionId: number;
    planId: number;
    planType: string;
    planName: string;
    startDate: string;
    endDate: string;
    status: string;
    autoRenew?: boolean;
  } | null;
};

export const getActiveSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
  const plans = await axiosClient.get("/api/subscriptions/plans/active", {
    params: {
      pageNum: 1,
      pageSize: 100,
    },
});

  return plans.data.data ?? [];
};

export const getMySubscription = async (
  accessToken: string,
): Promise<MySubscription | null> => {
  const response = await axiosClient.get<{ data?: MySubscription | null }>(
    "/api/subscriptions/me",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data.data ?? null;
};

export const initSubscriptionPayment = async ({
  accessToken,
  paymentMethod,
  planId,
}: {
  accessToken: string;
  paymentMethod: PaymentMethod;
  planId: number;
}): Promise<PaymentResponse> => {
  const response = await axiosClient.post<PaymentResponse>(
    "/api/payment/init",
    {
      planId,
      paymentMethod,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};

export const cancelMySubscription = async (
  accessToken: string,
): Promise<CancelSubscriptionResponse | null> => {
  const response = await axiosClient.post<{ data?: CancelSubscriptionResponse | null }>(
    "/api/subscriptions/cancel",
    null,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data.data ?? null;
};

export const renewMySubscription = async (
  accessToken: string,
): Promise<RenewSubscriptionResponse | null> => {
  const response = await axiosClient.post<{ data?: RenewSubscriptionResponse | null }>(
    "/api/subscriptions/renew",
    null,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data.data ?? null;
};
