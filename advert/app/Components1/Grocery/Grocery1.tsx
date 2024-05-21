import React from "react";
import { useState } from "react";
import Grocery2 from "./Grocery2";
import Grocery4 from "./Grocery4";
import Grocery5 from "./Grocery5";

const Grocery1 = () => {
 
  const [selectedRoute, setSelectedRoute] = useState<string>('Grocery2');


  return (
    <div className='flex flex-col   pt-3 w-full 
     border-4 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Grocery2')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Grocery4')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Grocery5')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-4
        border-blue-950 h-auto m-2 bg-white
       w-5xl overflow-y-auto p-3 gap-4 max-md:m-3 max-md:mt-5
       '>
       
           {selectedRoute === 'Grocery2' && <Grocery2 />}
           {selectedRoute === 'Grocery4' && <Grocery4 />}
           {selectedRoute === 'Grocery5' && <Grocery5 />}
           

       </div>
    </div> 
  )
}

export default Grocery1



