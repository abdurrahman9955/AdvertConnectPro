import React from "react";
import { useState } from "react";
import Sports2 from "./Sports2";
import Sports4 from "./Sports4";
import Sports5 from "./Sports5";

const Sports1 = () => {
 
  const [selectedRoute, setSelectedRoute] = useState<string>('Sports2');


  return (
    <div className='flex flex-col   pt-3 w-full 
     border-4 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Sports2')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Sports4')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Sports5')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-4
        border-blue-950 h-auto m-2 bg-white
       w-5xl overflow-y-auto p-3 gap-4 max-md:m-3 max-md:mt-5
       '>
        
           {selectedRoute === 'Sports2' && <Sports2 />}
           {selectedRoute === 'Sports4' && <Sports4 />}
           {selectedRoute === 'Sports5' && <Sports5 />}
           

       </div>
    </div> 
  )
}

export default Sports1


