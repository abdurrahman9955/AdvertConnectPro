import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

interface CommentVideos {
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

export const getCommentsVideo = async (productId: string): Promise<CommentVideos[]> => {
  try {
    const response: AxiosResponse<ApiResponse<CommentVideos[]>> = await axios.get(
      `${API_BASE_URL}/comments/video/${productId}`
    );

    if (response.data.success) {
      const comments = response.data.data || [];
      console.log('Comments videos data:', comments); 
      return comments;
    } 
    else {
      throw new Error(response.data.error || 'Failed to retrieve comment video');
    }

  } catch (error:any) {
    console.error('Error retrieving comments:', error.message);
    throw new Error('Failed to retrieve comments videos data');
  }
};

export const postCommentVideo = async (content: string,): Promise<CommentVideos> => {
  try {

    const userId = localStorage.getItem('userId');
    const productId = localStorage.getItem('productId');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token not found');
    }

    const response: AxiosResponse<ApiResponse<CommentVideos>> = await axios.post(
      `${API_BASE_URL}/comments/video`,
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
      return response.data.data as CommentVideos;
    } else {
      throw new Error(response.data.error);
    }
  } catch (error:any) {
    console.error('Error posting comment:', error.message);
    throw new Error('Failed to post comment');
  }
};

