'use client'
import React from "react";
import { useState } from "react";
import ProductImages from "./Posting1";
import ProductBanner from "./Posting2";
import ProductVideos from "./Posting3";


const Posting = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('ProductImages');

  return (
    <div className='flex flex-col  pt-1 sm:pt-2 w-full 
     border-2 border-blue-950 h-auto bg--400'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('ProductImages')}
            className='text-sm text-white w-20 h-7 max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('ProductBanner')}
            className='text-sm text-white w-24 h-7 max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('ProductVideos')}
            className='text-sm text-white w-20 h-7 max-sm:h-6 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-slate-300
        w-5xl overflow-y-auto p-1 gap-3 max-md:mt-1
       '>
       
           {selectedRoute === 'ProductImages' && <ProductImages />}  
           {selectedRoute === 'ProductBanner' && <ProductBanner/>}
           {selectedRoute === 'ProductVideos' && <ProductVideos />}

       </div>
    </div> 
  )
}

export default Posting

