import React from 'react';
import Select from 'react-select';
import CountryFlag from 'react-country-flag';
import { countries, TCountries } from 'countries-list';
import { useState } from 'react';

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
    textAlign: 'start',
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    textAlign: 'start',
  }),
};

interface CountryOption {
  label: React.ReactNode;
  value: string;
}

interface CountrySelectProps {
  onSelect: (option: { label: string; value: string }) => void;
}

const Choose3: React.FC<CountrySelectProps> = ({ onSelect }) => {
  const [selectedCountry, setSelectedCountry] = useState('');

  const countryOptions: CountryOption[] = Object.keys(countries).map((countryCode: string) => ({
    value: countries[countryCode as keyof TCountries].name, 
    label: (
      <>
        <CountryFlag countryCode={countryCode} svg style={{ marginRight: '8px' }} />
        {`${countries[countryCode as keyof TCountries].name} (${countryCode})`}
      </>
    ),
  }));

  const handleSelect = (option: { label: string; value: string }) => {
    //@ts-ignore
    setSelectedCountry(option);
    onSelect(option);
  };

  return (
    <Select
      //@ts-ignore
      options={countryOptions}
      styles={customStyles}
      //@ts-ignore
      onChange={handleSelect}
      value={selectedCountry}
      placeholder="Select Your Country"
      menuPlacement="auto"
    />
  );
};

export default Choose3;
