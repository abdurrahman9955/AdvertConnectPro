import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';

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


export const videoOrder = async (order: Order,): Promise<ApiResponse> => {
  try {

    const userId = localStorage.getItem('userId');

    const productId = localStorage.getItem('productId');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API_BASE_URL}/orderRequest/video`,
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

export const getVideoOrders = async (): Promise<ApiResponse> => {
  try {

    const userId = localStorage.getItem('userId');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response: AxiosResponse<ApiResponse> = await 
    axios.get(`${API_BASE_URL}/orderRequest/videos`, {
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


