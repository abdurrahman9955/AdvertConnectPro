import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL ='https://advertconnectpro.shop';

export const getCurrentUser = async () => {
  try {
    
    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response = await axios.get(`${API_BASE_URL}/userId/userInfo`,  {
      headers: {
        Authorization: `Bearer ${token}`, 
        'user-id': userId,
      },
    });

    return response.data.currentUser;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw new Error('Failed to fetch current user');
  }
};


export const deleteCurrentUser = async () => {
  try {
    
    const userId = Cookies.get('userId');

    if (!userId) {
      throw new Error('User ID not found in cookies');
    }

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response = await axios.delete(`${API_BASE_URL}/userId/deleteAccount`,  {
      headers: {
        Authorization: `Bearer ${token}`, 
        'user-id': userId,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw new Error('Failed to fetch current user');
  }
};


