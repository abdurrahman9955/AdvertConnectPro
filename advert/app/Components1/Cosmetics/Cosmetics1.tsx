import React from "react";
import { useState } from "react";
import Cosmetics2 from "./Cosmetics2";
import Cosmetics4 from "./Cosmetics4";
import Cosmetics5 from "./Cosmetics5";


const Cosmetics1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Cosmetics2');


  return (
    <div className='flex flex-col   pt-3 w-full 
     border-4 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Cosmetics2')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Cosmetics4')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Cosmetics5')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-4
        border-blue-950 h-auto m-2 bg-white
       w-5xl overflow-y-auto p-3 gap-4 max-md:m-3 max-md:mt-5
       '>
       
           {selectedRoute === 'Cosmetics2' && <Cosmetics2 />}
           {selectedRoute === 'Cosmetics4' && <Cosmetics4 />}
           {selectedRoute === 'Cosmetics5' && <Cosmetics5 />}
           

       </div>
    </div> 
  )
}

export default Cosmetics1









