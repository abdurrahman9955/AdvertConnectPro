
const Note = () => {
  return (
    <div className='flex justify-center flex-col  pt-2 w-full font-bold
     border-4 border-blue-950 '>
       
        <h1 className='flex justify-center mb-2  text-2xl text-blue-950 font-bold 
          max-md:text-xl
        '>you now have (0) Notifications</h1>
         <div className='flex justify-center'>
         <div className='flex flex-col    lg:w-2/4 md:mb-10 max-lg:w-3/4 font-bold 
          border-4 border-blue-950 pt-2 max-md:w-full m-1   md:text-xl '> 

              <div className="flex justify-between w-full px-2
                border-slate-950  gap-4">

           
               <div className=" shadow-lg w-full bg-blue-950 border-2  h-7  max-sm:h-6
                border-slate-950 rounded flex-initial">
                  
                   <h1 className='flex justify-center font-bold text-white mt-1
                   text-sm'>you have (0) Unread
                   </h1>
                </div>

                </div>
                
                <div className='w-full mt-2  border-4
                 border-blue-950'></div>

         <div className='flex flex-row h-screen overflow-y-auto bg-white p-3'>
         <div className='  w-full gap-4  '>

         <h1>no notification  yet</h1>
   
          </div>
          </div>
          </div>
        </div>
    </div>
  )
}

export default Note
