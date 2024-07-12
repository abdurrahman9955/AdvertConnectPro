import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
const API_BASE_URL ='https://advertconnectpro.shop';

interface Settings {
  country?: string;
  currency?: string;
  continent?: string;
  state?: string;
  province?: string;
  fullAddress?: string;
  emailAddress?: string;
  phoneNumber?: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const getSettings = async (): Promise<Settings> => {
  try { 
    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<Settings & ApiResponse> = await 
    axios.get( `${API_BASE_URL}/settings/settings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'user-id': userId, 
        },
      }
    );

    const result = response.data;

    return result;
  } catch (error:any) {
    console.error('Error fetching settings:', error.message);
    throw new Error('Failed to fetch user settings');
  }
};

export const updateSettings = async (formData: Settings): Promise<ApiResponse> => {
  try {

    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API_BASE_URL}/settings/settings`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'user-id': userId, 
        },
      }
    );

    const result = response.data;
    return result;
  } catch (error:any) {
    console.error('Error updating settings:', error.message);
    throw new Error('Failed to update user settings');
  }
};

export const deleteSettings = async (): Promise<ApiResponse> => {
  try {

    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<ApiResponse> = await axios.delete(
      `${API_BASE_URL}/settings/settings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'user-id': userId, 
        },
      }
    );

    const result = response.data;

    return result;
  } catch (error:any) {
    console.error('Error deleting settings:', error.message);
    throw new Error('Failed to delete user settings');
  }
};

