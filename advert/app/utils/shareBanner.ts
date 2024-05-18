import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';

interface ShareResponse {
  title: string;
  description: string;
  imageUrl: string;
  productUrl: string;
}

export const shareBanner = async (imageId: string): Promise<ShareResponse> => {
  try {
    const response: AxiosResponse<ShareResponse> = await axios.get(`${API_BASE_URL}/share/banner/${imageId}`);
    //@ts-ignore
    if (response.data && response.data.success) {
      return response.data;
    } else {
      throw new Error('Failed to share product');
    }
  } catch (error:any) {
    console.error('Error sharing product:', error.message);
    throw new Error('Failed to share product');
  }
};

