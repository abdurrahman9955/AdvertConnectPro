'use client'
import React, { useState, useEffect } from 'react';
import { getFollowingCount } from '@/app/utils/followers'; 
import Cookies from 'js-cookie';

interface UserProps {
  userId: string; 
}

const Following1: React.FC<UserProps> = ({ userId }) => {
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const fetchFollowersCount = async () => {
      try {
        const response = await getFollowingCount(userId);
        setFollowersCount(response.following.length );
      } catch (error) {
        console.error('Error fetching followers count:', error);
      }
    };

    fetchFollowersCount();
  }, [userId]);

     return (
           <div className=''>
                <div className='flex flex-row py-2 gap-1 mt-3 pl-1 '>
                <button className="bg-blue-950   text-sm
                  text-white px-4 h-7 max-sm:h-6 mt-1 rounded">
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

export default Following1

