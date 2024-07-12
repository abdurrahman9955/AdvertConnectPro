import React from "react";
import { useState } from "react";
import Equipment2 from "./Equipment2";
import Equipment4 from "./Equipment4";
import Equipment5 from "./Equipment5";

const Equipment1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Equipment2');

  return (
    <div className='flex flex-col   pt-1 sm:pt-2 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Equipment2')}
            className='text-sm text-white max-sm:h-6 w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Equipment4')}
            className='text-sm text-white max-sm:h-6 w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Equipment5')}
            className='text-sm text-white max-sm:h-6 w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
        w-5xl overflow-y-auto p-1 gap-4 max-md:mt-1
       '>
       
           {selectedRoute === 'Equipment2' && <Equipment2 />}
           {selectedRoute === 'Equipment4' && <Equipment4 />}
           {selectedRoute === 'Equipment5' && <Equipment5 />}
           

       </div>
    </div> 
  )
}

export default Equipment1













