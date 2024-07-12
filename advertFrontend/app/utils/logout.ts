import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
const API_BASE_URL ='https://advertconnectpro.shop';

interface LogoutResponse {
  message: string;
  error: string;
}


export const logout = async (): Promise<{ success: boolean; message?: string }> => {
  try {
    const response: AxiosResponse<LogoutResponse> = await axios.post(`${API_BASE_URL}/auth/logout/logout`);

    if (response.status === 200) {
      const responseData = response.data;

      Cookies.remove('accessToken', { path: '/' });
      Cookies.remove('refreshToken', { path: '/' });
      Cookies.remove('userId', { path: '/' });
      Cookies.set('isAuthenticated', 'false', { path: '/', expires: 7 });
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
