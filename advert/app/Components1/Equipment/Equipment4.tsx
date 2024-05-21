'use client'
import React, { useState, useEffect } from 'react';
import { getBanners } from '@/app/utils/banner';
import LikeBannerProduct1 from '../Posting/media1/likes1';
import DislikeBannerProduct1 from '../Posting/media1/dislike1';
import ViewRating1 from '../Posting/media1/viewRating1';
import AddToFavorites1 from '../Posting/media1/favorite1';
import { FaShareNodes } from "react-icons/fa6";
import Link from 'next/link';
import { RootState } from '@/app/app/store';
import { useSelector} from 'react-redux';
import { getSettings } from '@/app/utils/settings'; 
import SharingImages from '../Posting/media/share';
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

const Equipment4: React.FC = () => {
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
        const response: ImageResponse = await getBanners(filter, searchQuery);
        console.log('banner', response);
        if (response.success && Array.isArray(response.banners)) {
          const groceryProducts = response.banners.filter(product => product.product === 'Equipments');
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
    Cookies.set('productId', productId.toString(), { expires: 1 / 24, path: '/' });
  };
  
  const productsWithImages = products.filter((product) => product.mediaUrl && product.mediaUrl.length > 0);

 
  const groupedProducts = productsWithImages.reduce((acc, product) => {
    acc[product.id] = product;
    return acc;
  }, {} as { [key: number]: Product });

  return (
    <div className='font-bold text-xl min-h-screen overflow-hidden'>
      {isLoading ? (
       <p className='lg:text-5xl md:text-3xl h-screen
       max-md:text-2xl text-blue-950'>Loading products...</p>
      ) : (
        <>
        
          {Object.keys(groupedProducts).length > 0 && (
            <ul className='grid grid-cols-2 h-auto overflow-y-auto max-sm:grid-cols-1 max-lg:grid-cols-2 max-md:grid-cols-2 justify-between gap-2'>
              {Object.keys(groupedProducts).map((productId) => {
                //@ts-ignore
                const product = groupedProducts[productId];
                return (

                 
                  <li key={product.id}
                   onClick={() => handleProductClick(product.id)}
                  className=' border-4 border-slate-950 bg-white p-5'
                  >
                    
                    <span className='flex justify-between mb-2 text-2xl'>
                    <h2>{product.productName}</h2>
                    <SharingImages
                    productUrl={'https://advertconnectpro.com/Product'} 
                    productName={product.productName}  
                    productImageUrl={product.mediaUrl} 
                    />
                    </span>

                    {product.mediaType === 'BANNER' && (
                      <div className='relative'>
                      <img
                        src={product.mediaUrl}
                        alt={`Product banner for ${product.productName || 'Product'}`}
                        width={300}
                        height={300}
                        className='w-full border-2 h-96  border-slate-900 rounded-lg '
                      />
                     
                      <span className='absolute top-0 right-0 '>
                      <AddToFavorites1 productId={product.id.toString()} />
                      </span>
                      </div>

                    )}
                    
                    <div className='flex justify-between flex-wrap'>
                    <button className='flex flex-row bg-blue-50 border-2 border-black rounded-full mt-3 p-3 '>
                    <LikeBannerProduct1 productId={product.id.toString()} />
                    <DislikeBannerProduct1 productId={product.id.toString()}/>
                    </button>
                    <ViewRating1 productId={product.id.toString()}/>
                    </div>

   
                      <div className='flex flex-row flex-wrap justify-between'>

                    <p> {product.country ? product.country: " was not provided"}
                    </p>

                     <p className='overflow-hidden'>Company Name: {product.companyName ? product.companyName : " was not provided"}
                    </p>

                    <p className='overflow-hidden'>
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
                   <button className='w-full h-12 text-white mt-3 rounded-sm
                    bg-slate-950 hover:bg-blue-900'>
                    <h1>see banner details</h1>
                   </button>
                   </Link>
                  </li>
                  
                 
                );
              })}
            </ul>
          )}
          {Object.keys(groupedProducts).length === 0 && <p className='lg:text-5xl md:text-3xl h-screen max-md:text-2xl text-blue-950'>
          No Equipments with banner found!
        </p>}
        </>
      )}
    </div>
  );
};

export default Equipment4;

