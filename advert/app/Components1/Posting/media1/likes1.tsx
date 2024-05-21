import { useState, useEffect } from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { BiDislike, BiSolidDislike} from "react-icons/bi";
import { likeBanner, getLikeBanner } from '@/app/utils/likeBanner';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface LikeButtonProps {
  productId: string;
}

const LikeBannerProduct1: React.FC<LikeButtonProps> = ({ productId }) => {

  const router = useRouter();

  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [disliked, setDisLiked] = useState<boolean>(false);

  useEffect(() => {

    const localStorageLiked = Cookies.get(`liked_${productId}`);
    if (localStorageLiked === 'true') { 
      setLiked(true);
    }

    const fetchLikeCount = async () => {
      try {
        setLoading(true);
        const count = await getLikeBanner(productId);
        setLikeCount(count);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching like count:', error);
        setLoading(false);
      }
    };

    fetchLikeCount();
  }, [productId]);

  useEffect(() => {

    const localStorageLiked = Cookies.get(`liked_${productId}`);
    if (localStorageLiked === 'false') { 
      setDisLiked(true);
    }

    const fetchLikeCount = async () => {
      try {
        setLoading(true);
        const count = await getLikeBanner(productId);
        console.log('like  banner:', count);
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

      const token = Cookies.get('accessToken');
      if (!token) {
        router.push('/Sign_In');
        return;
      }

      setLoading(true);
          await likeBanner(productId);
          Cookies.set(`liked_${productId}`, 'true', { expires: 360, path: '/' });
          setLikeCount((prevCount) => prevCount + 1); 
          setLiked(true);
         
        
    } catch (error) {
      console.error('Error liking image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisLikeClick = async () => {
    try {

      const token = Cookies.get('accessToken');
      if (!token) {
        router.push('/Sign_In');
        return;
      }

      setLoading(true);
          await likeBanner(productId);
          Cookies.set(`liked_${productId}`, 'false', { expires: 360, path: '/' });
          setLikeCount((prevCount) => prevCount - 1); 
          setDisLiked(true);
        
    } catch (error) {
      console.error('Error liking image:', error);
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <div className='flex flex-row'>
    <button
      onClick={handleLikeClick}
      className={`flex items-center gap-1 pr-5 mr-5 border-r-4 border-blue-950`}
    >
      {liked ? (
        <AiFillLike className="w-6 h-6 text-blue-950" />
      ) : (
        <AiOutlineLike className="w-6 h-6" />
      )}
      <span>{likeCount}</span>
    </button>

    <button
      onClick={handleDisLikeClick}
      className={`flex items-center gap-1 pr-3 `}
    >
     {disliked ? (
        <BiSolidDislike className="w-6 h-6 text-blue-950" />
      ) : (
        <BiDislike className="w-6 h-6" />
      )}
    </button>
    </div>
  );
};

export default LikeBannerProduct1;
