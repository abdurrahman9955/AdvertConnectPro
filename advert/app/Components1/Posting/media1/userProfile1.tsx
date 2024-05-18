'use client'
import Link from "next/link"
import React, { useState, useEffect,ChangeEvent } from 'react'
import Images1 from "./images1"
import Banner1 from "./banner1"
import Videos1 from "./videos1"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FaRegUserCircle } from "react-icons/fa";
import { getBannerById } from "@/app/utils/banner"
import { followUser, unfollowUser, getFollowersCount } from '@/app/utils/following';
import { getFollowingCount } from '@/app/utils/following'; 

interface Profile {
    photoUrl?: string;
  }
  
  interface User {
    id: number;
    email: string;
    firstName: string;
    lastName:string;
    profile?:  Profile; 
  }
  
  interface ProductImage {
    id: number;
    userId: string;
    mediaType: string;
    mediaUrl: string[];
    product?: string;
    types?: string;
    categories: string;
    phoneNumber?: string;
    phoneCode?: string;
    price?: number;
    currency?: string;
    country?: string;
    state?: string;
    province?: string;
    city?: string;
    fullAddress?: string;
    emailAddress?: string;
    productName?: string;
    companyLink?: string;
    companyName?: string;
    description?: string;
    User?: User; 
  }
  
  interface ImageResponse {
    success: boolean;
    productImages: ProductImage[]; 
  }

  interface UserProps {
    userId: string; 
  }

const UserProfile1: React.FC<UserProps> = ({ userId }) => {

  const router = useRouter();

  const initialRoute = localStorage.getItem('selectedRoute') || 'Images'
  const [selectedRoute, setSelectedRoute] = useState<string>(initialRoute);
  const [productImages, setProductImages] = useState<ProductImage[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    const fetchFollowersCount = async () => {
      try {
        const response = await getFollowingCount();
        setFollowingCount(response.following?.length || 0);
      } catch (error) {
        console.error('Error fetching followers count:', error);
      }
    };

    fetchFollowersCount();
  }, []);

