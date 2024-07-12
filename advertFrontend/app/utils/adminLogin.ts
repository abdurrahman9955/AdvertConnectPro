import axios, { AxiosResponse } from 'axios';

const API_BASE_URL ='https://advertconnectpro.shop';

interface ApiResponse {
  token: string;
  refreshToken: string;
}

class AdminLoginUtils {
  static loginAdmin = async (adminCredentials: any): Promise<ApiResponse> => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(`${API_BASE_URL}/admin/login`, adminCredentials);
      const responseData = response.data;
      return responseData;
    } catch (error) {
      console.error('Error logging in admin:', error);
      throw new Error('Failed to log in admin');
    }
  };
}

export default AdminLoginUtils;
