import React from "react";
import { useState } from "react";
import Cosmetics2 from "./Cosmetics2";
import Cosmetics4 from "./Cosmetics4";
import Cosmetics5 from "./Cosmetics5";


const Cosmetics1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Cosmetics2');


  return (
    <div className='flex flex-col   pt-1 sm:pt-2 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Cosmetics2')}
            className='text-sm text-white w-20 h-7 max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Cosmetics4')}
            className='text-sm text-white w-20 h-7 max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Cosmetics5')}
            className='text-sm text-white w-20 max-sm:h-6 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white 
        w-5xl overflow-y-auto p-1 gap-4  max-md:mt-1'>
       
           {selectedRoute === 'Cosmetics2' && <Cosmetics2 />}
           {selectedRoute === 'Cosmetics4' && <Cosmetics4 />}
           {selectedRoute === 'Cosmetics5' && <Cosmetics5 />}
           

       </div>
    </div> 
  )
}

export default Cosmetics1









