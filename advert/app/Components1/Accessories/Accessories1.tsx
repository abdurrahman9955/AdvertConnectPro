import React from "react";
import { useState } from "react";
import Accessories2 from "./Accessories2";
import Accessories4 from "./Accessories4";
import Accessories5 from "./Accessories5";


const Accessories1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Accessories2');


  return (
    <div className='flex flex-col   pt-3 w-full 
     border-4 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Accessories2')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Accessories4')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Accessories5')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-4
        border-blue-950 h-auto m-2 bg-white
       w-5xl overflow-y-auto p-3 gap-4 max-md:m-3 max-md:mt-5
       '>
       
        {selectedRoute === 'Accessories2' && <Accessories2 />}
           {selectedRoute === 'Accessories4' && <Accessories4 />}
           {selectedRoute === 'Accessories5' && <Accessories5 />}
           

       </div>
    </div> 
  )
}

export default Accessories1




