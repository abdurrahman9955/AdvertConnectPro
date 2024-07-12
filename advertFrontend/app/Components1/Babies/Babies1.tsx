import React from "react";
import { useState } from "react";
import Babies2 from "./Babies2";
import Babies4 from "./Babies4";
import Babies5 from "./Babies5";


const Babies1 = () => {
 
  const [selectedRoute, setSelectedRoute] = useState<string>('Babies2');


  return (
    <div className='flex flex-col   pt-1 sm:pt-2 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Babies2')}
            className='text-sm text-white w-20 h-7 max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Babies4')}
            className='text-sm text-white w-20 h-7 max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Babies5')}
            className='text-sm text-white w-20 h-7 max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
       w-5xl overflow-y-auto p-1 gap-4  max-md:mt-1
       '>
       
        {selectedRoute === 'Babies2' && <Babies2 />}
           {selectedRoute === 'Babies4' && <Babies4 />}
           {selectedRoute === 'Babies5' && <Babies5 />}
           

       </div>
    </div> 
  )
}

export default Babies1






