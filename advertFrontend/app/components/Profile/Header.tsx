'use client'
import Link from "next/link"
import React, { useState, useEffect,ChangeEvent } from 'react'
import Banner from "./Banner"
import Post from "./Post"
import Videos from "./Videos"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from 'react-redux';
import {  getFollowers, getFollowing } from "@/app/utils/followers";
import { FaUser, FaEdit,FaCamera, FaTrash } from 'react-icons/fa';
import { uploadProfileImage, updateProfileImage, getProfileImage, deleteProfileImage } from '@/app/utils/profile';
import { getCurrentUser } from "@/app/utils/userToken";
import { getImage } from '@/app/utils/images';
import { getBanner } from '@/app/utils/banner';
import { getVideo } from '@/app/utils/videos';
import { RootState } from '@/app/app/store';
import { FaCloudUploadAlt } from "react-icons/fa";
import Cookies from 'js-cookie';


interface Product {
  id: number;
  mediaType: string;
  mediaUrl: string;
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
  Profile?: {
    photoUrl: string;
  };
}


interface ImageResponse {
  success: boolean;
  images: Product[];
}

interface VideoResponse {
  success: boolean;
  videos: Product[];
}

interface BannerResponse {
  success: boolean;
  banners: Product[];
}

interface UserInfo {
  firstName: string;
  lastName: string;
  profile?: {
    photoUrl: string | null;
  };
}

