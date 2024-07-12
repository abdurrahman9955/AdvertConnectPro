import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';;
import { updateFilter27, resetFilter27  } from '@/app/app/filters/filter27'; 
import { RootState } from '@/app/app/store';
import Cookies from 'js-cookie';


const Recipe3 = () => {

  const dispatch = useDispatch();

  const filterState = useSelector((state: RootState) => state.filter);
  const [showResetButton, setShowResetButton] = useState<boolean>(false);
  const [filter, setFilter] = useState({...filterState, });

  useEffect(() => {
    setFilter(filterState);
  }, [filterState]);

  useEffect(() => {
    const storedFilter = Cookies.get('filter27');
    if (storedFilter) {
      const parsedFilter = JSON.parse(storedFilter);
      setFilter(parsedFilter);
      const isFilterModified = Object.keys(parsedFilter).some(
        (key) => parsedFilter[key as keyof typeof parsedFilter] !== ''
      );
      setShowResetButton(isFilterModified);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    const parsedFilter = {
      ...filter,
    };
    dispatch(updateFilter27(parsedFilter));
    Cookies.set('filter27', JSON.stringify(parsedFilter), { expires: 1, path: '/' });
    setShowResetButton(true); 
  };


  const handleReset = () => {
    dispatch(resetFilter27()); 
    Cookies.remove('filter27', { path: '/' }); 
    setFilter({
      city: '',
      country: '',
      state: '',
      fullAddress: '',
      minPrice: '',
      maxPrice: '',
      company: '',
      name: '',
      types: '',
      categories: '',
    });
    setShowResetButton(false);
  };
  
  return (
   
    <div className='flex justify-center  font-bold 
           border-2 border-black  bg-cyan-400'>
      
        <div className='flex flex-col  w-full m-2 border-2
             border-black  h-auto  font-bold'>
 
          <div className=' w-full  h-auto '>
              <div className='flex flex-col h-screen gap-4 overflow-y-auto  p-2'>
              
             <div className='flex justify-center mt-10'>
              <h1 className='text-xl text-blue-950 '>Search By Location</h1>
              </div>
              
              <div className='flex justify-center mt-5 gap-4'>
                <input type='text' 
                className='h-8 border-2 border-indigo-950 bg-white
                pl-5 text-sm max-sm:w-40' 
                placeholder='country'
                name='country'
                value={filter.country}
                onChange={handleChange}/>

                <input type='text' 
                className='h-8 border-2 border-indigo-950 bg-white
                pl-5 text-sm max-sm:w-40' 
                placeholder='State'
                name='state'
                value={filter.state}
                onChange={handleChange}
                />
              </div>

              <div className='flex justify-center mt-5 gap-4'>
                <input type='text' 
                className='h-8 border-2 border-indigo-950 bg-white
                pl-5 text-sm max-sm:w-40' 
                placeholder='city'
                name='province'
                value={filter.city}
                onChange={handleChange}
                />

                <input type='text' 
                className='h-8 border-2 border-indigo-950 bg-white
                pl-5 text-sm max-sm:w-40' 
                placeholder='Address'
                name='fullAddress'
                value={filter.fullAddress}
                onChange={handleChange}
                />
              </div>

              <div className='flex justify-center '>
              <h1 className='text-xl text-blue-950 '>Search By Price</h1>
              </div>
              
              <div className='flex justify-center mt-5 gap-4'>
                <input type='text' 
                className='h-8 border-2 border-indigo-950 bg-white
                pl-5 text-sm max-sm:w-40' 
                placeholder='min price'
                name='minPrice'
                value={filter.minPrice}
                onChange={handleChange}/>

                <input type='text' 
                className='h-8 border-2 border-indigo-950 bg-white
                pl-5 text-sm max-sm:w-40' 
                placeholder='max price'
                name='maxPrice'
                value={filter.maxPrice}
                onChange={handleChange}/>
              </div>


              <div className='flex justify-center mt-0'>
              <h1 className='text-xl text-blue-950 '>Other Search</h1>
              </div>

              <div className='flex justify-center mt-5 gap-4'>
                <input type='text' 
                className='h-8 border-2 border-indigo-950 bg-white
                pl-5 text-sm max-sm:w-40' 
                placeholder='types'
                name='types'
                value={filter.types}
                onChange={handleChange}/>

                <input type='text' 
                className='h-8 border-2 border-indigo-950 bg-white
                pl-5 text-sm max-sm:w-40' 
                placeholder='category'
                name='categories'
                value={filter.categories}
                onChange={handleChange}
                />
              </div>

              <div className='flex justify-center mt-5 gap-4'>
                <input type='text' 
                className='h-8 border-2 border-indigo-950 bg-white
                pl-5 text-sm max-sm:w-40' 
                placeholder='Company'
                name='company'
                value={filter.company}
                onChange={handleChange}/>

                <input type='text' 
                className='h-8 border-2 border-indigo-950 bg-white
                pl-5 text-sm max-sm:w-40' 
                placeholder='Product'
                name='name'
                value={filter.name}
                onChange={handleChange}/>
              </div>

           <div className='flex justify-center mt-5 gap-4'>
            {showResetButton ? (
              <button
                className='text-slate-50 bg-blue-900 lg:w-1/4 
                max-lg:w-2/5 max-sm:w-3/5 h-7 rounded-sm mb-10
                 hover:bg-purple-950 max-sm:4/5 mt-2'
                onClick={handleReset}
              >
                Reset
              </button>
            ) : (
              <button
                type='submit'
                className='text-slate-50 bg-blue-950 lg:w-1/4 
                max-lg:w-2/5 max-sm:w-3/5 h-7 rounded-sm mb-10
                 hover:bg-purple-950 max-sm:4/5 mt-2'
                onClick={handleSubmit}
              >
                Apply
              </button> )}
             </div>

           </div>      
         </div>
        </div>
         
    </div>
  )
}

export default Recipe3;

