import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';

interface ApiResponse {
  message: string;
  error?: string;
}

interface AuthApiResponse extends ApiResponse {
  accessToken: string;
  refreshToken: string;
  userId:string;
  expiration: number;
}

const handleAuthResponse = (response: AuthApiResponse): void => {
  const { accessToken, refreshToken, userId, ...responseData } = response;

  if (accessToken && refreshToken && userId) {
    Cookies.set('accessToken', accessToken, { path: '/', expires: 7 });
    Cookies.set('refreshToken', refreshToken, { path: '/', expires: 7 });
    Cookies.set('userId', userId, { path: '/', expires: 7 });
    Cookies.set('isAuthenticated', 'true', { path: '/', expires: 7 });
  }

  if (responseData.message) {
    console.log(responseData.message);
  } else if (responseData.error) {
    console.error(responseData.error);
    throw new Error(responseData.error);
  }
};

class OTPResetUtils {
  static sendResetOTP = async (userData: { email?: string; phone?: string }): Promise<ApiResponse> => {
    try {
      const response: AxiosResponse<AuthApiResponse> = await axios.post(`${API_BASE_URL}/auth/verify/resetpassword`, userData);
      const result = response.data;
      handleAuthResponse(result);
      return result;
    } catch (error) {
      console.error('Error sending reset OTP:', error);
      throw new Error('Failed to send reset OTP');
    }
  };
}

export default OTPResetUtils;
