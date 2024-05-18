import Link from "next/link"
import { FaSearch } from 'react-icons/fa';


const Header0 = () => {
  return (
    <div className="pt-24 w-full ">
        <div className="border-4 border-indigo-900 bg-white py-5 w-full  ">
        <div className="flex justify-items-center overflow-x-auto  ">
               <Link href={{pathname:'/Profile'}}>
               <button type="button" className="text-lime-100 bg-indigo-900
                ml-3 rounded-xl  px-5 md:py-2 md:px-10   max-sm:px-3 max-sm:py-2
                lg:px-7 hover:bg-neutral-800  ">Profile</button> </Link>
                
                <Link href={{pathname:'/Profile'}}>
               <button type="button" className="text-lime-100 bg-indigo-900
                ml-3 rounded-xl  px-5 md:py-2 md:px-10 mr-5  max-sm:px-3 max-sm:py-2
                lg:px-7 hover:bg-neutral-800 md:mr-10 ">Profile</button> </Link>

                <input type="text" className="flex-1 border-2
                 border-slate-950  px-28
                rounded-l-full  max-sm:px-5 max-sm:rounded-r-full   max-[450]:px-3 "
                placeholder="search for your favorite news  "  /> 
                
                <button type="submit" className="bg-red-900 ml-0 text-slate-200
                rounded-r-full px-4 max-sm:hidden  ">search</button>

                <Link href={{pathname:'/Profile'}}>
               <button type="button" className="text-lime-100 bg-indigo-900
                ml-3 rounded-xl  px-5 md:py-2 md:px-10   max-sm:px-3 max-sm:py-2
                lg:px-7 hover:bg-neutral-800  ">Profile</button> </Link>

                 <Link href={{pathname: '/upload'}}>
                 <button type="button" className="text-lime-100 bg-indigo-900
                ml-3 rounded-xl px-5 md:py-2 md:px-10 max-sm:px-2 mr-2 
                max-sm:py-2 hover:bg-neutral-800 
                 ">Publish</button>
                 </Link>
           </div>
           </div>
        <div>
            <div  >
            
            </div>
          </div>
          
    </div>
  )
}

export default Header0


