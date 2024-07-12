import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
const API_BASE_URL ='https://advertconnectpro.shop';

interface Product {
  id: number;
  types: string;
  categories: string;
  phoneNumber: string;
  price: number;
  currency: string;
  country: string;
  state: string;
  province: string;
  city: string;
  fullAddress: string;
  emailAddress: string;
  productName: string;
  companyName: string;
  description: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}

interface AuthApiResponse extends ApiResponse {
  accessToken: string;
  refreshToken: string;
  expiration: number; 
}

export const createProduct1 = async (productData: Product): Promise<ApiResponse> => {
  try {

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API_BASE_URL}/product1/create1`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error:any) {
    console.error('Error creating product:', error.message);
    throw new Error('Failed to create product');
  }
};

export const getProductById1 = async (productId: number): Promise<Product | null> => {
  try {

    const response: AxiosResponse<ApiResponse> = await axios.get(`${API_BASE_URL}/product1/${productId}`,
    
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    
    );
    if (response.data.success) {
      return response.data.data;
    }
    return null;
  } catch (error:any) {
    console.error('Error getting product by ID:', error.message);
    throw new Error('Failed to get product');
  }
};

export const updateProduct1 = async (productId: number, updatedData: Partial<Product>): Promise<ApiResponse> => {
  try {

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<ApiResponse> = await axios.put(
      `${API_BASE_URL}/product1/${productId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error:any) {
    console.error('Error updating product:', error.message);
    throw new Error('Failed to update product');
  }
};

export const deleteProduct1 = async (productId: number): Promise<ApiResponse> => {
  try {

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }
   
    const response: AxiosResponse<ApiResponse> = await axios.delete(
      `${API_BASE_URL}/product1/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error:any) {
    console.error('Error deleting product:', error.message);
    throw new Error('Failed to delete product');
  }
};



