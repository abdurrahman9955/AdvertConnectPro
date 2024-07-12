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


const Choose4:React.FC = () => {

  const options = [
   
    { value: 'option1', label: 'Brand New' }, 
    { value: 'option2', label: 'Used' },
   
   
    
  ];

  return (
    <div>
     
      <Select
       options={options}
       styles={customStyles}
       placeholder='Choose a condition'
       className=' w-full focus:outline-none  '  />
    </div>
  );
};

export default Choose4;




