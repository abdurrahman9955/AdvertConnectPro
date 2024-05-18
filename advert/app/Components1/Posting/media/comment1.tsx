import React, { useState } from 'react';
import { FaRegWindowClose } from "react-icons/fa";
import { postCommentImages } from '@/app/utils/commentImages';

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
      await postCommentImages(commentContent);
      setSuccess(true);
      setLoading(false);
      setCommentContent('');
    } catch (error) {
      setError('Failed to submit comment');
      setLoading(false);
    }
  };

  return (
    <div className='fixed top-40 left-30 flex justify-center text-xl bg-slate-300 border-4 border-black p-5 flex-col'>
      <div className='flex flex-row text-slate-950 text-3xl mb-3 gap-5'>
        <FaRegWindowClose size={40} onClick={closeComment}/>
        <h1>Make your comment</h1>
      </div>
      <div>
        <textarea
          className='w-96 h-40 max-sm:w-full p-3 border-4 border-black'
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">submitted successfully!</p>}
        {loading && <p className="text-blue-500">Submitting comment...</p>}
      </div>
      <div className='flex justify-center'>
        <button
          className='flex justify-center w-40 h-10 bg-black hover:bg-green-900 text-white font-bold pt-2 rounded-xl'
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
