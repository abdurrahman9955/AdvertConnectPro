'use client'
import React from 'react'
import { useState } from 'react'
import Navbar0 from './Navbar0'
import OtpInput from 'react-otp-input';



const OtpInput1 = () => {
    useState<{label: string; value:string} | null>(null);
   const [otp1, setOtp1] = useState('');
    

  return (
    <div className=' h-screen border-4 border-purple-950 font-bold' >
        <Navbar0 />
      <div >
        <h1 className='flex justify-center text-3xl 
         text-slate-950 mt-40 max-md:text-xl '>
          we have sent your verification code to!</h1>
      </div >

      <div >
        <h1 className='flex justify-center text-3xl 
         text-slate-950 mt-10 max-md:text-xl '>
          abdurrah****123@gmail.com</h1>
      </div >



    <div className='flex justify-center mt-10  '>
    <OtpInput
      value={otp1}
      onChange={setOtp1}
      numInputs={6}
      inputStyle={{width:45, height:45, gap:20, backgroundColor:'white'}}
     renderSeparator={<span className=' m-1'>-</span>}
      renderInput={(props) => <input {...props}
      className='border-2 border-slate-950 gap-4'
      />}
      
    /></div>

    <div className='flex justify-center '>
      <span  className=' w-60  h-11 mt-10  text-lg
         text-left  max-sm:m-10 '>   
          <h1 className='flex justify-between '>

          <button className='w-auto h-10 max-sm:text-lg
         px-5  bg-slate-0 text-black border-l-4 border-slate-950 
        '>60</button>

       <button className='w-auto h-10 hover:bg-indigo-950 max-sm:text-lg rounded-xl
         px-5  bg-slate-0 text-black border-l-4 border-slate-950 hover:text-white
        '>RE SEND</button>

       </h1>
      </span>
      </div>


      <div className='flex justify-center'>
      <button type='submit' className=' text-slate-50 bg-blue-950
      lg:w-1/4 max-lg:w-3/6 max-md:w-3/5 h-10 rounded-xl 
      hover:bg-purple-950  mt-6 text-xl '>verify</button>
      </div>

    </div>
  )
}

export default OtpInput1

