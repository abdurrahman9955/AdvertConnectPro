'use client'
import React, { useState, useEffect } from 'react';
import FollowersList from './getFollowers'; 
import { getFollowers } from '@/app/utils/followers';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


const Followers = () => {

  const router = useRouter();

  const [followersCount, setFollowersCount] = useState<number>(0);

  useEffect(() => {
   
      const token = Cookies.get('accessToken');
      if (!token) {
        router.push('/Sign_In');
      }
    
  }, [router]);

  
  useEffect(() => {
    const fetchFollowersCount = async () => {
      try {
       
        const response = await getFollowers();
        if (response.success && response.followers) {
          setFollowersCount(response.followers.length);
        }
      } catch (error) {
        console.error('Error fetching followers count:', error);
      }
    };

    fetchFollowersCount();
  }, []);
  

  return (
    <div className="flex justify-center flex-col pt-2 w-full font-bold 
     border-4 border-blue-950">
      <h1 className="flex justify-center mb-2 text-2xl text-blue-950 
      font-bold max-md:text-xl">
      You have ({followersCount}) {followersCount === 1 ? 'follower' : 'followers'}
      </h1>
      <div className="flex justify-center">
        <div className="flex flex-col lg:w-2/4 md:mb-10 max-lg:w-3/4 font-bold 
        border-4 border-blue-950 pt-2 max-md:w-full m-1 md:text-xl">
          <div className="flex justify-between w-full px-2 border-slate-950 gap-4">
            <div className="shadow-lg w-full bg-blue-950
             h-7  max-sm:h-6 rounded flex-initial">
              <h1 className="flex justify-center font-bold
               text-white mt-1 text-sm">Followers</h1>
            </div>
          </div>
          <div className="w-full mt-2 border-4 border-blue-950"></div>
          <div className="flex flex-row h-screen overflow-y-auto bg-white p-3">
            <div className="w-full gap-4">
            
            <FollowersList />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Followers;
