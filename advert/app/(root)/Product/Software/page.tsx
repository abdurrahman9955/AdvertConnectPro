'use client'
import React from 'react'
import Software from '@/app/Components1/Software/Software'
import Navbar1 from '@/app/components0/Navbar1'
import Footer from '@/app/components0/Footer'
import store from '@/app/app/store';
import { Provider } from 'react-redux';

const page = () => {
  return (
    <div>
      <Provider store={store}>
        <Navbar1 />
        <Software />
        <Footer />
        </Provider>
    </div>
  )
}

export default page

