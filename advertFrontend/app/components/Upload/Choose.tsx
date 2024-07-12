import React from 'react';
import Select, {   ActionMeta } from 'react-select';
import  ValueType from 'react-select';
import CountryFlag from 'react-country-flag';
import { countries, } from 'countries-list';



interface CountryOption {
    label: React.ReactNode;
    value: string;
  }
  
  interface CountrySelectProps {
     //@ts-ignore
     onSelect: (option: ValueType<CountryOption, false, ActionMeta<CountryOption>>) => void;

  }
 
  const Choose: React.FC<CountrySelectProps> = ({ onSelect }) => {
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
        placeholder="+234"
        //@ts-ignore
        onChange={(option: ValueType<CountryOption, false, ActionMeta<CountryOption>>) => onSelect(option)}
        components={{ Option: CustomOption }} 
        menuPlacement="auto"
       
      />
    );
  };

  const CustomOption: React.FC<{ innerProps: any; label: any }> = ({ innerProps, label }) => (
    <div {...innerProps}>{label}</div>
  );
  
  
  export default Choose;