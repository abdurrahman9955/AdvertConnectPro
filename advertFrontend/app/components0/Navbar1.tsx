'use client'
import React from 'react'
import Navbar0 from './Navbar0'
import { Provider } from 'react-redux';
import store from '@/app/app/store';


const Navbar1 = () => {
  return (
    <div>
       <Provider store={store}>
           <Navbar0 />
       </Provider> 
    </div>
  )
}

export default Navbar1
