import { useState, useEffect } from 'react';
import { BiDislike, BiSolidDislike} from "react-icons/bi";
import { likeImages, getLikeImages } from '@/app/utils/likeImages';

interface DislikeButtonProps {
  productId: string;
}

const DislikeImageProduct: React.FC<DislikeButtonProps> = ({ productId }) => {

  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {

    const localStorageLiked = localStorage.getItem(`liked_${productId}`);
    if (localStorageLiked === 'false') { 
      setLiked(true);
    }

    const fetchLikeCount = async () => {
      try {
        setLoading(true);
        const count = await getLikeImages(productId);
        setLikeCount(count);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching like count:', error);
        setLoading(false);
      }
    };

    fetchLikeCount();
  }, [productId]);

  
  
  const handleLikeClick = async () => {
    try {
      setLoading(true);
          await likeImages(productId);

          localStorage.setItem(`liked_${productId}`, 'false');
          setLikeCount((prevCount) => prevCount - 1); 
          setLiked(true);
        
    } catch (error) {
      console.error('Error liking image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button>
    
     
    </button>
  );
};

export default DislikeImageProduct;

