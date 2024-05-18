import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { getFollowing,unfollowUser } from '@/app/utils/getFollow';

interface FollowingUser {
  id: number;
  followerId: number;
  followingId: number;
  User: {
    id: number;
    firstName: string;
    lastName: string;
    profile: {
      photoUrl: string;
    };
  };
}

const Following = () => {
  const [following, setFollowing] = useState<FollowingUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await getFollowing(parseInt(localStorage.getItem('userId') || '0'));
        setFollowing(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching following:', error);
      }
    };

    fetchFollowing();
  }, []);

  const handleUnfollow = async (followerId: number, followingId: number) => {
    try {
      await unfollowUser(followerId, followingId);
      const updatedFollowing = following.filter((user) => user.id !== followingId);
      setFollowing(updatedFollowing);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
    <div className="flex justify-center flex-col pt-2 w-full font-bold border-4 border-blue-950">
      <h1 className="flex justify-center mb-2 text-5xl text-blue-950 font-bold max-md:text-2xl">
        You are following ({following.length}) users
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
              {loading ? (
                <p>Loading...</p>
              ) : following.length === 0 ? (
                <p>No following yet</p>
              ) : (
                following.map((user) => (
                  <div key={user.id} className="flex items-center mb-3">
                    {user.User.profile.photoUrl ? (
                      <img
                        src={user.User.profile.photoUrl}
                        alt={`${user.User.firstName} ${user.User.lastName}`}
                        className="w-12 h-12 rounded-full mr-3"
                      />
                    ) : (
                      <FaUser className="w-12 h-12 rounded-full mr-3" />
                    )}
                    <div>
                      <p>{`${user.User.firstName} ${user.User.lastName}`}</p>
                      <button
                        onClick={() => handleUnfollow(user.followerId, user.followingId)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Unfollow
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Following;


