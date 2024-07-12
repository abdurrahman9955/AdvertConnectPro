import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
const API_BASE_URL ='https://advertconnectpro.shop';

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

interface AuthApiResponse extends ApiResponse {
  accessToken: string;
  refreshToken: string;
  expiration: number; 
}

class EmployeeManagementUtils {
  static async blockUser(userId: string): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<AuthApiResponse> = await axios.post(`${API_BASE_URL}/employee/block/${userId}`);
      const result = response.data;
      return result;
    } catch (error) {
      console.error('Error blocking user:', error);
      throw new Error('Failed to block user');
    }
  };

  static async suspendUser(userId: string): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<AuthApiResponse> = await axios.post(`${API_BASE_URL}/employee/suspend/${userId}`);
      const result = response.data;
      return result;
    } catch (error) {
      console.error('Error suspending user:', error);
      throw new Error('Failed to suspend user');
    }
  };

  static async deleteUser(userId: string): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<AuthApiResponse> = await axios.post(`${API_BASE_URL}/employee/delete/${userId}`);
      const result = response.data; 
      return result;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  };

  static async sendMessage(userId: string, message: string): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<AuthApiResponse> = await axios.post(`${API_BASE_URL}/employee/sendMessage/${userId}`, { message });
      const result = response.data;
      return result;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  };

  static async getUserAnalysis(): Promise<any[]> {
    try {
      const response: AxiosResponse<AuthApiResponse[]> = await axios.get(`${API_BASE_URL}/employee/userAnalysis`);
      const result = response.data;
      return result;
    } catch (error) {
      console.error('Error getting user analysis:', error);
      throw new Error('Failed to get user analysis');
    }
  };
}

export default EmployeeManagementUtils;
