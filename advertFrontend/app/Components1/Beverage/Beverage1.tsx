import React from "react";
import { useState } from "react";
import Beverage2 from "./Beverage2";
import Beverage4 from "./Beverage4";
import Beverage5 from "./Beverage5";

const Beverage1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Beverage2');

  return (
    <div className='flex flex-col   pt-2 max-sm:pt-1 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Beverage2')}
            className='text-sm text-white w-20 h-7 max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Beverage4')}
            className='text-sm text-white w-20 h-7 max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Beverage5')}
            className='text-sm text-white w-20 max-sm:h-6 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
       w-5xl overflow-y-auto p-1 gap-4 max-md:mt-1
       '>
       
        {selectedRoute === 'Beverage2' && <Beverage2 />}
           {selectedRoute === 'Beverage4' && <Beverage4 />}
           {selectedRoute === 'Beverage5' && <Beverage5 />}
           

       </div>
    </div> 
  )
}

export default Beverage1









