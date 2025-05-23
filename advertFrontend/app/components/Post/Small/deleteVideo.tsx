import { useState } from 'react';
import { deleteVideo } from '@/app/utils/videos';
import { FaRegWindowClose } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

interface DeleteProductButtonProps {
  productId: number; 
};

const DeleteVideo: React.FC<DeleteProductButtonProps> = ({ productId }) => {
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
      await deleteVideo(productId); 
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
                <div className='fixed md:top-20 right-96 max-md:top-10  max-md:left-2
                 flex justify-center text-sm bg-slate-300 border-2 border-black p-5
                  flex-col w-48 h-28'>
                  
                <div className='flex flex-row text-slate-950  text-sm mb-2 gap-2'>
                  <FaRegWindowClose size={24} onClick={closeDelete}/>
                  <h1>delete this product</h1>
                </div>

                  <button
                  onClick={handleDelete}
                  disabled={loading}
                  className={`px-1 text-sm py-1 bg-red-900 text-white
                   hover:bg-red-600 rounded
                   ${ loading ? 'opacity-50 cursor-not-allowed' : '' }`}
                >
                  {loading ? 'Deleting...' : 'Delete Product'}
                </button>
                </div> ) }
    </div>
  );
};

export default DeleteVideo;
