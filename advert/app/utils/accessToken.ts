
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

export  const accessToken = (response: AuthApiResponse): void => {
    const { accessToken, refreshToken, expiration, ...responseData } = response;
  
    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
  
      const expirationTime = Date.now() + expiration * 1000;
      localStorage.setItem('accessTokenExpiry', expirationTime.toString());
    }
  
    if (responseData.message) {
      console.log(responseData.message);
    } else if (responseData.error) {
      console.error(responseData.error);
      throw new Error(responseData.error);
    }
  };

  