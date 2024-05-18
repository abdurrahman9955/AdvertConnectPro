'use client'
import React, { useState, useEffect } from 'react';
import { getFollowing } from '@/app/utils/followers';
import FollowingList from './getFollowing'; 
import { useRouter } from 'next/navigation';

const Following = () => {

  const router = useRouter();
 
  const [followingCount, setFollowingCount] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/Sign_In');
    } 
  }, [router]);

  useEffect(() => {
    const fetchFollowingCount = async () => {
      try {
     
        const response = await getFollowing();
        if (response.success && response.following) {
          
          setFollowingCount(response.following.length);
        }
      } catch (error) {
        console.error('Error fetching following count:', error);
      }
    };

    fetchFollowingCount();
  }, []);
  

  return (
    <div className="flex justify-center flex-col pt-2 w-full font-bold border-4 border-blue-950">
      <h1 className="flex justify-center mb-2 text-4xl text-blue-950 font-bold max-md:text-2xl">
        You are following ({followingCount}) {followingCount === 1 ? 'user' : 'users'}
      </h1>
      <div className="flex justify-center">
        <div className="flex flex-col lg:w-2/4 md:mb-10 max-lg:w-3/4 font-bold border-8 border-blue-950 pt-5 max-md:w-full m-1 md:text-xl">
          <div className="flex justify-between w-full px-2 border-slate-950 gap-4">
            <div className="shadow-lg w-full bg-blue-950 border-2 h-10 border-slate-950 rounded flex-initial">
              <h1 className="flex justify-center font-bold text-white mt-1 text-2xl">Following</h1>
            </div>
          </div>
          <div className="w-full mt-2 border-4 border-blue-950"></div>
          <div className="flex flex-row h-screen overflow-y-auto bg-white p-3">
            <div className="w-full gap-4">

            <FollowingList />
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Following;


