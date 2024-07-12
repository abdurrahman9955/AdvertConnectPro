'use client'

import { FaSearch } from 'react-icons/fa';
import Search from "./Search";
import Videos from "./Videos";
import React, { useState, useEffect } from 'react'
import Back from "./Back";
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setQuery } from '@/app/app/searchSlice';


const Post = () => {
  
  const [SearchVisible, setSearchVisible] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string>('Videos');

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
        <div className="border-2 border-indigo-900 bg-sky-400 py-2  
        max-sm:py-1 w-full  ">

       

        <div className="flex justify-items-center  max-lg:justify-between overflow-x-auto  ">
              
                
               <button onClick={() => setSelectedRoute('Videos')}
                type="button" className="text-lime-100 bg-indigo-950
                ml-5 rounded-sm h-7  max-sm:h-6 text-sm w-20  mr-5
                 hover:bg-neutral-700  ">Product</button>
                
             
                <input type="text" className="  bg-white  
                flex-1 border-2 border-blue-950  px-28
                rounded-l-full  max-sm:px-5 max-sm:rounded-r-full 
                max-lg:hidden  "
                placeholder="search here " 
                value={searchQuery}
                onChange={handleInputChange} /> 
                
                <button type="submit" 
                className="bg-red-900 ml-0
                 text-slate-200 hover:bg-green-950
                rounded-r-full px-4 max-lg:hidden  "
                onClick={handleSearch1}
                >search</button>

             <button  onClick={handleSearch}  className='text-2xl text-white 
            lg:hidden mr-5 '>

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

              <Link href={{pathname:'/Upload'}}>
               <button type="button" className="text-lime-100 bg-indigo-950
                ml-5 rounded-sm  h-7  max-sm:h-6 text-sm  w-20  max-sm:px-2 mr-5
                 hover:bg-neutral-700 
                 ">upload</button>  </Link> 

              
           </div>
           </div>
        <div>
            <div  >
            
            </div>
             
           
          {selectedRoute === 'Videos' && <Videos />}
           
          
          

          </div>      
    </div>
  )
}

export default Post


