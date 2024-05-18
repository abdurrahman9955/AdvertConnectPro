import React, { useState, useEffect } from 'react';

interface StateSelectorProps {
  selectedCountry: string;
}

const States: React.FC<StateSelectorProps> = ({ selectedCountry }) => {
  const [states, setStates] = useState<string[]>([]);

  useEffect(() => {
  
    const statesMap: { [key: string]: string[] } = {
      us: ['California', 'Texas', 'New York', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'],
      canada: ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba', 'Saskatchewan', 'Nova Scotia', 'New Brunswick', 'Newfoundland and Labrador', 'Prince Edward Island'],
      uk: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
      australia: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory'],
      germany: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Dusseldorf', 'Dortmund', 'Essen', 'Leipzig'],
      france: ['Île-de-France', 'Auvergne-Rhône-Alpes', 'Hauts-de-France', 'Normandy', 'Provence-Alpes-Côte d\'Azur', 'Occitanie', 'Nouvelle-Aquitaine', 'Brittany', 'Centre-Val de Loire', 'Grand Est'],
      india: ['Uttar Pradesh', 'Maharashtra', 'Bihar', 'West Bengal', 'Madhya Pradesh', 'Tamil Nadu', 'Rajasthan', 'Karnataka', 'Gujarat', 'Andhra Pradesh'],
      japan: ['Tokyo', 'Kanagawa', 'Osaka', 'Aichi', 'Hokkaido', 'Fukuoka', 'Saitama', 'Chiba', 'Hyogo', 'Hiroshima'],
      brazil: ['Sao Paulo', 'Rio de Janeiro', 'Bahia', 'Minas Gerais', 'Rio Grande do Sul', 'Ceara', 'Parana', 'Pernambuco', 'Santa Catarina', 'Goias'],
      southafrica: ['Gauteng', 'Western Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Mpumalanga', 'Limpopo', 'North West', 'Free State', 'Northern Cape']
      
    };

    if (statesMap[selectedCountry]) {
      setStates(statesMap[selectedCountry]);
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  return (
    <div>
      <label htmlFor="state">Select State:</label>
      <select id="state" value={states[0] || ''}>
        {states.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default States;
