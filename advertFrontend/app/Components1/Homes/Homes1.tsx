import React from "react";
import { useState } from "react";
import Homes2 from "./Homes2";
import Homes4 from "./Homes4";
import Homes5 from "./Homes5";


const Homes1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Homes2');

  return (
    <div className='flex flex-col sm:pt-2  pt-1 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Homes2')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Homes4')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Homes5')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
       border-blue-950 h-auto sm:m-2 bg-white w-5xl overflow-y-auto
        p-1 gap-4 max-md:mt-1'>
      
           {selectedRoute === 'Homes2' && <Homes2 />}
           {selectedRoute === 'Homes4' && <Homes4 />}
           {selectedRoute === 'Homes5' && <Homes5 />}
           
       </div>
    </div> 
  )
}

export default Homes1






