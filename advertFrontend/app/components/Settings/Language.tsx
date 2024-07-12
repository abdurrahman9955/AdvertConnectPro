import React from 'react';
import Select from 'react-select';
import   ValueType  from 'react-select';
import  OptionTypeBase from 'react-select';
import CountryFlag from 'react-country-flag';
import { countries, TCountries } from 'countries-list';
import  {   GroupBase, ActionMeta } from 'react-select';



interface CountryOption {
    label: React.ReactNode;
    value: string;
  }
  
  interface CountrySelectProps {
    // @ts-ignore
    onSelect: (option: ValueType<CountryOption, false, ActionMeta<CountryOption>>) => void;
  }
  
  const Language: React.FC<CountrySelectProps> = ({ onSelect }) => {
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
        placeholder="Select your language"
        // @ts-ignore
        onChange={(option: ValueType<CountryOption, false, ActionMeta<CountryOption>>) => onSelect(option)}
        components={{ Option: CustomOption }} 
      />
    );
  };
  
  const CustomOption: React.FC<any> = ({ innerProps, label }) => (
    <div {...innerProps}>{label}</div>
  );
  
  export default Language;

