'use client'
import React from 'react'
import Materials from '@/app/Components1/Materials/Materials'
import Navbar1 from '@/app/components0/Navbar1'
import Footer from '@/app/components0/Footer'
import store from '@/app/app/store';
import { Provider } from 'react-redux';

const page = () => {
  return (
    <div>
      <Provider store={store}>
        <Navbar1 />
        <Materials />
        <Footer />
        </Provider>
    </div>
  )
}

export default page
