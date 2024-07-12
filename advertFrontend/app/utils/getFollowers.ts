import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

interface Follower {
  id: number;
  followerId: number;
  followingId: number;
  User: User;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  profile: {
    photoUrl: string;
  };
}

const API_BASE_URL ='https://advertconnectpro.shop';

const handleApiResponse = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
  if (response.data.success) {
    return response.data.data as T;
  } else {
    throw new Error(response.data.error || 'Request failed');
  }
};

export const getFollowers = async (userId:number): Promise<Follower[]> => {
  try {

    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<ApiResponse<Follower[]>> = await 
    axios.get(`${API_BASE_URL}/following/followers/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'user-id': userId,
      },
    });
    return handleApiResponse(response);
  } catch (error:any) {
    console.error('Error getting followers:', error.message);
    throw new Error('Failed to get followers');
  }
};

export const followBackUser = async (followerId:string): Promise<void> => {
  try {

    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<ApiResponse<void>> = await axios.post(
      `${API_BASE_URL}/following/follow-back/${followerId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'user-id': userId,
        },
      }
    );
    
    handleApiResponse(response);
  } catch (error:any) {
    console.error('Error following back user:', error.message);
    throw new Error('Failed to follow back user');
  }
};

