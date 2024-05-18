import React from "react";
import { useState } from "react";
import SuperMarkets2 from "./SuperMarkets2";
import SuperMarkets4 from "./SuperMarkets4";
import SuperMarkets5 from "./SuperMarkets5";

const SuperMarkets1 = () => {
  const initialRoute = localStorage.getItem('selectedRoute') || 'SuperMarkets2'
  const [selectedRoute, setSelectedRoute] = useState<string>(initialRoute);


  return (
    <div className='flex flex-col   pt-3 w-full 
     border-4 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('SuperMarkets2')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('SuperMarkets4')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('SuperMarkets5')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-4
        border-blue-950 h-auto m-2 bg-white
       w-5xl overflow-y-auto p-3 gap-4 max-md:m-3 max-md:mt-5
       '>
       
           {selectedRoute === 'SuperMarkets2' && <SuperMarkets2 />}
           {selectedRoute === 'SuperMarkets4' && <SuperMarkets4 />}
           {selectedRoute === 'SuperMarkets5' && <SuperMarkets5 />}
           

       </div>
    </div> 
  )
}

export default SuperMarkets1


