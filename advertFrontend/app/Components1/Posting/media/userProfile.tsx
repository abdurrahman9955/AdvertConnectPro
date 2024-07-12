'use client'
import Link from "next/link"
import React, { useState, useEffect,ChangeEvent } from 'react'
import Images from "./images"
import Banner from "./banner"
import Videos from "./videos"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FaRegUserCircle } from "react-icons/fa";
import { getProductById } from '@/app/utils/images';
import { followUser, unfollowUser, getFollowersCount } from '@/app/utils/following';
import { getFollowingCount } from '@/app/utils/following'; 
import { getVideoByProfileId } from '@/app/utils/videos';
import { getImageByProfileId } from '@/app/utils/images';
import { getBannerByProfileId } from '@/app/utils/banner';
import Cookies from 'js-cookie';
import { GrStatusGood } from "react-icons/gr";


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

  interface ImagesResponse {
    success: boolean;
    message?: string;
    error?: string;
    images: ProductImage[];
  }
  
  interface ApiResponse {
    success: boolean;
    message?: string;
    error?: string;
    videos?: ProductImage[];
  }
  
  interface BannerResponse {
    success: boolean;
    error?: string;
    massage?: string;
    banners?: ProductImage[]
  
  }

const UserProfile = () => {

  const router = useRouter();
  const [selectedRoute, setSelectedRoute] = useState<string>('Images');
  const [productImages, setProductImages] = useState<ProductImage[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        //@ts-ignore
        const imageResponse: ImagesResponse = await getImageByProfileId();
        //@ts-ignore
        const bannerResponse: BannerResponse = await getBannerByProfileId();
        //@ts-ignore
        const videoResponse: ApiResponse = await getVideoByProfileId();
 
        const totalCount =
          (imageResponse.success && Array.isArray(imageResponse.images) ? imageResponse.images.length : 0) +
          (bannerResponse.success && Array.isArray(bannerResponse.banners) ? bannerResponse.banners.length : 0) +
          (videoResponse.success && Array.isArray(videoResponse.videos) ? videoResponse.videos.length : 0);
  
        setTotalProducts(totalCount);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);


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
}, []);

  const handleFollow = async () => {
      try {

        const token = Cookies.get('accessToken');
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

        const token = Cookies.get('accessToken');
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
        const response: ImageResponse = await getProductById();
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
   
    <div className="flex justify-center flex-wrap   md:border-2 border-blue-950  
    md:pt-10 max-md:pt-0  ">
       <div className="flex  flex-col   max-md:w-5/6 max-sm:w-full 
        m-0 max-lg:w-4/6  lg:w-3/6 xl:w-2/6">
   
        <div className="sm:border-2 border-blue-950 ">
          <h1 className="flex justify-center text-xl text-blue-950  font-bold pt-5 
          max-sm:text-lg"> <p>{productImages[0]?.User?.firstName}'s </p> <p 
          className="ml-2"> profile</p></h1>
        
          <h1 className="flex justify-center text-lg text-blue-950 mb-10 mt-2 
          font-bold max-sm:text-sm">

       {productImages.length > 0 && productImages[0].User 
        && productImages[0].User.profile && productImages[0].User.profile.photoUrl ? (
         <div className='flex flex-row py-1 gap-1 text-sm pl-1'>
            <img
              src={productImages[0].User.profile.photoUrl}
              alt={`Profile image of user ${productImages[0].userId}`}
              className='border-2 border-slate-900 rounded-full  w-64 h-64'
            />
          </div>
        ) : (
          <div className='flex flex-row py-3 gap-1 text-xl pl-1'>
            <FaRegUserCircle className=' h-64 w-64' />
          </div>
        )}
          </h1>

          <span className='flex justify-center font-bold gap-4 mb-5 -mt-10 text-lg
           flex-row  max-sm:text-lg'>

          <p>{productImages[0]?.User?.firstName}</p>
          <p>{productImages[0]?.User?.lastName}</p>

         </span>

        </div>
  
        <div className="flex flex-row justify-between   ml-3 mb-5 md:ml-6
         md:gap-4 md:mr-5">
         
        
         <button type="button" className="text-sm  w-auto  p-1 mt-5 h-8
         rounded shadow-lg px-4 hover:bg-teal-200 border-2 border-blue-950
         font-bold text-blue-950 bg-white">Products
         </button>

        
         <button type="button" className="sm:text-sm  w-auto p-1 mt-5 h-8
         rounded shadow-lg hover:bg-teal-200 border-2 border-blue-950 px-4
         font-bold text-blue-950 bg-white " 
         >Following </button>

       
         {isFollowing ? (
            <button type="button" onClick={handleUnfollow}
            className="flex flex-row text-sm w-auto p-1 mt-5 rounded shadow-lg hover:bg-teal-200 
            max-lg:mr-3 border-2 border-blue-950 font-bold text-blue-950  h-8 px-2
             bg-white">
              Followed <GrStatusGood size={18} className='text-green-800
                  rounded-full bg-white ml-1 mt-0.5'/></button>
          ) : (
            <button type="button" onClick={handleFollow}
            className="text-sm w-auto p-1 mt-5 rounded shadow-lg hover:bg-teal-200 
            max-lg:mr-3 border-2 border-blue-950 font-bold text-blue-950 h-8 px-4
             bg-white">Follow</button>
          )}

         </div>

        

         <div className="flex flex-row justify-between   ml-3 mb-5 md:ml-6
         md:gap-4 md:mr-5">
         
         <button type="button" className="text-sm text-blue-950 bg-white px-10 p-1 mt-5
         rounded  max-sm:px-4 hover:bg-teal-100 border-2 border-blue-950
         font-bold  h-8 shadow-xl">
          {totalProducts}
         </button>
        
         <button type="button" className="text-sm  text-blue-950 bg-white px-5 p-1 mt-5
         rounded  hover:bg-teal-100 border-2 border-blue-950 
         font-bold h-8 shadow-xl"
         > {followingCount}
         </button>

         
         <button type="button" className="text-sm  text-blue-950 bg-white px-10 p-1 mt-5
         rounded hover:bg-teal-100 max-lg:mr-3 border-2 border-blue-950 h-8
         font-bold shadow-xl "
         >{followersCount}
         </button>

         </div>

      </div>

      <div className='flex flex-col md:w-5/6 lg:w-3/4 max-md:w-full m-1 
       bg-white border-2
      md:border-blue-950 h-auto md:mb-10 font-bold  max-md:border-blue-950
     '>

         <div className='   w-full  h-auto'>
          <h1 className='flex justify-center gap-4 border-b-2 overflow-x-auto
           border-blue-950  text-sm font-bold pb-2
          '> 
    
          <button onClick={() => setSelectedRoute('Images')} type='button'
           className=' text-white  w-auto px-3 h-7  mt-2 
          rounded-sm bg-teal-700 hover:bg-blue-700  shadow-lg
          '>Products </button>

          <button  onClick={() => setSelectedRoute('Banner')} type='button'
           className=' text-white  w-auto px-3 h-7  mt-2 
          rounded-sm bg-teal-700 hover:bg-blue-700   shadow-lg
          '>Banners </button>


          <button  onClick={() => setSelectedRoute('Videos')} type='button'
           className=' text-white  w-auto h-7  mt-2 
          rounded-sm bg-teal-700 hover:bg-blue-700  px-3 shadow-lg
          '>Videos  </button>
            
          </h1>
        
          <div className='h-auto overflow-y-auto  m-2   '>
          
           {selectedRoute === 'Images' && <Images />}
           {selectedRoute === 'Banner' && <Banner />}
           {selectedRoute === 'Videos' && <Videos />}
          
           </div>        
         </div>
         </div>
      </div>
           
  )
}

export default UserProfile


