import axios, { AxiosResponse, AxiosError } from 'axios';
import Cookies from 'js-cookie';
const API_BASE_URL ='https://advertconnectpro.shop';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface ApiResponse {
  success: boolean;
  data?: User;
  error?: string;
}

interface AuthApiResponse extends ApiResponse {
  accessToken: string;
  refreshToken: string;
  expiration: number;
}

export const getUserById = async (userId: number): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<AuthApiResponse> = await axios.get(`${API_BASE_URL}/userId/${userId}`);

    const result = response.data;

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    return {
      success: false,
      error: 'An error occurred while fetching user data',
    };
  }
};
