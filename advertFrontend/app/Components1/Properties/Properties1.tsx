import React from "react";
import { useState } from "react";
import Properties2 from "./Properties2";
import Properties4 from "./Properties4";
import Properties5 from "./Properties5";

const Properties1 = () => {
 
  const [selectedRoute, setSelectedRoute] = useState<string>('Properties2');


  return (
    <div className='flex flex-col  sm:pt-2 pt-1 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Properties2')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Properties4')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Properties5')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
        w-5xl overflow-y-auto p-1 gap-4 max-md:mt-1
       '>
      
           {selectedRoute === 'Properties2' && <Properties2 />}
           {selectedRoute === 'Properties4' && <Properties4 />}
           {selectedRoute === 'Properties5' && <Properties5 />}
           

       </div>
    </div> 
  )
}

export default Properties1










