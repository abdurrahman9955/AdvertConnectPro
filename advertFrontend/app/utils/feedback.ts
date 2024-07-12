import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import Cookies from 'js-cookie';
const API_BASE_URL ='https://advertconnectpro.shop';

interface Feedback {
  name: string;
  reason: string;
  statement: string;
  rating: number;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface AuthApiResponse extends ApiResponse {
  accessToken: string;
  refreshToken: string;
  expiration: number; 
}

export const getFeedbacks = async ( ): Promise<ApiResponse<Feedback[]>> => {
  try {

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<Feedback[]> = await axios.get(`${API_BASE_URL}/feedbacks/feedback`,
   
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', 
      },
    }
    
    );
    return { success: true, data: response.data };  
  } catch (error: any) {
    console.error('Error getting feedbacks:', error.message);
    throw new Error('Failed to get feedbacks');
  }
};

export const submitFeedback = async (dispatch: Dispatch, feedbackData: Feedback): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<{ message: string }> = await axios.post(
      `${API_BASE_URL}/feedbacks/feedback`,
      feedbackData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 201) {
      const responseData = response.data;

      console.log('Feedback submitted successfully:', responseData);

      return { success: true, data: responseData };
    } else {
      console.error('Error submitting feedback:', response.data.message);
      throw new Error(response.data.message || 'Failed to submit feedback');
    }
  } catch (error: any) {
    console.error('Error submitting feedback:', error.message);
    throw new Error('Failed to submit feedback');
  }
};

export const deleteFeedback = async (feedbackId: number): Promise<ApiResponse> => {
  try {

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<{ message: string }> = await axios.delete(
      `${API_BASE_URL}/feedbacks/feedback/${feedbackId}`,
    
      {
        headers: {
           Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', 
        },
      });

    if (response.status === 200) {
      const responseData = response.data;

      console.log('Feedback deleted successfully:', responseData);

      return { success: true, data: responseData };
    } else {
      console.error('Error deleting feedback:', response.data.message);
      throw new Error(response.data.message || 'Failed to delete feedback');
    }
  } catch (error: any) {
    console.error('Error deleting feedback:', error.message);
    throw new Error('Failed to delete feedback');
  }
};

