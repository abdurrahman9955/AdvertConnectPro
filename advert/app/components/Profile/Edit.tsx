import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { getFollowers, followBackUser } from '@/app/utils/getFollowers'; 

interface Follower {
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


const Followers = () => {
  const [followers, setFollowers] = useState<Follower[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await getFollowers(parseInt(localStorage.getItem('userId') || '0')); 
        setFollowers(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    fetchFollowers();
  }, []);

  const handleFollowBack = async (followerId: number, followingId: number) => {
    try {
      await followBackUser(followerId, followingId);
      const updatedFollowers = followers.filter((follower) => follower.id !== followerId);
      setFollowers(updatedFollowers);
    } catch (error) {
      console.error('Error following back user:', error);
    }
  };

  return (
    <div className="flex justify-center flex-col pt-2 w-full font-bold border-4 border-blue-950">
      <h1 className="flex justify-center mb-2 text-5xl text-blue-950 font-bold max-md:text-2xl">
        You now have ({followers.length}) followers
      </h1>
      <div className="flex justify-center">
        <div className="flex flex-col lg:w-2/4 md:mb-10 max-lg:w-3/4 font-bold border-8 border-blue-950 pt-5 max-md:w-full m-1 md:text-xl">
          <div className="flex justify-between w-full px-2 border-slate-950 gap-4">
            <div className="shadow-lg w-full bg-blue-950 border-2 h-10 border-slate-950 rounded flex-initial">
              <h1 className="flex justify-center font-bold text-white mt-1 text-2xl">Followers</h1>
            </div>
          </div>
          <div className="w-full mt-2 border-4 border-blue-950"></div>
          <div className="flex flex-row h-screen overflow-y-auto bg-white p-3">
            <div className="w-full gap-4">
              {loading ? (
                <p>Loading...</p>
              ) : followers.length === 0 ? (
                <p>No followers yet</p>
              ) : (
                followers.map((follower) => (
                  <div key={follower.id} className="flex items-center mb-3">
                    {follower.User.profile.photoUrl ? (
                      <img
                        src={follower.User.profile.photoUrl}
                        alt={`${follower.User.firstName} ${follower.User.lastName}`}
                        className="w-12 h-12 rounded-full mr-3"
                      />
                    ) : (
                      <FaUser className="w-12 h-12 rounded-full mr-3" />
                    )}
                    <div>
                      <p>{`${follower.User.firstName} ${follower.User.lastName}`}</p>
                      <button
                        onClick={() => handleFollowBack(follower.id, parseInt(localStorage.getItem('userId') || '0'))}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Follow Back
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

export default Followers;
