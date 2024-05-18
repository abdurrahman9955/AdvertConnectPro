'use client'
import Link from "next/link"
import React, { useState, useEffect } from 'react'
import { FaUser } from "react-icons/fa"
import Live from "./Banner"
import Post from "./Post"
import Videos from "./Videos"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from 'react-redux';
import { getFollowers, followUser, unfollowUser } from "@/app/utils/followers"
import { getFollowing, startFollowing, stopFollowing } from "@/app/utils/following";
import { getUserById } from "@/app/utils/userId"
import { uploadProfileImage } from '@/app/utils/profile'; 
import { setUserData } from "@/app/app/userActions"
import { getUserByToken } from "@/app/utils/userToken"




const Header = () => {

  const router = useRouter();

  const initialRoute = localStorage.getItem('selectedRoute') || 'Videos'
  const [selectedRoute, setSelectedRoute] = useState<string>(initialRoute);
  const dispatch = useDispatch();

  const userName = useSelector((state:any) => state.userName);
 // const fullName = `${userName.firstName} ${userName.lastName}`;

  const user = useSelector((state:any) => state.user); 
  const authToken = useSelector((state: any ) => state.auth.token);

  const userId = user ? user.id : null; 

  const [followersCount, setFollowersCount] = useState<number>(0);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const [profilePhoto, setProfilePhoto] = useState(null);


  
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        
        if (!user) {
          router.push('/Sign_In');
        }

        const response = await getFollowers(userId);
        
        if (response.followers) { 
          setFollowersCount(response.followers.length);
          setIsFollowing(response.followers.some((follower: any) => follower.User.id === userId));
        } else {
          console.error('Error fetching followers: Followers array is undefined');
        }
      } catch (error: any) {
        console.error('Error fetching followers:', error.message);
      }
    };
  
    fetchFollowers();
  }, [userId]);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        
        if (!user) {
          router.push('/Sign_In');
        }

        const response = await getFollowing(userId);
  
        if (response.following) {
          setFollowingCount(response.following.length);
          setIsFollow(response.following.some((following: any) => following.User.id === userId));
        } else {
          console.error('Error fetching following: Following array is undefined');
        }
      } catch (error: any) {
        console.error('Error fetching following:', error.message);
      }
    };
  
    fetchFollowing();
  }, [userId]);
  
  

  const handleFollowButtonClick = async () => {
    try {
       
      if (!user) {
        router.push('/Sign_in');
      }
      
      if (isFollowing) {
        await unfollowUser(userId);
        setFollowersCount((prevCount) => prevCount - 1);
      } else {
        await followUser(userId);
        setFollowersCount((prevCount) => prevCount + 1);
      }
      setIsFollowing((prevIsFollowing) => !prevIsFollowing);
    } catch (error:any) {
      console.error('Error handling follow/unfollow:', error.message);
    }
  };

  const handleFollowingButtonClick = async () => {
    try {
      
      if (!user) {
        router.push('/Sign_In');
      }

      if (isFollowing) {
        await stopFollowing(userId);
        setFollowingCount((prevCount) => prevCount - 1);
      } else {
        await startFollowing(userId);
        setFollowingCount((prevCount) => prevCount + 1);
      }
      setIsFollowing((prevIsFollowing) => !prevIsFollowing);
    } catch (error: any) {
      console.error('Error handling follow/unfollow:', error.message);
    }
  };

 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserById(userId);
  
        if (userData?.success && userData.data) {
          const userFirstName = userData.data.firstName || 'Guest';
          const userLastName = userData.data.lastName || '';
         
        } else {
          console.error('Error fetching user data:', userData?.error || 'Unknown error');
        }
      } catch (error: any) {
        console.error('Error fetching user data:', error.message);
      }
    };
  
    fetchUserData();
  }, [userId, ]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserByToken(authToken); 
        //@ts-ignore
        dispatch(setUserData(user)); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  const handleProfilePhotoChange = (event:any) => {
    const file = event.target.files[0];
    setProfilePhoto(file);
  };

  const handleUploadProfilePhoto = async () => {
    try {
     
      if (userId && profilePhoto && authToken) {
        const response = await uploadProfileImage(userId, profilePhoto);
        console.log(response);
        
      } else {
        console.error('No profile photo selected');
      }
    } catch (error:any) {
      console.error('Error uploading profile photo:', error.message);
    }
  };

  

  return (
    
    <div className="flex justify-center flex-wrap   md:border-4 border-blue-950 
      md:pt-10 max-md:pt-0  ">
        
         <div className="flex  flex-col  
       max-md:w-5/6 max-sm:w-full  m-0 max-lg:w-4/6  lg:w-3/6 xl:w-2/6">

        <div className="border-4 border-blue-950 bg-white ">
         <h1 className="flex justify-center text-5xl text-blue-950 font-bold
          pt-5 max-sm:text-xl">
        My profile
      </h1>

 <div className="flex justify-center">
  <div className="w-80 h-80 mt-10 border-4 border-blue-950 bg-teal-200 rounded-full relative">
    {user && user.photoUrl ? (
      <Image src={user.photoUrl} alt="Profile" 
      width={500}
      height={500}
      className="w-full h-full object-cover rounded-full" />
    ) : (
      <FaUser className="flex justify-center w-32 h-32 ml-24 mt-16" />
    )}
    <label htmlFor="profilePhotoInput" 
    className="flex justify-center mt-32 bottom-2 left-2 text-blue-950 text-xl font-bold cursor-pointer">
      Upload Photo
    </label>
    <input
      id="profilePhotoInput"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleProfilePhotoChange}
    />
    {profilePhoto && (
      <Image src={URL.createObjectURL(profilePhoto)} alt="Selected Profile"
       width={400}
       height={400}
       className="w-full h-full object-cover rounded-full absolute inset-0" />
    )}
    <button
      type="button"
      onClick={handleUploadProfilePhoto}
      className="absolute bottom-2 right-2 "
    >
     
    </button>
   </div>
  </div>
      
        <h1 className="flex justify-center text-3xl text-blue-950 mb-10 mt-2 
         font-bold  max-sm:text-3xl">{userName}</h1></div>


        <div className="flex flex-row justify-between   ml-5 mb-5 md:ml-6
         md:gap-4 md:mr-5">
         
         <Link href={{pathname:'/Post'}}>
         <button type="button" className="text-xl  w-24  py-2 mt-5
         rounded shadow-lg max-sm:px-4 hover:bg-teal-200 border-4 border-blue-950
         font-bold text-blue-950 bg-white">Product
         </button></Link>

        
         <button type="button" className="text-xl  w-auto p-2 mt-5
         rounded shadow-lg hover:bg-teal-200 border-4 border-blue-950 
         font-bold text-blue-950 bg-white " 
         onClick={handleFollowingButtonClick}
         >{isFollow ? 'Unfollow' : 'Following'}
         </button>

       
         <button type="button" className="text-xl  w-auto p-2 mt-5
         rounded shadow-lg hover:bg-teal-200 max-lg:mr-3 border-4 border-blue-950
         font-bold text-blue-950 bg-white"
         onClick={handleFollowButtonClick}
         > {isFollowing ? 'Unfollow' : 'Followers'}
         </button>
         </div>

        

         <div className="flex flex-row justify-between   ml-5 mb-5 md:ml-6
         md:gap-4 md:mr-5">
         
         <button type="button" className="text-xl text-blue-950 bg-white px-10 py-2 mt-5
         rounded  max-sm:px-4 hover:bg-teal-100 border-2 border-blue-950
         font-bold ml-2  shadow-xl">0
         </button>
        
         <button type="button" className="text-xl  text-blue-950 bg-white px-5 py-2 mt-5
         rounded  hover:bg-teal-100 border-2 border-blue-950 
         font-bold ml-3 shadow-xl"
         onClick={() => router.push('/Following')}
         >{followingCount}
         </button>

         
         <button type="button" className="text-xl  text-blue-950 bg-white px-10 py-2 mt-5
         rounded hover:bg-teal-100 max-lg:mr-3 border-2 border-blue-950
         font-bold shadow-xl "
         onClick={() => router.push('/Followers')}
         > {followersCount}
         </button>

         </div>

         <div className="flex flex-row justify-between   ml-5 mb-5 md:ml-6
         md:gap-4 md:mr-5 font-bold">
        
        <Link href={{pathname:'/Friends'}}>
         <button type="button" className="text-xl text-blue-950 bg-white px-10 py-2 mt-5
         rounded shadow-lg max-sm:px-4 hover:bg-teal-200 border-4 border-blue-950 ">Friends
         </button></Link>
        
        <Link href={{pathname:'/Upload'}}>
         <button type="button" className="text-xl text-blue-950 bg-white px-4 py-2 mt-5
         rounded shadow-lg hover:bg-teal-200 border-4 border-blue-950  ">Upload 
         </button></Link>

         <Link href={{pathname:'/Order'}}>
         <button type="button" className="text-xl text-blue-950 bg-white px-4 py-2 mt-5
         rounded shadow-lg hover:bg-teal-200 max-lg:mr-3 border-4 border-blue-950">Order
         </button></Link>

         </div>

         <div className="flex flex-row justify-between   ml-5 mb-5 md:ml-6
         md:gap-4 md:mr-5 font-bold">

         <Link href={{pathname:'/Settings'}}>
         <button type="button" className="text-xl text-blue-950 bg-white px-10 py-2 mt-5
         rounded shadow-lg max-sm:px-4 hover:bg-teal-200 border-4 border-blue-950">Settings
         </button></Link>

         <Link href={{pathname:'/Favorite'}}> 
         <button type="button" className="text-xl text-blue-950 bg-white px-4 py-2 mt-5
         rounded shadow-lg hover:bg-teal-200  border-4 border-blue-950">Favorite
         </button></Link>

         <Link href={{pathname:'/Notification'}}>
         <button type="button" className="text-xl text-blue-950 bg-white px-4 py-2 mt-5
         rounded shadow-lg hover:bg-teal-200 
         max-lg:mr-3 border-4 border-blue-950">Note 
         </button></Link>
         </div>

      </div>

      <div className='flex flex-col md:w-5/6 lg:w-3/4 max-md:w-full m-1  bg-white md:border-8 
      md:border-blue-950 h-auto md:mb-10 font-bold max-md:border-4 max-md:border-blue-950
       max-md:hidden'>

         <div className='   w-full  h-auto'>
          <h1 className='flex justify-center gap-4 md:border-b-4 overflow-x-auto
           md:border-blue-950  text-xl font-bold pb-2 
          '> 
        

          <button onClick={() => setSelectedRoute('Videos')} type='button'
           className=' text-white  w-auto px-3 h-10  mt-2 
          rounded-xl bg-teal-700 hover:bg-blue-700  shadow-lg
          '>Product </button>

          <button  onClick={() => setSelectedRoute('Live')} type='button'
           className=' text-white  w-auto px-3 h-10  mt-2 
          rounded-xl bg-teal-700 hover:bg-blue-700   shadow-lg
          '>Order </button>


          <button  onClick={() => setSelectedRoute('Post')} type='button'
           className=' text-white  w-auto p-2 h-10  mt-2 
          rounded-xl bg-teal-700 hover:bg-blue-700  px-3 shadow-lg
          '>Favorite  </button>
            
          </h1>
        
          <div className='h-auto overflow-y-auto  m-2 p-2 border-4 border-blue-950  '>
          
           {selectedRoute === 'Videos' && <Videos />}
           {selectedRoute === 'Live' && <Live />}
           {selectedRoute === 'Post' && <Post />}
          
          
          
           </div>
                
         </div>
         </div>

      </div>
           
  )
}

export default Header


