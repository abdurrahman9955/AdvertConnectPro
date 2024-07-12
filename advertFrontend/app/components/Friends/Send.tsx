'use client'
import { useState } from "react";
import Send1 from "./Send1";
import Send2 from "./Send2";
import Send3 from "./Send3";
import Send4 from "./Send4";
import Send5 from "./Send5";
import Send7 from "./Send7";


const Send = () => {

  const [selectedRoute, setSelectedRoute] = useState<string>('Send1');


  return (
   
   <div 
   className='flex justify-center   font-bold md:pt-10 max-md:pt-4 border-8
   max-md:border-4 border-blue-950 950 '>
     
       <div className='flex flex-col md:w-3/4 max-md:w-full m-1   border-4
      border-blue-950   lg:mb-20 md:mb-10 h-auto mb-2 font-bold'>


      <div className=' h-20 w-full  flex justify-between border-b-4 border-blue-950 pb-2 
      '>
            <button onClick={() => setSelectedRoute('Send1')}
            type='button' className='text-white
             bg-blue-950 px-2 w-auto h-10  mt-2 
          rounded  hover:bg-blue-800 ml-2 text-2xl font-bold 
          '>Connect </button>

          <button onClick={() => setSelectedRoute('Send2')}
          type='button' className='text-white 
          bg-blue-950 px-2 w-auto h-10  mt-2 
          rounded hover:bg-blue-800 mx-2 text-2xl font-bold
          '>Request  </button>

          <button onClick={() => setSelectedRoute('Send3')}
          type='button' className='text-white
           bg-blue-950 px-2 w-auto h-10  mt-2 
          rounded hover:bg-blue-800 mr-2 text-2xl font-bold
          '>Friends  </button>

           </div>

         <div className='   w-full  h-auto'>
          <h1 className='flex justify-center gap-4 border-b-4 border-blue-950  text-xl font-bold  pb-2
          '> 
          <button onClick={() => setSelectedRoute('Send4')}
          type='button' className='text-white bg-blue-950 pt-2 w-20 h-10  mt-2 
          rounded-xl  hover:bg-blue-800'>call </button>

          <button onClick={() => setSelectedRoute('Send5')}
          type='button' className='text-white bg-blue-950 pt-2 w-20 h-10  mt-2 
          rounded-xl  hover:bg-blue-800'>video </button>

          <button onClick={() => setSelectedRoute('Send7')}
          type='button' className='text-white bg-blue-950 pt-2 w-20 h-10  mt-2 
          rounded-xl hover:bg-blue-800
          '>chat  </button>
            
          </h1>
         
          <div className='h-auto overflow-y-auto  p-2  bg-white border-blue-950  '>
           

          {selectedRoute === 'Send1' && <Send1 />}
         {selectedRoute === 'Send2' && <Send2 />} 
         {selectedRoute === 'Send3' && <Send3 />} 
         {selectedRoute === 'Send4' && <Send4 />} 
         {selectedRoute === 'Send5' && <Send5 />} 
         {selectedRoute === 'Send7' && <Send7 />}   
          
        
           </div>

             
         </div>
         </div>

        
          
        
    </div>
  )
}

export default Send