'use client'
import { FaSearch } from 'react-icons/fa';
import Search from "./Search";
import Spare1 from './Spare1';
import Spare2 from './Spare2';
import  Spare3 from './Spare3';
import React, { useState, useEffect } from 'react'
import Back from "./Back";
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setQuery } from '@/app/app/searchSlice';

const  Spare = () => {

  const [SearchVisible, setSearchVisible] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string>(' Spare1');

  const handleSearch = ()=>{
    setSearchVisible(!SearchVisible);

  };      const  closeSearch = ()=> {
    setSearchVisible(false);  
       };

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

  const handleSearch1 = () => {
    dispatch(setQuery(searchQuery));
    sessionStorage.setItem('searchQuery', searchQuery);
    
  };


  return (
    <div className="w-full ">
        <div className="border-2 border-indigo-900 sm:py-2 py-1 w-full  ">

        <div className="flex justify-items-center  max-lg:justify-between overflow-x-auto  ">

               <button onClick={() => setSelectedRoute(' Spare1')}
                 type="button" className="text-lime-100 bg-indigo-950
                ml-3 rounded-sm h-7  max-sm:h-6 text-sm  mr-2  w-auto pl-5 pr-5
                max-sm:py-2 hover:bg-neutral-700 
                 ">SpareParts</button>
                
                <input type="text" className="  bg-white  
                flex-1 border-2 border-blue-950 
                px-28 max-md:px-20 md:text-sm
                sm:rounded-l-full 
                max-sm:px-5 max-sm:rounded-r-full max-sm:hidden  "
                placeholder="search for here  " 
                value={searchQuery}
                onChange={handleInputChange} /> 
                
                <button type="submit" 
                className="bg-red-900
                 ml-0 text-slate-200 hover:bg-green-950
                rounded-r-full px-4 max-sm:hidden"
                onClick={handleSearch1}
                >search</button>

             <button  onClick={handleSearch}  className='text-2xl text-blue-950 
            sm:hidden mr-5 '>

                {SearchVisible ? (
             <span  onClick={closeSearch} 
             ><Back  /></span>  ) : (
             <FaSearch  />  )}
            
            </button>

            <div  >
            {SearchVisible && 
            
            
            (<Search />)
               
               }
               </div>

               <button onClick={() => setSelectedRoute(' Spare3')}
                 type="button" className="text-lime-100 bg-indigo-950
                ml-3 rounded-sm h-7  max-sm:h-6 text-sm  mr-2  w-auto pl-5 pr-5
                hover:bg-neutral-700 
                 ">Filters</button>

           </div>
           </div>
           <div>
            <div>
            
            </div>
             
              
          {selectedRoute === ' Spare1' && < Spare1 />}
           {selectedRoute === ' Spare2' && < Spare2 />}
           {selectedRoute === ' Spare3' && < Spare3 />}
           
          
          

          </div>      
    </div>
  )
}

export default Spare




