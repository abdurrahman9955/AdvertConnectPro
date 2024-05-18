import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

interface CommentBanner {
  id: number;
  userId: number;
  content: string;
  productId: number;
  User: {
    firstName: string;
    lastName: string;
    profile: {
      photoUrl: string;
    };
  };
  createdAt: string;
}

export const getCommentBannereee = async (productId: string): Promise<CommentBanner[]> => {
  try {
    const response: AxiosResponse<ApiResponse<CommentBanner[]>> = await axios.get(
      `${API_BASE_URL}/comments/banner/${productId}`
    );

    if (response.data.success) {
      const comments = response.data.data || [];
      console.log('Comments data:', comments); 
      return comments;
    } else {
      throw new Error(response.data.error || 'Failed to retrieve comments');
    }

  } catch (error:any) {
    console.error('Error retrieving comments:', error.message);
    throw new Error('Failed to retrieve comments data. Please try again later.');
  }
};

export const getCommentBanner = async (productId: string): Promise<CommentBanner[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/comments/banner/${productId}`);
    
    if (!response.ok) {
      throw new Error('Failed to retrieve comments');
    }
    
    const responseData = await response.json();
    
    if (responseData.success) {
      const comments = responseData.data || [];
      console.log('Comments data:', comments);
      return comments;
    } else {
      throw new Error(responseData.error || 'Failed to retrieve comments');
    }

  } catch (error:any) {
    console.error('Error retrieving comments:', error.message);
    throw new Error('Failed to retrieve comments data. Please try again later.');
  }
};

export const postCommentBanner = async (content: string,): Promise<CommentBanner> => {
  try {

    const userId = localStorage.getItem('userId');
    const productId = localStorage.getItem('productId');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response: AxiosResponse<ApiResponse<CommentBanner>> = await axios.post(
      `${API_BASE_URL}/comments/banner`,
      { content },

      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'user-id': userId,
          'product-id':productId,
        },
      }

    );
    if (response.data.success) {
      return response.data.data as CommentBanner;
    } else {
      throw new Error(response.data.error);
    }
  } catch (error:any) {
    console.error('Error posting comment:', error.message);
    throw new Error('Failed to post comment');
  }
};