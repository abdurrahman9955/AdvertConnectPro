'use client'
import React from 'react'
import Navbar1 from '@/app/components0/Navbar1'
import Forgot from '@/app/components0/Forgot'
import { Provider } from 'react-redux';
import store from '@/app/app/store';

const page = () => {
  return (
    <div>
       <Provider store={store}>
        <Navbar1 />
        <Forgot />
       </Provider>
    </div>
  )
}

export default page



