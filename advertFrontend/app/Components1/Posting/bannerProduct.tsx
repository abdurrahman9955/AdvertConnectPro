'use client'
import React, { useState, useEffect } from 'react';
import { getBannerById } from '@/app/utils/banner';
import AddToFavorites1 from './media1/favorite1';
import LikeBannerProduct1 from './media1/likes1';
import DislikeBannerProduct1 from './media1/dislike1';
import ViewRating1 from './media1/viewRating1';
import { FaShareNodes } from "react-icons/fa6"; 
import Order1 from './media1/order1';
import Comments2 from './media1/comments2';
import Rating1 from './media1/rating1';
import FollowUser1 from './media1/followers1';
import Following1 from './media1/following1';
import CommentListBanner1 from './media1/seeAllComments1';
import ProfileImage from './media/profileImages';
import ProfileBanner1 from './media1/profileBanner1';
import { getSettings } from '@/app/utils/settings'; 
import SharingImages from './media/share';


interface Profile {
  photoUrl?: string;
}

interface User {
  id: string;
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

const BannerDetails: React.FC = () => {
  const [productBanners, setProductBanners] = useState<ProductBanner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBanner, setSelectedBanner] = useState<string | null>(null);
  const [commentVisible, setCommentVisible] = useState(false);
  
  const handleCommentClick = ()=>{
    setCommentVisible(!commentVisible);

 };      const  closeComment = ()=> {
       setCommentVisible(false);  
      };

    
  useEffect(() => {
    const fetchProductBanners = async () => {
      setIsLoading(true);
      try {
        //@ts-ignore
        const response: ImageResponse = await getBannerById();
        console.log(' banner response:', response);
        if (response.success) {
          setProductBanners(response.productBanner); 
        } else {
          console.error('Error fetching product images: Invalid data received');
        }
      } catch (error) {
        console.error('Error fetching product images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductBanners();
  }, []);

  const handleBannerClick = (mediaUrl: string) => {
    setSelectedBanner(mediaUrl);
  };

  return (
    <div className='font-bold text-sm min-h-screen border-2 border-slate-950
     bg-slate-400 sm:p-1'>
      {isLoading ? (
        <p className='flex justify-center lg:text-2xl md:text-xl h-screen
        max-md:text-sm text-blue-950'>Loading product banner...</p>
      ) : productBanners.length > 0 ?  (
        <div className='grid grid-cols-2 max-xl:grid-cols-1 gap-1'>
       
         <div className='flex flex-col gap-1 '>
          <span className=''>
            {selectedBanner ? (
              <div className='relative'>
                <img
                  src={selectedBanner}
                  alt={`Selected product image`}
                  style={{ maxHeight: 600 }}
                  className='border-2 border-slate-900 w-full h-96 rounded-sm
                  cursor-pointer'
                />
                <span className='absolute top-0 right-0 '>
                  <AddToFavorites1 productId={productBanners[0].id.toString()} />
                </span>
              </div>
            ) : (
              <div className='relative'>
                <img
                  src={productBanners[0].mediaUrl[0]} 
                  alt={`Product image 1`}
                  style={{ maxHeight: 600 }}
                  className='border-2  border-slate-900 rounded-sm w-full h-96  
                  cursor-pointer'
                  onClick={() => handleBannerClick(productBanners[0].mediaUrl[0])} 
                />
                <span className='absolute top-0 right-0 '>
                  <AddToFavorites1 productId={productBanners[0].id.toString()} />
                </span>
              </div>
            )}
          </span>

          <span className=' overflow-x-auto bg-slate-200  border-2 w-full
           border-slate-950 p-2'>
            <div className='flex justify-between flex-row text-lg max-sm:text-sm
            overflow-x-auto'>
              {productBanners.map((banner, index) => (
                <img
                  key={index}
                  src={banner.mediaUrl[index]}
                  alt={`Product image ${index + 1}`}
                  style={{ margin: '0 5px', cursor: 'pointer' }}
                  onClick={() => handleBannerClick(banner.mediaUrl[index])}
                  className='md:h-20 md:w-20 max-md:h-14 max-md:w-14 border
                   border-black rounded-2xl'
                />
              ))}
            </div>
          </span>

          <span className='max-sm:overflow-x-auto max-sm:overflow-y-auto  bg-slate-200 
          h-34 border-2 w-full border-slate-950 p-2'>
            <div className='flex justify-between flex-row text-lg max-sm:text-sm  
            max-sm:overflow-y-auto max-sm:overflow-x-auto'>

            
             <div><FollowUser1 userId={productBanners[0].User?.id ? productBanners[0].User?.id.toString():''}/></div>
             <div><ProfileBanner1 /></div>
             <div><Following1 userId={productBanners[0].User?.id ? productBanners[0].User?.id.toString():''}/></div>

            </div>
          </span>

          <span className='max-sm:overflow-x-auto max-sm:overflow-y-auto  bg-slate-200 
          h-34 border-2 w-full border-slate-950 p-2'>
            <div className='flex justify-between flex-row text-lg max-sm:text-sm
            max-sm:overflow-y-auto max-sm:overflow-x-auto'>

             <div><Rating1 productId={productBanners[0].id.toString()}/></div>
             <div><Comments2 /></div>
             <div><Order1/></div>

            </div>
          </span>

          <span className='max-sm:overflow-x-auto max-sm:overflow-y-auto  bg-slate-200 
          h-34 border-2 w-full border-slate-950 p-2'>
            <div className='flex justify-between flex-row text-lg max-sm:text-sm  
            max-sm:overflow-y-auto max-sm:overflow-x-auto'>

             <button className='text-lg max-sm:text-sm'
              onClick={handleCommentClick}>
              {commentVisible ? (
             <p> hide all comments</p>  ) : (
             <p>click here to see all comments</p>  )}
              </button>
            </div>
           </span>

          {commentVisible && 
            
            (  <span className='max-sm:overflow-x-auto max-sm:overflow-y-auto 
             bg-slate-200 h-34 border-2 w-full border-slate-950 p-2'>
            <div className='flex justify-between flex-row text-lg max-sm:text-sm 
             max-sm:overflow-y-auto max-sm:overflow-x-auto'>
            <CommentListBanner1 productId={productBanners[0].id.toString()}/>
            </div>
          </span>
             )
           
           }
          
          </div>

          <span className='  bg-slate-200   border-2 w-full border-slate-950 p-2'>

            <p className='text-xl max-md:text-lg  max-sm:text-sm mb-5'>see full product details below</p>

            <div className='flex justify-between flex-wrap text-lg max-sm:text-sm'>
           
          
      <p className='mb-5'>{productBanners[0].productName}</p>
      </div>
 
      <span className='flex justify-between mb-2 text-lg  max-sm:text-sm'>
      <p>Product: {productBanners[0].product ? productBanners[0].product : " was not provided"}</p>

      <span className='flex flex-row mb-5 gap-3 '>
        <p>share</p>
         
          <SharingImages
           productUrl={'https://advertconnectpro.com/Product'} 
           //@ts-ignore
           productName={productBanners[0].productName}  
           //@ts-ignore
           productImageUrl={productBanners[0].mediaUrl} 
           />
        </span>
      </span>

       <span className='flex justify-between mb-2 text-lg max-sm:text-sm'>
       <p>type: {productBanners[0].types ? productBanners[0].types : " was not provided"}</p>

       <span className='flex flex-row mb-5 gap-3'>
        <p>category: {productBanners[0].categories ? productBanners[0].categories : " was not provided"}</p>
        </span>
      </span>

      <span className='flex justify-between mb-2 text-lg  max-sm:text-sm'>
       <p>country: {productBanners[0].country ? productBanners[0].country : " was not provided"}</p>

      <span className='flex flex-row mb-5 gap-3'>
       <p>state: {productBanners[0].state ? productBanners[0].state : " was not provided"}</p>
      </span>
      </span>

      <span className='flex justify-between mb-2 text-lg  max-sm:text-sm'>
      <p>province: {productBanners[0].province ? productBanners[0].province : " was not provided"}</p>

      <span className='flex flex-row mb-5 gap-3'>
       <p>city: {productBanners[0].city ? productBanners[0].city : " was not provided"}</p>
       </span>
      </span>

      <span className='flex justify-between mb-5 text-lg  max-sm:text-sm'>
       <p> Address: {productBanners[0].fullAddress ? productBanners[0].fullAddress : " was not provided"}</p>
      </span>

      <span className='flex justify-between mb-5 text-lg  max-sm:text-sm'>
        <p> productName: {productBanners[0].productName ? productBanners[0].productName : " was not provided"}</p>
      </span>

      <p className=' mb-5 text-lg  max-sm:text-sm'>Company Name: {productBanners[0].companyName ? productBanners[0].companyName : " was not provided"}</p>

       <p className='mb-5 text-lg  max-sm:text-sm overflow-hidden'> Company Link: {productBanners[0].companyLink ? (
       <a href={productBanners[0].companyLink} target="_blank" rel="noopener noreferrer" className='text-blue-700 ml-5'>
        {productBanners[0].companyLink} </a> ) : ( " was not provided" )}</p>

       <span className='flex justify-between mb-5 text-lg  max-sm:text-sm'>
         <p>phoneNumber: {productBanners[0].phoneNumber ? productBanners[0].phoneNumber : " was not provided"}</p>
       </span>

       <span className='flex justify-between mb-5 text-lg  max-sm:text-sm'>
          <p> emailAddress: {productBanners[0].emailAddress ? productBanners[0].emailAddress : " was not provided"}</p>
       </span>

       <div className='flex justify-between '>
          <button className='flex flex-row bg-blue-50 border border-black rounded-sm
           mt-2 h-8 p-1 '>
          <LikeBannerProduct1 productId={productBanners[0].id.toString()} />
          <DislikeBannerProduct1 productId={productBanners[0].id.toString()} />
       </button>
          <ViewRating1 productId={productBanners[0].id.toString()} />
       </div>

       <button className='w-full h-7 text-white mt-3 text-sm  max-sm:text-sm rounded-sm bg-slate-950'>
          <h1>FULL DESCRIPTION </h1>
       </button>

       <span className='flex justify-between mb-5 mt-5 text-sm  max-sm:text-sm'>
       <p> <p className='text-sm max-sm:text-sm'>DESCRIPTION OF THE PRODUCT:</p> {productBanners[0].description ?productBanners[0].description : " was not provided"}</p>
       </span>

       </span>
          
        </div>
      ) : (
        <p className='flex justify-center lg:text-2xl md:text-xl h-screen
        max-md:text-lg text-blue-950'>no product details fund!</p>
      )}
    </div>
  );
  
};

export default BannerDetails;
