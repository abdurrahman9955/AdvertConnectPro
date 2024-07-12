import React from "react";
import { useState } from "react";
import Vehicles2 from "./Vehicles2";
import Vehicles4 from "./Vehicles4";
import Vehicles5 from "./Vehicles5";

const Vehicles1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Vehicles2');


  return (
    <div className='flex flex-col sm:pt-1  pt-2 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Vehicles2')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Vehicles4')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Vehicles5')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
        w-5xl overflow-y-auto p-1 gap-4 max-md:mt-1
       '>
      
           {selectedRoute === 'Vehicles2' && <Vehicles2 />}
           {selectedRoute === 'Vehicles4' && <Vehicles4 />}
           {selectedRoute === 'Vehicles5' && <Vehicles5 />}
           

       </div>
    </div> 
  )
}

export default Vehicles1




