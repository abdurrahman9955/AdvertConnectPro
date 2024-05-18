'use client'
import React from 'react';
import Header from '@/app/components/Profile/Header'
import Navbar1 from '@/app/components0/Navbar1'
import { Provider } from 'react-redux';
import store from '@/app/app/store';

const page = () => {
  return (
    <div>
       <Provider store={store}>
      <Navbar1 />
      <Header />
      </Provider>
    </div>
  )
}

export default page

