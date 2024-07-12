import React, { useState, useEffect } from 'react';
import { getBannerByProfileId } from '@/app/utils/banner';
import LikeBannerProduct1 from './likes1';
import DislikeBannerProduct1 from './dislike1';
import ViewRating1 from './viewRating1';
import AddToFavorites1 from './favorite1';
import { FaShareNodes } from "react-icons/fa6";
import Link from 'next/link';
import { getSettings } from '@/app/utils/settings'; 
import SharingImages from '../media/share';
import Cookies from 'js-cookie';



interface Product {
  id: number;
  userId: string;
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
  banners: Product[];
}

const Banner1: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userCurrency, setUserCurrency] = useState<string | null>(null); 
  const [conversionRates, setConversionRates] = useState<{ [key: string]: number } | null>(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        //@ts-ignore
        const response: ImageResponse = await getBannerByProfileId();
        console.log('banner', response);
        if (response.success && Array.isArray(response.banners)) {
          setProducts(response.banners);
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

  const productsWithImages = products.filter((product) => product.mediaUrl && product.mediaUrl.length > 0);

 
  const groupedProducts = productsWithImages.reduce((acc, product) => {
    acc[product.id] = product;
    return acc;
  }, {} as { [key: number]: Product });

  return (
    <div className='font-bold text-sm min-h-screen overflow-hidden'>
      {isLoading ? (
       <p className='lg:text-2xl md:text-xl h-screen
       max-md:text-lg text-blue-950'>Loading products...</p>
      ) : (
        <>
        
          {Object.keys(groupedProducts).length > 0 && (
            <ul className='grid grid-cols-2 h-auto overflow-y-auto max-sm:grid-cols-1 
            max-lg:grid-cols-2 max-md:grid-cols-1 justify-between gap-1'>
              {Object.keys(groupedProducts).map((productId) => {
                //@ts-ignore
                const product = groupedProducts[productId];
                return (

                  <li key={product.id}
                   onClick={() => handleProductClick(product.id)}
                  className=' border-2 border-slate-950 bg-white p-2'
                  >
                    
                    <span className='flex justify-between mb-2 text-sm'>
                    <h2>{product.productName}</h2>
                    <SharingImages
                    productUrl={'https://advertconnectpro.com/Product'} 
                    productName={product.productName}  
                    productImageUrl={product.mediaUrl} 
                    />
                    </span>

                    <div className='flex justify-between overflow-hidden'>
                    <p>{product.country}</p>
                    <p>{product.state}</p>
                  </div>

                    {product.mediaType === 'BANNER' && (
                      <div className='relative'>
                      <img
                        src={product.mediaUrl}
                        alt={`Product banner for ${product.productName || 'Product'}`}
                        width={300}
                        height={300}
                        className='w-full border h-64  border-slate-900 rounded-sm '
                      />
                     
                      <span className='absolute top-0 right-0 '>
                      <AddToFavorites1 productId={product.id.toString()} />
                      </span>
                      </div>

                    )}
                    
                    <div className='flex justify-between flex-wrap'>
                    <button className='flex flex-row bg-blue-50 border border-black
                     rounded-sm h-8 mt-2 p-1 '>
                    <LikeBannerProduct1 productId={product.id.toString()} />
                    <DislikeBannerProduct1 productId={product.id.toString()}/>
                    </button>
                    <ViewRating1 productId={product.id.toString()}/>
                    </div>

   
                      <div className='flex flex-row flex-wrap justify-between'>

                     <p className='overflow-hidden text-xs'>Company Name: {product.companyName ? product.companyName : " was not provided"}
                    </p>

                    <p className='overflow-hidden text-xs'>
                    Company Link: 
                    {product.companyLink ? (
                    <a href={product.companyLink} target="_blank" rel="noopener noreferrer" 
                    className=' text-blue-700 ml-5 '>
                    {product.companyLink}
                    </a>
                    ) : (
                     " was not provided"
                     )}</p></div>

                  <Link  href={`/Product/Banner/${product.id}`}>
                   <button className='w-full h-8 text-white mt-3 rounded-sm
                    bg-slate-950 hover:bg-blue-900'>
                    <h1>see banner details</h1>
                   </button>
                  </Link>

                  </li>
                  
                );
              })}
            </ul>
          )}
          {Object.keys(groupedProducts).length === 0 && <p 
          className='lg:text-2xl md:text-xl h-screen max-md:text-lg text-blue-950'>
          No products with banner found!
        </p>}
        </>
      )}
    </div>
  );
};

export default Banner1;

