import React from "react";
import { useState } from "react";
import Cloths2 from "./Cloths2";
import Cloths4 from "./Cloths4";
import Cloths5 from "./Cloths5";


const Cloths1 = () => {
 
  const [selectedRoute, setSelectedRoute] = useState<string>('Cloths2');


  return (
    <div className='flex flex-col   pt-1 sm:pt-2 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Cloths2')}
            className='text-sm text-white w-20 max-sm:h-6 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Cloths4')}
            className='text-sm text-white w-20 max-sm:h-6 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Cloths5')}
            className='text-sm text-white w-20 h-7 bg-blue-950 mr-2  max-sm:h-6
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto m-2 bg-white
       w-5xl overflow-y-auto p-1 gap-4 max-md:mt-1'>
       
           {selectedRoute === 'Cloths2' && <Cloths2 />}
           {selectedRoute === 'Cloths4' && <Cloths4 />}
           {selectedRoute === 'Cloths5' && <Cloths5 />}
           

       </div>
    </div> 
  )
}

export default Cloths1









