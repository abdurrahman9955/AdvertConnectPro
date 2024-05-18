'use client'
import React, { useState, useEffect } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { getBannerById } from '@/app/utils/banner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Profile {
  photoUrl?: string;
}

interface User {
  id: number;
  email: string;
  profile?:  Profile; 
}

interface ProductBanner {
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
  productBanner: ProductBanner[]; 
}

const ProfileBanner1 = () => {

  const router = useRouter();

  const [productBanner, setProductBanner] = useState<ProductBanner[]>([]); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductBanner = async () => {
      setIsLoading(true);
      try {
        //@ts-ignore
        const response: ImageResponse = await getBannerById();
        console.log('product images response:', response);
        if (response.success) {
          setProductBanner(response.productBanner); 
        } else {
          console.error('Error fetching product images: Invalid data received');
        }
      } catch (error) {
        console.error('Error fetching product images:', error);
      }finally {
        setIsLoading(false);
      }  };

    fetchProductBanner();
  }, []);

  const handleProductClick = (profileId: any) => {
    localStorage.setItem('profileId', profileId.toString()); 
  };

  const handleButtonClick = () => {
    router.push(`/Profile/${productBanner[0].User?.id}`);
  };

     return (
      <div className=''> 
        <div>

        {productBanner.length > 0 && productBanner[0].User  && productBanner[0].User.profile && productBanner[0].User.profile.photoUrl ? (
         <div className='flex flex-row py-3 gap-1 text-xl pl-1'>
            <img
              src={productBanner[0].User.profile.photoUrl}
              alt={`Profile image of user ${productBanner[0].userId}`}
              className='border border-slate-900 rounded-full ml-8 max-sm:ml-3 w-16 h-16'
            />
          </div>
        ) : (
          <div className='flex flex-row py-3 gap-1 text-xl pl-1'>
            <FaRegUserCircle size={60} className='ml-8 max-sm:ml-3' />
          </div>
        )}
      
       <span  onClick={() => handleProductClick(productBanner[0].User?.id)}>
        <button className="bg-blue-950 hover:bg-green-950  max-sm:hidden text-lg
         text-white px-4 py-1  rounded"
         onClick={handleButtonClick}
        >
         view profile
       </button>

       <button className="bg-blue-950 hover:bg-green-950 sm:hidden  text-lg
         text-white px-4 py-1  rounded"
         onClick={handleButtonClick}
       >
         profile
      </button>
      </span>
     

      </div>
    </div>
  )}

export default ProfileBanner1

