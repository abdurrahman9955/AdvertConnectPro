import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearch } from '../../Context/HomeContext';
import { ProductItem } from './ProductItem';
import { useRouter } from 'next/navigation';

interface All1Props {
  items: ProductItem[];
}

const All1: React.FC<All1Props> = ({ items }) => {

  const router = useRouter();

  const { searchTerm } = useSearch();

  const filteredItems = items.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex justify-between font-bold'>
      <div className='grid grid-cols-4 h-auto overflow-y-auto max-xl:grid-cols-3 max-sm:grid-cols-1 gap-3 max-lg:grid-cols-2 max-md:grid-cols-2'>
        {filteredItems.map(product => (
          <div key={product.id} className='w-full h-auto p-2 bg-white rounded-2xl'>
            <button className='w-full h-12 rounded-xl bg-green-00
             text-2xl max-sm:text-xl mb-1 hover:bg-green-00 text-black'>
              All {product.name} Are Here
            </button>

            <Image
              src={product.image}
              alt={`product-${product.id}`}
              width={500}
              height={500}
              className='border-4 border-black rounded-xl h-80 w-68'
            />

            <Link href={{ pathname: product.link }}>
              <button onClick={() => router.push(product.link)}
              className='w-full h-12 rounded-xl bg-blue-900 text-xl text-white 
              mt-1 hover:bg-green-800'>
              View All {product.name} Here
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default All1;
