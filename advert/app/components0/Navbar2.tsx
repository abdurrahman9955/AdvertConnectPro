'use client'
import React from 'react'
import { Provider } from 'react-redux';
import store from '@/app/app/store';
import Navbar from './Navbar';


const Navbar2 = () => {
  return (
    <div>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </div>
  )
}

export default Navbar2
