export interface DashboardKpi {
  value: number;
  trend: number;
}

export interface DashboardChartData {
  month: string;
  revenue: number;
  users: number;
}

export interface RecentTransactionDto {
  transactionId: number;
  userName: string;
  userAvatar: string | null;
  amount: number;
  status: string;
  date: string;
}

export interface HealthGoalStats {
  loseWeight: number;
  gainWeight: number;
  maintainWeight: number;
  loseWeightPercentage: number;
  gainWeightPercentage: number;
  maintainWeightPercentage: number;
}

export interface RecentUserDto {
  userId: number;
  username: string;
  email: string;
  role: string;
  joinDate: string;
  avatar: string | null;
}

export interface DashboardResponse {
  totalUsers: DashboardKpi;
  newFoods: DashboardKpi;
  monthlyRevenue: DashboardKpi;
  activeSubscriptions: DashboardKpi;
  chartData: DashboardChartData[];
  recentTransactions: RecentTransactionDto[];
  healthGoals: HealthGoalStats;
  recentUsers: RecentUserDto[];
}
