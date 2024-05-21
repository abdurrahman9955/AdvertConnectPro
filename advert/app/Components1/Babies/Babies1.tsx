import React from "react";
import { useState } from "react";
import Babies2 from "./Babies2";
import Babies4 from "./Babies4";
import Babies5 from "./Babies5";


const Babies1 = () => {
 
  const [selectedRoute, setSelectedRoute] = useState<string>('Babies2');


  return (
    <div className='flex flex-col   pt-3 w-full 
     border-4 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Babies2')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Babies4')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Babies5')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-4
        border-blue-950 h-auto m-2 bg-white
       w-5xl overflow-y-auto p-3 gap-4 max-md:m-3 max-md:mt-5
       '>
       
        {selectedRoute === 'Babies2' && <Babies2 />}
           {selectedRoute === 'Babies4' && <Babies4 />}
           {selectedRoute === 'Babies5' && <Babies5 />}
           

       </div>
    </div> 
  )
}

export default Babies1






