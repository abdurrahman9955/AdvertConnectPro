'use client'
import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
  
  return (
    <div className=" w-full  " >
     
      <div className="bg-cyan-800 h-auto p-3 border-4 border-slate-950 ">
        <div className=" flex justify-center  ">
          
        <h1 className="flex flex-row sm:text-2xl text-white  max-sm:text-xl
        ">2024 <FaRegCopyright  size={24} className="mx-1 mt-1"/>
         Advert Connect Alright Reserve </h1> <br/>
       </div>             
      </div>
      </div>
    
  )
}

export default Footer
