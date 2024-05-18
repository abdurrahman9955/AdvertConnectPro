'use client'
import React from 'react'
import Contact1 from '@/app/components0/Contact1'
import Navbar1 from '@/app/components0/Navbar1'
import store from '@/app/app/store';
import { Provider } from 'react-redux';


const page = () => {
  return (
    <div>
      <Provider store={store}>
        <Navbar1 />
        <Contact1 />
      </Provider>
    </div>
  )
}

export default page


