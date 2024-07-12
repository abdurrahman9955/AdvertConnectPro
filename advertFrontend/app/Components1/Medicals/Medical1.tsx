import React from "react";
import { useState } from "react";
import Medical2 from "./Medical2";
import Medical4 from "./Medical4";
import Medical5 from "./Medical5";

const Medical1 = () => {
 
  const [selectedRoute, setSelectedRoute] = useState<string>('Medical2');

  return (
    <div className='flex flex-col sm:pt-2  pt-1 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Medical2')}
            className=' text-white w-24 max-sm:h-6 text-sm h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Medical4')}
            className='text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Medical5')}
            className=' text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 max-sm:h-6 text-sm rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white 
       w-5xl overflow-y-auto p-1 gap-3 max-md:m-3 max-md:mt-1
       '>
       
           {selectedRoute === 'Medical2' && <Medical2 />}
           {selectedRoute === 'Medical4' && <Medical4 />}
           {selectedRoute === 'Medical5' && <Medical5 />}
           

       </div>
    </div> 
  )
}

export default Medical1





