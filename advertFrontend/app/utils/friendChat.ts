import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
const API_BASE_URL ='https://advertconnectpro.shop';

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

interface ChatMessage {
  userId: string;
  message: string;
}

interface GroupChatMessage extends ChatMessage {
  groupId: string;
}

interface VoiceMessage {
  userId: string;
  audio: Blob;
}

interface AuthApiResponse extends ApiResponse {
  accessToken: string;
  refreshToken: string;
  expiration: number;
}


class ChatUtils {
  private static getHeaders(): any {
    const token = localStorage.getItem('accessToken');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  static sendChatMessage = async (data: ChatMessage): Promise<void> => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(`${API_BASE_URL}/friendChats/chatMessage`, data, ChatUtils.getHeaders());
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw new Error('Failed to send chat message');
    }
  };

  static sendGroupChatMessage = async (data: GroupChatMessage): Promise<void> => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(`${API_BASE_URL}/friendChats/groupChatMessage`, data, ChatUtils.getHeaders());
    } catch (error) {
      console.error('Error sending group chat message:', error);
      throw new Error('Failed to send group chat message');
    }
  };

  static joinGroup = async (groupId: string): Promise<void> => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(`${API_BASE_URL}/friendChats/joinGroup`, { groupId }, ChatUtils.getHeaders());
    } catch (error) {
      console.error('Error joining group:', error);
      throw new Error('Failed to join group');
    }
  };

  static leaveGroup = async (groupId: string): Promise<void> => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(`${API_BASE_URL}/friendChats/leaveGroup`, { groupId }, ChatUtils.getHeaders());
     
    } catch (error) {
      console.error('Error leaving group:', error);
      throw new Error('Failed to leave group');
    }
  };

  static sendVoiceMessage = async (data: VoiceMessage): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append('userId', data.userId);
      formData.append('audio', data.audio);

      const headers = {
        ...ChatUtils.getHeaders().headers,
        'Content-Type': 'multipart/form-data',
      };

      const response: AxiosResponse<ApiResponse> = await axios.post(`${API_BASE_URL}/friendChats/voiceMessage`, formData, { headers });
      
    } catch (error) {
      console.error('Error sending voice message:', error);
      throw new Error('Failed to send voice message');
    }
  };
}

export default ChatUtils;

