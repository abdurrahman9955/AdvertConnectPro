'use client'
import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
  
  return (
    <div className=" w-full  " >
    
      <div className="bg-cyan-800 h-auto p-1 border-2 border-slate-950 ">
        <div className=" flex justify-center  ">
          
        <h1 className="flex flex-row text-sm text-white  
        ">2024 <FaRegCopyright  size={14} className="mx-1 mt-1 "/>
         AdvertConnectPro Alright Reserve </h1> <br/>
       </div>             
      </div>
      </div>
    
  )
}

export default Footer
