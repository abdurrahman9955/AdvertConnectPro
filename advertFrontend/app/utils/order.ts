import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
const API_BASE_URL ='https://advertconnectpro.shop';

interface Order {
  fullName: string;
  email: string;
  phoneNumber: string;
  fullAddress: string;
  description: string;
  User: {
    firstName: string;
    lastName: string;
    profile: {
      photoUrl: string;
    };
  };
  createdAt: string;
}

interface OrderResponse {
  id: number;
  userId: number;
  productId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  fullAddress: string;
  description: string;
  User: {
    firstName: string;
    lastName: string;
    profile: {
      photoUrl: string;
    };
  };
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  data?: OrderResponse | OrderResponse[];
  error?: string;
  message?: string;
}


export const createOrder = async (order: Order,): Promise<ApiResponse> => {
  try {

    const productId = Cookies.get('productId');

    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API_BASE_URL}/orderRequest/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'user-id': userId,
          'product-id':productId,
        },
      }
    );
    return response.data;
  } catch (error:any) {
    console.error('Error creating order:', error.message);
    throw new Error('Failed to create order');
  }
};

export const getUserOrders = async (): Promise<ApiResponse> => {
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
    axios.get(`${API_BASE_URL}/orderRequest/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'user-id': userId,
      },
    });

    return response.data;
  } catch (error:any) {
    console.error('Error getting user orders:', error.message);
    throw new Error('Failed to get user orders');
  }
};


