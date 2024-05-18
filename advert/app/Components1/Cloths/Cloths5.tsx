'use client'
import React, { useState, useEffect } from 'react';
import { getVideos } from '@/app/utils/videos';
import LikeVideoProduct2 from '../Posting/media2/likes2';
import DislikeVideosProduct2 from '../Posting/media2/dislike2';
import ViewRating2 from '../Posting/media2/viewRating2';
import AddToFavorites2 from '../Posting/media2/favorite2';
import { FaShareNodes } from "react-icons/fa6";
import Link from 'next/link';
import { RootState } from '@/app/app/store';
import { useSelector} from 'react-redux';
import { getSettings } from '@/app/utils/settings'; 
import SharingImages from '../Posting/media/share';


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

interface ImageResponse {
  success: boolean;
  videos: Product[];
}

const Cloths5: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userCurrency, setUserCurrency] = useState<string | null>(null); 
  const [conversionRates, setConversionRates] = useState<{ [key: string]: number } | null>(null); 

  const filter = useSelector((state: RootState) => state.filter);

  const searchQuery = useSelector((state: RootState) => state.search.query);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        //@ts-ignore
        const response: ImageResponse = await getVideos(filter, searchQuery);
        console.log('thumbnail', response); 
        if (response.success && Array.isArray(response.videos)) {
          const groceryProducts = response.videos.filter(product => product.product === 'Cloths');
          setProducts(groceryProducts);
        } else {
          console.error('Error fetching products: Invalid data received');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [filter, searchQuery]);

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
    localStorage.setItem('productId', productId.toString()); 
  };

  return (
    <div className='font-bold text-xl w-full min-h-screen overflow-hidden' >
      {isLoading ? (
        <p className='flex justify-center lg:text-5xl md:text-3xl h-screen max-md:text-2xl text-blue-950'>
          Loading products...
        </p>
      ) : (
        <>
          {products.length > 0 && (
            <ul className='grid grid-cols-4 h-auto overflow-y-auto max-sm:grid-cols-1 max-lg:grid-cols-2 max-md:grid-cols-2 justify-between gap-2'>
              {products.map((product) => (
               
               
                  <li  key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className='border-4 border-slate-950 bg-white p-5'
                  > 
                    <span className='flex justify-between mb-2 text-2xl'>
                      <h2>{product.productName}</h2>
                      <SharingImages
                    productUrl={'https://advertconnectpro.com/Product'}
                    //@ts-ignore 
                    productName={product.productName}  
                    //@ts-ignore
                    productImageUrl={product.thumbnailUrl} 
                    />
                    </span>
                   
                    <div className='flex justify-between overflow-hidden'>
                    <span className='flex flex-row mb-2 '>
                    <p className='ml-5'>{convertPrice(product.price || 0, product.currency || 'USD').currency} {convertPrice(product.price || 0, product.currency || 'USD').price}</p>
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
                          className='w-full border-2 border-slate-900 rounded-lg'
                        />
                        <span className='absolute top-0 right-0'>
                          <AddToFavorites2 productId={product.id.toString()} />
                        </span>
                      </div>
                    )}
                    
                    <div className='flex justify-between flex-wrap'>
                      <button className='flex flex-row bg-blue-50 border-2 border-black rounded-full mt-3 p-3'>
                        <LikeVideoProduct2 productId={product.id.toString()} />
                        <DislikeVideosProduct2 productId={product.id.toString()}/>
                      </button>
                      <ViewRating2 productId={product.id.toString()}/>
                    </div>

                    <p className='overflow-hidden'>
                      Company Name: {product.companyName ? product.companyName : " was not provided"}
                    </p>

                    <p className='overflow-hidden'>
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
                      className='w-full h-12 text-white mt-3 rounded-sm bg-slate-950 hover:bg-blue-900'
                    >
                      <h1>watch video</h1>
                    </button>
                    </Link>
                  </li>
               
              ))}
            </ul>
          )}
          {products.length === 0 &&  <p className='flex justify-center lg:text-5xl md:text-3xl h-screen max-md:text-2xl text-blue-950'>
          No cloths with video found!
        </p>}
        </>
      )}
    </div>
  );
};

export default Cloths5;
