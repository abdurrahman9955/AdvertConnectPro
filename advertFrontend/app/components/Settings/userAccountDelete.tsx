import { useState } from 'react';
import { FaRegWindowClose } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { deleteCurrentUser } from '@/app/utils/userToken';


const DeleteAccount = () => {
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
      await deleteCurrentUser(); 
      setSuccess(true);
      window.alert('Your account deleted successfully!');
      setOrderVisible(false);  
      window.location.reload();
    } catch (err:any) {
      setError(err.message || 'Failed to delete product');
      window.alert('failed to deleted your account!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
     
      <button
        onClick={handleDeleteClick}
        disabled={loading}
        className={'pl-4 w-full  text-white bg-red-950  hover:bg-red-800 '}
      >
       delete your account?
      </button>


           {orderVisible &&  (
                <div className='fixed md:top-20 right-96 flex justify-center 
                max-md:top-10  max-md:left-2
                 text-xl bg-slate-300 border-2 border-black p-2
                  flex-col w-64 h-64'>
                   
                <div className='flex font-bold flex-col text-slate-950 text-sm 
                 mb-3 gap-2'>
                  <FaRegWindowClose size={24} onClick={closeDelete}/>
                  <p>delete your account?</p>
                  <p>if you delete your account! </p>
                  <p>make sure that your account was deleted permanently!</p>
                  <p>and you cannot recover your account for ever. </p>
                </div>

                  <button
                  onClick={handleDelete}
                  disabled={loading}
                  className={`px-1 py-1 text-sm bg-red-900 text-white hover:bg-red-600
                   rounded
                   ${ loading ? 'opacity-50 cursor-not-allowed' : '' }`}
                >
                  {loading ? 'Deleting...' : 'Delete Account'}
                </button>

                </div> ) }
    </div>
  );
};

export default DeleteAccount;
