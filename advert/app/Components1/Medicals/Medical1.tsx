import React from "react";
import { useState } from "react";
import Medical2 from "./Medical2";
import Medical4 from "./Medical4";
import Medical5 from "./Medical5";

const Medical1 = () => {
  const initialRoute = localStorage.getItem('selectedRoute') || 'Medical2'
  const [selectedRoute, setSelectedRoute] = useState<string>(initialRoute);


  return (
    <div className='flex flex-col   pt-3 w-full 
     border-4 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Medical2')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Medical4')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Medical5')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-4
        border-blue-950 h-auto m-2 bg-white
       w-5xl overflow-y-auto p-3 gap-4 max-md:m-3 max-md:mt-5
       '>
       
           {selectedRoute === 'Medical2' && <Medical2 />}
           {selectedRoute === 'Medical4' && <Medical4 />}
           {selectedRoute === 'Medical5' && <Medical5 />}
           

       </div>
    </div> 
  )
}

export default Medical1





