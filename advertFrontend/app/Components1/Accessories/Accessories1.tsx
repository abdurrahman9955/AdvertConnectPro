import React from "react";
import { useState } from "react";
import Accessories2 from "./Accessories2";
import Accessories4 from "./Accessories4";
import Accessories5 from "./Accessories5";


const Accessories1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Accessories2');


  return (
    <div className='flex flex-col sm:pt-2  pt-1  w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Accessories2')}
            className='sm:text-sm  text-white w-20 max-sm:h-6 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Accessories4')}
            className='text-sm text-white w-20 max-sm:h-6 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Accessories5')}
            className='text-sm text-white max-sm:h-6 w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
       w-5xl overflow-y-auto p-1 gap-4 max-md:mt-1
       '>
      
        {selectedRoute === 'Accessories2' && <Accessories2 />}
           {selectedRoute === 'Accessories4' && <Accessories4 />}
           {selectedRoute === 'Accessories5' && <Accessories5 />}
           

       </div>
    </div> 
  )
}

export default Accessories1




