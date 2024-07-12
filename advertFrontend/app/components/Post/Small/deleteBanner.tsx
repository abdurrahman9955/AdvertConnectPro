import { useState } from 'react';
import { deleteBanner } from '@/app/utils/banner';
import { FaRegWindowClose } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Cookies from 'js-cookie';

interface DeleteProductButtonProps {
  productId: number; 
};

const DeleteBanner: React.FC<DeleteProductButtonProps> = ({ productId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const [orderVisible, setOrderVisible] = useState(false);

  const handleDeleteClick = ()=>{
    setOrderVisible(!orderVisible);

 };      const  closeDelete = ()=> {
       setOrderVisible(false);  
      };

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError(null);
      await deleteBanner(productId); 
      setSuccess(true);
      window.alert('Product deleted successfully!');
      setOrderVisible(false);  
      window.location.reload();
    } catch (err:any) {
      setError(err.message || 'Failed to delete product');
      window.alert('failed to deleted product!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
     
      <button
        onClick={handleDeleteClick}
        disabled={loading}
        className={'pl-4   text-black  '}
      >
       <BsThreeDotsVertical size={24}/>
      </button>


           {orderVisible &&  (
                <div className='fixed md:top-20   max-md:top-10 right-96  max-md:left-2
                 flex justify-center text-xl bg-slate-300 border-2 border-black p-2
                  flex-col w-48 h-28'>
                   
                <div className='flex flex-row text-slate-950
                  text-sm mb-2 gap-2'>
                  <FaRegWindowClose size={24} onClick={closeDelete}/>
                  <h1>delete this product</h1>
                </div>

                  <button
                  onClick={handleDelete}
                  disabled={loading}
                  className={`px-1 py-1 text-sm bg-red-900 text-white hover:bg-red-600
                   rounded
                   ${ loading ? 'opacity-50 cursor-not-allowed' : '' }`}
                >
                  {loading ? 'Deleting...' : 'Delete Product'}
                </button>
                </div> ) }
    </div>
  );
};

export default DeleteBanner;
