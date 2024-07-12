'use client'
import React from 'react'
import Navbar1 from '@/app/components0/Navbar1'
import VideosDetails from '@/app/Components1/Posting/videosProducts'
import ProductVideos from '@/app/Components1/Posting/Posting3';
import store from '@/app/app/store';
import { Provider } from 'react-redux';

const page = () => {

  return (
    <div>
    <Provider store={store}>
      <Navbar1 />
      <VideosDetails />
      <div className='p-1 bg-slate-400  '>
            <h1 className='flex justify-center text-sm max-sm:text-sm 
            font-bold bg-slate-800 py-1 text-white rounded-md my-2
            '>Other Products You May Interesting In!</h1>
        <ProductVideos />
       </div>
    </Provider>
    </div>
  )
}

export default page
