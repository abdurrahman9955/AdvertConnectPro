import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
const API_BASE_URL ='https://advertconnectpro.shop';

interface ApiResponse { 
  success: boolean;
  imageUrl?: string; 
  message?: string;
  error?: string;
}

interface AuthApiResponse extends ApiResponse {
  accessToken: string;
  refreshToken: string;
  expiration: number;
}

export const uploadProfileImage = async ( image: File): Promise<ApiResponse> => {
  try {

    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const formData = new FormData();
    formData.append('image', image);

    const response: AxiosResponse<AuthApiResponse> = await axios.post(
      `${API_BASE_URL}/profile/upload/${userId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'multipart/form-data',
          'user-id': userId,
        },
      }
    );
    return response.data;
  } catch (error:any) {
    console.error('Error uploading profile image:', error.message);
    throw new Error('Failed to upload profile image');
  }
};

export const getProfileImage = async (): Promise<ApiResponse> => {
  try {

    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${API_BASE_URL}/profile/get/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'user-id': userId,
        },
      }
    );
    const { imageUrl } = response.data;
    return { success: true, imageUrl };
  } catch (error: any) {
    console.error('Error getting profile image:', error.message);
    throw new Error('Failed to get profile image');
  }
};

export const updateProfileImage = async ( image: File): Promise<ApiResponse> => {
  try {

    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const formData = new FormData();
    formData.append('image', image);

    const response: AxiosResponse<AuthApiResponse> = await axios.put(
      `${API_BASE_URL}/profile/update/${userId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          'user-id': userId,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error updating profile image:', error.message);
    throw new Error('Failed to update profile image');
  }
};

export const deleteProfileImage = async (): Promise<ApiResponse> => {
  try {

    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<ApiResponse> = await axios.delete(
      `${API_BASE_URL}/profile/delete/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'user-id': userId,
        },
      }
    );
   
    return response.data;
  } catch (error: any) {
    console.error('Error deleting profile image:', error.message);
    throw new Error('Failed to delete profile image');
  }
};

