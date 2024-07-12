import React from "react";
import { useState } from "react";
import Others2 from "./Others2";
import Others4 from "./Others4";
import Others5 from "./Others5";

const Others1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Others2');


  return (
    <div className='flex flex-col   pt-2 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Others2')}
            className=' text-white max-sm:h-6 text-sm w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Others4')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Others5')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
        w-5xl overflow-y-auto p-1 gap-4  max-md:mt-1
       '>
       
           {selectedRoute === 'Others2' && <Others2 />}
           {selectedRoute === 'Others4' && <Others4 />}
           {selectedRoute === 'Others5' && <Others5 />}
           

       </div>
    </div> 
  )
}

export default Others1








