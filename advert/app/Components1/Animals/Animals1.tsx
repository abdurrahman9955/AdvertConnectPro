import React from "react";
import { useState } from "react";
import Animals2 from "./Animals2";
import Animals4 from "./Animals4";
import Animals5 from "./Animals5";


const Animals1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Animals2');


  return (
    <div className='flex flex-col   pt-3 w-full 
     border-4 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Animals2')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Animals4')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Animals5')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-4
        border-blue-950 h-auto m-2 bg-white
       w-5xl overflow-y-auto p-3 gap-4 max-md:m-3 max-md:mt-5
       '>
       
        {selectedRoute === 'Animals2' && <Animals2 />}
           {selectedRoute === 'Animals4' && <Animals4 />}
           {selectedRoute === 'Animals5' && <Animals5 />}
           

       </div>
    </div> 
  )
}

export default Animals1




