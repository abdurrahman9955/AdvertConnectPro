'use client'
import Favorite1 from "./Favorite1"
import Favorite2 from "./Favorite2"
import Favorite3 from "./Favorite3"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


const Favorite = () => {

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/Sign_In');
    } 
  }, [router]);

    return (
      <div className='flex justify-center flex-col  pt-2 w-full font-bold
       border-4 border-blue-950 '>
         
          <h1 className='flex justify-center mb-2  text-5xl text-blue-950 font-bold 
            max-md:text-2xl
          '></h1>
           <div className='flex justify-center'>
           <div className='flex flex-col    lg:w-4/5 md:mb-10 max-lg:w-full font-bold 
            border-8 border-blue-950 pt-5 max-md:w-full m-1   md:text-xl '> 
  
                <div className="flex justify-between w-full px-2
                  border-slate-950  gap-4">
  
              
                 <div className=" shadow-lg w-full bg-blue-950 border-2  h-10
                  border-slate-950 rounded flex-initial">
                    
                     <h1 className='flex justify-center font-bold text-white mt-1
                     text-2xl'>Favorite Product</h1>
                  </div>
  
                  </div>
                  
                  <div className='w-full mt-2  border-4
                   border-blue-950'></div>

           <div className='flex flex-row h-auto overflow-y-auto bg-white p-3'>
           <div className='  w-full gap-4  '>
           
           <Favorite1 />
           <Favorite2 />
           <Favorite3 />
    
            </div>
            </div>
            </div>
          </div>
      </div>
    )
  }
  
  export default Favorite
  
  

  
  