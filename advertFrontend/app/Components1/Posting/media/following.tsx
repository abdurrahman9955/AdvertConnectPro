'use client'
import React, { useState, useEffect } from 'react';
import { getFollowingCount } from '@/app/utils/followers'; 
import Cookies from 'js-cookie';

interface UserProps {
  userId: string; 
}


const Following: React.FC<UserProps> = ({ userId }) => {
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const fetchFollowersCount = async () => {
      try {
        const response = await getFollowingCount(userId);
        console.log('following details', response);
        setFollowersCount(response.following.length);
      } catch (error) {
        console.error('Error fetching followers count:', error);
      }
    };

    fetchFollowersCount();
  }, [userId]);

     return (
           <div className=''>
                <div className='flex flex-row py-2 gap-1 mt-2 pl-1 '>
                <button className="bg-blue-950  max-sm:px-2 text-sm max-sm:h-6
                  text-white px-4 h-7 mt-1 rounded">
                  following
                 </button>
                </div>

                 <button className="bg-blue-950 hover:bg-green-950 ml-7  text-sm
                  text-white px-4 py-1 mt-1 rounded-full">
                   {followersCount}
                 </button>

           </div>
  )
}

export default Following

