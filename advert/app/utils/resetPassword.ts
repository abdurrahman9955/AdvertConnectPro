import axios, { AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';

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
}

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

      console.log('Forgot Password successful:', responseData);

      localStorage.setItem('userId', responseData.userId);  
      localStorage.setItem('accessToken', responseData.accessToken);
      localStorage.setItem('refreshToken', responseData.refreshToken);
      localStorage.setItem('isAuthenticated', 'true');

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

      console.log('OTP Verification successful:', responseData);
      localStorage.setItem('userId',responseData.userId);
      localStorage.setItem('accessToken', responseData.accessToken);
      localStorage.setItem('refreshToken', responseData.refreshToken);
      localStorage.setItem('isAuthenticated', 'true');
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

      console.log('OTP Resend successful:', responseData);
      localStorage.setItem('userId',responseData.userId);
      localStorage.setItem('accessToken', responseData.accessToken);
      localStorage.setItem('refreshToken', responseData.refreshToken);
      localStorage.setItem('isAuthenticated', 'true');
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

