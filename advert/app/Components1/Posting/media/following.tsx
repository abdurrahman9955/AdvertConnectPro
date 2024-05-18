'use client'
import React, { useState, useEffect } from 'react';
import { getFollowingCount } from '@/app/utils/followers'; 

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
                <div className='flex flex-row py-3 gap-1 mt-3 pl-1 '>
                <button className="bg-blue-950   text-lg
                  text-white px-4 py-1 mt-1 rounded">
                  following
                 </button>
                </div>

                 <button className="bg-blue-950 hover:bg-green-950 ml-10  text-lg
                  text-white px-4 py-1 mt-1 rounded-full">
                   {followersCount}
                 </button>

           </div>
  )
}

export default Following

