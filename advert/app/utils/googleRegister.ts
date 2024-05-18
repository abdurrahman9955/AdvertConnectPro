import axios from 'axios';

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

const registerWithGoogle = async (): Promise<void> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/googleAuth/google-register`);
    
    if (response.data.success) {
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      console.error('Registration failed:', response.data.error || response.data.message);
    }
  } catch (error) {
    console.error('Error registering with Google:', error);
    throw error;
  }
};

export { registerWithGoogle };
