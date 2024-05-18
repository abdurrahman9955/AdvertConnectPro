import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';

interface ApiResponse {
  message: string;
  error?: string;
}

interface AuthApiResponse extends ApiResponse {
  accessToken: string;
  refreshToken: string;
  expiration: number;

}

interface VoiceCallResponse {
  meetingLink: string;
}

class VoiceCallUtils {
  private static getHeaders(): AxiosRequestConfig {
    const token = localStorage.getItem('userId');

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  static startVoiceCall = async (): Promise<VoiceCallResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/voiceCall/start`, {}, VoiceCallUtils.getHeaders());
      return response.data;
    } catch (error) {
      console.error('Error starting voice call:', error);
      throw new Error('Failed to start voice call');
    }
  };

  static joinVoiceCall = async (meetingLink: string): Promise<void> => {
    try {
      await axios.get(`${API_BASE_URL}/voiceCall/${meetingLink}`, VoiceCallUtils.getHeaders());
    } catch (error) {
      console.error('Error joining voice call:', error);
      throw new Error('Failed to join voice call');
    }
  };
}

export default VoiceCallUtils;


