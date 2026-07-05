export interface User {
  userId: number;
  username: string;
  email: string;
  role: string;
  userProfile?: {
    heightCm: number;
    weightKg: number;
    age: number;
    gender: string;
    goal: string;
    baseTargetCalorie: number;
    activityLevel: string;
    targetWeightKg: number;
  };
}
