'use client'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedbacks, deleteFeedback } from '../utils/feedback';
import { getFeedbacksSuccess, getFeedbacksFailure,} from '../app/feedbacks';
import { RootState } from '../app/store';
import { useRouter } from 'next/navigation';

interface Feedback {
  id: number;
  name: string;
  topic: string;
  statement: string;
  rating: number;
  subComments?: Feedback[];
}

const Feedback1: React.FC = () => {

  const router = useRouter();

  const dispatch = useDispatch();
  const feedbacks: Feedback[] = useSelector((state:any) => state.feedback.feedbacks);
  const user = useSelector((state: RootState) => state.user); 
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [expandedFeedbacks, setExpandedFeedbacks] = useState<number[]>([]);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/Sign_In');
    } else {
      fetchFeedbacks();
    }
  }, [router]);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await getFeedbacks();
         //@ts-ignore
        dispatch(getFeedbacksSuccess(response.data));
         //@ts-ignore
        setFeedbackCount(response.data.length); 
    } catch (error: any) {
      console.error('Error fetching feedbacks:', error.message);
      dispatch(getFeedbacksFailure('Failed to fetch feedbacks'));
    } finally {
        setLoading(false);
    }
};

  const handleFeedbackClick = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
  };

  const handleSubCommentClick = (feedbackId: number) => {
    setExpandedFeedbacks((prevExpandedFeedbacks) => {
      if (prevExpandedFeedbacks.includes(feedbackId)) {
        return prevExpandedFeedbacks.filter((id) => id !== feedbackId);
      } else {
        return [...prevExpandedFeedbacks, feedbackId];
      }
    });
  };

  const handleDelete = async (feedbackId: number) => {
    try {

      const token = localStorage.getItem('accessToken') ?? '';

      await deleteFeedback(feedbackId);

      const response = await getFeedbacks();
      //@ts-ignore
      dispatch(getFeedbacksSuccess(response.data));

      setSelectedFeedback(null);
    } catch (error:any) {
      console.error('Error deleting feedback:', error.message);
      dispatch(getFeedbacksFailure('Failed to delete feedback'));
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center text-3xl h-screen">Loading...</div>; 
   
}

  return (
    <div>
       <div className="flex justify-center text-3xl font-bold m-3">
        Total Feedbacks: {feedbackCount}
      </div>
    <div className="flex justify-center gap-5 flex-row flex-wrap container mx-auto mt-5">
      {feedbacks.map((feedback) => (
        <div key={feedback.id} className=" 
        mb-4 p-4 border-4 border-gray-900
        bg-slate-200 w-80 md:max-w-xl md:w-auto  rounded max-sm:w-full max-sm:mx-3">
          <div
            onClick={() => handleFeedbackClick(feedback)}
            className="cursor-pointer text-blue-950 font-bold text-xl "
          >
            {feedback.name}'s Feedback
          </div>

          <button
            onClick={() => handleSubCommentClick(feedback.id)}
            className=" text-gray-950 mt-1 text-lg"
          >
            {expandedFeedbacks.includes(feedback.id) ? 'Hide feedback' : 'click above to see the feedback'}
          </button>
          {selectedFeedback === feedback && (
            <div className="mt-2">
              <p>
                <span className="font-semibold">Name:</span> {feedback.name}
              </p>
              <p>
                <span className="font-semibold">Topic:</span> {feedback.topic}
              </p>
              <p>
                <span className="font-semibold">Statement:</span> {feedback.statement}
              </p>
              <p>
                <span className="font-semibold">Rating:</span> {feedback.rating}
              </p>

              <button
                  onClick={() => handleDelete(feedback.id)}
                  className="bg-red-500 text-white p-2 rounded mt-2"
                >
                  Delete Contact
                </button> 
              
            </div>
          )}


          {expandedFeedbacks.includes(feedback.id) && (
            <div className="mt-2 ">
              {feedback.subComments?.map((subComment: Feedback) => (
                <div key={subComment.id}>
                  <p>
                    <span className="font-semibold">Name:</span> {subComment.name}
                  </p>

                  <p>
                    <span className="font-semibold">Topic:</span> {subComment.topic}
                  </p>

                  <p>
                    <span className="font-semibold">Rating:</span> {subComment.rating}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default Feedback1;

