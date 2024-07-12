import axios, { AxiosResponse } from 'axios';

const API_BASE_URL ='https://advertconnectpro.shop';

interface ApiResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

class AdminRegistrationUtils {
  static registerAdmin = async (adminData: any): Promise<ApiResponse> => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(`${API_BASE_URL}/admin/register`, adminData);
      const responseData = response.data;
      return responseData;
    } catch (error) {
      console.error('Error registering admin:', error);
      throw new Error('Failed to register admin');
    }
  };
}

export default AdminRegistrationUtils;

