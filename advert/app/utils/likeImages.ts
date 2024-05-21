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


export const likeImages = async (productId: string, ): Promise<ApiResponse> => {
  try {

    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API_BASE_URL}/likes/images/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'user-id': userId,
        },
      }
    );

    return response.data;
  } catch (error:any) {
    console.error('Error liking product media:', error.message);
    throw new Error('Failed to like product media');
  }
};


export const getLikeImages = async (productId: string): Promise<number> => {
  try {
    const response: AxiosResponse<{ likeCount: number }> = await axios.get(
      `${API_BASE_URL}/likes/images/${productId}`
    );
    return response.data.likeCount;
  } catch (error:any) {
    console.error('Error fetching product like count:', error.message);
    throw new Error('Failed to fetch product like count');
  }
};

