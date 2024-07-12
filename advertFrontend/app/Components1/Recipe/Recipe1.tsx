import React from "react";
import { useState } from "react";
import Recipe2 from "./Recipe2";
import Recipe4 from "./Recipe4";
import Recipe5 from "./Recipe5";


const Recipe1 = () => {
 
  const [selectedRoute, setSelectedRoute] = useState<string>('Recipe2');

  return (
    <div className='flex flex-col sm:pt-2  pt-1 w-full 
     border-2 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Recipe2')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Recipe4')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Recipe5')}
            className='max-sm:h-6 text-sm text-white w-20 h-7 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-sm'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-2
        border-blue-950 h-auto sm:m-2 bg-white
       w-5xl overflow-y-auto p-1 gap-3 max-md:mt-1
       '>
       
        {selectedRoute === 'Recipe5' && <Recipe5 />}
           {selectedRoute === 'Recipe4' && <Recipe4 />}
           {selectedRoute === 'Recipe2' && <Recipe2 />}
           

       </div>
    </div> 
  )
}

export default Recipe1


