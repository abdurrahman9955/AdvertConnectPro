import React from "react";
import { useState } from "react";
import Restaurants2 from "./Restaurants2";
import Restaurants4 from "./Restaurants4";
import Restaurants5 from "./Restaurants5";

const Restaurants1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Restaurants2');

  return (
    <div className='flex flex-col  sm:pt-2 pt-1 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Restaurants2')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Restaurants4')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Restaurants5')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
        w-5xl overflow-y-auto p-1 gap-3  max-md:mt-2
       '>
       
           {selectedRoute === 'Restaurants2' && <Restaurants2 />}
           {selectedRoute === 'Restaurants4' && <Restaurants4 />}
           {selectedRoute === 'Restaurants5' && <Restaurants5 />}
           

       </div>
    </div> 
  )
}

export default Restaurants1












