import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
const API_BASE_URL ='https://advertconnectpro.shop';

interface Friendship {
  userId: number;
  friendId: number;
}

interface FriendshipResponse {
  id: number;
  userId: number;
  friendId: number;
  status: string;
  isBlocked: boolean;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: FriendshipResponse | FriendshipResponse[];
  error?: string;
}

interface AuthApiResponse extends ApiResponse {
  accessToken: string;
  refreshToken: string;
  expiration: number;
}

export const createFriendship = async (friendship: Friendship, token: string): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API_BASE_URL}/friend/create`,
      friendship,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error:any) {
    console.error('Error creating friendship:', error.message);
    throw new Error('Failed to create friendship');
  }
};

export const getUserFriendships = async (userId: number, token: string): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(`${API_BASE_URL}/friend/${userId}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error:any) {
    console.error('Error getting user friendships:', error.message);
    throw new Error('Failed to get user friendships');
  }
};

export const updateFriendshipStatus = async (
  friendshipId: number,
  newStatus: string,
  token: string
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.put(
      `${API_BASE_URL}/${friendshipId}/update-status`,
      { newStatus },
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error:any) {
    console.error('Error updating friendship status:', error.message);
    throw new Error('Failed to update friendship status');
  }
};

export const blockFriendship = async (
  friendshipId: number,
  isBlocked: boolean,
  token: string
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.put(
      `${API_BASE_URL}/${friendshipId}/block`,
      { isBlocked },
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error:any) {
    console.error('Error blocking friendship:', error.message);
    throw new Error('Failed to block friendship');
  }
};

