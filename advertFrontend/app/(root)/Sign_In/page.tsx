'use client'
import React from 'react'
import Sign_In from '@/app/components0/Sign_In';
import Navbar0 from '@/app/components0/Navbar0';
import { Provider } from 'react-redux';
import store from '@/app/app/store';


const page = () => {
  return (
    <div>
       <Provider store={store}>
        <Navbar0 />
        <Sign_In />
       </Provider>
    </div>
  )
}

export default page
