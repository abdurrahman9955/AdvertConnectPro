import React, { useState, useEffect } from 'react';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import { giveImagesRating, } from '@/app/utils/rateImages';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


const Rating = ({ productId }: { productId: string }) => {

  const router = useRouter();

  const [ratings, setRatings] = useState<any>([]);
  const [formData, setFormData] = useState({ value: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitRating = async () => {
    try {

      const token = Cookies.get('accessToken');
      if (!token) {
        router.push('/Sign_In');
        return;
      }
      
      setIsLoading(true);
      await giveImagesRating(productId, formData);
      setRatings([...ratings, formData.value]);
      console.log('Rating submitted successfully');
      setIsLoading(false); 
      alert('Rating submitted successfully'); 
      window.location.reload();
    } catch (error) {
      console.error('Error submitting rating:', error);
      setIsLoading(false);
    }
  };
  
  const handleRatingChange = (newRating: number) => {
    if (newRating === ratings.length) {
      setRatings([]);
      setFormData({ value: 0 });
    } else {
      setRatings(Array.from({ length: newRating }, (_, i) => i + 1));
      setFormData({ ...formData, value: newRating });
    }
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= ratings.length) {
        stars.push(
          <FaStar
            key={i}
            className='text-yellow-500 text-xl max-sm:text-sm'
            onClick={() => handleRatingChange(i - 0.5)}
          />
        );
      } else if (i - 0.5 === ratings.length) {
        stars.push(
          <FaStarHalf
            key={i}
            className='text-yellow-500 text-xl max-sm:text-sm'
            onClick={() => handleRatingChange(i - 0.5)}
          />
        );
      } else {
        stars.push(
          <FaStar
            key={i}
            color="black"
            className='text-xl max-sm:text-sm'
            onClick={() => handleRatingChange(i)}
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className=''>
      <div className='flex flex-row py-2 gap-1 mt-4 max-sm:mt-5 sm:ml-2  '>
        {renderStars()}
      </div>

      <button className="bg-blue-950 hover:bg-green-950 max-sm:hidden text-sm
        text-white px-4 h-7 max-sm:h-6 mt-2 rounded"
        onClick={handleSubmitRating}
        disabled={isLoading}> 
        {isLoading ? 'Submitting...' : 'Submit Rating'}
      </button>

      <button className="bg-blue-950 hover:bg-green-950 sm:hidden text-sm
        text-white px-4 h-7 max-sm:h-6  mt-2 rounded"
        onClick={handleSubmitRating}
        disabled={isLoading}> 
        {isLoading ? 'Sub...' : 'Submit'}
      </button>
    </div>
  );
}

export default Rating;

