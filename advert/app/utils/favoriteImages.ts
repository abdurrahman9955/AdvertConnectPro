import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';

interface Product {
  id: number;
  userId: string;
  productId:string;
  mediaType: string;
  mediaUrl: string;
  product?: string;
  types?: string;
  categories: string;
  phoneNumber?: string;
  phoneCode?: string;
  price?: number;
  currency?: string;
  country?: string;
  state?: string;
  province?: string;
  city?: string;
  fullAddress?: string;
  emailAddress?: string;
  productName?: string;
  companyLink?: string;
  companyName?: string;
  description?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T; 
}

interface AuthApiResponse extends ApiResponse<any> {
  accessToken: string;
  refreshToken: string;
  expiration: number;
}



export const addToFavoriteImages = async (productId: string):Promise<ApiResponse<any>> => {
  try {

    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<AuthApiResponse> = await axios.post(
      `${API_BASE_URL}/favorite/images/${productId}`,
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
    console.error('Error adding to favorites:', error.message);
    throw new Error('Failed to add to favorites');
  }
};


export const getFavoriteImages = async (): Promise<ApiResponse<Product[]>> => {
  try {

    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<ApiResponse<Product[]>> = await axios.get(
      `${API_BASE_URL}/favorite/images`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'user-id': userId,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error getting favorites:', error.message);
    throw new Error('Failed to get favorites');
  }
};

export const removeFavoriteImages = async (favoriteId: string): Promise<ApiResponse<any>> => {
  try {

    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<ApiResponse<any>> = await axios.delete(
      `${API_BASE_URL}/favorite/images/${favoriteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'user-id': userId,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error removing from favorites:', error.message);
    throw new Error('Failed to remove from favorites');
  }
};

