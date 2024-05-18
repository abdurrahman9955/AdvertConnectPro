
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Country {
  alpha2Code: string;
  name: string;
}

interface CountrySelectorProps {
  onSelectCountry: (country: string) => void;
}

const Country: React.FC<CountrySelectorProps> = ({ onSelectCountry }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  useEffect(() => {
    // Fetch all countries
    const fetchCountries = async () => {
      try {
        const response = await axios.get<Country[]>('https://restcountries.com/v2/all');
        const data = response.data;
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const country = event.target.value;
    setSelectedCountry(country);
    onSelectCountry(country);
  };

  return (
    <div className='focus:outline-none h-12'>
      <select id="country" value={selectedCountry} onChange={handleCountryChange}>
        {countries.map((country) => (
          <option key={country.alpha2Code} value={country.alpha2Code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Country;
