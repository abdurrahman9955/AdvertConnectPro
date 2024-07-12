import axios from 'axios';

const API_BASE_URL ='https://advertconnectpro.shop';


interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}


const loginWithFacebook = async (): Promise<void> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/facebookAuth/facebook-login`);
    
    if (response.data.success) {
    } else {
      console.error('Registration failed:', response.data.error || response.data.message);
    }
  } catch (error) {
    console.error('Error registering with Google:', error);
    throw error;
  }
};

export { loginWithFacebook };
