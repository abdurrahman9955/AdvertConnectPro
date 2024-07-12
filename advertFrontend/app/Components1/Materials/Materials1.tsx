import React from "react";
import { useState } from "react";
import Materials2 from "./Materials2";
import Materials4 from "./Materials4";
import Materials5 from "./Materials5";

const Materials1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Materials2');


  return (
    <div className='flex flex-col sm:pt-2  pt-1 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Materials2')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Materials4')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Materials5')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
        w-5xl overflow-y-auto p-1 gap-4 max-md:mt-2
       '>
       
           {selectedRoute === 'Materials2' && <Materials2 />}
           {selectedRoute === 'Materials4' && <Materials4 />}
           {selectedRoute === 'Materials5' && <Materials5 />}
           

       </div>
    </div> 
  )
}

export default Materials1





