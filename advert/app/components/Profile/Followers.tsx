import React, { useState, useEffect } from 'react';
import { followUser, unfollowUser, getFollowers } from "@/app/utils/followers";
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [followersCount, setFollowersCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found');
        }
        
        const response = await getFollowers(parseInt(userId));
        if (response.success && Array.isArray(response.followers)) {
          setFollowersCount(response.followers.length);
          setIsFollowing(response.followers.length > 0);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleFollow = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found');
      }
      
      await followUser(parseInt(userId));
      setIsFollowing(true);
      setFollowersCount(prevCount => prevCount + 1);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found');
      }

      const confirmUnfollow = window.confirm('Are you sure you want to unfollow?');
      if (!confirmUnfollow) {
        return; 
      }

      await unfollowUser(parseInt(userId));
      setIsFollowing(false);
      setFollowersCount(prevCount => prevCount - 1);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center flex-wrap md:border-4 border-blue-950 md:pt-10 max-md:pt-0">
      <div className="flex flex-col max-md:w-5/6 max-sm:w-full m-0 max-lg:w-4/6 lg:w-3/6 xl:w-2/6">
        <div className="flex flex-row justify-between ml-5 mb-5 md:ml-6 md:gap-4 md:mr-5">
          <button type="button" className="text-xl w-auto p-2 mt-5 rounded shadow-lg hover:bg-teal-200 border-4 border-blue-950 font-bold text-blue-950 bg-white">
            Following
          </button>

          {isFollowing ? (
            <button type="button" onClick={handleUnfollow} className="text-xl w-auto p-2 mt-5 rounded shadow-lg hover:bg-teal-200 max-lg:mr-3 border-4 border-blue-950 font-bold text-blue-950 bg-white">
              Unfollow
            </button>
          ) : (
            <button type="button" onClick={handleFollow} className="text-xl w-auto p-2 mt-5 rounded shadow-lg hover:bg-teal-200 max-lg:mr-3 border-4 border-blue-950 font-bold text-blue-950 bg-white">
              Follow
            </button>
          )}
          
          <button type="button" className="text-xl w-auto p-2 mt-5 rounded shadow-lg hover:bg-teal-200 max-lg:mr-3 border-4 border-blue-950 font-bold text-blue-950 bg-white">
            Followers: {followersCount}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

