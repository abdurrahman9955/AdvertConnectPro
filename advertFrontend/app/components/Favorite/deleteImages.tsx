import { useState } from 'react';
import { FaRegWindowClose } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { addToFavoriteImages } from '@/app/utils/favoriteImages';
import Cookies from 'js-cookie';

interface DeleteProductButtonProps {
  productId: string; 
};

const DeleteImages: React.FC<DeleteProductButtonProps> = ({ productId }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [orderVisible, setOrderVisible] = useState(false);

  const handleDeleteClick = ()=>{
    setOrderVisible(!orderVisible);

 };      const  closeDelete = ()=> {
       setOrderVisible(false);  
      };

  const handleRemoveFromFavorites = async () => {
    setIsLoading(true);

    try {
      await addToFavoriteImages(productId);
      Cookies.set(`favorite_${productId}`, 'false');
      alert('Product removed from favorites successfully!');
      setOrderVisible(false); 
      window.location.reload();
    } catch (error) {
      console.error('Error removing product from favorites:', error);
      alert('Failed to remove product from favorites');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
     
      <button
        onClick={handleDeleteClick}
        disabled={isLoading}
        className={'pl-4   text-black  '}
      >
       <BsThreeDotsVertical size={24}/>
      </button>


           {orderVisible &&  (
                <div className='fixed md:top-20 right-96 max-md:top-10  max-md:left-2
                 flex justify-center text-sm bg-slate-300 border-2 border-black p-2
                  flex-col w-60 h-32'>
                   
                <div className='flex flex-row text-slate-950  text-sm mb-3 gap-2'>
                  <FaRegWindowClose size={24} onClick={closeDelete}/>
                  <h1>delete from favorite?</h1>
                </div>

                  <button
                  onClick={handleRemoveFromFavorites}
                  disabled={isLoading}
                  className={`px-4 text-sm py-1 bg-red-900 text-white hover:bg-red-600 rounded
                   ${ isLoading ? 'opacity-50 cursor-not-allowed' : '' }`}
                >
                  {isLoading ? 'Deleting...' : 'Delete Favorite'}
                </button>
                </div> ) }
    </div>
  );
};

export default DeleteImages;
