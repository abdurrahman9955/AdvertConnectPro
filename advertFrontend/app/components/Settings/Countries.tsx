import React from 'react';
import Select from 'react-select';
import   ValueType  from 'react-select';
import  OptionTypeBase from 'react-select';
import CountryFlag from 'react-country-flag';
import { countries, TCountries } from 'countries-list';
import  {   GroupBase, ActionMeta } from 'react-select';

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

interface CountryOption {
    label: React.ReactNode;
    value: string;
  }
  
  interface CountrySelectProps {
    // @ts-ignore
    onSelect: (option: ValueType<CountryOption, false, ActionMeta<CountryOption>>) => void;
  }
  
  const Countries: React.FC<CountrySelectProps> = ({ onSelect }) => {
    const countryOptions: CountryOption[] = Object.keys(countries).map((countryCode: string) => ({
      value: countryCode,
      label: (
        <>
          <CountryFlag countryCode={countryCode} svg style={{ marginRight: '8px' }} />
          {`${countries[countryCode as keyof TCountries].name} (${countryCode})`}
        </>
      ),
    }));
  
    return (
      <Select
        options={countryOptions}
        styles={customStyles}
        placeholder="Select Your Country"
        // @ts-ignore
        onChange={(option: ValueType<CountryOption, false, ActionMeta<CountryOption>>) => onSelect(option)}
        components={{ Option: CustomOption }} 
      />
    );
  };
  
  const CustomOption: React.FC<any> = ({ innerProps, label }) => (
    <div {...innerProps}>{label}</div>
  );
  
  export default Countries;

