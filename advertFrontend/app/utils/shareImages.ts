import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
const API_BASE_URL ='https://advertconnectpro.shop';

interface ShareResponse {
  title: string;
  description: string;
  imageUrl: string;
  productUrl: string;
}

export const shareImages = async (imageId: string): Promise<ShareResponse> => {
  try {
    const response: AxiosResponse<ShareResponse> = await axios.get(`${API_BASE_URL}/share/images/${imageId}`);
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

