'use client'
import React from 'react'
import OtpInput1 from '@/app/components0/OtpInput'
import store from '@/app/app/store';
import { Provider } from 'react-redux';


const page = () => {

    
  return (
    <div>
       <Provider store={store}>
       <OtpInput1  />
       </Provider>
      
    </div>
  )
}

export default page
