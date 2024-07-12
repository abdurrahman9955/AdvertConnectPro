import React from "react";
import { useState } from "react";
import Stores2 from "./Stores2";
import Stores5 from "./Stores5";
import Stores4 from "./Stores4";

const Stores1 = () => {
 
  const [selectedRoute, setSelectedRoute] = useState<string>('Stores2');

  return (
    <div className='flex flex-col  sm:pt-2 pt-1 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Stores2')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Stores4')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Stores5')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
        w-5xl overflow-y-auto p-1 gap-3  max-md:mt-1 '>
       
           {selectedRoute === 'Stores2' && <Stores2 />}
           {selectedRoute === 'Stores4' && <Stores4 />}
           {selectedRoute === 'Stores5' && <Stores5 />}
           

       </div>
    </div> 
  )
}

export default Stores1


