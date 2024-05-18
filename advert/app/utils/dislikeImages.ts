import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

interface AuthResponse extends ApiResponse {
  accessToken: string;
  refreshToken: string;
  expiration: number;
}

export const dislikeImages = async (productId: string): Promise<ApiResponse> => {
  try {

    const userId = localStorage.getItem('userId');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response: AxiosResponse<AuthResponse> = await axios.post(
      `${API_BASE_URL}/dislikes/images/${productId}`,
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
    console.error('Error disliking product media:', error.message);
    throw new Error('Failed to dislike product media');
  }
};

export const getDislikeImages = async (productId: string): Promise<number> => {
  try {
    const response: AxiosResponse<{ likeCount: number }> = await axios.get(
      `${API_BASE_URL}/dislikes/images/${productId}`
    );
    return response.data.likeCount;
  } catch (error:any) {
    console.error('Error fetching product like count:', error.message);
    throw new Error('Failed to fetch product like count');
  }
};
