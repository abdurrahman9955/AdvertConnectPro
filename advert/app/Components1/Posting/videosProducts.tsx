'use client'
import React, { useState, useEffect } from 'react';
import { getVideosById } from '@/app/utils/videos';
import AddToFavorites2 from './media2/favorite2';
import LikeVideoProduct2 from './media2/likes2';
import DislikeBannerProduct2 from './media2/dislike2';
import ViewRating2 from './media2/viewRating2';
import { FaShareNodes } from "react-icons/fa6"; 
import Order2 from './media2/order2';
import Comments3 from './media2/comments3';
import Rating2 from './media2/rating2';
import FollowUser2 from './media2/followers2';
import Following2 from './media2/following2';
import ProfileVideos2 from './media2/profileVideos2';
import CommentListVideos2 from './media2/seeAllComments';
import { getSettings } from '@/app/utils/settings'; 
import ProductImages from './Posting1';
import ProductVideos from './Posting3';
import SharingImages from './media/share';



interface Profile {
  photoUrl?: string;
}

interface User {
  id: string;
  email: string;
  profile?:  Profile; 
}

interface ProductVideo {
  id: number;
  userId: string;
  mediaType: string;
  mediaUrl: string;
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

const VideosDetails: React.FC = () => {
  const [productVideos, setProductVideos] = useState<ProductVideo[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [commentVisible, setCommentVisible] = useState(false);
  const [userCurrency, setUserCurrency] = useState<string | null>(null); 
  const [conversionRates, setConversionRates] = useState<{ [key: string]: number } | null>(null); 

  const handleCommentClick = ()=>{
    setCommentVisible(!commentVisible);

 };      const  closeComment = ()=> {
       setCommentVisible(false);  
      };

  useEffect(() => {
    const fetchProductImages = async () => {
      setIsLoading(true);
      try {
        //@ts-ignore
        const response: ImageResponse = await getVideosById();
        console.log('product images response:', response);
        if (response.success) {
          setProductVideos(response.productVideos); 
        } else {
          console.error('Error fetching product images: Invalid data received');
        }
      } catch (error) {
        console.error('Error fetching product images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductImages();
  }, []);

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const settings = await getSettings();
        setUserCurrency(settings.currency || 'USD'); 
      } catch (error) {
        console.error('Error fetching user settings:', error);
      }
    };

    fetchUserSettings();
  }, []);


  useEffect(() => {
    const fetchConversionRates = async () => {
      try {
      
        const url = `http://api.exchangeratesapi.io/v1/latest?access_key=056450f7c71cac9ac2a11c2dfca34f21`;
       
        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Conversion rates data:', data);
          setConversionRates(data.rates);
        } else {
          console.error('Error fetching conversion rates: API response not OK');
        }
      } catch (error) {
        console.error('Error fetching conversion rates:', error);
      }
    };
  
    fetchConversionRates();
  }, []);
  

  const convertPrice = (price: number, currency: string): { price: number; currency: string } => {
    if (!conversionRates || !userCurrency) return { price, currency }; 
  
    const userCurrencyRate = conversionRates[userCurrency];
    const priceInUSD = currency === 'USD' ? price : price / conversionRates[currency];
    const convertedPrice = userCurrencyRate ? priceInUSD * userCurrencyRate : price;
  
    return { price: convertedPrice, currency: userCurrency };
  };

