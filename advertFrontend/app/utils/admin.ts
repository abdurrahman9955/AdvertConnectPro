import axios, { AxiosResponse } from 'axios';

const API_BASE_URL ='https://advertconnectpro.shop';

interface ApiResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

class AdminAccessUtils {
  static grantAdminAccess = async (employeeId: string): Promise<ApiResponse> => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(`${API_BASE_URL}/admin/${employeeId}`);
      const responseData = response.data;
      return responseData;
    } catch (error) {
      console.error('Error granting admin access:', error);
      throw new Error('Failed to grant admin access');
    }
  };
}

export default AdminAccessUtils;


