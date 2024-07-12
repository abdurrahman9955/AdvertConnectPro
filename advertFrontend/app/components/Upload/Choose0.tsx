'use client'
import React from 'react';
import Select from 'react-select';
import { useState } from 'react';

interface Choose0Props {
  onSelect: (option: { label: string; value: string }) => void;
}

const customStyles  = {
    control: (provided: any, state:any ) =>({
        ...provided,
        borderRadius:'none',
        outline:'none',
        borderColor:"#fff",
        flex: 'flex-start'
    }), 
    option: (provided: any, state:any ) =>({
        ...provided,
        borderRadius: state.isSelected ? 'bg-blue-600' : 'bg-white',
    }),
};


  const Choose0: React.FC<Choose0Props> = ({ onSelect }) => {

    const [selectedCurrency, setSelectedCurrency] = useState('');

  const options = [
      { value: 'AED', label:  'AED' },
      { value: 'AFN', label:  'AFN'},
      { value: 'aLL', label:  'aLL' },
      { value: 'AMD', label: 'AMD' },
      { value: 'ANG', label: 'ANG' },
      { value: 'AOA', label: 'AOA' },
      { value: 'ARS', label:  'ARS' },
      { value: 'AUD', label:  'AUD'},
      { value: 'AWG', label:  'AWG' },
      { value: 'AZN', label: 'AZN' },
      { value: 'BAM', label: 'BAM' },
      { value: 'BDT', label: 'BDT' },
      { value: 'BGN', label: 'BGN' },
      { value: 'BHD', label: 'BHD' },
      { value: 'BIF', label: 'BIF' },
      { value: 'BMD', label: 'BMD' },
      { value: 'BND', label: 'BND' },
      { value: 'BOB', label: 'BOB.'},
      { value: 'BRL', label: 'BRL' },
      { value: 'BSD', label: 'BSD' },
      { value: 'BTN', label: 'BTN' },
      { value: 'BWP', label: 'BWP' },
      { value: 'BYN', label:  'BYN' },
      { value: 'BZD', label: 'BZD' },
      { value: 'CAD', label: 'CAD'},
      { value: 'CDF', label: 'CDF' },
      { value: 'CHF', label:  'CHF' },
      { value: 'CLP', label:  'CLP'},
      { value: 'CNY', label: 'CNY' },
      { value: 'COP', label: 'COP' },
      { value: 'CRC', label: 'CRC' },
      { value: 'CUP', label: 'CUP' },
      { value: 'CVE', label: 'CVE' },
      { value: 'CZK', label:  'CZK' },
      { value: 'DJF', label: 'DJF' },
      { value: 'DKK', label: 'DKK'},
      { value: 'DOP', label: 'DOP' },
      { value: 'DZD', label:  'DZD' },
      { value: 'EGP', label:  'EGP'},
      { value: 'ERN', label: 'ERN' },
      { value: 'ETB', label: 'ETB' },
      { value: 'EUR', label: 'EUR' },
      { value: 'FJD', label: 'FJD' },
      { value: 'FKP', label: 'FKP' },
      { value: 'FOK', label:  'FOK' },
      { value: 'GBP', label: 'GBP' },
      { value: 'GEL', label: 'GEL'},
      { value: 'GGP', label: 'GGP' },
      { value: 'GHS', label:  'GHS' },
      { value: 'GIP', label:  'GIP'},
      { value: 'GMD', label: 'GMD' },
      { value: 'GNF', label: 'GNF' },
      { value: 'GTQ', label: 'GTQ' },
      { value: 'GYD', label: 'GYN'},
      { value: 'HKD', label: 'HKD' },
      { value: 'HNL', label:  'HNL' },
      { value: 'HRK', label:  'HRK'},
      { value: 'HTG', label: 'HTG' },
      { value: 'HUF', label: 'HUF' },
      { value: 'IDR', label: 'IDR' },
      { value: 'ILS', label: 'ILS' },
      { value: 'IMP', label: 'IMP'},
      { value: 'INR', label: 'INR'},
      { value: 'IQD', label: 'IQD' },
      { value: 'IRR', label:  'IRR' },
      { value: 'ISK', label: 'ISK'},
      { value: 'JEP', label: 'JEP' },
      { value: 'JMD', label: 'JMD' },
      { value: 'JOD', label: 'JOD' },
      { value: 'IDR', label: 'IDR' },
      { value: 'JPY', label:  'JPY' },
      { value: 'KES', label: 'KES'},
      { value: 'KGS', label: 'KGS'},
      { value: 'KHR', label:  'KHY' },
      { value: 'KID', label:  'KID'},
      { value: 'KRW', label: 'KRW'},
      { value: 'KWD', label: 'KWD' },
      { value: 'KYD', label: 'KYD' },
      { value: 'KZT', label: 'KZT' },
      { value: 'LAK', label:  'LAK' },
      { value: 'LBP', label: 'LBP' },
      { value: 'LKR', label: 'LKY' },
      { value: 'LRD', label:  'LRD' },
      { value: 'LSL', label: 'LSL'},
      { value: 'LYD', label: 'LYD'},
      { value: 'MAD', label: 'MAD'},
      { value: 'MDL', label:   'MDL'},
      { value: 'MGA', label: 'MGA'},
      { value: 'MKD', label: 'MKD' },
      { value: 'MMK', label: 'MMK' },
      { value: 'MNT', label: 'MNT' },  
      { value: 'MOP', label:  'MOP' },
      { value: 'MRY', label: 'MRY' },
      { value: 'MUR', label:  'MUR'},
      { value: 'MVY', label: 'MVY'},
      { value: 'MWK', label: 'MWK'},
      { value: 'MXN', label: 'MXN'},
      { value: 'MYR', label:  'MYR'},
      { value: 'MZN', label: 'MZN'},
      { value: 'NAD', label:'NAD' },
      { value: 'NGN', label: 'NGN' },
      { value: 'NIO', label: 'NIO' },  
      { value: 'NOK', label:  'NOK' },
      { value: 'NPR', label:'NPR' },
      { value: 'NZD', label:  'NZD'},
      { value: 'OMR', label:  'OMR'},
      { value: 'PAB', label: 'PAB'},
      { value: 'PEN', label:'PEN'},
      { value: 'PGK', label:  'PGK'},
      { value: 'PHP', label:  'PHP'},
      { value: 'PKR', label:'PKR'},
      { value: 'PLN', label: 'PLN' },
      { value: 'PYG', label: 'PYG' }, 
      { value: 'QAR', label:'QAR' },
      { value: 'RON', label:'RON' },
      { value: 'RSD', label: 'RSD'},
      { value: 'RUB', label:  'RUB'},
      { value: 'RWF', label: 'RWF'},
      { value: 'SAR', label:'SAR'},
      { value: 'SBD', label: 'SBD'},
      { value: 'SCR', label:  'SCR'},
      { value: 'SDG', label:'SDG'},
      { value: 'SEK', label: 'SEK' },
      { value: 'SGD', label: 'SGD' }, 
      { value: 'SHP', label:'SHP' },
      { value: 'SLL', label:'SLL' },
      { value: 'SOS', label: 'SOS'},
      { value: 'SRD', label: 'SRD'},
      { value: 'SSP', label: 'SSP'},
      { value: 'STN', label:'STN'},
      { value: 'SYP', label: 'SYP'},
      { value: 'SZL', label:'SZL'},
      { value: 'THB', label: 'THB' },
      { value: 'TJS', label: 'TJS'}, 
      { value: 'TMT', label: 'TMT' }, 
      { value: 'TND', label:'TND'},
      { value: 'TOP', label:'TOP' },
      { value: 'TRY', label: 'TRY'},
      { value: 'TTD', label: 'TTD'},
      { value: 'TVD', label: 'TVD'},
      { value: 'TWD', label:'TWD'},
      { value: 'TZS', label: 'TZS'},
      { value: 'UAH', label:'UAH'},
      { value: 'UGX', label:'UGX' },
      { value: 'USD', label:  'USD'},  
      { value: 'UYU', label: 'UYU' }, 
      { value: 'UZS', label:'UZS'},
      { value: 'VES', label:'VES' },
      { value: 'VND', label: 'VND'},
      { value: 'VUV', label: 'VUV'},
      { value: 'WST', label: 'WST'},
      { value: 'XAF', label:'XAF'},
      { value: 'XCD', label: 'XCD'},
      { value: 'XDR', label:'XDR'},
      { value: 'XOF', label:'XOP' },
      { value: 'XPF', label:  'XPF'},  
      { value: 'YER', label: 'YER'},
      { value: 'ZAR', label:'ZAR'},
      { value: 'ZMW', label:'ZMW' },
      { value: 'ZWD', label:'ZWD'},  
    
  ];

  const handleSelect = (option: { label: string; value: string }) => {
    //@ts-ignore
    setSelectedCurrency(option);
    onSelect(option);
  };


  return (
    <div>
     
      <Select
      //@ts-ignore
       options={options}
       styles={customStyles}
       //@ts-ignore
       onChange={handleSelect}
       value={selectedCurrency}
       placeholder='USD'
       className='w-full focus:outline-none bg-black'  />
    </div>
  );
};

export default Choose0;

