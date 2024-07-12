'use client'
import React, { useState, useEffect } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { getVideosById } from '@/app/utils/videos';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface Profile {
  photoUrl?: string;
}

interface User {
  id: number;
  email: string;
  profile?:  Profile; 
}

interface ProductVideo {
  id: number;
  userId: string;
  mediaType: string;
  mediaUrl: string[];
  thumbnailUrl?: string;
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
  productVideos: ProductVideo[]; 
}

const ProfileVideos2 = () => {

  const router = useRouter();

  const [productVideos, setProductVideos] = useState<ProductVideo[]>([]); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductVideos = async () => {
      setIsLoading(true);
      try {
        //@ts-ignore
        const response: ImageResponse = await getVideosById();
        console.log('product response:', response);
        if (response.success) {
          setProductVideos(response.productVideos); 
        } else {
          console.error('Error fetching product images: Invalid data received');
        }
      } catch (error) {
        console.error('Error fetching product images:', error);
      }finally {
        setIsLoading(false);
      }  };

    fetchProductVideos();
  }, []);

  const handleProductClick = (profileId: any) => {
    Cookies.set('profileId', profileId.toString(), { expires: 1 / 24, path: '/' });
  };

  const handleButtonClick = () => {
    router.push(`/Profile/videos/${productVideos[0].User?.id}`);
  };

     return (
      <div className=''> 
        <div>

        {productVideos.length > 0 && productVideos[0].User 
        && productVideos[0].User.profile && productVideos[0].User.profile.photoUrl ? (
         <div className='flex flex-row py-1 gap-1 text-sm pl-1'>
            <img
              src={productVideos[0].User.profile.photoUrl}
              alt={`Profile image of user ${productVideos[0].userId}`}
              className='border border-slate-900 rounded-full ml-7 max-sm:ml-3 w-12 h-12'
            />
          </div>
        ) : (
          <div className='flex flex-row py-2 gap-1 text-xl pl-1'>
            <FaRegUserCircle size={40} className='ml-7 max-sm:ml-3' />
          </div>
        )}
     
       <span  onClick={() => handleProductClick(productVideos[0].User?.id)}>
        <button className="bg-blue-950 hover:bg-green-950  max-sm:hidden text-sm
         text-white px-4 h-7 max-sm:h-6  rounded"
         onClick={handleButtonClick}
        >
         view profile
       </button>

       <button className="bg-blue-950 hover:bg-green-950 sm:hidden  text-sm
         text-white px-4 h-7 max-sm:h-6  rounded"
         onClick={handleButtonClick}
       >
         profile
         
      </button>
      </span>
     

      </div>
    </div>
  )}

export default ProfileVideos2

