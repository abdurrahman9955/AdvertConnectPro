'use client'
import { useState, useEffect } from 'react';
import { followUser, unfollowUser, getFollowersCount } from '@/app/utils/followers'; 
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { GrStatusGood } from "react-icons/gr";

interface UserProps {
  userId: string; 
}

const FollowUser2: React.FC<UserProps> = ({ userId }) => {

    const router = useRouter();

    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFollowersCount(userId);
                console.log('followers', response);
                
                if (response.success && response.followers) {
                    const authenticatedUserId = Cookies.get('userId');
                    const isFollowingUser = response.followers.some(follower => follower.followerId.toString() === authenticatedUserId);
                    setIsFollowing(isFollowingUser);
                    setFollowersCount(response.followers.length);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
   
        fetchData();
    }, [userId]);

  const handleFollow = async () => {
      try {

        const token = Cookies.get('accessToken');
      if (!token) {
        router.push('/Sign_In');
        return;
      }

          await followUser(userId);
          setIsFollowing(true);
          setFollowersCount((prevCount) => prevCount + 1);
      } catch (error) {
          console.error('Error following user:', error);
      }
  };

  const handleUnfollow = async () => {
      try {

        const token = Cookies.get('accessToken');
      if (!token) {
        router.push('/Sign_In');
        return;
      }

          await unfollowUser(userId);
          setIsFollowing(false);
          setFollowersCount((prevCount) => prevCount - 1);
      } catch (error) {
          console.error('Error unfollowing user:', error);
      }
  };

   return (
           <div className=''>

              <div className='flex flex-row py-2 gap-1 mt-3 max-sm:mt-2  pl-1'>
                 
                 {isFollowing ? ( <button onClick={handleUnfollow}
                  className="flex flex-row bg-blue-950 text-sm text-white px-2 h-7 max-sm:h-6 max-sm:px-2 
                  sm:pt-1 rounded">
                   Followed <GrStatusGood size={18} className='text-green-800
                  rounded-full bg-white ml-1 mt-0.5'/> </button> ) : (

                  <button onClick={handleFollow}
                  className="bg-blue-950 text-sm  text-white px-4 h-7 max-sm:h-6  rounded">
                  Follow </button> )} 

              </div> 

              <button className="bg-blue-950
                  hover:bg-green-950 ml-5 mt-1 text-sm
                  text-white px-4 py-1  rounded-full">
                    <p>{followersCount}</p>
              </button>

            </div>
  )}

export default FollowUser2

