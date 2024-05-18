'use client'
import React from 'react'
import Feedback1 from '@/app/components0/feedback1'
import Navbar1 from '@/app/components0/Navbar1'
import store from '@/app/app/store';
import { Provider } from 'react-redux';


const page = () => {
  return (
    <div>
      <Provider store={store}>
        <Navbar1 />
        <Feedback1 />
      </Provider>
    </div>
  )
}

export default page


