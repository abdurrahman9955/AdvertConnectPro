import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
const API_BASE_URL ='https://advertconnectpro.shop';

interface EmployeeLoginRequest {
  email: string;
  password: string;
}

interface EmployeeLoginResponse {
  accessToken: string;
  refreshToken: string;
  expiration: number;
}

class EmployeeLoginUtils {
  static loginEmployee = async (loginData: EmployeeLoginRequest): Promise<EmployeeLoginResponse> => {
    try {
      const response: AxiosResponse<EmployeeLoginResponse> = await axios.post(`${API_BASE_URL}/employee/login`, loginData);
      const loginResponse = response.data;

      return loginResponse;
    } catch (error) {
      console.error('Error logging in employee:', error);
      throw new Error('Failed to log in employee');
    }
  };
}

export default EmployeeLoginUtils;

