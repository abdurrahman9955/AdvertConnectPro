import axios, { AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';
import Cookies from 'js-cookie';

dotenv.config();

const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';

interface ForgotPasswordData {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
  otp?: string; 
}

interface ForgotPasswordResponse {
  message: string;
  success: boolean;
  accessToken: string;
  userId: string;
  otp: number;
  error: string;
}

interface ForgotPasswordData {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
  otp?: string;
}

interface ForgotPasswordResponse {
  message: string;
  success: boolean;
  accessToken: string;
  refreshToken: string;
  userId: string;
  otp: number;
  error: string;
  expiration: number;
}

const handleAuthResponse = (response: ForgotPasswordResponse): void => {
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

export const forgotPassword = async (forgotPasswordData: ForgotPasswordData): Promise<ForgotPasswordResponse> => {
  try {
    const response: AxiosResponse<ForgotPasswordResponse> = await axios.post(
      `${API_BASE_URL}/auth/forgotPassword/update-password`,
      forgotPasswordData,
      {
        headers: {
          
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      const responseData = response.data;
      handleAuthResponse(responseData)
      //@ts-ignore
      return { success: true, ...responseData };
    } else {
      console.error('Error during Forgot Password:', response.data.error);
      throw new Error(response.data.error || 'Failed to initiate Forgot Password');
    }
  } catch (error: any) {
    console.error('Error during Forgot Password:', error.message);
    throw new Error('Failed to initiate Forgot Password');
  }
};

export const verifyOtp = async (email: string, otp: string): Promise<ForgotPasswordResponse> => {
  try {
    const response: AxiosResponse<ForgotPasswordResponse> = await axios.post(
      `${API_BASE_URL}/auth/forgotPassword/verify`,
      { email, otp },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      const responseData = response.data;
      handleAuthResponse(responseData);
      //@ts-ignore
      return { success: true, ...responseData };
    } else {
      console.error('Error during OTP Verification:', response.data.error);
      throw new Error(response.data.error || 'Failed to verify OTP');
    }
  } catch (error: any) {
    console.error('Error during OTP Verification:', error.message);
    throw new Error('Failed to verify OTP');
  }
};

export const resendOtp = async (email: string): Promise<ForgotPasswordResponse> => {
  try {
    const response: AxiosResponse<ForgotPasswordResponse> = await axios.post(
      `${API_BASE_URL}/auth/forgotPassword/resend`,
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      const responseData = response.data;
      handleAuthResponse(responseData);
      //@ts-ignore
      return { success: true, ...responseData };
    } else {
      console.error('Error during OTP Resend:', response.data.error);
      throw new Error(response.data.error || 'Failed to resend OTP');
    }
  } catch (error: any) {
    console.error('Error during OTP Resend:', error.message);
    throw new Error('Failed to resend OTP');
  }
};

export type { ForgotPasswordData, ForgotPasswordResponse };

