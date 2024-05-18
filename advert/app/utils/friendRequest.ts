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

export const acceptFriendRequest = async (friendId: string, token: string): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API_BASE_URL}/friends/${friendId}/accept`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error:any) {
    console.error('Error accepting friend request:', error.message);
    throw new Error('Failed to accept friend request');
  }
};

export const rejectFriendRequest = async (friendId: string, token: string): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API_BASE_URL}/friends/${friendId}/reject`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error:any) {
    console.error('Error rejecting friend request:', error.message);
    throw new Error('Failed to reject friend request');
  }
};

export const checkFriendship = async (friendId: string, token: string): Promise<boolean> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${API_BASE_URL}/friends/${friendId}/check`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data.success;
  } catch (error:any) {
    console.error('Error checking friendship:', error.message);
    throw new Error('Failed to check friendship');
  }
};
