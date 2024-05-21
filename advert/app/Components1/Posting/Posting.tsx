'use client'
import React from "react";
import { useState } from "react";
import ProductImages from "./Posting1";
import ProductBanner from "./Posting2";
import ProductVideos from "./Posting3";


const Posting = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('ProductImages');

  return (
    <div className='flex flex-col  pt-3 w-full 
     border-4 border-blue-950 h-auto bg--400'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('ProductImages')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('ProductBanner')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('ProductVideos')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-4
        border-blue-950 h-auto m-2 bg-slate-300
       w-5xl overflow-y-auto p-3 gap-4 max-md:m-3 max-md:mt-5
       '>
        
           {selectedRoute === 'ProductImages' && <ProductImages />}  
           {selectedRoute === 'ProductBanner' && <ProductBanner/>}
           {selectedRoute === 'ProductVideos' && <ProductVideos />}

       </div>
    </div> 
  )
}

export default Posting

