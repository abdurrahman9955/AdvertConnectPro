import React from "react";
import { useState } from "react";
import Building2 from "./Building2";
import Building4 from "./Building4";
import Building5 from "./Building5";

const Building1 = () => {
 
  const [selectedRoute, setSelectedRoute] = useState<string>('Building2');


  return (
    <div className='flex flex-col   pt-1 sm:pt-2 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Building2')}
            className='text-sm text-white w-20 max-sm:h-6 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Building4')}
            className='text-sm text-white w-20 max-sm:h-6 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Building5')}
            className='text-sm text-white w-20 h-7 max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
       w-5xl overflow-y-auto p-1 gap-4  max-md:mt-1
       '>
        
        {selectedRoute === 'Building2' && <Building2 />}
           {selectedRoute === 'Building4' && <Building4 />}
           {selectedRoute === 'Building5' && <Building5 />}
           

       </div>
    </div> 
  )
}

export default Building1









