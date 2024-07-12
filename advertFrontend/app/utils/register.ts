import axios, { AxiosResponse } from 'axios';
import validator from 'validator';
import Cookies from 'js-cookie';
const API_BASE_URL ='https://advertconnectpro.shop';

interface UserData {
  email?: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}


interface RegistrationResponse  {
  success: boolean;
  data?: UserData;
  error?: string;
}

export const registerUser = async (userData: UserData): Promise<RegistrationResponse> => {
  try {
    if (!userData.email || !isValidEmail(userData.email)) {
      throw new Error(' Please provide a valid email address.');
    }
    
    if (!isStrongPassword(userData.password)) {
      throw new Error('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character.');
    }

    const response: AxiosResponse<UserData> = await axios.post(
      `${API_BASE_URL}/auth/register/register`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  

    if (response.status === 201) {
     
      const { userId, accessToken, refreshToken } = response.data as any;

      const registeredUserData: UserData = response.data;

      return { success: true, data: registeredUserData };
      //@ts-ignore
    } else if (response.status === 400 && response.data.error === 'Email already exists') {

      console.error('Error registering user:', 'Email already exists');
      return { success: false, error: 'Email already exists' };

    }  else {
      //@ts-ignore
      console.error('Error registering user:', response.data.error);
      //@ts-ignore
      throw new Error(response.data.error || 'Failed to register user');
    }
  } catch (error: any) {

    console.error('Error registering user:', error.message);
    throw new Error('This email already exists. Please sign in to your account.');
  }
};

const isValidEmail = (email: string): boolean => {
  console.log('Checking email:', email);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isStrongPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@&#!%])[A-Za-z\d@&#!%]{8,}$/;
  return passwordRegex.test(password);
};

