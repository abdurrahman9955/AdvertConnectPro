import React, { useEffect, useState } from 'react';
import { getFollowers, followUser, unfollowUser  } from '@/app/utils/followers';
import { FaRegUserCircle } from "react-icons/fa";
import { getFollowing } from '@/app/utils/followers';

interface Follower {
  id: number;
  userId: number;
  followerId: number;
  followingId: number;
  User: {
    id: number;
    firstName: string;
    lastName: string;
    profile?: {
      photoUrl: string;
    };
  };
  isFollowing: boolean;
}

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

const FollowersList: React.FC = () => {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [following, setFollowing] = useState<Following[]>([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const followersData = await getFollowers();
        console.log('Followers data:', followersData);
        if (followersData.success && followersData.followers) {
          setFollowers(followersData.followers);
        }
        if (followersData.success && followersData.followers) {
          setFollowers(followersData.followers);
         
      }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    fetchFollowers();
  }, []);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const followingData = await getFollowing();
        console.log('Following data:', followingData);
        if (followingData.success && followingData.following) {
          //@ts-ignore
          setFollowing(followingData.following);
        }
        if (followingData.success && followingData.following) {

          const authenticatedUserId = localStorage.getItem('userId');
          const isFollowingUser = followingData.following.some(following => following.followerId.toString() === authenticatedUserId);
          setIsFollowing(isFollowingUser);
          //@ts-ignore
          setFollowing(followingData.following);
          
      }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    fetchFollowing();
  }, []);

  const handleFollowUser = async (userId: number) => {
    try {
      await followUser(userId.toString());
      setIsFollowing(true);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollowUser = async (userId: number) => {
    try {
      await unfollowUser(userId.toString());
      setIsFollowing(false);
      const followersData = await getFollowers();
      if (followersData.success && followersData.followers) {
        setFollowers(followersData.followers);
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  if (loading) {
    return <div className='text-2xl'>Loading followers...</div>;
  }

  if (followers.length === 0) {
    return <div className='text-2xl'>No followers available.</div>;
  }

  return (
    <div className=" text-xl">
      {followers.map(follower => (
        <div key={follower.id} className="flex flex-row mb-4 justify-between">
          <div className="flex items-center mb-2">
            {follower.User.profile?.photoUrl ? (
              <img
                src={follower.User.profile.photoUrl}
                alt={`${follower.User.firstName} ${follower.User.lastName}`}
                className="w-10 h-10 max-sm:w-10 max-sm:h-10 rounded-full mr-2"
              />
            ) : (
              <FaRegUserCircle className="w-10 h-10 max-sm:w-10 max-sm:h-10 rounded-full mr-2 text-blue-900" />
            )}
            <div className='sm:border-2 border-blue-900 py-1
             text-blue-900 px-5 rounded-lg 
              max-sm:px-2 '>
              <p className="font-bold text-lg max-sm:text-sm">
                {follower.User.firstName} {follower.User.lastName}
              </p>
            </div>
          </div>

        {isFollowing ? (

             <button className="text-slate-50 hover:underline  
             px-10 max-sm:h-8 
             h-10 max-sm:px-2 bg-red-700 ml-5 rounded 
             text-sm md:text-lg" 
             onClick={() => handleUnfollowUser(follower.User.id)}>
             Unfollow</button>
          
          ) : (

              <button className="text-slate-50 hover:underline  
              px-10 max-sm:h-10 h-8 max-sm:px-2 
              bg-blue-900 hover:bg-green-900 ml-5 
              rounded text-sm md:text-lg" 
              onClick={() => handleFollowUser(follower.User.id)}>
              FollowBack</button>)} 
        
        </div>
      ))}

    </div>
  );
};

export default FollowersList;
