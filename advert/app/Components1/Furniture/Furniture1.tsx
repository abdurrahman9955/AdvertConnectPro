import React from "react";
import { useState } from "react";
import Furniture2 from "./Furniture2";
import Furniture4 from "./Furniture4";
import Furniture5 from "./Furniture5";

const Furniture1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Furniture2');


  return (
    <div className='flex flex-col   pt-3 w-full 
     border-4 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Furniture2')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Furniture4')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Furniture5')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-4
        border-blue-950 h-auto m-2 bg-white
       w-5xl overflow-y-auto p-3 gap-4 max-md:m-3 max-md:mt-5
       '>
       
           {selectedRoute === 'Furniture2' && <Furniture2 />}
           {selectedRoute === 'Furniture4' && <Furniture4 />}
           {selectedRoute === 'Furniture5' && <Furniture5 />}
           

       </div>
    </div> 
  )
}

export default Furniture1



