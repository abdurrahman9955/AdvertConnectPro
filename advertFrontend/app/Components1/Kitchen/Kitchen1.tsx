import React from "react";
import { useState } from "react";
import Kitchen2 from "./Kitchen2";
import Kitchen4 from "./Kitchen4";
import Kitchen5 from "./Kitchen5";


const Kitchen1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Kitchen2');

  return (
    <div className='flex flex-col  sm:pt-2 pt-1 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Kitchen2')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Kitchen4')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Kitchen5')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
        w-5xl overflow-y-auto p-1 gap-4  max-md:mt-2
       '>
       
           {selectedRoute === 'Kitchen2' && <Kitchen2 />}
           {selectedRoute === 'Kitchen4' && <Kitchen4 />}
           {selectedRoute === 'Kitchen5' && <Kitchen5 />}
           

       </div>
    </div> 
  )
}

export default Kitchen1






