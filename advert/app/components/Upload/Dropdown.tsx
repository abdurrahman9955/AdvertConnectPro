
import React, { useState } from 'react';
import { Products, ProductItem } from './ProductDate';

interface DropdownProps {
  onSelectProduct: (product: string) => void;
  onSelectType: (type: string) => void;
  onSelectCategory: (category: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  onSelectProduct,
  onSelectType,
  onSelectCategory,
}) =>  {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const handleProductChange = (product: string) => {
    setSelectedProduct(product);
    setSelectedOption('');
    setSelectedSubcategory('');
    onSelectProduct(product);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setSelectedSubcategory('');
    onSelectType(option);
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    onSelectCategory(subcategory);
  };

  return (
    <div className="flex flex-col my-2 ">
       <div className='flex justify-center '>
      <select
        className="flex justify-center pl-2
         lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-full max-sm:mx-2
          h-12  mt-5 font-bold text-blue-950 gap-4
          border-4 border-blue-950 text-xl bg-white"
        onChange={(e) => handleProductChange(e.target.value)}
        value={selectedProduct}
      >
        <option value="">Select Product</option>
        {Products.map((product: ProductItem) => (
          <option key={product.id} value={product.name}>
            {product.name}
          </option>
        ))}
      </select>
      </div>

      {selectedProduct && (
        <div className="flex justify-center mt-4 ">
          <select 
            className="flex justify-center pl-2
            lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-4/5
            h-12  mt-2 font-bold text-blue-950 gap-4
            border-4 border-blue-950 text-xl bg-white"
            onChange={(e) => handleOptionChange(e.target.value)}
            value={selectedOption}
          >
            <option value="">Select Type</option>
            {Products.find((product) => product.name === selectedProduct)?.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedOption && (
        <div className="flex justify-center mt-4 ">
          <select
            className="flex justify-center lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-4/5
            h-12  mt-2 font-bold text-blue-950 gap-4 pl-2
            border-4 border-blue-950 text-xl bg-white"
            onChange={(e) => handleSubcategoryChange(e.target.value)}
            value={selectedSubcategory}
          >
            <option value="">Select Category</option>
            {Products.find((product) => product.name === selectedProduct)?.subcategories[selectedOption]?.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
        </div>
      )}

     
    </div>
  );
};

export default Dropdown;






