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

export const downloadVideo = async (imageKey: number): Promise<ApiResponse> => {
  try {

    const userId = localStorage.getItem('userId');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response: AxiosResponse<AuthApiResponse> = await axios.get(
      `${API_BASE_URL}/downloads/video/${imageKey}`,
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
