'use client'
import React from 'react'
import Navbar1 from '@/app/components0/Navbar1'
import Babies from '@/app/Components1/Babies/Babies'
import Footer from '@/app/components0/Footer'
import store from '@/app/app/store';
import { Provider } from 'react-redux';

const page = () => {
  return (
    <div>
      <Provider store={store}>
        <Navbar1 />
        <Babies />
        <Footer />
        </Provider>
    </div>
  )
}

export default page
