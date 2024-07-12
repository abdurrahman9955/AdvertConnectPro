'use client'
import React from 'react';
import All1 from './All1';
import Carousel from '@/app/components0/Images/Carousel';
import { useSearch } from '../../Context/HomeContext';
import { Products } from './Products';

const All: React.FC = () => {
  const { searchTerm } = useSearch();

  const filteredItems = Products.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex justify-center font-bold border-2 border-black bg-slate-700'>
      <div className='flex flex-col bg-gray-500 border-2 border-black w-full h-auto 
        font-bold'>
        <div className=''>
          <Carousel />
        </div>
        <div className='h-auto w-full overflow-y-auto p-1'>
          {searchTerm && filteredItems.length === 0 ? (
            <p className='flex justify-center max-md:text-2xl   
             text-blue-950 md:text-5xl pt-40 max-lg:h-screen h-96 bg-white '>No matching products found.</p>
          ) : (
            <All1 items={searchTerm ? filteredItems : Products} />
          )}
        </div>
      </div>
    </div>
  );
};

export default All;

