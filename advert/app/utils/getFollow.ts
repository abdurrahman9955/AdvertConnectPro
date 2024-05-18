import axios, { AxiosResponse } from 'axios';

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

const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';

const handleApiResponse = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
  if (response.data.success) {
    return response.data.data as T;
  } else {
    throw new Error(response.data.error || 'Request failed');
  }
};

export const getFollowing = async (userId:number): Promise<Follower[]> => {
  try {

    const userId = localStorage.getItem('userId');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response: AxiosResponse<ApiResponse<Follower[]>> = 
    await axios.get(`${API_BASE_URL}/following/${userId}/following`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'user-id': userId, 
      },
    });
    return handleApiResponse(response);
  } catch (error:any) {
    console.error('Error getting following users:', error.message);
    throw new Error('Failed to get following users');
  }
};

export const unfollowUser = async ( followingId: number): Promise<void> => {
  try {

    const userId = localStorage.getItem('userId');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response: AxiosResponse<ApiResponse<void>> = await axios.delete(
      `${API_BASE_URL}/following/unfollow/${followingId}`,
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
    console.error('Error unfollowing user:', error.message);
    throw new Error('Failed to unfollow user');
  }
};

