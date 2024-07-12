
interface Contact {
  name: string;
  email: string;
  reason: string;
  statement: string;
}


interface responseData {
  message: string;
}



export const submitContactRequest = (contactData: Contact) => ({
    type: 'SUBMIT_CONTACT_REQUEST',
    payload: contactData,
  });
  
  export const submitContactSuccess = (responseData: responseData) => ({
    type: 'SUBMIT_CONTACT_SUCCESS',
    payload: responseData,
  }); 

  
  export const submitContactFailure = (error: string) => ({
    type: 'SUBMIT_CONTACT_FAILURE',
    payload: error,
  });


  
  

