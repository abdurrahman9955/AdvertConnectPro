import React, { useEffect, useState } from 'react';
import { getFollowing, unfollowUser } from '@/app/utils/followers';
import { FaRegUserCircle } from "react-icons/fa";

interface Following {
  id: number;
  userId: number;
  followerId: number;
  followingId: number;
  FollowingProfile: {
    User: {
      id: number;
      firstName: string;
      lastName: string;
      profile?: {
        photoUrl: string;
      };
    };
  };
}

const FollowingList: React.FC = () => {
  const [following, setFollowing] = useState<Following[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFollowing, setIsFollowing] = useState(false);


  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const followingData = await getFollowing();
        console.log('Following data:', followingData);
        if (followingData.success && followingData.following) {
          //@ts-ignore
          setFollowing(followingData.following);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching following:', error);
      }
    };

    fetchFollowing();
  }, []);

  const handleUnfollowUser = async (userId: number) => {
    try {
      await unfollowUser(userId.toString());
      setIsFollowing(true);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  if (loading) {
    return <div className='text-2xl'>Loading following...</div>;
  }

  if (following.length === 0) {
    return <div className='text-2xl'>Not following anyone.</div>;
  }

  return (
    <div className=" text-xl">

      {following.map(user => {
        console.log('Current user:', user);
        console.log('User profile:', user.FollowingProfile.User.profile);
  return (
    <div key={user.id} className="flex flex-row mb-4 justify-between">
      <div className="flex items-center mb-2">
        {user.FollowingProfile.User.profile && user.FollowingProfile.User.profile.photoUrl ? (
          <img
            src={user.FollowingProfile.User.profile.photoUrl}
            alt={`${user.FollowingProfile.User.firstName} ${user.FollowingProfile.User.lastName}`}
            className="w-10 h-10 max-sm:w-10 max-sm:h-10 rounded-full mr-2"
          />
        ) : (
          <FaRegUserCircle className="w-10 h-10 max-sm:w-10 max-sm:h-10 rounded-full 
          mr-2 text-blue-900" />
       )}
        <div className='sm:border-2 border-blue-900 py-1 text-blue-900 
        px-5 rounded-lg 
        max-sm:px-2 '>
          <p className="font-bold text-lg max-sm:text-sm">
            {user.FollowingProfile.User.firstName} {user.FollowingProfile.User.lastName}
          </p> 
        </div>
      </div>

         {isFollowing ? (
          <button
            className="text-slate-50 hover:underline  px-10 max-sm:h-10 h-10 max-sm:px-2 
            bg-red-700 ml-5 rounded text-sm md:text-lg" 
            onClick={() => handleUnfollowUser(user.FollowingProfile.User.id)} >
            removed
          </button>

          ) : (

          <button
            className="text-slate-50 hover:underline  px-10 max-sm:h-10 h-10 max-sm:px-2 
             bg-red-700 ml-5 rounded text-sm md:text-lg" 
            onClick={() => handleUnfollowUser(user.FollowingProfile.User.id)} >
            Unfollow
          </button>
         )} 

      </div>
     );
    })}
    </div>
  );
};

export default FollowingList;
