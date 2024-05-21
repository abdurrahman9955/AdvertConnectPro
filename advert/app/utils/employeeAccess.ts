import axios, { AxiosResponse } from 'axios';
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

interface AccessRequest {
  userId: string;
  requestedAccess: 'read' | 'write' | 'admin';
}

interface AccessRequestResponse {
  message: string;
  request: any; 
}

interface ApprovalRequest {
  approvalStatus: 'approved' | 'rejected';
}

class EmployeeAccessUtils {
  static async requestAccess(accessRequest: AccessRequest): Promise<AccessRequestResponse> {
    try {
      const response: AxiosResponse<AuthApiResponse> = await axios.post(`${API_BASE_URL}/employee/requestAccess`, accessRequest);
      const result = response.data;

      const accessRequestResponse: AccessRequestResponse = {
        message: result.message || '',
        request: accessRequest
      };
 
      return accessRequestResponse;
    } catch (error) {
      console.error('Error requesting access:', error);
      throw new Error('Failed to request access');
    }
  };

  static async getAccessRequests(): Promise<any[]> {
    try {
      const response: AxiosResponse<AuthApiResponse[]> = await axios.get(`${API_BASE_URL}/employee/accessRequests`);
      const result = response.data.map(authResponse => {
        const accessRequestResponse: AccessRequestResponse = {
          message: authResponse.message || '',
          request: {} 
        };
        return accessRequestResponse;
      });

      return result;
    } catch (error) {
      console.error('Error getting access requests:', error);
      throw new Error('Failed to get access requests');
    }
  };

  static async approveAccess(requestId: string, approvalRequest: ApprovalRequest): Promise<AccessRequestResponse> {
    try {
      const response: AxiosResponse<AuthApiResponse> = await axios.post(`${API_BASE_URL}/employee/approveAccess/${requestId}`, approvalRequest);
      const result = response.data;

      const accessRequestResponse: AccessRequestResponse = {
        message: result.message || '',
        request: {} 
      };

      return accessRequestResponse;
    } catch (error) {
      console.error('Error approving access:', error);
      throw new Error('Failed to approve access');
    }
  };
}

export default EmployeeAccessUtils;
