'use client'

import { FaSearch } from 'react-icons/fa';
import Search from "./Search";
import Cloths1 from './Cloths1';
import Cloths2 from './Cloths2';
import Cloths3 from './Cloths3';
import React, { useState, useEffect } from 'react'
import Back from "./Back";
import Link from 'next/link';
import { useDispatch} from 'react-redux';
import { setQuery } from '@/app/app/searchSlice';


const Cloths = () => {
 
  const [SearchVisible, setSearchVisible] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string>('Cloths1');

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
    <div className=" w-full ">
        <div className="border-2 border-indigo-900  py-2 max-sm:py-1 w-full  ">

       

        <div className="flex justify-items-center  max-lg:justify-between overflow-x-auto  ">
              
                
               <button onClick={() => setSelectedRoute('Cloths1')}
                type="button" className="text-lime-100 bg-indigo-950
                ml-3 rounded-sm h-7 max-sm:h-6 w-auto pl-5 pr-5 mr-5 text-sm
                lg:px-7 hover:bg-neutral-700  ">Cloths</button>
               
                
               <input type="text" className="  bg-white  
                flex-1 border-2 border-blue-950 
                px-28 max-md:px-20 md:text-sm
                sm:rounded-l-full 
                max-sm:px-5 max-sm:rounded-r-full max-sm:hidden  "
                placeholder="search  here  " 
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

               <button onClick={() => setSelectedRoute('Cloths3')}
                 type="button" className="text-lime-100 bg-indigo-950
                ml-3 rounded-sm text-sm h-7 max-sm:h-6    mr-2  w-auto pl-5 pr-5
                 hover:bg-neutral-700 
                 ">Filters</button>

            
                
           </div>
           </div>
        <div>
            <div  >
            
            </div>
             
              
          {selectedRoute === 'Cloths1' && <Cloths1 />}
           {selectedRoute === 'Cloths2' && <Cloths2 />}
           {selectedRoute === 'Cloths3' && <Cloths3 />}
           
          
          

          </div>      
    </div>
  )
}

export default Cloths


