import React from "react"
import Link from "next/link"

const Individual = () => {

  return (
    <div className=' h-screen py-10 pt-16 md:border-4 border-purple-950' >
      <div >
        <h1 className='flex justify-center md:text-xl text-lg text-blue-950 font-family-bold
         font-bold'>upload & publish your product </h1>
      </div >

     <div className="flex justify-center mt-6">
      <div className=" flex justify-center md:mx-10
      border-2 border-blue-950 max-md:w-full max-md:m-3 p-3 lg:w-3/5 " >
        <h1 className='flex justify-center md:text-sm text-sm text-blue-950 font-family-bold
         font-bold'>Welcome to advertConnectPro! Here, you can showcase and promote your products
          through various mediums like images, banners, and videos. Be sure to familiarize yourself
          with our privacy policy for more details. Our platform is dedicated to assisting you in
          reaching your target audience worldwide. You can upload any legal product adhering to
          market rules and regulations, while we ensure that illegal products are not featured to
          maintain compliance with international marketing standards. Kindly review our terms
          and conditions for further insights. Once your product meets the criteria, we'll
          support you in advertising it here. Thank you for choosing advertConnectPro;
          we appreciate your support and look forward to embarking on this journey with
          you across both our mobile and website platforms.
          </h1>
      </div >
      </div>
  
      <Link href={{pathname:'/Upload/publish_images'}}> 
      <div className='flex justify-center'>  
      <button type='submit' className='
      lg:w-2/5 max-lg:w-2/3 max-md:w-4/5  h-7
       text-slate-50 bg-blue-950 mt-6
      hover:bg-blue-800 rounded-full max-sm:w-4/5  
      text-sm '>upload your images</button>
      </div></Link>


      <Link href={{pathname:'/Upload/publish_banner'}}>
      <div className='flex justify-center'>
      <button type='submit' className='
      lg:w-2/5 max-lg:w-2/3 max-md:w-4/5  h-7
       text-slate-50 bg-blue-950 mt-6
      hover:bg-blue-800 rounded-full max-sm:w-4/5  
      text-sm '>upload your banner</button>
      </div></Link>

      <Link href={{pathname:'/Upload/publish_video'}}>
      <div className='flex justify-center'>
      <button type='submit' className='
      lg:w-2/5 max-lg:w-2/3 max-md:w-4/5  h-7
       text-slate-50 bg-blue-950 mt-6 max-sm:mb-14
      hover:bg-blue-800 rounded-full max-sm:w-4/5  
      text-sm '>upload your videos</button>
      </div></Link>
     
    </div>
  )
}

export default Individual

