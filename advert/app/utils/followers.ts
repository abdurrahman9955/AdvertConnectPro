import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  isFollowing: boolean;
  followers?: Follower[];
  following:Follower[];
  followingStatus?: { [userId: number]: boolean };
}

interface Follower {
  id: number;
  userId:number;
  followerId: number;
  followingId: number;
  User: User;
  isFollowing: boolean;
}


interface User {
  id: number;
  firstName: string;
  lastName: string;
  profile: {
    photoUrl: string;
  };
}

export const getFollowers = async (): Promise<ApiResponse> => {
  try {

    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }
    
    const response: AxiosResponse<ApiResponse> = await 
    axios.get(`${API_BASE_URL}/followers/followers`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'user-id': userId,
      },
    } );

    const followers = response.data.followers;

    if (!followers) {
      throw new Error('No followers found'); 
    }

    const followingStatus: { [userId: number]: boolean } = {};

    followers.forEach((follower) => {
    
      followingStatus[follower.User.id] = follower.isFollowing; 
    });

    response.data.followingStatus = followingStatus;
    
    return response.data;
  } catch (error:any) {
    console.error('Error getting followers:', error.message);
    throw new Error('Failed to get followers');
  }
};

export const getFollowing = async (): Promise<ApiResponse> => {
  try {

    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }
    
    const response: AxiosResponse<ApiResponse> = await 
    axios.get(`${API_BASE_URL}/followers/following`,

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
    console.error('Error getting followers:', error.message);
    throw new Error('Failed to get followers');
  }
};

export const getFollowersCount = async (userId:string): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await 
    axios.get(`${API_BASE_URL}/followers/followers/${userId}`,);
    return response.data;
  } catch (error:any) {
    console.error('Error getting followers:', error.message);
    throw new Error('Failed to get followers');
  }
};

export const getFollowingCount = async (userId:string): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await 
    axios.get(`${API_BASE_URL}/followers/following/${userId}`,);
    return response.data;
  } catch (error:any) {
    console.error('Error getting followers:', error.message);
    throw new Error('Failed to get followers');
  }
};

export const followUser = async (userId: string): Promise<ApiResponse> => {
  try {

    const id = Cookies.get('userId');

    if (!id) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API_BASE_URL}/followers/${userId}/follow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'user-id': id,
        },
      }
    );

    Cookies.set(`followStatus_${userId}`, 'following');

    return response.data;
  } catch (error:any) {
    console.error('Error following user:', error.message);
    throw new Error('Failed to follow user');
  }
};

export const unfollowUser = async (userId: string): Promise<ApiResponse> => {
  try {

    const id = Cookies.get('userId');

    if (!id) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<ApiResponse> = await axios.delete(
      `${API_BASE_URL}/followers/${userId}/unfollow`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'user-id': id,
        },
      }
    );

    Cookies.remove(`followStatus_${userId}`);

    return response.data;
  } catch (error:any) {
    console.error('Error unfollowing user:', error.message);
    throw new Error('Failed to unfollow user');
  }
};

export const checkFollowingStatus = async (userId: string): Promise<ApiResponse> => {
  try {
    const authenticatedUserId = Cookies.get('userId');
    const token = Cookies.get('accessToken');

    if (!authenticatedUserId || !token) {
      throw new Error('User ID or access token not found');
    }

    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${API_BASE_URL}/followers/followingStatus/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'user-id': authenticatedUserId,
        },
      }
    );

   
    return (response.data);
  } catch (error: any) {
    console.error('Error checking following status:', error.message);
    throw new Error('Failed to check following status');
  }
};