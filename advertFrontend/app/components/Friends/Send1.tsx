'use client'
import Search from "./Search";

const Send1 = () => {

  return (
    <div className='flex justify-center flex-col  w-full font-bold
     border-4 border-slate-950 '>
        
       
         <div className='flex justify-center '>
         <div className='flex flex-col   bg-teal-300   font-bold 
           pt-5 w-full   md:text-xl '> 

              <div className="flex justify-center w-full  border-slate-950 ">
               <div className=" shadow-lg w-full   
                rounded flex-initial">
                  
                   <h1 className='flex justify-center font-bold text-black 
                   text-xl  '><Search />
                   
                   
                   </h1>
                </div>

                </div>
                
                <div className='w-full mt-2  border-2 border-black'></div>

         <div className='flex flex-row h-screen overflow-y-auto p-3 bg-white '>
         <div className='  w-full gap-4  '>

         <h1>no subscribers yet</h1>
   
          </div>
          </div>
          </div>
        </div>
    </div>
  )
}

export default Send1