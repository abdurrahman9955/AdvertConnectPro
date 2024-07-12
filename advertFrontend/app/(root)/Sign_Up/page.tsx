'use client'
import React from 'react'
import Sign_up from '@/app/components0/Sign_up';
import Navbar0 from '@/app/components0/Navbar0';
import { Provider } from 'react-redux';
import store from '@/app/app/store';


const page = () => {
  
  return (
    <div>
       <Provider store={store}>
        <Navbar0 />
        <Sign_up />
       </Provider>
    </div>
  )
}

export default page

