import axios, { AxiosResponse } from 'axios';

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

export const giveBannerRating = async ( productId: string, ratingData: { value: number },
 ): Promise<ApiResponse> => {
  try {

    const userId = localStorage.getItem('userId');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response: AxiosResponse<AuthApiResponse> = await axios.post(
      `${API_BASE_URL}/rating/banner/${productId}`,
      ratingData,
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
    console.error('Error giving product rating:', error.message);
    throw new Error('Failed to give product rating');
  }
};

export const getBannerRatings = async ( productId: string): Promise<any[]> => {
  try {
    const response: AxiosResponse<any[]> = await axios.get(
      `${API_BASE_URL}/rating/banner/${productId}`
    );
    return response.data;
  } catch (error: any) {
    console.error('Error getting product ratings:', error.message);
    throw new Error('Failed to get product ratings');
  }
};

