import React from "react";
import { useState } from "react";
import Event2 from "./Event2";
import Event4 from "./Event4";
import Event5 from "./Event5";

const Event1 = () => {
  const initialRoute = localStorage.getItem('selectedRoute') || 'Event2'
  const [selectedRoute, setSelectedRoute] = useState<string>(initialRoute);


  return (
    <div className='flex flex-col   pt-3 w-full 
     border-4 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Event2')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Event4')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Event5')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-4
        border-blue-950 h-auto m-2 bg-white
       w-5xl overflow-y-auto p-3 gap-4 max-md:m-3 max-md:mt-5
       '>
       
           {selectedRoute === 'Event2' && <Event2 />}
           {selectedRoute === 'Event4' && <Event4 />}
           {selectedRoute === 'Event5' && <Event5 />}
           

       </div>
    </div> 
  )
}

export default Event1













