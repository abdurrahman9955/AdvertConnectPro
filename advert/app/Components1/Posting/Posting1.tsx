import React, { useState, useEffect } from 'react';
import { getImages } from '@/app/utils/images';
import LikeImageProduct from './media/likes';
import DislikeImageProduct from './media/dislike';
import ViewRating from './media/viewRating';
import AddToFavorites from './media/favorite';
import { FaShareNodes } from "react-icons/fa6";
import Link from 'next/link';
import { RootState } from '@/app/app/store';
import { useSelector } from 'react-redux';
import { getSettings } from '@/app/utils/settings';
import SharingImages from './media/share';

interface Product {
  id: number;
  userId: string;
  productId: string;
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

const ProductImages: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userCurrency, setUserCurrency] = useState<string | null>(null);
  const [conversionRates, setConversionRates] = useState<{ [key: string]: number } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 20;

  const filter = useSelector((state: RootState) => state.filter);
  const searchQuery = useSelector((state: RootState) => state.search.query);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        //@ts-ignore
        const response: ImageResponse = await getImages(filter, searchQuery);
        if (response.success && Array.isArray(response.images)) {
          setProducts(response.images);
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

  const productsWithImages = products.filter((product) => product.mediaUrl && product.mediaUrl.length > 0);

  const totalPages = Math.ceil(productsWithImages.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = productsWithImages.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='font-bold text-xl min-h-screen'>
      {isLoading ? (
        <p className='lg:text-5xl md:text-3xl w-full h-screen max-md:text-2xl text-blue-950'>
          Loading Product Images...
        </p>
      ) : (
        <>
          {currentProducts.length > 0 && (
            <ul className='grid grid-cols-4 max-xl:grid-cols-3 h-auto max-sm:grid-cols-1 max-lg:grid-cols-2 max-md:grid-cols-2 gap-2'>
              {currentProducts.map((product) => (
                <li key={product.id} onClick={() => handleProductClick(product.id)} className='border-4 border-slate-950 bg-white p-5'>
                  <span className='flex justify-between mb-2 text-2xl'>
                    <h2>{product.productName}</h2>
                    <SharingImages productUrl={'https://advertconnectpro.com/Product'} 
                    //@ts-ignore
                    productName={product.productName} 
                    productImageUrl={product.mediaUrl} />
                  </span>
                  <div className='flex justify-between'>
                    <span className='flex flex-row mb-2'>
                      <p className='ml-5'>{convertPrice(product.price || 0, product.currency || 'USD').currency} {convertPrice(product.price || 0, product.currency || 'USD').price}</p>
                    </span>
                    <p>{product.country}</p>
                  </div>
                  {product.mediaType === 'PHOTO' && (
                    <div className='relative'>
                      <img src={product.mediaUrl} alt={`Product image for ${product.productName || 'Product'}`} width={300} height={300} className='w-full border-2 border-slate-900 rounded-lg' />
                      <span className='absolute top-0 right-0'>
                        <AddToFavorites productId={product.id.toString()} />
                      </span>
                    </div>
                  )}
                  <div className='flex justify-between flex-wrap'>
                    <button className='flex flex-row bg-blue-50 border-2 border-black rounded-full mt-3 p-3'>
                      <LikeImageProduct productId={product.id.toString()} />
                      <DislikeImageProduct productId={product.id.toString()} />
                    </button>
                    <ViewRating productId={product.id.toString()} />
                  </div>
                  <p>Company Name: {product.companyName ? product.companyName : "was not provided"}</p>
                  <p>Company Link: {product.companyLink ? <a href={product.companyLink} target="_blank" rel="noopener noreferrer" className='text-blue-700 ml-5'>{product.companyLink}</a> : "was not provided"}</p>
                  <Link href={`/Product/${product.id}`}>
                    <button className='w-full h-12 text-white mt-3 rounded-sm bg-slate-950 hover:bg-blue-900'>
                      <h1>see product details</h1>
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {currentProducts.length === 0 && <p className='lg:text-5xl md:text-3xl 
          h-screen max-md:text-2xl text-blue-950'>No products with images found!</p>}

          <div className='flex justify-center mt-4'>
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index} onClick={() => handlePageChange(index + 1)} 
              className={`mx-1 px-3 py-1 border 
              ${currentPage === index + 1 ? 'bg-blue-900 text-white border-2 rounded-md border-white' : 
              'bg-white text-black rounded-md border-2 border-black'}`}>
                {index + 1}
              </button>
            ))}
          </div>

        </>
      )}
    </div>
  );
};

export default ProductImages;
