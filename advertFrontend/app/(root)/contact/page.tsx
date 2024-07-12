'use client'
import React from 'react'
import Contact from '@/app/components0/Contact'
import Navbar1 from '@/app/components0/Navbar1'
import store from '@/app/app/store';
import { Provider } from 'react-redux';

const page = () => {
  return (
    <div>
      <Provider store={store}>
        <Navbar1 />
        <Contact />
      </Provider>
    </div>
  )
}

export default page
