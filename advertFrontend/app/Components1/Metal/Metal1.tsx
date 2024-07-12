import React from "react";
import { useState } from "react";
import Metal2 from "./Metal2";
import Metal4 from "./Metal4";
import Metal5 from "./Metal5";

const Metal1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Metal2');

  return (
    <div className='flex flex-col sm:pt-2  pt-1 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Metal2')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Metal4')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Metal5')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
        w-5xl overflow-y-auto p-1 gap-4  max-md:mt-1
       '>
       
           {selectedRoute === 'Metal2' && <Metal2 />}
           {selectedRoute === 'Metal4' && <Metal4 />}
           {selectedRoute === 'Metal5' && <Metal5 />}
           

       </div>
    </div> 
  )
}

export default Metal1







