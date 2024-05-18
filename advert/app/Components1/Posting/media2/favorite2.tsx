import React, { useState, useEffect } from 'react';
import { FaHeart} from 'react-icons/fa';
import { IoHeartOutline } from 'react-icons/io5';
import { addToFavoriteVideo, removeFavoriteVideo } from '@/app/utils/favoriteVideo';
import { useRouter } from 'next/navigation';

const AddToFavorites2 = ({ productId }: { productId: string }) => {

  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const localStorageLiked = localStorage.getItem(`favorite_${productId}`);
     if (localStorageLiked === 'true') { 
     setIsFavorite(true);
 }
}, [productId]);

useEffect(() => {

 const localStorageLiked = localStorage.getItem(`favorite_${productId}`);
  if (localStorageLiked === 'false') { 
  setIsFavorite(false);
}
}, [productId]);

  const handleAddToFavorites = async () => {
    setIsLoading(true);
    setError(null);

    try {

      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/Sign_In');
        return;
      }

      await addToFavoriteVideo(productId);
      localStorage.setItem(`favorite_${productId}`, 'true');
      setIsFavorite(true);
      alert('Product added to favorites successfully!');
    } catch (error) {
      console.error('Error adding product to favorites:', error);
      setError('Failed to add product to favorites');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromFavorites = async () => {
    setIsLoading(true);
    setError(null);

    try {

      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/Sign_In');
        return;
      }

      await addToFavoriteVideo(productId);
      localStorage.setItem(`favorite_${productId}`, 'false');
      setIsFavorite(false);
      alert('Product removed from favorites successfully!');
    } catch (error) {
      console.error('Error removing product from favorites:', error);
      alert('Failed to remove product from favorites');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites} 
      disabled={isLoading}
    >
     {isFavorite ? (
      <FaHeart color="blue" size={40} 
      className=' m-3'/> 
    ) : (
      <FaHeart color="black" size={40} 
      className=' m-3'/>
    )}
     
    </button>
  );
};

export default AddToFavorites2;
