import React from 'react'
import { MdAddCall } from 'react-icons/md';
import { BsMicMuteFill } from 'react-icons/bs';
import { FcEndCall} from 'react-icons/fc';
import { FaVolumeUp } from 'react-icons/fa';

const Send4 = () => {
  return (
   
   <div className='flex justify-center  font-bold  
     bg-white border-4 border-black'>
     
       <div className='flex flex-col w-full
        bg-white   
      h-auto  font-bold'>


         <div className='   w-full  h-auto'>
          <h1 className='flex justify-center gap-4 border-b-4 border-black  text-xl font-bold  pb-2
          '> 

         <div>
            <button className='text-xl text-yellow-950 w-20 h-10 mt-2
            ml-10  rounded-xl'><MdAddCall  className='
            h-10 w-10  hover:text-blue-950'/></button>
          </div>

          <div>
            <button className='text-xl text-yellow-950 w-20 h-10 mt-2
              rounded-xl'><BsMicMuteFill  className='
            h-10 w-10  hover:text-blue-950'/></button>
          </div>

          <div>
            <button className='text-xl text-yellow-950 w-20 h-10 mt-2
                rounded-xl'><FaVolumeUp  className='
            h-10 w-10  hover:text-blue-950'/></button>
          </div>

          <div>
            <button className='text-xl text-yellow-950 w-20 h-10 mt-2
              rounded-xl'><FcEndCall  className='
            h-10 w-10  hover:text-blue-950'/></button>
          </div>


            
          </h1>
         
          <div className='h-screen overflow-y-auto    p-2  '>
           
        
        
       
          
           
           </div> 
          
                  
         </div>
         </div>
        
    </div>
  )
}

export default Send4