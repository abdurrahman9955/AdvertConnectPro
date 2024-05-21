import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500'; 

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

export const downloadBanner = async (imageKey: number): Promise<ApiResponse> => {
  try {

    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<AuthApiResponse> = await axios.get(
      `${API_BASE_URL}/downloads/banner/${imageKey}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'user-id': userId,
        },
      }
    );

    const result = response.data;
    //@ts-ignore
    return { success: true, data: result };
  } catch (error:any) {
    console.error('Error downloading media:', error.message);
    return { success: false, error: 'Failed to download media' };
  }
};

