'use client'
import React from 'react'
import Post from '@/app/components/Post/Post'
import Navbar1 from '@/app/components0/Navbar1'
import { Provider } from 'react-redux';
import store from '@/app/app/store';

const page = () => {
  return (
    <div>
      <Provider store={store}>
       <Navbar1 />
       <Post />
       </Provider>
      
    </div>
  )
}

export default page