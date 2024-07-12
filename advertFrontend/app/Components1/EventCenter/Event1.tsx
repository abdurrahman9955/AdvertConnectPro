import React from "react";
import { useState } from "react";
import Event2 from "./Event2";
import Event4 from "./Event4";
import Event5 from "./Event5";

const Event1 = () => {
 
  const [selectedRoute, setSelectedRoute] = useState<string>('Event2');

  return (
    <div className='flex flex-col pt-1 sm:pt-2 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Event2')}
            className='text-sm text-white max-sm:h-6 w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Event4')}
            className='text-sm text-white w-20 h-7 max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Event5')}
            className='text-sm text-white w-20 h-7 max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
        w-5xl overflow-y-auto p-1 gap-4  max-md:mt-1
       '>
       
           {selectedRoute === 'Event2' && <Event2 />}
           {selectedRoute === 'Event4' && <Event4 />}
           {selectedRoute === 'Event5' && <Event5 />}
           

       </div>
    </div> 
  )
}

export default Event1













