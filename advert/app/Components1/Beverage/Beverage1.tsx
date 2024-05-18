import React from "react";
import { useState } from "react";
import Beverage2 from "./Beverage2";
import Beverage4 from "./Beverage4";
import Beverage5 from "./Beverage5";

const Beverage1 = () => {
  const initialRoute = localStorage.getItem('selectedRoute') || 'Beverage2'
  const [selectedRoute, setSelectedRoute] = useState<string>(initialRoute);


  return (
    <div className='flex flex-col   pt-3 w-full 
     border-4 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Beverage2')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Beverage4')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Beverage5')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-4
        border-blue-950 h-auto m-2 bg-white
       w-5xl overflow-y-auto p-3 gap-4 max-md:m-3 max-md:mt-5
       '>
       
        {selectedRoute === 'Beverage2' && <Beverage2 />}
           {selectedRoute === 'Beverage4' && <Beverage4 />}
           {selectedRoute === 'Beverage5' && <Beverage5 />}
           

       </div>
    </div> 
  )
}

export default Beverage1









