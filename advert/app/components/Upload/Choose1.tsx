import React from 'react';
import Select from 'react-select';
import Choose2 from './Choose2';

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: 'none',
    outline: 'none',
    borderColor: '#fff',
    flex: 'flex-start',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    borderRadius: state.isSelected ? 'bg-blue-600' : 'bg-white',
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    textAlign: 'start', // Adjust text alignment
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    textAlign: 'start', // Adjust text alignment
  }),
};

const Choose1:React.FC = () => {

  const options = [
    { value: 'option1', label: 'Accessories' },
    { value: 'option2', label: 'Animals' },
    { value: 'option3', label: ' Babies & kids' },
    { value: 'option4', label: 'Beverage' },
    { value: 'option5', label: 'Books' },
    { value: 'option6', label: 'Cloths' },   
    { value: 'option7', label: 'Coffee' },
    { value: 'option8', label: 'Electronics' },
    { value: 'option9', label: 'Equipments' }, 
    { value: 'option10', label: 'Event Center' },
    { value: 'option11', label: 'Fashion' },
    { value: 'option12', label: 'Foods' }, 
    { value: 'option13', label: 'Grocery' },
    { value: 'option14', label: 'Healthcare' },
    { value: 'option15', label: 'Hospitals' }, 
    { value: 'option16', label: 'Shops' },
    { value: 'option17', label: 'Materials' },
    { value: 'option18', label: 'Properties' }, 
    { value: 'option19', label: 'Recipes' },
    { value: 'option20', label: 'Restaurants' },
    { value: 'option21', label: 'Schools' }, 
    { value: 'option22', label: 'Software' },
    { value: 'option23', label: 'Stores' },
    { value: 'option24', label: 'Supermarkets' }, 
    { value: 'option25', label: 'Universities' },
    { value: 'option26', label: 'Vehicles' },
    { value: 'option27', label: 'Homes' }, 
    { value: 'option28', label: 'Jewelry' },
    { value: 'option29', label: 'Others' },
   
   
    
  ];

  return (
    <div>
     
      <Select
       options={options}
       styles={customStyles}
       placeholder='Category of your product'
       className=' w-full focus:outline-none  '  />
    </div>
  );
};

export default Choose1;