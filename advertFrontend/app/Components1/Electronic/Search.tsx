import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setQuery } from '@/app/app/searchSlice';
import { FaSearch } from "react-icons/fa";

const Search = () => {

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedSearchQuery = sessionStorage.getItem('searchQuery');
    if (storedSearchQuery) {
      setSearchQuery(storedSearchQuery);
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    dispatch(setQuery(searchQuery));
    sessionStorage.setItem('searchQuery', searchQuery);

  };

    return (
      <nav className="fixed top-24 left-0 h-11 shadow-md  bg-blue-950 
      border-2 border-slate-300 w-full lg:hidden ">

          <div className=" " >

                  <div className=" ">
                  <div className=" flex flex-row mt-1 gap-0 max-md:gap-0" >
                
                 <input type="text" 
                 className="flex justify-center border-2 border-pink-950  
                  rounded-l-full bg-white  flex-1  mr-5
                  ml-5 pl-5 max-md:mx-3   h-8  max-sm:rounded-full" 
                  placeholder="search here "
                  value={searchQuery}
                  onChange={handleInputChange}
                    /> 
                  
                  <button type="submit" 
                  className="  text-slate-950 
                  rounded-r-full   h-8  mr-5
                  font-bold  " 
                  style={{ marginLeft: '-55px' }}
                  onClick={handleSearch}
                  ><FaSearch size={24} /></button>
  
         </div>       
        </div>
      </div>
      </nav>
    )
  }
 
  export default Search
  
  
  
  
  