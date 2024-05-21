import React from "react";
import { useState } from "react";
import Fashion2 from "./Fashion2";
import Fashion4 from "./Fashion4";
import Fashion5 from "./Fashion5";

const Fashion1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Fashion2');


  return (
    <div className='flex flex-col   pt-3 w-full 
     border-4 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Fashion2')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Fashion4')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Fashion5')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-4
        border-blue-950 h-auto m-2 bg-white
       w-5xl overflow-y-auto p-3 gap-4 max-md:m-3 max-md:mt-5
       '>
       
           {selectedRoute === 'Fashion2' && <Fashion2 />}
           {selectedRoute === 'Fashion4' && <Fashion4 />}
           {selectedRoute === 'Fashion5' && <Fashion5 />}
           

       </div>
    </div> 
  )
}

export default Fashion1















