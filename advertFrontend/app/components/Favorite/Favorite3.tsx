import React, { useState, useEffect } from 'react';
import LikeVideoProduct2 from '@/app/Components1/Posting/media2/likes2';
import DislikeVideosProduct2 from '@/app/Components1/Posting/media2/dislike2';
import AddToFavorites2 from '@/app/Components1/Posting/media2/favorite2';
import ViewRating2 from '@/app/Components1/Posting/media2/viewRating2';
import { getFavoriteVideo } from '@/app/utils/favoriteVideo';
import Link from 'next/link';
import { getSettings } from '@/app/utils/settings';
import SharingImages from '@/app/Components1/Posting/media/share';
import DeleteVideo from './deleteVideo';
import { getFavoriteBanner } from '@/app/utils/favoriteBanner';
import Cookies from 'js-cookie';

interface Product {
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
  Profile?: {
    photoUrl: string;
  };
}

interface ApiResponse {
  success: boolean;
  data?: Product[];
  error?: string;
}

const Favorite3: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userCurrency, setUserCurrency] = useState<string | null>(null); 
  const [conversionRates, setConversionRates] = useState<{ [key: string]: number } | null>(null); 

  
  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const response: ApiResponse = await getFavoriteVideo();
        console.log('favorite video', response); 
        if (response.success && response.data) { 
          setProducts(response.data);
          console.log('favorite video second', products); 
        } else {
          console.error('Failed to fetch favorite products:', response.error);
        }
      } catch (error) {
        console.error('Error fetching favorite products:', error);
      } finally {
        setIsLoading(false);
      }
    };
 
    fetchFavoriteProducts();
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


  const handleProductClick = (productId: number) => {
    Cookies.set('productId', productId.toString(), { expires: 1 / 24, path: '/' });
  };

  return (
    <div className='font-bold text-sm w-full min-h-screen overflow-hidden' >

       <div className="flex justify-between w-full px-2 border-slate-950 my-10  gap-4">
        <div className=" shadow-lg w-full bg-blue-950 border-2  h-8 border-slate-950
         rounded flex-initial">
             <h1 className='flex justify-center font-bold text-white mt-1
             text-sm'>Favorite videos Product</h1></div></div>

      {isLoading ? (
        <p className='flex justify-center lg:text-xl md:text-xl h-screen max-md:text-lg text-blue-950'>
         Loading product Videos...
        </p>
      ) : (
        <>
          {products.length > 0 && (
            <ul className='grid grid-cols-3 h-auto overflow-y-auto max-sm:grid-cols-1
             max-xl:grid-cols-2 max-md:grid-cols-2 justify-between gap-1'>
              {products.map((product) => (
              
                  <li  key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className='border-2 border-slate-950 bg-white p-2'
                  > 
      

                    <span className='flex justify-between mb-2 text-sm'>
                    <h2>{product.productName ? product.productName : 'Product Name Not Available'}</h2>
                    <h1 className='flex flex-row'>
                    <SharingImages

                    productUrl={'https://advertconnectpro.com/Product'} 
                    //@ts-ignore
                    productName={product.productName}  
                    productImageUrl={product.mediaUrl} 
                    />
                    <DeleteVideo productId={product.id.toString()} />
                    </h1>
                    </span>
                  
                    <div className='flex justify-between overflow-hidden'>
                    <span className='flex flex-row mb-2 '>
                    <p className=''>{convertPrice(product.price || 0, product.currency || 'USD').currency} {convertPrice(product.price || 0, product.currency || 'USD').price}</p>
                    </span>
                      <p>{product.country}</p>
                    </div>

                    {product.thumbnailUrl && (
                      <div className='relative'>
                        <img
                          src={product.thumbnailUrl}
                          alt={`Product video for ${product.productName || 'Product'}`}
                          width={300}
                          height={300}
                          className='w-full border border-slate-900 rounded-sm'
                        />
                        <span className='absolute top-0 right-0'>
                          <AddToFavorites2 productId={product.id.toString()} />
                        </span>
                      </div>
                    )}
                    
                    <div className='flex justify-between flex-wrap'>
                      <button className='flex flex-row bg-blue-50 border
                       border-black rounded-sm h-8 mt-2 p-1'>
                        <LikeVideoProduct2 productId={product.id.toString()} />
                        <DislikeVideosProduct2 productId={product.id.toString()}/>
                      </button>
                      <ViewRating2 productId={product.id.toString()}/>
                    </div>

                    <p className='overflow-hidden text-xs'>
                      Company Name: {product.companyName ? product.companyName : " was not provided"}
                    </p>

                    <p className='overflow-hidden text-xs'>
                      Company Name:
                      {product.companyLink ? (
                        <a href={product.companyLink} target="_blank" rel="noopener noreferrer" 
                        className='  text-blue-700 ml-5 '>
                         {product.companyLink}
                        </a>
                      ) : (
                        " was not provided"
                      )}
                    </p>

                    <Link  href={`/Product/Videos/${product.id}`}>
                    <button 
                      className='w-full h-8 text-white mt-3 rounded-sm
                       bg-slate-950 hover:bg-blue-900'
                    >
                      <h1>watch video</h1>
                    </button>
                    </Link>
                  </li>
               
              ))}
            </ul>
          )}
          {products.length === 0 &&  <p 
          className='flex justify-center lg:text-xl md:text-xl h-screen max-md:text-lg text-blue-950'>
          No products with video found!
        </p>}
        </>
      )}
    </div>
  );
};

export default Favorite3;
