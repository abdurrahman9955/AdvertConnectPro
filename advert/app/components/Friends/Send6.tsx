'use client'
import { useState } from "react";
import Search from "./Search";

const Send6 = () => {
  const initialRoute = localStorage.getItem('selectedRoute') || 'Send1'
  const [selectedRoute, setSelectedRoute] = useState<string>(initialRoute);


  return (
    <div className='flex justify-center flex-col  w-full font-bold
     border-4 border-slate-950 '>
        
       
         <div className='flex justify-center'>
         <div className='flex flex-col      font-bold 
         bg-white  pt-5 w-full   md:text-xl '> 

              <div className="flex justify-center     ">
               <div className=" shadow-lg w-full  rounded flex-initial">

                 <div className="flex justify-center gap-4">
                  <button onClick={() => setSelectedRoute('Send4')}
                  type='button' className='text-blue-950 bg-white pt-2 w-20 h-10   mb-1
                  border-4 border-blue-950
                   rounded-xl  hover:bg-blue-100'>call </button>

                  <button onClick={() => setSelectedRoute('Send5')}
                   type='button' className='text-blue-950 bg-white pt-2 w-20 h-10  mb-1
                   border-4 border-blue-950
                  rounded-xl  hover:bg-blue-100'>video </button>

                 <button onClick={() => setSelectedRoute('Send6')}
                 type='button' className='text-blue-950 bg-white pt-2 w-20 h-10  mb-1
                 border-4 border-blue-950
                 rounded-xl  hover:bg-blue-100'>live </button>

                <button onClick={() => setSelectedRoute('Send7')}
                type='button' className='text-blue-950 bg-white pt-2 w-20 h-10 mb-1 
                 rounded-xl hover:bg-blue-100 border-4 border-blue-950
                '>chat  </button>

                 </div> 
                </div>

                </div>
                
                <div className='w-full mt-2  border-4 border-black'></div>

         <div className='flex flex-row h-screen overflow-y-auto p-3 '>
         <div className='  w-full gap-4  '>

         <h1>no subscribers yet</h1>
   
          </div>
          </div>
          </div>
        </div>
    </div>
  )
}

export default Send6