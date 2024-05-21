import { useState } from 'react';
import { FaRegWindowClose } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { addToFavoriteBanner } from '@/app/utils/favoriteBanner';
import Cookies from 'js-cookie';

interface DeleteProductButtonProps {
  productId: string; 
};

const DeleteBanner: React.FC<DeleteProductButtonProps> = ({ productId }) => {

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
      await addToFavoriteBanner(productId);
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
       <BsThreeDotsVertical size={40}/>
      </button>


           {orderVisible &&  (
                <div className='fixed md:top-20 right-96 max-md:top-10  max-md:left-2
                 flex justify-center text-xl bg-slate-300 border-4 border-black p-5
                  flex-col w-80 h-40'>
                   
                <div className='flex flex-row text-slate-950 sm:text-xl text-xl mb-3 gap-5'>
                  <FaRegWindowClose size={40} onClick={closeDelete}/>
                  <h1>delete from favorite</h1>
                </div>

                  <button
                  onClick={handleRemoveFromFavorites}
                  disabled={isLoading}
                  className={`px-4 py-2 bg-red-900 text-white hover:bg-red-600 rounded
                   ${ isLoading ? 'opacity-50 cursor-not-allowed' : '' }`}
                >
                  {isLoading ? 'Deleting...' : 'Delete Favorite'}
                </button>
                </div> ) }
    </div>
  );
};

export default DeleteBanner;
