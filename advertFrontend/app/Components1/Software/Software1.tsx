import React from "react";
import { useState } from "react";
import Software2 from "./Software2";
import Software4 from "./Software4";
import Software5 from "./Software5";

const Software1 = () => {
  
  const [selectedRoute, setSelectedRoute] = useState<string>('Software2');

  return (
    <div className='flex flex-col sm:pt-2  pt-1 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Software2')}
            className=' max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Software4')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Software5')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto m-2 bg-white
        w-5xl overflow-y-auto p-1 gap-4  max-md:mt-1
       '>
       
           {selectedRoute === 'Software2' && <Software2 />}
           {selectedRoute === 'Software4' && <Software4 />}
           {selectedRoute === 'Software5' && <Software5 />}
           

       </div>
    </div> 
  )
}

export default Software1











