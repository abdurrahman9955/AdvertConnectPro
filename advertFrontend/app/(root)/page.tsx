'use client'
import React from 'react'
import Header from '../components0/Header'
import Navbar2 from '../components0/Navbar2'
import Footer from '../components0/Footer'
import { SearchProvider } from '../Context/HomeContext'
import store from '@/app/app/store';
import { Provider } from 'react-redux';


const Home = () => {
  return (
    <main>
    
     <Provider store={store}>
      <SearchProvider>
       <Navbar2 />
       <Header  />
       <Footer />
     </SearchProvider>
     </Provider>
    
    </main>
  )
}

export default Home
