import React from "react";
import { useState } from "react";
import Videos1 from "./Small/Videos1";
import Photos1 from "./Small/Photos1";
import Banner1 from "./Small/Banner1";

const Videos = () => {
  const initialRoute = localStorage.getItem('selectedRoute') || 'Photos1'
  const [selectedRoute, setSelectedRoute] = useState<string>(initialRoute);


  return (
    <div className='flex flex-col   pt-3 w-full 
     border-4 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>

        <div>
            <button onClick={() => setSelectedRoute('Photos1')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Photos</button>
          </div>


          <div>
            <button onClick={() => setSelectedRoute('Banner1')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Videos1')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full overflow-visible'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-4
        border-blue-950 min-h-screen m-2 bg-white
       w-5xl overflow-y-auto p-3 gap-4 max-md:m-3 max-md:mt-5
       '>
       
        {selectedRoute === 'Videos1' && <Videos1 />}  
          {selectedRoute === 'Photos1' && <Photos1 />}
           {selectedRoute === 'Banner1' && <Banner1 />}

       </div>
    </div> 
  )
}

export default Videos