'use client'
import { useSearch } from "../Context/HomeContext";

const Menu = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  
  const handleHomeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav className="fixed top-20 left-0 h-24 shadow-md  bg-slate-950 
    border-4 border-slate-300 w-full lg:hidden ">
        <div className=" " >
                <div className="  ">
              
                <div className=" flex flex-row mt-5 gap-0 max-md:gap-0 " >

               <input type="text"
                value={searchTerm}
                onChange={handleHomeSearch}
                className="flex justify-center border-2 border-pink-950  
                rounded-l-full bg-white flex-1  ml-5 pl-5 max-md:mx-3 mr-0  h-12 " 
                placeholder="search for your favorite news  "  /> 
                
                <button type="submit"
                value={searchTerm}
                 className="bg-lime-950 mr-4 text-slate-200
                rounded-r-full px-4  h-12 border border-white ml-0
                font-bold   hover:bg-orange-950 ">search</button>

       </div>        
      </div>
     </div>  
    </nav>
  )
}

export default Menu




