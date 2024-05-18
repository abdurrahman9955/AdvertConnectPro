import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';


interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

interface Comment {
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

export const getCommentsImage = async (productId: string): Promise<Comment[]> => {
  try {
    const response: AxiosResponse<ApiResponse<Comment[]>> = await axios.get(
      `${API_BASE_URL}/comments/images/${productId}`
    );

    if (response.data.success) {
      const comments = response.data.data || [];
      console.log('Comments data:', comments); 
      return comments;
    } 
    else {
      throw new Error(response.data.error || 'Failed to retrieve comment');
    }

  } catch (error:any) {
    console.error('Error retrieving comments:', error.message);
    throw new Error('Failed to retrieve comments data');
  }
};

export const getCommentsImages = async (productId: string): Promise<Comment[]> => {
  try {
    const response: AxiosResponse<Comment[]> = await axios.get(
      `${API_BASE_URL}/comments/images/${productId}`
    );

    if (response.data) {
      return response.data;
    } else {
      throw new Error('Failed to retrieve comments');
    }
  } catch (error:any) {
    console.error('Error retrieving comments:', error.message);
    throw new Error('Failed to retrieve comments data');
  }
};

export const postCommentImages = async (content: string,): Promise<Comment> => {
  try {

    const userId = localStorage.getItem('userId');
    const productId = localStorage.getItem('productId');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response: AxiosResponse<ApiResponse<Comment>> = await axios.post(
      `${API_BASE_URL}/comments/images`,
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
      return response.data.data as Comment;
    } else {
      throw new Error(response.data.error);
    }
  } catch (error:any) {
    console.error('Error posting comment:', error.message);
    throw new Error('Failed to post comment');
  }
};
