'use client'
import React from 'react';
import OtpInput2 from '@/app/components0/OtpInput2';
import store from '@/app/app/store';
import { Provider } from 'react-redux';


const page = () => {

    
  return (
    <div>
       <Provider store={store}>
       <OtpInput2  />
       </Provider>
      
    </div>
  )
}

export default page
