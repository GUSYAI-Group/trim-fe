import { apiClient } from '../config/apiClient';

export interface StoreSettingsResponse {
  settings: Record<string, string>;
  raw: Array<{
    setting_key: string;
    setting_value: string;
    description?: string;
  }>;
}

export const settingService = {
  getSettings: async () => {
    return apiClient.get<StoreSettingsResponse>('/settings');
  },

  updateSettings: async (updates: Record<string, any>) => {
    return apiClient.put('/settings', updates);
  },
};

