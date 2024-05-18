'use client'
import React from 'react'

const Individual = () => {
  

  return (
    <div className='   py-10 border-4 border-purple-950' >
      <div >
        <h1 className='flex justify-center md:text-5xl text-2xl text-blue-950 font-family-bold
         font-bold'>upload & publish your product </h1>
      </div >

      <div className='flex justify-center'>
      <button type='submit' className='lg:w-1/5 max-lg:w-1/3 max-md:w-2/5  h-10
       text-slate-50 bg-blue-950
      hover:bg-blue-800 rounded-full max-sm:w-40 mt-5 text-lg'>
        upload video </button>
      </div>

      <div className='flex justify-center'>
      <button type='submit' className='lg:w-1/5 max-lg:w-1/3 max-md:w-2/5  h-10
       text-slate-50 bg-blue-950
      hover:bg-blue-800 rounded-full max-sm:w-40 mt-5 text-lg'>
        upload banner </button>
      </div>

      <div className='flex justify-center'>
      <button type='submit' className='lg:w-1/5 max-lg:w-1/3 max-md:w-2/5  h-10
       text-slate-50 bg-blue-950
      hover:bg-blue-800 rounded-full max-sm:w-40 mt-5 text-lg'>
        upload photo </button>
      </div>


      <div className='flex justify-center'>
      <button type='submit' className='lg:w-2/5 max-lg:w-2/3 max-md:w-4/5  h-10
       text-slate-50 bg-blue-950 mt-5
      hover:bg-blue-800 rounded-full max-sm:w-4/5  text-xl '>publish your product</button>
      </div>
      
    </div>
  )
}

export default Individual

