import React from "react";
import { useState } from "react";
import Spare2 from "./Spare2";
import Spare4 from "./Spare4";
import Spare5 from "./Spare5";

const Spare1 = () => {
  const initialRoute = localStorage.getItem('selectedRoute') || 'Spare2'
  const [selectedRoute, setSelectedRoute] = useState<string>(initialRoute);


  return (
    <div className='flex flex-col   pt-3 w-full 
     border-4 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Spare2')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Spare4')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Spare5')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-4
        border-blue-950 h-auto m-2 bg-white
       w-5xl overflow-y-auto p-3 gap-4 max-md:m-3 max-md:mt-5
       '>
       
           {selectedRoute === 'Spare2' && <Spare2 />}
           {selectedRoute === 'Spare4' && <Spare4 />}
           {selectedRoute === 'Spare5' && <Spare5 />}
           

       </div>
    </div> 
  )
}

export default Spare1


