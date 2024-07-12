import React from "react";
import { useState } from "react";
import Videos1 from "./Small/Videos1";
import Photos1 from "./Small/Photos1";
import Banner1 from "./Small/Banner1";

const Videos = () => {

  const [selectedRoute, setSelectedRoute] = useState<string>('Photos1');


  return (
    <div className='flex flex-col   pt-1  sm:pt-2 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>

        <div>
            <button onClick={() => setSelectedRoute('Photos1')}
            className='text-sm text-white w-20 h-7 max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Photos</button>
          </div>


          <div>
            <button onClick={() => setSelectedRoute('Banner1')}
            className='text-sm text-white w-20 h-7  max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Videos1')}
            className='text-sm text-white w-20 h-7  max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 min-h-screen sm:m-2 bg-white
       w-5xl overflow-y-auto  gap-4 max-md:mt-1 p-1
       '>
       
        {selectedRoute === 'Videos1' && <Videos1 />}  
          {selectedRoute === 'Photos1' && <Photos1 />}
           {selectedRoute === 'Banner1' && <Banner1 />}

       </div>
    </div> 
  )
}

export default Videos