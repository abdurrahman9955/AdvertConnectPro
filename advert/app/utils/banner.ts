import axios, { AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';

interface Banner {
  id: number;
  mediaType: string;
  mediaUrl: string;
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
  minPrice: number;
  maxPrice: number;
  company: string;
  name: string;
  types: string;
  categories: string;
}

interface BannerResponse {
  success: boolean;
  banner?: Banner;
  error?: string;
  accessToken?: string;
  refreshToken?: string;
  banners?: Banner[]

}

export const uploadBanner = async (formData: FormData): Promise<BannerResponse> => {
  try {

    const userId = localStorage.getItem('userId');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response: AxiosResponse<BannerResponse> = await axios.post(
      `${API_BASE_URL}/banner/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', 
          'user-id': userId,
        },
      }
    );

    if (response.status === 200) { 
      const banners = response.data.banners;
      if (banners) {
      const bannerId = banners[0].id;
      localStorage.setItem('bannerId', bannerId.toString());
      }
     
    }

    return response.data;
  } catch (error: any) {
    console.error('Error uploading banner:', error.message);
    throw new Error('Failed to upload banner');
  }
};

export const deleteBanner = async (productId:number): Promise<BannerResponse> => {
  try {

    const userId = localStorage.getItem('userId');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response: AxiosResponse<BannerResponse> = await axios.delete(
      `${API_BASE_URL}/banner/delete/${productId}`,

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
    console.error('Error deleting banner:', error.message);
    throw new Error('Failed to delete banner');
  }
};

export const editBanner = async (bannerId: number): Promise<BannerResponse> => {
  try {

    const userId = localStorage.getItem('userId');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }
    
    const response: AxiosResponse<BannerResponse> = await axios.put(
      `${API_BASE_URL}/banner/edit/${bannerId}`,
     {},
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
    console.error('Error editing banner:', error.message);
    throw new Error('Failed to edit banner');
  }
};

export const getBanner = async (filter: FilterState, searchQuery?:string): Promise<BannerResponse> => {
  try {

    const userId = localStorage.getItem('userId');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    let apiUrl = `${API_BASE_URL}/banner/getBanner?city=${filter.city}&country=${filter.country}&state=${filter.state}&fullAddress=${filter.fullAddress}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}&company=${filter.company}&name=${filter.name}&types=${filter.types}&categories=${filter.categories}`;

    if (searchQuery) {
      apiUrl += `&searchQuery=${encodeURIComponent(searchQuery)}`;
    }
    
    const response: AxiosResponse<BannerResponse> = await axios.get(apiUrl,
    
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        'user-id': userId, 
      },
    } );
    return response.data;
  } catch (error: any) {
    console.error('Error fetching banners:', error.message);
    throw new Error('Failed to fetch banners');
  }
};

export const getBannerByProfileId = async (): Promise<BannerResponse> => {
  try {

    const userId = localStorage.getItem('profileId');
    
    const response: AxiosResponse<BannerResponse> = await axios.get(`${API_BASE_URL}/banner/getBannerByProfileId`,
    
    {
      headers: {
        'profile-id': userId, 
      },
    } );
    return response.data;
  } catch (error: any) {
    console.error('Error fetching banners:', error.message);
    throw new Error('Failed to fetch banners');
  }
};


export const getBannerses = async (): Promise<BannerResponse> => {
  try {
    const response: AxiosResponse<BannerResponse> = await axios.get(`${API_BASE_URL}/banner/getBanners`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching banners:', error.message);
    throw new Error('Failed to fetch banners');
  }
};

export const getBanners = async (filter: FilterState, searchQuery?:string): Promise<BannerResponse> => {
  try {

    let apiUrl = `${API_BASE_URL}/banner/getBanners?city=${filter.city}&country=${filter.country}&state=${filter.state}&fullAddress=${filter.fullAddress}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}&company=${filter.company}&name=${filter.name}&types=${filter.types}&categories=${filter.categories}`;

    if (searchQuery) {
      apiUrl += `&searchQuery=${encodeURIComponent(searchQuery)}`;
    }
   
    const response: AxiosResponse<BannerResponse> = await axios.get(apiUrl);
    
    return response.data;
  } catch (error: any) {
    console.error('Error fetching banners:', error.message);
    throw new Error('Failed to fetch banners');
  }
};

export const getBannerById = async (): Promise<BannerResponse> => {
  try {

    const productId = localStorage.getItem('productId');
    
    const response: AxiosResponse<BannerResponse> = await axios.get(`${API_BASE_URL}/banner/getBannerById`,
    {
      headers: {
        'product-id': productId, 
      },
    } );
    return response.data;
  } catch (error: any) {
    console.error('Error fetching banners:', error.message);
    throw new Error('Failed to fetch banners');
  }
};

