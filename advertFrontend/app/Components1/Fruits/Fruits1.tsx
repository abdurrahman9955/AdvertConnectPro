import React from "react";
import { useState } from "react";
import Fruits2 from "./Fruits2";
import Fruits4 from "./Fruits4";
import Fruits5 from "./Fruits5";

const Fruits1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Fruits2');


  return (
    <div className='flex flex-col   pt-1 sm:pt-2 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Fruits2')}
            className='text-sm text-white w-20 h-7 max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Fruits4')}
            className='text-sm text-white w-20 h-7 max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Fruits5')}
            className='text-sm text-white w-20 h-7 max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
       w-5xl overflow-y-auto p-1 gap-3 max-md:m-3 max-md:mt-1
       '>
      
           {selectedRoute === 'Fruits2' && <Fruits2 />}
           {selectedRoute === 'Fruits4' && <Fruits4 />}
           {selectedRoute === 'Fruits5' && <Fruits5 />}
           

       </div>
    </div> 
  )
}

export default Fruits1

