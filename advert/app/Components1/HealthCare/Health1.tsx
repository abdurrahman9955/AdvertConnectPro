import React from "react";
import { useState } from "react";
import Health2 from "./Health2";
import Health4 from "./Health4";
import Health5 from "./Health5";


const Health1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Health2');


  return (
    <div className='flex flex-col   pt-3 w-full 
     border-4 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Health2')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Health4')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Health5')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-4
        border-blue-950 h-auto m-2 bg-white
       w-5xl overflow-y-auto p-3 gap-4 max-md:m-3 max-md:mt-5
       '>
       
           {selectedRoute === 'Health2' && <Health2 />}
           {selectedRoute === 'Health4' && <Health4 />}
           {selectedRoute === 'Health5' && <Health5 />}
           

       </div>
    </div> 
  )
}

export default Health1






