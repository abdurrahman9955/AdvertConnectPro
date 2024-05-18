import axios from 'axios';

const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';

export const getCurrentUser = async () => {
  try {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      throw new Error('User ID not found in local storage');
    }

    const token = localStorage.getItem('accessToken');

    if (!token) {
      throw new Error('Access token not found in local storage');
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
    const userId = localStorage.getItem('userId');

    if (!userId) {
      throw new Error('User ID not found in local storage');
    }

    const token = localStorage.getItem('accessToken');

    if (!token) {
      throw new Error('Access token not found in local storage');
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