useEffect(() => {
  const fetchData = async () => {
      try {
          const response = await getFollowersCount();
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
}, []);

  const handleFollow = async () => {
      try {

        const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/Sign_In');
        return;
      }
        
          await followUser();
          setIsFollowing(true);
          setFollowersCount((prevCount) => prevCount + 1);
      } catch (error) {
          console.error('Error following user:', error);
      }
  };

  const handleUnfollow = async () => {
      try {

        const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/Sign_In');
        return;
      }

          await unfollowUser();
          setIsFollowing(false);
          setFollowersCount((prevCount) => prevCount - 1);
      } catch (error) {
          console.error('Error unfollowing user:', error);
      }
  };

  useEffect(() => {
    const fetchProductImages = async () => {
      setIsLoading(true);
      try {
        //@ts-ignore
        const response: ImageResponse = await getBannerById();
        console.log('product images response:', response);
        if (response.success) {
          setProductImages(response.productImages); 
        } else {
          console.error('Error fetching product images: Invalid data received');
        }
      } catch (error) {
        console.error('Error fetching product images:', error);
      }finally {
        setIsLoading(false);
      }  };

    fetchProductImages();
  }, []);

  return (
    
    <div className="flex justify-center flex-wrap   md:border-4 border-blue-950  md:pt-10 max-md:pt-0  ">
       <div className="flex  flex-col   max-md:w-5/6 max-sm:w-full  m-0 max-lg:w-4/6  lg:w-3/6 xl:w-2/6">
   
        <div className="border-4 border-blue-950 bg-white">
          <h1 className="flex justify-center text-4xl text-blue-950  font-bold pt-5 
          max-sm:text-2xl"> <p>{productImages[0]?.User?.firstName}'s </p> <p className="ml-2"> profile</p></h1>
        
          <h1 className="flex justify-center text-3xl text-blue-950 mb-10 mt-2 
          font-bold max-sm:text-3xl">

       {productImages.length > 0 && productImages[0].User 
        && productImages[0].User.profile && productImages[0].User.profile.photoUrl ? (
         <div className='flex flex-row py-3 gap-1 text-xl pl-1'>
            <img
              src={productImages[0].User.profile.photoUrl}
              alt={`Profile image of user ${productImages[0].userId}`}
              className='border-4 border-slate-900 rounded-full  w-80 h-80'
            />
          </div>
        ) : (
          <div className='flex flex-row py-3 gap-1 text-xl pl-1'>
            <FaRegUserCircle className=' h-80 w-80' />
          </div>
        )}
          </h1>

          <span className='flex justify-center font-bold gap-4 mb-5 -mt-10 text-2xl flex-row  max-sm:text-xl'>

          <p>{productImages[0]?.User?.firstName}</p>
          <p>{productImages[0]?.User?.lastName}</p>

         </span>

        </div>
  
        <div className="flex flex-row justify-between   ml-5 mb-5 md:ml-6
         md:gap-4 md:mr-5">
         
         <Link href={{pathname:'/Post'}}>
         <button type="button" className="text-xl  w-auto  py-2 mt-5 
         rounded shadow-lg px-4 hover:bg-teal-200 border-4 border-blue-950
         font-bold text-blue-950 bg-white">Products
         </button></Link>

        
         <button type="button" className="text-xl  w-auto p-2 mt-5 
         rounded shadow-lg hover:bg-teal-200 border-4 border-blue-950 
         font-bold text-blue-950 bg-white " 
         >Following </button>

       
         {isFollowing ? (
            <button type="button" onClick={handleUnfollow}
            className="text-xl w-auto p-2 mt-5 rounded shadow-lg hover:bg-teal-200 
            max-lg:mr-3 border-4 border-blue-950 font-bold text-blue-950 
             bg-white">Unfollow</button>
          ) : (
            <button type="button" onClick={handleFollow}
            className="text-xl w-auto p-2 mt-5 rounded shadow-lg hover:bg-teal-200 
            max-lg:mr-3 border-4 border-blue-950 font-bold text-blue-950 
             bg-white">Follow</button>
          )}

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
         > {followingCount}
         </button>

         
         <button type="button" className="text-xl  text-blue-950 bg-white px-10 py-2 mt-5
         rounded hover:bg-teal-100 max-lg:mr-3 border-2 border-blue-950
         font-bold shadow-xl "
         >{followersCount}
         </button>

         </div>

      </div>

      <div className='flex flex-col md:w-5/6 lg:w-3/4 max-md:w-full m-1  bg-white md:border-8 
      md:border-blue-950 h-auto md:mb-10 font-bold max-md:border-4 max-md:border-blue-950
       '>

         <div className='   w-full  h-auto'>
          <h1 className='flex justify-center gap-4 md:border-b-4 overflow-x-auto
           md:border-blue-950  text-xl font-bold pb-2 
          '> 
    
          <button onClick={() => setSelectedRoute('Images1')} type='button'
           className=' text-white  w-auto px-3 h-10  mt-2 
          rounded-xl bg-teal-700 hover:bg-blue-700  shadow-lg
          '>Products </button>

          <button  onClick={() => setSelectedRoute('Banner1')} type='button'
           className=' text-white  w-auto px-3 h-10  mt-2 
          rounded-xl bg-teal-700 hover:bg-blue-700   shadow-lg
          '>Banners </button>


          <button  onClick={() => setSelectedRoute('Videos1')} type='button'
           className=' text-white  w-auto p-2 h-10  mt-2 
          rounded-xl bg-teal-700 hover:bg-blue-700  px-3 shadow-lg
          '>Videos  </button>
            
          </h1>
        
          <div className='h-auto overflow-y-auto  m-2 p-2 border-4 border-blue-950  '>
          
           {selectedRoute === 'Images1' && <Images1 />}
           {selectedRoute === 'Banner1' && <Banner1 />}
           {selectedRoute === 'Videos1' && <Videos1 />}
          
           </div>        
         </div>
         </div>
      </div>
           
  )
}

export default UserProfile1


