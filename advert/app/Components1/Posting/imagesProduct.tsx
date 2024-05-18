'use client'
import React, { useState, useEffect } from 'react';
import { getProductById } from '@/app/utils/images';
import AddToFavorites from './media/favorite';
import LikeImageProduct from './media/likes';
import DislikeImageProduct from './media/dislike';
import ViewRating from './media/viewRating';
import { FaShareNodes } from "react-icons/fa6"; 
import Rating from './media/rating';
import Order from './media/order';
import Comments from './media/comments';
import Followers from './media/followers';
import Following from './media/following';
import ProfileImage from './media/profileImages';
import CommentListImages from './media/seeAllComments';
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

const ProductDetails: React.FC = () => {
  const [productImages, setProductImages] = useState<ProductImage[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
        const response: ImageResponse = await getProductById();
        console.log('product images response:', response);
        if (response.success) {
          setProductImages(response.productImages); 
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

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className='font-bold text-xl min-h-screen border-4 border-slate-950 bg-slate-400 sm:p-5'>
      {isLoading ? (
        <p className='flex justify-center lg:text-5xl md:text-3xl h-screen
        max-md:text-2xl text-blue-950'>Loading product images...</p>
      ) : productImages.length > 0 ? (
        <div className='grid grid-cols-2 max-xl:grid-cols-1 gap-5'>
          
          <div className='flex flex-col gap-5 '>
          <span className=''>
            {selectedImage ? (
              <div className='relative'>
                <img
                  src={selectedImage}
                  alt={`Selected product image`}
                  style={{ maxHeight: 600, }}
                  className='border-4  border-slate-900  w-full rounded-lg cursor-pointer'
                />
                <span className='absolute top-0 right-0 '>
                  <AddToFavorites productId={productImages[0].id.toString()} />
                </span>
              </div>
            ) : (
              <div className='relative'>
                <img
                  src={productImages[0].mediaUrl[0]} 
                  alt={`Product image 1`}
                  style={{ maxHeight: 600 }}
                  className='border-4  border-slate-900 w-full  rounded-lg  cursor-pointer'
                  onClick={() => handleImageClick(productImages[0].mediaUrl[0])} 
                />
                <span className='absolute top-0 right-0 '>
                  <AddToFavorites productId={productImages[0].id.toString()} />
                </span>
              </div>
            )}
          </span>

          <span className=' overflow-x-auto bg-slate-200  border-4 w-full border-slate-950 p-2'>
            <div className='flex justify-between flex-row text-3xl max-sm:text-2xl overflow-x-auto'>
              {productImages.map((image, index) => (
                <img
                  key={index}
                  src={image.mediaUrl[index]}
                  alt={`Product image ${index + 1}`}
                  style={{ margin: '0 5px', cursor: 'pointer' }}
                  onClick={() => handleImageClick(image.mediaUrl[index])}
                  className='md:h-32 md:w-32 max-md:h-20 max-md:w-20 border-2 border-black rounded-2xl'
                />
              ))}
            </div>
          </span>

          <span className='max-sm:overflow-x-auto max-sm:overflow-y-auto  bg-slate-200 h-34 border-4 w-full border-slate-950 p-2'>
            <div className='flex justify-between flex-row text-3xl max-sm:text-2xl  max-sm:overflow-y-auto max-sm:overflow-x-auto'>

            
             <div><Followers userId={productImages[0].User?.id ? productImages[0].User?.id.toString():''}/></div>
             <div><ProfileImage /></div>
             <div><Following userId={productImages[0].User?.id ? productImages[0].User?.id.toString():''}/></div>

            </div>
          </span>

          <span className='max-sm:overflow-x-auto max-sm:overflow-y-auto  bg-slate-200 h-34 border-4 w-full border-slate-950 p-2'>
            <div className='flex justify-between flex-row text-3xl max-sm:text-2xl  max-sm:overflow-y-auto max-sm:overflow-x-auto'>

             <div><Rating productId={productImages[0].id.toString()}/></div>
             <div><Comments /></div>
             <div><Order/></div>

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
            <CommentListImages productId={productImages[0].id.toString()}/>
            </div>
          </span>
             )
           
           }
          
          </div>

          <span className='  bg-slate-200   border-4 w-full border-slate-950 p-5'>

            <p className='text-4xl max-md:text-2xl  max-sm:text-xl mb-10'>see full product details below</p>

            <div className='flex justify-between flex-wrap text-3xl max-sm:text-2xl'>
           <span className='flex flex-row mb-6 '>
            <p >Price:{convertPrice(productImages[0].price || 0,productImages[0].currency || 'USD').currency} {convertPrice(productImages[0].price || 0, productImages[0].currency || 'USD').price}</p>
           </span>
      <p>{productImages[0].productName}</p>
      </div>
  
      <span className='flex justify-between mb-2 text-2xl  max-sm:text-lg'>
      <p>Product: {productImages[0].product ? productImages[0].product : " was not provided"}</p>

      <span className='flex flex-row mb-5 gap-3'>
        <p>share</p>
         
          <SharingImages 
           productUrl={'https://advertconnectpro.com/Product'} 
           //@ts-ignore
           productName={productImages[0].productName}  
           //@ts-ignore
           productImageUrl={productImages[0].mediaUrl} 
           />
        </span>
      </span>

       <span className='flex justify-between mb-2 text-2xl max-sm:text-lg'>
       <p>type: {productImages[0].types ? productImages[0].types : " was not provided"}</p>

       <span className='flex flex-row mb-5 gap-3'>
        <p>category: {productImages[0].categories ? productImages[0].categories : " was not provided"}</p>
        </span>
      </span>

      <span className='flex justify-between mb-2 text-2xl  max-sm:text-lg'>
       <p>country: {productImages[0].country ? productImages[0].country : " was not provided"}</p>

      <span className='flex flex-row mb-5 gap-3'>
       <p>state: {productImages[0].state ? productImages[0].state : " was not provided"}</p>
      </span>
      </span>

      <span className='flex justify-between mb-2 text-2xl  max-sm:text-lg'>
      <p>province: {productImages[0].province ? productImages[0].province : " was not provided"}</p>

      <span className='flex flex-row mb-5 gap-3'>
       <p>city: {productImages[0].city ? productImages[0].city : " was not provided"}</p>
       </span>
      </span>

      <span className='flex justify-between mb-5 text-2xl  max-sm:text-lg'>
       <p> Address: {productImages[0].fullAddress ? productImages[0].fullAddress : " was not provided"}</p>
      </span>

      <span className='flex justify-between mb-5 text-2xl  max-sm:text-lg'>
        <p> productName: {productImages[0].productName ? productImages[0].productName : " was not provided"}</p>
      </span>

      <p className=' mb-5 text-2xl  max-sm:text-lg'>Company Name: {productImages[0].companyName ? productImages[0].companyName : " was not provided"}</p>

       <p className='mb-5 text-2xl  max-sm:text-lg overflow-hidden'> Company Link: {productImages[0].companyLink ? (
       <a href={productImages[0].companyLink} target="_blank" rel="noopener noreferrer" className='text-blue-700 ml-5'>
        {productImages[0].companyLink} </a> ) : ( " was not provided" )}</p>

       <span className='flex justify-between mb-5 text-2xl  max-sm:text-lg'>
         <p>phoneNumber: {productImages[0].phoneNumber ? productImages[0].phoneNumber : " was not provided"}</p>
       </span>

       <span className='flex justify-between mb-5 text-2xl  max-sm:text-sm'>
          <p> emailAddress: {productImages[0].emailAddress ? productImages[0].emailAddress : " was not provided"}</p>
       </span>

       <div className='flex justify-between '>
          <button className='flex flex-row bg-blue-50 border-2 border-black rounded-full mt-3 p-3 '>
          <LikeImageProduct productId={productImages[0].id.toString()} />
         <DislikeImageProduct productId={productImages[0].id.toString()} />
       </button>
          <ViewRating productId={productImages[0].id.toString()} />
       </div>

       <button className='w-full h-12 text-white mt-3 text-3xl  max-sm:text-2xl rounded-sm bg-slate-950'>
          <h1>FULL DESCRIPTION </h1>
       </button>

       <span className='flex justify-between mb-5 mt-5 text-xl  max-sm:text-lg'>
       <p> <p className='text-2xl  max-sm:text-xl'>DESCRIPTION OF THE PRODUCT:</p> {productImages[0].description ?productImages[0].description : " was not provided"}</p>
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

export default ProductDetails;
