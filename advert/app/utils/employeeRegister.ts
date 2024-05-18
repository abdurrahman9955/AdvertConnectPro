import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';

interface EmployeeRegisterRequest {
  fullName: string;
  email: string;
  country: string;
  state: string;
  area: string;
  address: string;
  password: string;
}

interface EmployeeRegisterResponse {
  message: string;
  employee: any;
  accessToken: string;
  refreshToken: string;
  expiration: number;
}

class EmployeeRegisterUtils {
  static registerEmployee = async (employeeData: EmployeeRegisterRequest): Promise<EmployeeRegisterResponse> => {
    try {
      const response: AxiosResponse<EmployeeRegisterResponse> = await axios.post(`${API_BASE_URL}/employee/register`, employeeData);
      const registerResponse = response.data

      return registerResponse;
    } catch (error) {
      console.error('Error registering employee:', error);
      throw new Error('Failed to register employee');
    }
  };
}

export default EmployeeRegisterUtils;

