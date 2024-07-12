import React from "react";
import { useState } from "react";
import SuperMarkets2 from "./SuperMarkets2";
import SuperMarkets4 from "./SuperMarkets4";
import SuperMarkets5 from "./SuperMarkets5";

const SuperMarkets1 = () => {
 
  const [selectedRoute, setSelectedRoute] = useState<string>('SuperMarkets2');


  return (
    <div className='flex flex-col  sm:pt-2 pt-1 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('SuperMarkets2')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('SuperMarkets4')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('SuperMarkets5')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
        w-5xl overflow-y-auto p-1 gap-4 max-md:mt-1
       '>
      
           {selectedRoute === 'SuperMarkets2' && <SuperMarkets2 />}
           {selectedRoute === 'SuperMarkets4' && <SuperMarkets4 />}
           {selectedRoute === 'SuperMarkets5' && <SuperMarkets5 />}
           

       </div>
    </div> 
  )
}

export default SuperMarkets1


