import React, { useEffect, useState } from 'react';
import { getCommentsImages } from '@/app/utils/commentImages';
import { FaUser } from 'react-icons/fa';
import { FaRegUserCircle } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: number;
  userId: number;
  content: string;
  User: {
    firstName: string;
    lastName: string;
    profile: {
      photoUrl: string;
    };
  };
  createdAt: string;
}

interface Props {
  productId: string;
}

const CommentListImages: React.FC<Props> = ({ productId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getCommentsImages(productId);
        console.log('Comments data:', commentsData);
        setComments(commentsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [productId]);

  const toggleExpandedComment = (commentId: number) => {
    if (expandedComments.includes(commentId)) {
      setExpandedComments(expandedComments.filter(id => id !== commentId));
    } else {
      setExpandedComments([...expandedComments, commentId]);
    }
  };

  if (loading) {
    return <div>Loading comments...</div>; 
  }

  if (comments.length === 0) {
    return <div>No comments available.</div>; 
  }

  return (
    <div className="mt-8 text-xl">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {comments.map(comment => (
        <div key={comment.id} className="mb-4">
          <div className="flex items-center mb-2">
            {comment.User.profile.photoUrl ? (
              <img
                src={comment.User.profile.photoUrl}
                alt={`${comment.User.firstName}`}
                className="w-10 h-10 rounded-full mr-2"
              />
            ) : (
              <FaRegUserCircle  className="w-10 h-10 rounded-full mr-2 text-gray-900" />
            )}
            <div>
              <p className="font-bold text-2xl">
                {comment.User.firstName || 'User'} {comment.User.lastName || ''}
              </p>

              <p className="text-gray-600 text-lg">
                {formatDistanceToNow(new Date(comment.createdAt))} ago
              </p>

            </div>
          </div>
          <div className="whitespace-pre-line">
            {comment.content.length > 100 && !expandedComments.includes(comment.id) ? (
              <>
                {comment.content.slice(0, 100)}...
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => toggleExpandedComment(comment.id)}
                >
                  Read more
                </button>
              </>
            ) : (
              comment.content
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentListImages;

