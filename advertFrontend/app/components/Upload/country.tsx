import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import   ValueType  from 'react-select';


interface Country {
  value: string;
  label: string;
}

const CountrySelect: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countryOptions: Country[] = data.map((country: any) => ({
          value: country.name.common,
          label: country.name.common
        }));
        setCountries(countryOptions);
      } catch (error) {
        console.error('Error fetching countries: ', error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (selectedOption:any) => {
    setSelectedCountry(selectedOption);
  };

  return (
    <div>
      <h2>Select a Country</h2>
      <Select
        value={selectedCountry}
        onChange={handleChange}
        options={countries}
        placeholder="Select a country"
      />
      {selectedCountry && (
        <div>
          <h3>Selected Country:</h3>
        {/*@ts-ignore */}
          <p>{selectedCountry.label}</p>
        </div>
      )}
    </div>
  );
};

export default CountrySelect;
