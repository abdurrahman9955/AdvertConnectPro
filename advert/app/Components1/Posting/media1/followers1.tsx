'use client'
import { useState, useEffect } from 'react';
import { followUser, unfollowUser, getFollowersCount } from '@/app/utils/followers'; 
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface UserProps {
  userId: string; 
}

const FollowUser1: React.FC<UserProps> = ({ userId }) => {

    const router = useRouter();

    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFollowersCount(userId);
                console.log('followers', response);
                
                if (response.success && response.followers) {
                    const authenticatedUserId = localStorage.getItem('userId');
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

              <div className='flex flex-row py-3 gap-1 mt-5 max-sm:mt-6  pl-1'>
                 
                 {isFollowing ? ( <button onClick={handleUnfollow}
                  className="bg-blue-950 text-lg text-white px-4 py-1  rounded">
                  Unfollow </button> ) : (

                  <button onClick={handleFollow}
                  className="bg-blue-950 text-lg  text-white px-4 py-1  rounded">
                  Follow </button> )} 

              </div> 

              <button className="bg-blue-950
                  hover:bg-green-950 ml-5  text-lg
                  text-white px-4 py-1  rounded-full">
                    <p>{followersCount}</p>
              </button>

            </div>
  )}

export default FollowUser1

