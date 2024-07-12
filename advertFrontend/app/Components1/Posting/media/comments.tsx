'use client'
import React, { useState} from 'react'
import { FaMessage } from "react-icons/fa6";
import { postCommentImages } from '@/app/utils/commentImages';
import { FaRegWindowClose } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Comments = () => {

  const router = useRouter();

  const [commentContent, setCommentContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);

  const handleCommentClick = ()=>{
    setCommentVisible(!commentVisible);

 };      const  closeComment = ()=> {
       setCommentVisible(false);  
      };

  const handleCommentSubmit = async () => {
    try {

      const token = Cookies.get('accessToken');
      if (!token) {
        router.push('/Sign_In');
        return;
      }

      if (!commentContent.trim()) {
        setError('Comment cannot be empty');
        return;
      }
      setError('');
      setLoading(true);
      await postCommentImages(commentContent);
      setSuccess(true);
      setLoading(false);
      setCommentVisible(false);  
    } catch (error) {
      setError('Failed to submit comment');
      setLoading(false);
      setCommentContent('');
    }
  };
     return (
           <div className=''>
                <div className='flex flex-row py-2 gap-1 text-xl mt-3 pl-1'>
                <FaMessage size={24} 
                className='sm:ml-14 max-sm:ml-8'/>
                </div>

                 <button className="bg-blue-950 hover:bg-green-950 max-sm:hidden  text-sm
                  text-white px-4 h-7 max-sm:h-6 mt-2 rounded"
                  onClick={handleCommentClick}
                  >
                   Make a Comment
                 </button>

                 <button className="bg-blue-950 hover:bg-green-950 sm:hidden  text-sm
                  text-white px-4 h-7 max-sm:h-6 mt-2 rounded"
                  onClick={handleCommentClick}>
                   Comment
                 </button>

                 <div >
                 {commentVisible && 
           
                ( <div className='fixed md:top-40 md:left-10 max-md:top-20  max-md:left-5 
                flex justify-center text-sm bg-slate-300 border-2 border-black p-2 flex-col'>
                <div className='flex flex-row text-slate-950 sm:text-lg text-sm mb-3
                 gap-2'>
                  <FaRegWindowClose size={24} onClick={closeComment}/>
                  <h1>Make your comment</h1>
                </div>
                <div>
                  <textarea
                    className='w-64 h-32  max-sm:w-64 p-2 border-2 border-black'
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                  />
                </div>
                <div className='flex justify-center'>
                  <button
                    className='flex justify-center w-28 h-7 bg-black hover:bg-green-900
                     text-white font-bold pt-1 rounded-sm'
                    onClick={handleCommentSubmit}
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>

                  {error && <p className="text-green-800 mt-3 flex justify-center"> submitted successfully!</p>}
                  {success && <p className="text-green-800 mt-3 flex justify-center"> submitted successfully!</p>}
                  {loading && <p className="text-blue-800 mt-3 flex justify-center">Submitting...</p>}
             
              </div> 
                 )
              
               }
               </div>

           </div>
  )
}

export default Comments

