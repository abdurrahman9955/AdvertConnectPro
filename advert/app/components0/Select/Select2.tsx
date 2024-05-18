import React from 'react';
import Select, {   ActionMeta, GroupBase } from 'react-select';
import  OptionTypeBase from 'react-select';
import  ValueType from 'react-select';
import CountryFlag from 'react-country-flag';
import { countries, TCountries } from 'countries-list';



interface CountryOption {
    label: React.ReactNode;
    value: string;
  }
  
  interface CountrySelectProps {
    // @ts-ignore
    onSelect: (option: ValueType<CountryOption>) => void;
  }
  
  const Select2: React.FC<CountrySelectProps> = ({ onSelect }) => {
    const countryOptions: CountryOption[] = Object.keys(countries).map((countryCode: string) => ({
      value: countryCode,
      label: (
        <>
          <CountryFlag countryCode={countryCode} svg style={{ marginRight: '8px' }} />
          {`(+${(countries as any)[countryCode].phone})`}
        </>
      ),
    }));
  
    return (
      <Select
        options={countryOptions}
        placeholder="Code"
        // @ts-ignore
        onChange={(option: ValueType<CountryOption>) => onSelect(option)} 
        menuPlacement="auto"
       
      />
    );
  };
  
  export default Select2;