'use client'
import React from 'react'
import Feedback from '@/app/components0/Feedback'
import Navbar1 from '@/app/components0/Navbar1'
import store from '@/app/app/store';
import { Provider } from 'react-redux';


const page = () => {
  return (
    <div>
      <Provider store={store}>
        <Navbar1 />
        <Feedback />
      </Provider>
    </div>
  )
}

export default page

