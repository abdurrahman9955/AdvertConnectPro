import React, { useEffect, useState } from 'react';
import { FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa';
import { getBannerRatings } from '@/app/utils/rateBanner';
import Cookies from 'js-cookie';


const ViewRating1 = ({ productId }: { productId: string }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [numberOfUsersRated, setNumberOfUsersRated] = useState(0);

  useEffect(() => {

    const fetchRatings = async () => {
      try {
        const ratings = await getBannerRatings(productId);
        const totalRatings = ratings.reduce((acc: number, rating: any) => acc + rating.value, 0);
        const avgRating = totalRatings / ratings.length;
        setAverageRating(avgRating);
        setNumberOfUsersRated(ratings.length);
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };
    fetchRatings();
  }, [productId]);



  const renderAverageRating = () => {
    const stars = [];
    const roundedRating = Math.round(averageRating * 2) / 2; 
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(<FaStar key={i} color="gold" size={14} />);
      } else if (i - 0.5 === roundedRating) {
        stars.push(<FaStarHalf key={i} color="gold" size={14} />);
      } else {
        stars.push(<FaRegStar key={i} color="gray" size={14} />);
      }
    }
    return stars;
  };



  return (

    <div className="">
      <div className="flex flex-row pt-2 gap-1">
        {renderAverageRating()}
      </div>
      <p>{numberOfUsersRated} {numberOfUsersRated === 1 ? 'user' : 'users'} rated</p>
    </div>

  );

};

export default ViewRating1;