  return (
    <div className='font-bold text-xl min-h-screen border-4 border-slate-950 bg-slate-400 sm:p-5'>
      {isLoading ? (
        <p className='flex justify-center lg:text-5xl md:text-3xl h-screen
        max-md:text-2xl text-blue-950'>Loading product Videos...</p>
      ) : productVideos.length > 0 && productVideos[0].mediaUrl ? (
        <div className='grid grid-cols-2 max-xl:grid-cols-1 gap-5'>
         
          <div className='flex flex-col gap-5 '>
            <span className=''>
              {productVideos[0].mediaUrl && (
                <div className='relative'>
               
                 <video className='border-4 border-slate-900  w-full rounded-lg cursor-pointer'
                 style={{ maxHeight: 600}}
                  controls>
                   <source src={productVideos[0].mediaUrl}/>

                   Your browser does not support the video tag.
                 </video>

                <span className='absolute top-0 right-0 '>
                  <AddToFavorites2 productId={productVideos[0].id.toString()} />
                </span>
               </div>
              )}   
          </span>

          <span className='max-sm:overflow-x-auto max-sm:overflow-y-auto  bg-slate-200 h-34 border-4 w-full border-slate-950 p-2'>
            <div className='flex justify-between flex-row text-3xl max-sm:text-2xl  max-sm:overflow-y-auto max-sm:overflow-x-auto'>

            
             <div><FollowUser2 userId={productVideos[0].User?.id ? productVideos[0].User?.id.toString():''}/></div>
            <div><ProfileVideos2 /></div>
             <div><Following2 userId={productVideos[0].User?.id ? productVideos[0].User?.id.toString():''}/></div>

            </div>
          </span>

          <span className='max-sm:overflow-x-auto max-sm:overflow-y-auto  bg-slate-200 h-34 border-4 w-full border-slate-950 p-2'>
            <div className='flex justify-between flex-row text-3xl max-sm:text-2xl  max-sm:overflow-y-auto max-sm:overflow-x-auto'>

             <div><Rating2 productId={productVideos[0].id.toString()}/></div>
             <div><Comments3 /></div>
             <div><Order2/></div>

            </div>
          </span>

          <span className='max-sm:overflow-x-auto max-sm:overflow-y-auto  bg-slate-200 h-34 border-4 w-full border-slate-950 p-2'>
            <div className='flex justify-between flex-row text-3xl max-sm:text-2xl  max-sm:overflow-y-auto max-sm:overflow-x-auto'>

             <button className='text-3xl max-sm:text-2xl'
              onClick={handleCommentClick}>
              {commentVisible ? (
             <p> hide all comment</p>  ) : (
             <p>click here to see all comment</p>  )}
              </button>
            </div>
           </span>

          {commentVisible && 
            
            (  <span className='max-sm:overflow-x-auto max-sm:overflow-y-auto  bg-slate-200 h-34 border-4 w-full border-slate-950 p-2'>
            <div className='flex justify-between flex-row text-3xl max-sm:text-2xl  max-sm:overflow-y-auto max-sm:overflow-x-auto'>
            <CommentListVideos2 productId={productVideos[0].id.toString()}/>
            </div>
          </span>
             )
           
           }
          
          </div>

          <span className='  bg-slate-200   border-4 w-full border-slate-950 p-5'>

            <p className='text-4xl max-md:text-2xl  max-sm:text-xl mb-10'>see full product details below</p>

            <div className='flex justify-between flex-wrap text-3xl max-sm:text-2xl'>
           <span className='flex flex-row mb-6 '>
              
            <p className=''>Price: {convertPrice(productVideos[0].price || 0, productVideos[0].currency || 'USD').currency} {convertPrice(productVideos[0].price || 0, productVideos[0].currency || 'USD').price}</p>
                   
           </span>
      <p>{productVideos[0].productName}</p>
      </div>
  
      <span className='flex justify-between mb-2 text-2xl  max-sm:text-lg'>
      <p>Product: {productVideos[0].product ? productVideos[0].product : " was not provided"}</p>

      <span className='flex flex-row mb-5 gap-3'>
        <p>share</p>
        <SharingImages 
           productUrl={'https://advertconnectpro.com/Product'} 
           //@ts-ignore
           productName={productVideos[0].productName}  
           //@ts-ignore
           productImageUrl={productVideos[0].thumbnailUrl} 
           />
        </span>
      </span>

       <span className='flex justify-between mb-2 text-2xl max-sm:text-lg'>
       <p>type: {productVideos[0].types ? productVideos[0].types : " was not provided"}</p>

       <span className='flex flex-row mb-5 gap-3'>
        <p>category: {productVideos[0].categories ? productVideos[0].categories : " was not provided"}</p>
        </span>
      </span>

      <span className='flex justify-between mb-2 text-2xl  max-sm:text-lg'>
       <p>country: {productVideos[0].country ? productVideos[0].country : " was not provided"}</p>

      <span className='flex flex-row mb-5 gap-3'>
       <p>state: {productVideos[0].state ? productVideos[0].state : " was not provided"}</p>
      </span>
      </span>

      <span className='flex justify-between mb-2 text-2xl  max-sm:text-lg'>
      <p>province: {productVideos[0].province ? productVideos[0].province : " was not provided"}</p>

      <span className='flex flex-row mb-5 gap-3'>
       <p>city: {productVideos[0].city ? productVideos[0].city : " was not provided"}</p>
       </span>
      </span>

      <span className='flex justify-between mb-5 text-2xl  max-sm:text-lg'>
       <p> Address: {productVideos[0].fullAddress ? productVideos[0].fullAddress : " was not provided"}</p>
      </span>

      <span className='flex justify-between mb-5 text-2xl  max-sm:text-lg'>
        <p> productName: {productVideos[0].productName ? productVideos[0].productName : " was not provided"}</p>
      </span>

      <p className=' mb-5 text-2xl  max-sm:text-lg'>Company Name: {productVideos[0].companyName ? productVideos[0].companyName : " was not provided"}</p>

       <p className='mb-5 text-2xl  max-sm:text-lg overflow-hidden'> Company Link: {productVideos[0].companyLink ? (
       <a href={productVideos[0].companyLink} target="_blank" rel="noopener noreferrer" className='text-blue-700 ml-5'>
        {productVideos[0].companyLink} </a> ) : ( " was not provided" )}</p>

       <span className='flex justify-between mb-5 text-2xl  max-sm:text-lg'>
         <p>phoneNumber: {productVideos[0].phoneNumber ? productVideos[0].phoneNumber : " was not provided"}</p>
       </span>

       <span className='flex justify-between mb-5 text-2xl  max-sm:text-sm'>
          <p> emailAddress: {productVideos[0].emailAddress ? productVideos[0].emailAddress : " was not provided"}</p>
       </span>

       <div className='flex justify-between '>
          <button className='flex flex-row bg-blue-50 border-2 border-black rounded-full mt-3 p-3 '>
          <LikeVideoProduct2 productId={productVideos[0].id.toString()} />
          <DislikeBannerProduct2 productId={productVideos[0].id.toString()} />
       </button>
          <ViewRating2 productId={productVideos[0].id.toString()} />
       </div>

       <button className='w-full h-12 text-white mt-3 text-3xl  max-sm:text-2xl rounded-sm bg-slate-950'>
          <h1>FULL DESCRIPTION </h1>
       </button>

       <span className='flex justify-between mb-5 mt-5 text-xl  max-sm:text-lg'>
       <p> <p className='text-2xl  max-sm:text-xl'>DESCRIPTION OF THE PRODUCT:</p> {productVideos[0].description ?productVideos[0].description : " was not provided"}</p>
       </span>

       </span>
          
        </div>
      ) : (
        <p className='flex justify-center lg:text-5xl md:text-3xl h-screen
        max-md:text-2xl text-blue-950'>no product details fund!</p>
      )}
    </div>
  );
  
};

export default VideosDetails;
