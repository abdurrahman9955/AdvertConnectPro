import React from "react";
import { useState } from "react";
import Homes2 from "./Homes2";
import Homes4 from "./Homes4";
import Homes5 from "./Homes5";


const Homes1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Homes2');


  return (
    <div className='flex flex-col   pt-3 w-full 
     border-4 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Homes2')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Homes4')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Homes5')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-4
        border-blue-950 h-auto m-2 bg-white
       w-5xl overflow-y-auto p-3 gap-4 max-md:m-3 max-md:mt-5
       '>
       
           {selectedRoute === 'Homes2' && <Homes2 />}
           {selectedRoute === 'Homes4' && <Homes4 />}
           {selectedRoute === 'Homes5' && <Homes5 />}
           

       </div>
    </div> 
  )
}

export default Homes1






