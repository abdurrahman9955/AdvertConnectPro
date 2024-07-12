import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
const API_BASE_URL ='https://advertconnectpro.shop';

interface Video {
  id: number;
  mediaType: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  product?: string;
  types?: string;
  categories?: string;
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

interface FilterState {
  city: string;
  country: string;
  state: string;
  fullAddress: string;
  minPrice: number | string;
  maxPrice: number | string;
  company: string;
  name: string;
  types: string;
  categories: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  videos?: Video[];
}

interface AuthApiResponse extends ApiResponse {
  accessToken: string;
  refreshToken: string;
  expiration: number;
}

export const uploadVideo = async (formData: FormData): Promise<ApiResponse> => {
  try {

    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API_BASE_URL}/videos/upload`, 
      formData, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          'user-id': userId,
        },
      }
    );

    const videos = response.data.videos;
    if (videos) {
      const videoId = videos[0].id;
      Cookies.set('videoId', videoId.toString());
    }
   
    return response.data;
  } catch (error: any) {
    console.error('Error uploading video:', error.message);
    throw new Error('Failed to upload video');
  }
};

export const deleteVideo = async (productId:number): Promise<ApiResponse> => {
  try {

    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<AuthApiResponse> = await axios.delete(
      `${API_BASE_URL}/videos/delete/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'user-id': userId,
          },
      }
    );
    const result = response.data;
    return result;
  } catch (error:any) {
    console.error('Error deleting video:', error.message);
    throw new Error('Failed to delete video');
  }
};

export const editVideo = async (videoId: number): Promise<ApiResponse> => {
  try {

    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<AuthApiResponse> = await axios.put(
      `${API_BASE_URL}/videos/edit/${videoId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'user-id': userId,
        },
      }
    );
    const result = response.data;
    return result;
  } catch (error:any) {
    console.error('Error editing video:', error.message);
    throw new Error('Failed to edit video');
  }
};

export const getVideo = async (filter: FilterState, searchQuery?:string): Promise<ApiResponse> => {
  try {

    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    let apiUrl = `${API_BASE_URL}/videos/getVideo?city=${filter.city}&country=${filter.country}&state=${filter.state}&fullAddress=${filter.fullAddress}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}&company=${filter.company}&name=${filter.name}&types=${filter.types}&categories=${filter.categories}`;
  
    if (searchQuery) {
      apiUrl += `&searchQuery=${encodeURIComponent(searchQuery)}`;
    }

    const response: AxiosResponse<AuthApiResponse> = await axios.get(apiUrl,
    
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'user-id': userId, 
      },
    }
 
    );
    const result = response.data;
    return result;
  } catch (error:any) {
    console.error('Error fetching videos:', error.message);
    throw new Error('Failed to fetch videos');
  }
};

export const getVideoByProfileId = async (): Promise<ApiResponse> => {
  try {

    const userId = Cookies.get('profileId');

    const response: AxiosResponse<AuthApiResponse> = await axios.get(`${API_BASE_URL}/videos/getVideosByProfileId`,
    
    { headers: {
        'profile-id': userId, 
      },});
    const result = response.data;
    return result;
  } catch (error:any) {
    console.error('Error fetching videos:', error.message);
    throw new Error('Failed to fetch videos');
  }
};


export const getVideoses = async (): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<AuthApiResponse> = await axios.get(`${API_BASE_URL}/videos/getVideos`);
    const result = response.data;
    return result;
  } catch (error:any) {
    console.error('Error fetching videos:', error.message);
    throw new Error('Failed to fetch videos');
  }
};

export const getVideos = async (filter: FilterState, searchQuery?:string): Promise<ApiResponse> => {
  try {

    let apiUrl = `${API_BASE_URL}/videos/getVideos?city=${filter.city}&country=${filter.country}&state=${filter.state}&fullAddress=${filter.fullAddress}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}&company=${filter.company}&name=${filter.name}&types=${filter.types}&categories=${filter.categories}`;
   
    if (searchQuery) {
      apiUrl += `&searchQuery=${encodeURIComponent(searchQuery)}`;
    }

    const response: AxiosResponse<AuthApiResponse> = await axios.get(apiUrl);
   
    return response.data;
  } catch (error: any) {
    console.error('Error fetching videos:', error.message);
    throw new Error('Failed to fetch videos');
  }
};

export const getVideosById = async (): Promise<ApiResponse> => {
  try {

    const productId = Cookies.get('productId');

    const response: AxiosResponse<AuthApiResponse> = await axios.get(`${API_BASE_URL}/videos/getVideosById`,
    
    {
      headers: {
        'product-id': productId, 
      },
    }
   
    );
    const result = response.data;
    return result;
  } catch (error:any) {
    console.error('Error fetching videos:', error.message);
    throw new Error('Failed to fetch videos');
  }
};

