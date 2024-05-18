import { useState } from 'react';
import { deleteImage } from '@/app/utils/images';

interface DeleteProductButtonProps {
  productId: string; 
};

const DeleteProductButton: React.FC<DeleteProductButtonProps> = ({ productId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError(null);
      await deleteImage(productId); 
      setSuccess(true);
    } catch (err:any) {
      setError(err.message || 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Product deleted successfully!</p>}
      <button
        onClick={handleDelete}
        disabled={loading}
        className={`px-4 py-2 bg-red-500 text-white rounded ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Deleting...' : 'Delete Product'}
      </button>
    </div>
  );
};

export default DeleteProductButton;
