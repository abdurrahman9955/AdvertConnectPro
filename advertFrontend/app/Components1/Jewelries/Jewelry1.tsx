import React from "react";
import { useState } from "react";
import Jewelry2 from "./Jewelry2";
import Jewelry4 from "./Jewelry4";
import Jewelry5 from "./Jewelry5";


const Jewelry1 = () => {
 
  const [selectedRoute, setSelectedRoute] = useState<string>('Jewelry2');


  return (
    <div className='flex flex-col sm:pt-2  pt-1 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Jewelry2')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Jewelry4')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Jewelry5')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
        w-5xl overflow-y-auto p-1 gap-4 max-md:mt-1 '>
      
           {selectedRoute === 'Jewelry2' && <Jewelry2 />}
           {selectedRoute === 'Jewelry4' && <Jewelry4 />}
           {selectedRoute === 'Jewelry5' && <Jewelry5 />}
           

       </div>
    </div> 
  )
}

export default Jewelry1






