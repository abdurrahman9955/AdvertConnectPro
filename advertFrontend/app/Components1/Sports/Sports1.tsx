import React from "react";
import { useState } from "react";
import Sports2 from "./Sports2";
import Sports4 from "./Sports4";
import Sports5 from "./Sports5";

const Sports1 = () => {
 
  const [selectedRoute, setSelectedRoute] = useState<string>('Sports2');


  return (
    <div className='flex flex-col sm:pt-2  pt-1 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Sports2')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Sports4')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Sports5')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto m-2 bg-white
       w-5xl overflow-y-auto p-1 gap-4 max-md:mt-1
       '>
       
           {selectedRoute === 'Sports2' && <Sports2 />}
           {selectedRoute === 'Sports4' && <Sports4 />}
           {selectedRoute === 'Sports5' && <Sports5 />}
           

       </div>
    </div> 
  )
}

export default Sports1


