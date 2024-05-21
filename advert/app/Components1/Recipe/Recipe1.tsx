import React from "react";
import { useState } from "react";
import Recipe2 from "./Recipe2";
import Recipe4 from "./Recipe4";
import Recipe5 from "./Recipe5";


const Recipe1 = () => {
 
  const [selectedRoute, setSelectedRoute] = useState<string>('Recipe2');


  return (
    <div className='flex flex-col   pt-3 w-full 
     border-4 border-blue-950 h-auto'>

        <div className='flex justify-center overflow-x-auto '>
          <div>
            <button onClick={() => setSelectedRoute('Recipe2')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full overflow-visible'>Photos</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Recipe4')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Banner</button>
          </div>

          <div>
            <button onClick={() => setSelectedRoute('Recipe5')}
            className='text-xl text-white w-28 h-10 bg-blue-950 mr-2 
            hover:bg-blue-800 rounded-full'>Videos</button>
          </div>
      
        </div>

       <div className='flex justify-center flex-wrap  border-4
        border-blue-950 h-auto m-2 bg-white
       w-5xl overflow-y-auto p-3 gap-4 max-md:m-3 max-md:mt-5
       '>
       
        {selectedRoute === 'Recipe5' && <Recipe5 />}
           {selectedRoute === 'Recipe4' && <Recipe4 />}
           {selectedRoute === 'Recipe2' && <Recipe2 />}
           

       </div>
    </div> 
  )
}

export default Recipe1


