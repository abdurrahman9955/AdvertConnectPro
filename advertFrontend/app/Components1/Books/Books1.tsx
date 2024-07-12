import React from "react";
import { useState } from "react";
import Books2 from "./Books2";
import Books4 from "./Books4";
import Books5 from "./Books5";

const Books1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Books2');


  return (
    <div className='flex flex-col   pt-1 sm:pt-2 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Books2')}
            className='text-sm text-white w-20 h-7 max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Books4')}
            className='text-sm text-white w-20 h-7 max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Books5')}
            className='text-sm text-white w-20 h-7 max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
       w-5xl overflow-y-auto p-1 gap-4  max-md:mt-1
       '>
       
        {selectedRoute === 'Books2' && <Books2 />}
           {selectedRoute === 'Books4' && <Books4 />}
           {selectedRoute === 'Books5' && <Books5 />}
           

       </div>
    </div> 
  )
}

export default Books1









