import React, { useState, useEffect } from 'react';
import { getFollowing } from '@/app/utils/getFollow';

const Header = () => {
  const [followingCount, setFollowingCount] = useState<number>(0);

  useEffect(() => {
    const fetchFollowingCount = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found');
        }
        
        const followingList = await getFollowing(parseInt(userId));
        if (Array.isArray(followingList)) {
          setFollowingCount(followingList.length);
        } else {
          throw new Error('Invalid following data format');
        }
      } catch (error) {
        console.error('Error fetching following count:', error);
      }
    };

    fetchFollowingCount();
  }, []);

  return (
    <div className="flex justify-center flex-wrap md:border-4 border-blue-950 md:pt-10 max-md:pt-0">
      <div className="flex flex-col max-md:w-5/6 max-sm:w-full m-0 max-lg:w-4/6 lg:w-3/6 xl:w-2/6">
        <div className="flex flex-row justify-between ml-5 mb-5 md:ml-6 md:gap-4 md:mr-5">
          <button
            type="button"
            className="text-xl w-auto p-2 mt-5 rounded shadow-lg hover:bg-teal-200 border-4 border-blue-950 font-bold text-blue-950 bg-white"
          >
            Following
          </button>
        </div>

        <div className="flex flex-row justify-between ml-5 mb-5 md:ml-6 md:gap-4 md:mr-5">
          <button
            type="button"
            className="text-xl text-blue-950 bg-white px-10 py-2 mt-5 rounded hover:bg-teal-100 max-lg:mr-3 border-2 border-blue-950 font-bold shadow-xl"
          >
            {followingCount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

