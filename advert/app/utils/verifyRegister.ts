import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';

interface ApiResponse {
  message: string;
  error?: string;
}

interface ResendApiResponse extends ApiResponse {
  newOtp: string;
}

interface AuthApiResponse extends ApiResponse {
  accessToken: string;
  refreshToken: string;
  userId:string;
  expiration: number;
}

const handleAuthResponse = (response: AuthApiResponse): void => {
  const { accessToken, refreshToken, expiration,userId, ...responseData } = response;

  if (accessToken && refreshToken && userId) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', userId);
    localStorage.setItem('isAuthenticated', 'true');
  }

  if (responseData.message) {
    console.log(responseData.message);
  } else if (responseData.error) {
    console.error(responseData.error);
    throw new Error(responseData.error);
  }
};

class OTPRegistrationUtils {
  static registerUser = async (userData: { email?: string; phone?: string; otp: string }): Promise<ApiResponse> => {
    try {
      const response: AxiosResponse<AuthApiResponse> = await axios.post(`${API_BASE_URL}/auth/verify/verify`, userData);
      const result = response.data;
      handleAuthResponse(result);
      return result;
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Failed to register user');
    }
  };

  static resendOTP = async (email: string): Promise<ResendApiResponse> => {
    try {
      const response: AxiosResponse<ResendApiResponse> = await axios.post(`${API_BASE_URL}/auth/verify/resend`, { email });
      return response.data;
    } catch (error) {
      console.error('Error resending OTP:', error);
      throw new Error('Failed to resend OTP');
    }
  };
}

export default OTPRegistrationUtils;
