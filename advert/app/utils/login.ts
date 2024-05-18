import axios, { AxiosResponse } from 'axios';
import * as dotenv from "dotenv";

dotenv.config();

const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  userId: string;
  accessToken: string;
  refreshToken: string; 
  
}

export const loginUser = async (loginData: LoginData): Promise<{ success: boolean, data?: LoginResponse }> => {
  try {

    const response: AxiosResponse<LoginResponse> = await axios.post(
      `${API_BASE_URL}/auth/login/login`,
      loginData,
      { headers: {
        'Content-Type': 'application/json',   
    } }
    );

     if (response.status === 200) {
      const responseData = response.data;

      return { success: true, data: responseData };
    } else if (response.status === 401) {
      //@ts-ignore
      const errorMessage = response.data.error;

      if (errorMessage.includes('email not registered')) {
        //@ts-ignore
        return { success: false, data: { message: 'This email is not registered. Please create a new account.' } };
      } else if (errorMessage.includes('incorrect password')) {
        //@ts-ignore
        return { success: false, data: { message: 'Incorrect password. Please enter the correct password and try again.' } };
      } else {
        console.error('Unauthorized:', errorMessage);
        throw new Error(errorMessage || 'Unauthorized');
      }
    } else {
      //@ts-ignore
      const errorMessage = response.data.error;

      console.error('Error during login:', errorMessage);
      throw new Error(errorMessage || 'Failed to log in');
    }
  } catch (error: any) {
    console.error('Error during login:', error.message);
    throw new Error('email or password is incorrect!');
  }
};


