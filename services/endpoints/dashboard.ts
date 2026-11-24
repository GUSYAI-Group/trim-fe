import { apiClient } from '../config/apiClient';

export interface DashboardBar {
  label: string;
  date: string;
  val: string;
  rawVal: number;
  height: string;
  active: boolean;
}

export interface DashboardWeeklyRevenue {
  totalRevenue: number;
  formattedTotal: string;
  growthPercent: string;
  periodLabel: string;
  bars: DashboardBar[];
}

export interface DashboardFloorStatus {
  currentDateFormatted: string;
  waiting: number;
  inProgress: number;
  completed: number;
  lateCount: number;
  lateCustomerNames: string;
}

export interface DashboardStats {
  kpi: {
    date?: string;
    today_revenue: number;
    today_appointments: number;
    today_customers: number;
    completed_services: number;
    currently_in_queue: number;
    average_rating: number;
    total_reviews: number;
    active_barbers_count: number;
    total_all_time_revenue: number;
  };
  weeklyRevenue?: DashboardWeeklyRevenue;
  floorStatus?: DashboardFloorStatus;
  topBarbers: any[];
  popularStyles: any[];
  stockAlerts: any[];
}

export const dashboardService = {
  getStats: async () => {
    return apiClient.get<DashboardStats>('/dashboard/stats');
  },
};

