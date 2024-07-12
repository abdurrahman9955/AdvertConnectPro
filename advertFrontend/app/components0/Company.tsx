import Link from 'next/link'
import React from 'react'

const Company = () => {
  return (
    <div className='  bg-amber-500 pt-40 py-10 border-4 border-purple-950' >
      <div >
        <h1 className='flex justify-center md:text-5xl text-2xl text-slate-950 font-family-bold
         '>upload & publish videos </h1>
      </div >

      
      <div className='flex justify-center'>
      <span 
       className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-4/5 h-auto mt-10 mb-20  text-xl 
        focus:outline-none focus:ring p-2 bg-amber-500
        focus:ring-slate-950 text-left 
        border-4 border-slate-950'>
          <h1 className='font-bold text-slate-950'>
            Note: how to upload your content, when you fill all the requirements below
            to publish it, if you choose private it will redirect to the private section 
            no one can access it without your permission, if you publish it to the public 
            every body can access it with the status you choose below, if published it to the 
            store that means your video is for sale once you published it you can manage the price 
            or any thing relate to it so read the form care fully and then publish to the place 
            you desire you can visit <Link href={{pathname:'/privacy'}} className='text-blue-900'>
              privacy and policy </Link> to see more information about this app.
            
          </h1>
       </span>
      </div>
    
      <div className='flex justify-center'>
      <textarea
       id="news"
       name="message"
       placeholder='write your title here'
       className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-4/5 h-16 mt-5  text-xl 
        focus:outline-none focus:ring p-2
        focus:ring-slate-950 bg-white text-left 
        border-4 border-slate-950' />
      </div>

       
      <div className='flex justify-center'>
      <textarea
       id="news"
       name="message"
       placeholder='write your description'
       className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-4/5 h-32 mt-5  text-xl 
        focus:outline-none focus:ring p-2
        focus:ring-slate-950 bg-white text-left 
        border-4 border-slate-950' />
      </div>

       
      <div className='flex justify-center'>
      <textarea
       id="news"
       name="message"
       placeholder='write your tags'
       className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-4/5 h-32 mt-5  text-xl 
        focus:outline-none focus:ring p-2
        focus:ring-slate-950 bg-white text-left 
        border-4 border-slate-950' />
      </div>

      <div className='flex justify-center'>
      <textarea
       id="news"
       name="message"
       placeholder='if this video is not your please past or write the copy write id'
       className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-4/5 h-12 mt-5  text-xl 
        focus:outline-none focus:ring p-2
        focus:ring-slate-950 bg-white text-left 
        border-4 border-slate-950' />
      </div>

      <div className='flex justify-center'>
        <>
      <input type='text'
       
       placeholder='choose or write category of your video'
       className=' lg:w-2/6 max-lg:w-1/3 max-md:w-1/5 max-sm:w-7/12 h-12 pb-2 mt-5  text-lg 
        focus:outline-none focus:ring p-2 
        focus:ring-slate-950 bg-white text-left 
        border-4 border-slate-950' />
        
        <button className=' w-24 h-12 bg-lime-950 mb-2 mt-5 rounded-r-xl 
        text-white'>categories</button>

        </>
      </div>

      <div className='flex justify-center '>
      <span  className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-4/5 h-auto mt-5  text-xl 
        focus:outline-none focus:ring p-2
        focus:ring-slate-950 bg-white text-left pb-2
        border-4 border-slate-950'>
          <h1 className='flex justify-between '>
             generate a copyright id
          
       <button className=' w-2/6 h-9 bg-lime-950 mb-2 rounded-xl 
        text-white'>generate</button>
       </h1>
      </span>
      </div>


      <div className='flex justify-center'>
      <span  className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-4/5 h-auto mt-5  text-xl 
        focus:outline-none focus:ring p-2
        focus:ring-slate-950 bg-amber-500 text-left 
        border-4 border-slate-950 text-black font-bold' >
          <h1>Note: your copy write id is your content secret no one can upload
            it or download until you give him this copy write id, so if you share your 
            secret id to every one make sure he can download and reupload it but he cannot generate 
            a copy write id, only copy write id can generate for original content, 
            if you need your content to be available to every body and to be downloadable you can skip
            generating, we create that in order to prevent reuploading your content or your product,
            but we create this platform to be available for everybody.

          </h1>
       </span>
      </div>

      <div className='flex justify-center'>
      <span 
       className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-4/5 h-auto mt-5  text-xl 
        focus:outline-none focus:ring p-2
        focus:ring-slate-950 bg-white text-left 
        border-4 border-slate-950'>
          <h1 className='flex justify-between'>
            choose a status

            <button className=' w-2/6 h-9 bg-orange-800 mb-2 rounded-xl
            text-white'>choose</button>
          </h1>
       </span>
      </div>
       
      <div className='flex justify-center'>
      <textarea
       id="news"
       name="message"
       placeholder='write your articles here'
       className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-4/5 h-80 mt-5  text-xl 
        focus:outline-none focus:ring p-2
        focus:ring-slate-950 bg-white text-left 
        border-4 border-slate-950' />
      </div>
     
      <div className='flex justify-center'>
      <button type='submit' className='lg:w-1/5 max-lg:w-1/3 max-md:w-2/5  h-10
       text-slate-50 bg-lime-800
      hover:bg-slate-900 rounded-xl max-sm:w-3/5 mt-10 text-xl'>upload your video </button>
      </div>

      <div className='flex justify-center'>
      <button type='submit' className='lg:w-1/5 max-lg:w-1/3 max-md:w-2/5  h-10
       text-slate-50 bg-orange-900
      hover:bg-purple-900 rounded-xl max-sm:w-3/5 mt-10 text-xl'>upload thumbnail </button>
      </div>

      <div className='flex justify-center'>
      <button type='submit' className='lg:w-1/5 max-lg:w-1/3 max-md:w-2/5  h-10
       text-slate-50 bg-lime-950
      hover:bg-slate-700 rounded-xl max-sm:w-3/5 mt-10 text-xl'>validate your video </button>
      </div>

      <div className='flex justify-center'>
      <button type='submit' className='lg:w-2/5 max-lg:w-2/3 max-md:w-4/5  h-10
       text-slate-50 bg-yellow-950
      hover:bg-slate-950 rounded-xl max-sm:w-4/5 mt-10 text-xl '>publish to the private</button>
      </div>

      <div className='flex justify-center'>
      <button type='submit' className='lg:w-2/5 max-lg:w-2/3 max-md:w-4/5  h-10
       text-slate-50 bg-red-800
      hover:bg-indigo-800 rounded-xl max-sm:w-4/5 mt-10 text-xl '>publish to the public</button>
      </div>

      <div className='flex justify-center'>
      <button type='submit' className='lg:w-2/5 max-lg:w-2/3 max-md:w-4/5  h-10
       text-slate-50 bg-black
      hover:bg-red-700 rounded-xl max-sm:w-4/5 mt-10 text-xl '>publish to the store</button>
      </div>
      
      
      
     
      
    </div>
  )
}

export default Company