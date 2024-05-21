import { useState, useEffect } from 'react';
import { dislikeBanner, getDislikeBanner } from '@/app/utils/dislikeBanner';
import { BiDislike, BiSolidDislike} from "react-icons/bi";
import Cookies from 'js-cookie';

interface DislikeButtonProps {
  productId: string;
}

const DislikeBannerProduct1: React.FC<DislikeButtonProps> = ({ productId }) => {
  const [disliked, setDisliked] = useState<boolean>(false);
  const [dislikeCount, setDislikeCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDislikeCount = async () => {
      try {
        setLoading(true);
        const count = await getDislikeBanner(productId);
        setDislikeCount(count);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dislike count:', error);
        setLoading(false);
      }
    };
    fetchDislikeCount();
  }, [productId]);

  const handleDislikeClick = async () => {
    try {
      setLoading(true);
      const response = await dislikeBanner(productId);
      if (response.success) {
        setDisliked((prevState) => !prevState);
        setDislikeCount((prevState) => (disliked ? prevState - 1 : prevState + 1));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error disliking image:', error);
      setLoading(false);
    }
  };

  return (
    <button>
    
    </button>
  );
};

export default DislikeBannerProduct1;

