import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';

interface LogoutResponse {
  message: string;
  error: string;
}


export const logout = async (): Promise<{ success: boolean; message?: string }> => {
  try {
    const response: AxiosResponse<LogoutResponse> = await axios.post(`${API_BASE_URL}/auth/logout/logout`);

    if (response.status === 200) {
      const responseData = response.data;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userId');

      console.log('Logout successful:', responseData);
      return { success: true, message: responseData.message };
    } else {
      console.error('Error during logout:', response.data.error);
      throw new Error(response.data.error || 'Failed to logout');
    }
  } catch (error:any) {
    console.error('Error during logout:', error.message);
    throw new Error('Failed to logout');
  }
};
