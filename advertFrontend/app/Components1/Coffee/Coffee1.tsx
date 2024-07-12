'use client'
import React from "react";
import { useState } from "react";
import Coffee2 from "./Coffee2";
import Coffee4 from "./Coffee4";
import Coffee5 from "./Coffee5";


const Coffee1 = () => {
 
  const [selectedRoute, setSelectedRoute] = useState<string>('Coffee2');


  return (
    <div className='flex flex-col   pt-1 sm:p-2 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Coffee2')}
            className='text-sm text-white max-sm:h-6 w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Coffee4')}
            className='text-sm text-white max-sm:h-6 w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Coffee5')}
            className='text-sm text-white max-sm:h-6 w-24 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
           </div>
      
           </div>

           <div className='flex justify-center flex-wrap  border-2
           border-blue-950 h-auto sm:m-2 bg-white
           w-5xl overflow-y-auto p-1 gap-4 max-md:mt-1 '>
       
           {selectedRoute === 'Coffee2' && <Coffee2 />}
           {selectedRoute === 'Coffee4' && <Coffee4 />}
           {selectedRoute === 'Coffee5' && <Coffee5 />}
           

       </div>
    </div> 
  )
}

export default Coffee1