const Header = () => {

  const router = useRouter();
  const [selectedRoute, setSelectedRoute] = useState<string>('Post');
  const dispatch = useDispatch();
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  const filter = useSelector((state: RootState) => state.filter);

  const searchQuery = useSelector((state: RootState) => state.search.query);

  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        //@ts-ignore
        const bannerResponse = await getBanner(filter, searchQuery);
        const imageResponse = await getImage(filter, searchQuery);
        const videoResponse = await getVideo(filter, searchQuery);

        let total = 0;
        if (bannerResponse.success && Array.isArray(bannerResponse.banners)) {
          total += bannerResponse.banners.length;
        }
        //@ts-ignore
        if (imageResponse.success && Array.isArray(imageResponse.images)) {
          //@ts-ignore
          total += imageResponse.images.length;
        }
        if (videoResponse.success && Array.isArray(videoResponse.videos)) {
          total += videoResponse.videos.length;
        }

        setTotalCount(total);
      } catch (error) {
        console.error('Error fetching product counts:', error);
      }
    };

    fetchTotalCount();
  }, [filter, searchQuery]);

  
  useEffect(() => {
    const fetchFollowersCount = async () => {
      try {
        const response = await getFollowing();
        console.log('profile following', response)
        
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
              const response = await getFollowers();
              setFollowersCount(response.followers?.length || 0);
              setIsFollowing(response.success);
          } catch (error) {
              console.error('Error fetching followers count:', error);
          } };

      fetchData();
  }, []);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const userData = await getCurrentUser();
        setUserInfo(userData);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setErrorMessage('Failed to fetch user information. Please try again.');
      }
    }

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const userId = Cookies.get('userId');
        if (!userId) {
          throw new Error('User ID not found');
        }
        const response = await getProfileImage(); 
        setProfileImage(response.imageUrl as any); 
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };
    fetchProfileImage();
  }, []);  
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedImage(file);
    } 
  };
  
  const handleUpload = async () => {
    
    try {

      const token = Cookies.get('accessToken');
      if (!token) {
        router.push('/Sign_In'); 
        return;
      }

      if (!selectedImage) {
        throw new Error('No image selected');
      }
      const response = await uploadProfileImage(selectedImage);
      console.log(response);
      alert('Photo added  successfully!');
      setProfileImage(null);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('failed to upload photo! please try again.');
    }
  };
  

  const handleUpdate = async () => {
    try {

      const token = Cookies.get('accessToken');
      if (!token) {
        router.push('/Sign_In'); 
        return;
      }
      if (!selectedImage) {
        throw new Error('No image selected');
      }
 
      const response = await updateProfileImage(selectedImage);
      console.log(response);
      alert('Photo updated  successfully!');
      setProfileImage(null);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('failed to update photo! please try again.');
    }
  };
 
  const handleDelete = async () => {

    try {

      const token = Cookies.get('accessToken');
      if (!token) {
        router.push('/Sign_In'); 
        return;
      }

      const response = await deleteProfileImage(); 
      console.log(response);
      setProfileImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <div className="flex justify-center flex-wrap   md:border-2 border-blue-950  
    md:pt-10 max-md:pt-0  ">
       <div className="flex  flex-col   max-md:w-5/6 max-sm:w-full  m-0 max-lg:w-4/6  
       lg:w-3/6 xl:w-2/6">

        <div className="sm:border-2 border-blue-950  ">
          <h1 className="flex justify-center text-2xl text-blue-950 font-bold pt-5 
          max-sm:text-lg">My profile </h1>
          <div className="flex justify-center relative">
            <div className="w-64 h-64 mt-5 border-2 border-orange-950 bg-orange-100 
            rounded-full relative">
              {profileImage ? (
                 <img
                 src={profileImage}
                 alt="Profile"
                 width={400}
                 height={400}
                 className="w-full h-full object-cover rounded-full"/>

              ) : (
                <>
                  {selectedImage ? (
                    <img src={URL.createObjectURL(selectedImage)} 
                    alt={'profile preview'}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover rounded-full" />

                  ) : (
                    <FaUser className="absolute top-1/2 left-1/2 transform -translate-x-1/2 
                    -translate-y-1/2 w-32 h-32 text-orange-950" />
                   
                  )}
                  
                </>
              )}
           
              <input type="file" accept="image/*"  
              name="images" onChange={handleFileChange} 
              className="opacity-0 w-full h-full 
              absolute top-0 left-0 cursor-pointer" />
              
              {selectedImage && (
                <button onClick={handleUpload} className="absolute bottom-20 right-10
                 bg-lime-800 hover:bg-blue-900 text-white text-sm  rounded-full p-2">
                  <FaCloudUploadAlt size={24} className="ml-4 -pt-2"/>
                  <h1 className="text-xs sm:text-sm px-2 pb-2">upload</h1>
                </button>
              )}

              {profileImage && (
                <button className="absolute bottom-2 right-10 hidden
                bg-blue-950 hover:bg-blue-900 text-white text-sm  rounded-full p-3">
                  <FaCloudUploadAlt size={40} />
                  <input type="file" accept="image/*"  
                  name="images" onChange={handleFileChange} 
                  className="opacity-0 w-full h-full 
                  absolute top-0 left-0 cursor-pointer" />
               </button>
              )}
            </div>
          </div>
          <h1 className="flex justify-center text-lg text-blue-950 mb-10 mt-2 
          font-bold max-sm:text-lg">

          {userInfo ? (
           <div className="flex items-center justify-center">
           <div className="flex flex-col items-start">
            <h1 className="text-lg font-bold">{userInfo.firstName} {userInfo.lastName}</h1>
            {userInfo.profile?.photoUrl && (
              <img className="rounded-full hidden w-48 h-48 mt-4" src={userInfo.profile?.photoUrl} alt="Profile Image" />
            )}
          </div>

          </div>
          ) : (
          <p className="text-center hidden text-red-500">{errorMessage}</p>
          )}
          
          </h1>
      
          <div className="flex justify-center">
            <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700
             text-white font-bold py-2 px-4 hidden  rounded mr-4">
              Update
            </button>
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700
             text-white font-bold py-2 px-4 hidden rounded">
              Delete
            </button>
          </div>
        </div>
 
        <div className="flex flex-row justify-between   ml-3 mb-5 md:ml-6
         md:gap-4 md:mr-5">
         
         <Link href={{pathname:'/Post'}}>
         <button type="button" className="text-sm  w-24  py-1 mt-5
         rounded shadow-lg max-sm:px-4 hover:bg-teal-200 border-2 border-blue-950
         font-bold text-blue-950 bg-white">Product
         </button></Link>

        
         <button type="button" className="text-sm  w-auto p-1 mt-5  px-4
         rounded shadow-lg hover:bg-teal-200 border-2 border-blue-950 
         font-bold text-blue-950 bg-white " 
         onClick={() => router.push('/Following')}
         >Following </button>

        <button type="button" 
        className="text-sm w-auto p-1 mt-5 rounded shadow-lg hover:bg-teal-200 
        max-lg:mr-3 border-2 border-blue-950 font-bold text-blue-950  px-4
        bg-white"
        onClick={() => router.push('/Followers')}
        >Followers</button>
          

         </div>
         <div className="flex flex-row justify-between   ml-2 mb-5 md:ml-6
         md:gap-4 md:mr-5">
         
         <button type="button" className="text-sm text-blue-950 bg-white px-10
          py-1 mt-5
         rounded  max-sm:px-4 hover:bg-teal-100 border-2 border-blue-950
         font-bold ml-2  shadow-xl">
       {totalCount}
         </button>
        
         <button type="button" className="text-sm  text-blue-950 bg-white
          px-10 py-1 mt-5
         rounded  hover:bg-teal-100 border-2 border-blue-950 
         font-bold ml-3 shadow-xl"
         onClick={() => router.push('/Following')}
         > {followingCount}
         </button>

         
         <button type="button" className="text-sm  text-blue-950 bg-white
          px-10 py-1 mt-5
         rounded hover:bg-teal-100 max-lg:mr-3 border-2 border-blue-950
         font-bold shadow-xl "
         onClick={() => router.push('/Followers')}
         >{followersCount}
         </button>

         </div>

         <div className="flex flex-row justify-between   ml-3 mb-5 md:ml-6
         md:gap-4 md:mr-5 font-bold">
        
        <Link href={{pathname:'/Feedback'}}>
         <button type="button" className="text-sm text-blue-950 bg-white px-5 py-1 mt-5
         rounded shadow-lg max-sm:px-4 hover:bg-teal-200 border-2 border-blue-950 ">Feedback
         </button></Link>
        
        <Link href={{pathname:'/Upload'}}>
         <button type="button" className="text-sm text-blue-950 bg-white px-4 py-1 mt-5
         rounded shadow-lg hover:bg-teal-200 border-2 border-blue-950  ">Upload 
         </button></Link>

         <Link href={{pathname:'/Order'}}>
         <button type="button" className="text-sm text-blue-950 bg-white px-4 py-1 mt-5
         rounded shadow-lg hover:bg-teal-200 max-lg:mr-3 border-2 border-blue-950">Order
         </button></Link>

         </div>

         <div className="flex flex-row justify-between   ml-3 mb-5 md:ml-6
         md:gap-4 md:mr-5 font-bold">

         <Link href={{pathname:'/Settings'}}>
         <button type="button" className="text-sm text-blue-950 bg-white px-10 py-1 mt-5
         rounded shadow-lg max-sm:px-4 hover:bg-teal-200 border-2 border-blue-950">Settings
         </button></Link>

         <Link href={{pathname:'/Favorite'}}> 
         <button type="button" className="text-sm text-blue-950 bg-white px-4 py-1 mt-5
         rounded shadow-lg hover:bg-teal-200  border-2 border-blue-950">Favorite
         </button></Link>

         <Link href={{pathname:'/Notification'}}>
         <button type="button" className="text-sm text-blue-950 bg-white px-4 py-1 mt-5
         rounded shadow-lg hover:bg-teal-200 
         max-lg:mr-3 border-2 border-blue-950">Note 
         </button></Link>
         </div>

      </div>

      <div className='flex flex-col md:w-5/6 lg:w-3/4 max-md:w-full m-1 
       bg-white md:border-2
      md:border-blue-950 h-auto md:mb-10 font-bold max-md:border-2
       max-md:border-blue-950
       '>

         <div className='   w-full  h-auto'>
          <h1 className='flex justify-center gap-4 md:border-b-2 overflow-x-auto
           md:border-blue-950  text-sm font-bold pb-2 
          '> 
        

          <button onClick={() => setSelectedRoute('Post')} type='button'
           className=' text-white  w-auto px-3 h-7  max-sm:h-6  mt-2 
          rounded-sm bg-teal-700 hover:bg-blue-700  shadow-lg
          '>Products </button>

          <button  onClick={() => setSelectedRoute('Banner')} type='button'
           className=' text-white  w-auto px-3 h-7  max-sm:h-6 mt-2 
          rounded-sm bg-teal-700 hover:bg-blue-700   shadow-lg
          '>Banners </button>


          <button  onClick={() => setSelectedRoute('Videos')} type='button'
           className=' text-white  w-auto  h-7  max-sm:h-6  mt-2 
          rounded-sm bg-teal-700 hover:bg-blue-700  px-3 shadow-lg
          '>Videos  </button>
          
          </h1>
        
          <div className='h-auto overflow-y-auto  m-2 p-2 border-2 border-blue-950  '>
          
           {selectedRoute === 'Videos' && <Videos />}
           {selectedRoute === 'Banner' && <Banner />}
           {selectedRoute === 'Post' && <Post />}
          
           </div>   
         </div>
         </div>

      </div>
           
  )
}

export default Header


