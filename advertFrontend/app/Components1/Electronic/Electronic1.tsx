import React from "react";
import { useState } from "react";
import Electronic2 from "./Electronic2";
import Electronic4 from "./Electronic4";
import Electronic5 from "./Electronic5";

const Electronic1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Electronic2');

  return (
    <div className='flex flex-col   pt-1 sm:pt-2 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Electronic2')}
            className='text-sm text-white w-20 max-sm:h-6 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Electronic4')}
            className='text-sm text-white w-20 max-sm:h-6 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Electronic5')}
            className='text-sm text-white w-20 max-sm:h-6 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
        w-5xl overflow-y-auto p-1 gap-4  max-md:mt-1
       '>
      
           {selectedRoute === 'Electronic2' && <Electronic2 />}
           {selectedRoute === 'Electronic4' && <Electronic4 />}
           {selectedRoute === 'Electronic5' && <Electronic5 />}
           

       </div>
    </div> 
  )
}

export default Electronic1









