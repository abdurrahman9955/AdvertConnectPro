import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
const API_BASE_URL ='https://advertconnectpro.shop';

interface ApiResponse {
  message: string;
  error?: string;
}

interface VideoCallResponse {
  meetingLink: string;
}


interface AuthApiResponse extends ApiResponse {
  accessToken: string;
  refreshToken: string;
  expiration: number;
}


class VideoCallUtils {
  private static getHeaders(): AxiosRequestConfig {
    const token = Cookies.get('accessToken');

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  static startVideoCall = async (): Promise<VideoCallResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/videoCall/start`, {}, VideoCallUtils.getHeaders());
      return response.data;
    } catch (error) {
      console.error('Error starting video call:', error);
      throw new Error('Failed to start video call');
    }
  };

  static joinVideoCall = async (meetingLink: string): Promise<void> => {
    try {
      await axios.get(`${API_BASE_URL}/VideoCall/${meetingLink}`, VideoCallUtils.getHeaders());
    } catch (error) {
      console.error('Error joining video call:', error);
      throw new Error('Failed to join video call');
    }
  };
}

export default VideoCallUtils;

