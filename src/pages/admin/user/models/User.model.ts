export interface User {
  userId: number;
  username: string;
  email: string;
  role: string;
  isActive?: boolean;
  createdAt?: string;
  userProfile?: {
    heightCm?: number;
    weightKg?: number;
    age?: number;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    occupation?: string;
    gender?: string;
    goal?: string;
    activityLevel?: string;
    targetWeightKg?: number;
    baseTargetCalorie?: number;
    initialWeight?: number;
    targetDate?: string;
    goalStartDate?: string;
    createdAt?: string;
    updatedAt?: string;
    medicalConditions?: string[];
    allergies?: string[];
    avatarUrl?: string;
  };
  subscription?: {
    subscriptionId: number;
    planName: string;
    planType: string;
    status: string;
    startDate: string;
    endDate: string;
    autoRenew: boolean;
  };
}
