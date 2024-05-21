import axios from 'axios';
import Cookies from 'js-cookie';
const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';


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

const loginWithGoogle = async (): Promise<void> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/googleAuth/google-login`);
    
    if (response.data.success) {
    } else {
      console.error('Registration failed:', response.data.error || response.data.message);
    }
  } catch (error) {
    console.error('Error registering with Google:', error);
    throw error;
  }
};

export { loginWithGoogle };
