import React from "react";
import { useState } from "react";
import Spare2 from "./Spare2";
import Spare4 from "./Spare4";
import Spare5 from "./Spare5";

const Spare1 = () => {
 
  const [selectedRoute, setSelectedRoute] = useState<string>('Spare2');


  return (
    <div className='flex flex-col   pt-2 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Spare2')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Spare4')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Spare5')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
        w-5xl overflow-y-auto p-1 gap-4 max-md:mt-1
       '>
      
           {selectedRoute === 'Spare2' && <Spare2 />}
           {selectedRoute === 'Spare4' && <Spare4 />}
           {selectedRoute === 'Spare5' && <Spare5 />}
           

       </div>
    </div> 
  )
}

export default Spare1


