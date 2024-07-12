import React from "react";
import { useState } from "react";
import Music2 from "./Music2";
import Music4 from "./Music4";
import Music5 from "./Music5";

const Music1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Music2');

  return (
    <div className='flex flex-col sm:pt-2  pt-1 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Music2')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Music4')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Music5')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto m-2 bg-white
        w-5xl overflow-y-auto p-1 gap-3  max-md:mt-1
       '>
       
           {selectedRoute === 'Music2' && <Music2 />}
           {selectedRoute === 'Music4' && <Music4 />}
           {selectedRoute === 'Music5' && <Music5 />}
           

       </div>
    </div> 
  )
}

export default Music1







