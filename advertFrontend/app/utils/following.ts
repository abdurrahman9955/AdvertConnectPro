import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
const API_BASE_URL ='https://advertconnectpro.shop';

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  followers?: Follower[];
  following?:Follower[];
}

interface Follower {
  id: number;
  userId:number;
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

export const getFollowersCount = async (): Promise<ApiResponse> => {
  try {

    const profileId = Cookies.get('profileId');

    const response: AxiosResponse<ApiResponse> = await 
    axios.get(`${API_BASE_URL}/following/followers`,
    {
      headers: {
        'profile-id': profileId,
      },
    });
    return response.data;
  } catch (error:any) {
    console.error('Error getting followers:', error.message);
    throw new Error('Failed to get followers');
  }
};

export const getFollowingCount = async (): Promise<ApiResponse> => {
  try {

    const profileId = Cookies.get('profileId');

    const response: AxiosResponse<ApiResponse> = await 
    axios.get(`${API_BASE_URL}/following/following`,
    {
      headers: {
        'profile-id': profileId,
      },
    });
    return response.data;
  } catch (error:any) {
    console.error('Error getting followers:', error.message);
    throw new Error('Failed to get followers');
  }
};

export const followUser = async (): Promise<ApiResponse> => {
  try {

    const id = Cookies.get('userId');

    const profileId = Cookies.get('profileId');
    
    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API_BASE_URL}/following/follow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'user-id': id,
          'profile-id': profileId,
        },
      }
    );

    Cookies.set(`followStatus_${profileId}`, 'following');

    return response.data;
  } catch (error:any) {
    console.error('Error following user:', error.message);
    throw new Error('Failed to follow user');
  }
};

export const unfollowUser = async (): Promise<ApiResponse> => {
  try {

    const profileId = Cookies.get('profileId');

    const id = Cookies.get('userId');

    if (!id) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<ApiResponse> = await axios.delete(
      `${API_BASE_URL}/following/unfollow`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'user-id': id,
          'profile-id': profileId,
        },
      }
    );

    Cookies.remove(`followStatus_${profileId}`);

    return response.data;
  } catch (error:any) {
    console.error('Error unfollowing user:', error.message);
    throw new Error('Failed to unfollow user');
  }
};

