import React, { useState } from 'react';
import { FaRegWindowClose } from "react-icons/fa";
import { postCommentBanner } from '@/app/utils/commentBanner';
import Cookies from 'js-cookie';

const Comment1 = ({ productId }: { productId: string }) => {
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
      if (!commentContent.trim()) {
        setError('Comment cannot be empty');
        return;
      }
      setError('');
      setLoading(true);
      await postCommentBanner(commentContent);
      setSuccess(true);
      setLoading(false);
      setCommentContent('');
    } catch (error) {
      setError('Failed to submit comment');
      setLoading(false);
    }
  };

  return (
    <div className='fixed top-40 left-30 flex justify-center text-sm bg-slate-300
     border-2 border-black p-2 flex-col'>
      <div className='flex flex-row text-slate-950 text-xl mb-3 gap-2'>
        <FaRegWindowClose size={24} onClick={closeComment}/>
        <h1>Make your comment</h1>
      </div>
      <div>
        <textarea
          className='w-64 h-32 max-sm:w-full p-3 border-2 border-black'
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">submitted successfully!</p>}
        {loading && <p className="text-blue-500">Submitting comment...</p>}
      </div>
      <div className='flex justify-center'>
        <button
          className='flex justify-center w-28 h-7 text-sm bg-black hover:bg-green-900 text-white font-bold pt-2 rounded-xl'
          onClick={handleCommentSubmit}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default Comment1;
