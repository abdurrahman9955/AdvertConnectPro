import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import Cookies from 'js-cookie';
import { submitContactSuccess, submitContactFailure } from '../app/contactActions';

const API_BASE_URL = process.env.MY_APP_BASE_URL || 'http://localhost:3500';

interface Contact {
  name: string;
  email: string;
  reason: string;
  statement: string;
}

interface AuthApiResponse extends responseData {
  accessToken: string;
  refreshToken: string;
  expiration: number;
}

interface responseData {
  message: string;
  success: boolean;
  error?: string;
}

export const submitContact = async (dispatch: Dispatch, contactData: Contact) => {
  try {
    const response: AxiosResponse<AuthApiResponse> = await axios.post(
      `${API_BASE_URL}/contacts/contacts`,
      contactData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const responseData = response.data;

    if (response.status === 201) {
      console.log('Contact submitted successfully:', responseData);
      dispatch(submitContactSuccess(responseData));
      return { success: true, data: responseData };
    } else {
      console.error('Error submitting contact:', responseData.message);
      throw new Error(responseData.message || 'Failed to submit contact');
    }
  } catch (error: any) {
    console.error('Error submitting contact:', error.message);
    dispatch(submitContactFailure(error.message));
    throw new Error('Failed to submit contact');
  }
};

export const getContacts = async () => {
  try {

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }

    const response: AxiosResponse<Contact[]> = await axios.get(`${API_BASE_URL}/contacts/contacts`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    
    );
    const responseData = response.data;

    if (response.status === 200) {
      console.log('Contacts retrieved successfully:', responseData);
      return { success: true, data: responseData };
    } else {
      console.error('Error retrieving contacts:', response.statusText);
      throw new Error(response.statusText || 'Failed to retrieve contacts');
    }
  } catch (error: any) {
    console.error('Error retrieving contacts:', error.message);
    throw new Error('Failed to retrieve contacts');
  }
};

export const deleteContact = async (contactId: string) => {
  try {

    const token = Cookies.get('accessToken');
    if (!token) {
      throw new Error('Access token not found in cookies');
    }
   
    const response: AxiosResponse<responseData> = await 
    axios.delete(`${API_BASE_URL}/contacts/${contactId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', 
      },
    }
    );
    const responseData = response.data;

    if (response.status === 200) {
      console.log('Contact deleted successfully:', responseData);
      return { success: true, data: responseData };
    } else {
      console.error('Error deleting contact:', responseData.message);
      throw new Error(responseData.message || 'Failed to delete contact');
    }
  } catch (error: any) {
    console.error('Error deleting contact:', error.message);
    throw new Error('Failed to delete contact');
  }
};


