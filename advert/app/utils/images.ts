import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';

interface Image {
  id: number;
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
  Profile?: {
    photoUrl: string;
  };
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
}

interface AuthApiResponse extends ApiResponse {
  accessToken: string;
  refreshToken: string;
  expiration: number;
}

export const uploadImage = async (formData: FormData): Promise<ApiResponse> => {
 
  try {
   
    const userId = localStorage.getItem('userId');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response = await axios.post(`${API_BASE_URL}/images/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        'user-id': userId, 
      },
    });

    const { images } = response.data; 
    const imageId = images[0].id; 
    localStorage.setItem('imageId', imageId.toString());

    return response.data;
  } catch (error:any) {
    console.error('Error uploading image:', error.message);
    throw new Error('Failed to upload image');
  }
};

export const deleteImage = async (productId:number): Promise<ApiResponse> => {
  try {

    const userId = localStorage.getItem('userId');
    
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response: AxiosResponse<ApiResponse> = await axios.delete(
      `${API_BASE_URL}/images/delete/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'user-id': userId,
        },
      }
    );
    return response.data;
  } catch (error:any) {
    console.error('Error deleting image:', error.message);
    throw new Error('Failed to delete image');
  }
};

export const editImage = async (imageId: number): Promise<ApiResponse> => {
  try {

    const userId = localStorage.getItem('userId');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }
   
    const response: AxiosResponse<ApiResponse> = await axios.put(
      `${API_BASE_URL}/images/edit/${imageId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'user-id': userId,
        },
      }
    );
    return response.data;
  } catch (error:any) {
    console.error('Error editing image:', error.message);
    throw new Error('Failed to edit image');
  }
};

export const getImage = async (filter: FilterState, searchQuery?:string): Promise<Image[]> => {
  try {

    const userId = localStorage.getItem('userId');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    let apiUrl = `${API_BASE_URL}/images/getImage?city=${filter.city}&country=${filter.country}&state=${filter.state}&fullAddress=${filter.fullAddress}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}&company=${filter.company}&name=${filter.name}&types=${filter.types}&categories=${filter.categories}`;
  

    if (searchQuery) {
      apiUrl += `&searchQuery=${encodeURIComponent(searchQuery)}`;
    }
    
    const response: AxiosResponse<Image[]> = await axios.get(apiUrl,

    {  headers: {
        Authorization: `Bearer ${token}`,
        'user-id': userId, 
      },
    } );
    return response.data;
  } catch (error:any) {
    console.error('Error fetching images:', error.message);
    throw new Error('Failed to fetch images');
  }
};

export const getImageByProfileId = async (): Promise<Image[]> => {
  try {

    const userId = localStorage.getItem('profileId');

    const response: AxiosResponse<Image[]> = await axios.get(`${API_BASE_URL}/images/getImagesByProfileId`,

    {  headers: {
        'profile-id': userId, 
      },
    } );
    return response.data;
  } catch (error:any) {
    console.error('Error fetching images:', error.message);
    throw new Error('Failed to fetch images');
  }
};

export const getImages = async (filter: FilterState, searchQuery?: string): Promise<Image[]> => {
  try {
    
    let apiUrl = `${API_BASE_URL}/images/getImages?city=${filter.city}&country=${filter.country}&state=${filter.state}&fullAddress=${filter.fullAddress}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}&company=${filter.company}&name=${filter.name}&types=${filter.types}&categories=${filter.categories}`;
   

    if (searchQuery) {
      apiUrl += `&searchQuery=${encodeURIComponent(searchQuery)}`;
    }

    const response: AxiosResponse<Image[]> = await axios.get(apiUrl);
    
    return response.data;
  } catch (error: any) {
    console.error('Error fetching images:', error.message);
    throw new Error('Failed to fetch images');
  }
};


export const getProductById = async (): Promise<Image> => {
  try {
    const productId = localStorage.getItem('productId'); 
     
    if (!productId) {
      throw new Error('Product Id not found in local storage');
    }

    const response: AxiosResponse<Image> = await axios.get(
      `${API_BASE_URL}/images/getImagesById`,
      {
        headers: {
          'product-id': productId, 
        },
      });

    console.log('Response from getProductById:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching product:', error.message);
    throw new Error('Failed to fetch product');
  }
};
