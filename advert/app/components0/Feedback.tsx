'use client'
import React, { useState } from 'react'
import { FaStar, FaStarHalf } from 'react-icons/fa'; 
import { useDispatch,useSelector } from 'react-redux';
import { submitFeedback } from '../utils/feedback';
import { submitFeedbackRequest, submitFeedbackSuccess, } from '../app/feedbackActions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Feedback = () => {

    const router = useRouter();

    const user = useSelector((state:any) => state.user); 

    const [rating, setRating] = useState(0);

    const dispatch = useDispatch();
    
    const feedbackState = useSelector((state:any) => state.feedback);

    const [formData, setFormData] = useState({
    name: '',
    reason: '',
    statement: '',
    rating: 0,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
    const handleInputChange = (e: any) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const resetPage = () => {
      setFormData({
        name: '',
        reason: '',
        statement: '',
        rating: 0,
      });
      setError('');
      setSuccessMessage('');
      setLoading(false);
    };
    
    const handleSubmitFeedback = async () => {
      try { setError('');
  
        const { name, reason, statement, rating } = formData;
  
        if (!name || !reason || !statement || rating === 0) {
          setError('All fields are required, including a valid rating.');
          return;
        }

        setLoading(true);
        dispatch(submitFeedbackRequest(formData));
        //@ts-ignore
        const response = await submitFeedback(dispatch, formData);
        console.log('Feedback submission response:', response);
       //@ts-ignore
        dispatch(submitFeedbackSuccess(response));
  
        setSuccessMessage('Feedback submitted successfully!');

  
        setFormData({
          name: '',
          reason: '',
          statement: '',
          rating: 0,
        });

        resetPage();

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
        
      } catch (error: any) {
        console.error('Error submitting feedback:', error.message);
        setError('Feedback submitted successfully!');

        setTimeout(() => {
          resetPage();
        }, 3000);
      } finally {
        setLoading(false);
      }
      
    };
         
       const handleRatingChange = (newRating: any) => {
      if (newRating === rating) {
        setRating(0);
      } else {
     setRating(newRating);
     setFormData({
     ...formData,
     rating: newRating,
           }); }  };
    
        const renderStars = () => {
             const stars = [];

        for (let i = 1; i <= 5; i++) {
          if (i <= rating ) {
              stars.push(
              <FaStar
              key={i}
              color="gold"
              size= {24}
              onClick={() => handleRatingChange(i - 0.5)}
              />
            );
          } else if (i - 0.5 === rating ){
              stars.push(
              <FaStarHalf
              key={i}
              color="gold"
              size={24}
              onClick={() => handleRatingChange(i - 0.5)}
              />
            );
          } else {
              stars.push(
              <FaStar  key={i}
              color="black" size={24}
              onClick={() => handleRatingChange(i)}
              />  );  } } return stars;  } ; 

     return (
      <div className='border-4 border-purple-950'>
       <div className='flex justify-center '>
        <div className=' items-center   text-yellow-950  text-5xl max-md:text-2xl max-sm:text-xl'>
          </div>
           <div className='flex flex-col mt-10 gap-2 md:w-2/5  max-md:w-5/6 max-sm:w-full max-sm:m-1
            '>
              
            <div className='flex justify-center  items-center text-blue-950 font-bold 
            text-3xl'>
             <h1 className='text-text-4xl  mb-5 max-sm:text-xl
             '>send us your feedback/advice here </h1>
            </div>

           <div className='flex justify-center'>
           <Link href={{pathname:'/Feedback/feedbackList'}}><button  type='button'
           className=' rounded-full bg-green-950  px-5 hidden
           text-2xl text-white  py-2 mt-10 hover:bg-purple-950 mb-2'>
           see all feedbacks </button>  </Link></div>

            <label className=' text-xl font-bold pl-5 text-left mt-1   
            '>write your name here</label>
            <input type='text' className='flex justify-center 
            border-4 border-black h-10  bg-white '
            name='name'
            value={formData.name}
            onChange={handleInputChange} />

            <label className=' text-xl font-bold pl-5 mt-6 
            '>write  your tips/advice about </label>
            <textarea className='flex justify-center border-4
             border-black h-20 ' 
             name='reason'
             value={formData.reason}
             onChange={handleInputChange}/>

            <label className=' text-xl font-bold pl-5 mt-6  
            '>write your statement here</label>
            <textarea className='flex justify-center border-4 mb-5
             border-black h-60 ' 
             name='statement'
             value={formData.statement}
             onChange={handleInputChange}/>



             <h1 className=' text-3xl p-2   border-4  border-indigo-950 font-bold
             max-sm:text-xl'>
                give us your rating here </h1>
                <div className='flex flex-row py-4 gap-4 pl-2'>
             {renderStars()}
             </div>
             <p className=' text-3xl p-2   border-4  border-indigo-950 font-bold 
             max-sm:text-xl'>your rating: {rating || 'no rating yet'}</p>

       
             {error && (
             <div className='flex justify-center text-green-800 text-2xl font-bold m-5'>
              {error}
             </div>
            )} 


            {successMessage && (
            <div className='flex justify-center text-green-500 text-2xl m-5 '>
            {successMessage}
            </div>
            )}
             
              <button type='submit' className='flex justify-center text-lg text-slate-50 mt-5 mb-20 
              bg-black   hover:bg-green-950  rounded-full py-2 font-bold '
              onClick={handleSubmitFeedback}
              disabled={loading }
              >{loading ? 'Submitting...' : 'Send your feedback'}</button>
              </div>
    
        </div>       
    </div>
  )
}

export default Feedback

