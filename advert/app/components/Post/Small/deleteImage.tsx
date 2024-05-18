import { useState } from 'react';
import { deleteImage } from '@/app/utils/images';
import { FaRegWindowClose } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

interface DeleteProductButtonProps {
  productId: number; 
};

const DeleteImages: React.FC<DeleteProductButtonProps> = ({ productId }) => {
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
      await deleteImage(productId); 
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
       <BsThreeDotsVertical size={40}/>
      </button>


           {orderVisible &&  (
                <div className='fixed md:top-20 right-96 flex justify-center
                 max-md:top-10  max-md:left-2
                 text-xl bg-slate-300 border-4 border-black p-5
                  flex-col w-80 h-40'>
                  
                <div className='flex flex-row text-slate-950 sm:text-xl 
                text-xl mb-3 gap-5'>
                  <FaRegWindowClose size={40} onClick={closeDelete}/>
                  <h1>delete this product</h1>
                </div>

                  <button
                  onClick={handleDelete}
                  disabled={loading}
                  className={`px-4 py-2 bg-red-900 text-white hover:bg-red-600 rounded
                   ${ loading ? 'opacity-50 cursor-not-allowed' : '' }`}
                >
                  {loading ? 'Deleting...' : 'Delete Product'}
                </button>
                </div> ) }
    </div>
  );
};

export default DeleteImages;
