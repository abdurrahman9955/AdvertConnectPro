

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
    { value: 'AED', label:  ' د.إ' },
      { value: 'AFN', label:  ' ؋'},
      { value: 'aLL', label:  'Lek' },
      { value: 'AMD', label: '֏' },
      { value: 'ANG', label: 'ƒ' },
      { value: 'AOA', label: 'Kz' },
      { value: 'ARS', label:  '$' },
      { value: 'AUD', label:  '$'},
      { value: 'AWG', label:  'ƒ' },
      { value: 'AZN', label: '₼' },
      { value: 'BAM', label: 'KM' },
      { value: 'BDT', label: '$' },
      { value: 'BGN', label: 'лв' },
      { value: 'BHD', label: '.د.ب' },
      { value: 'BIF', label: 'FBu' },
      { value: 'BMD', label: '$' },
      { value: 'BND', label: '$' },
      { value: 'BOB', label:  'Bs.'},
      { value: 'BRL', label:  'R$' },
      { value: 'BSD', label: '$' },
      { value: 'BTN', label: 'Nu.' },
      { value: 'BWP', label: 'P' },
      { value: 'BYN', label:  'Br' },
      { value: 'BZD', label: 'BZ$' },
      { value: 'CAD', label: '$'},
      { value: 'CDF', label: 'FC' },
      { value: 'CHF', label:  'CHF' },
      { value: 'CLP', label:  '$'},
      { value: 'CNY', label: '¥' },
      { value: 'COP', label: '$' },
      { value: 'CRC', label: '₡' },
      { value: 'CUP', label: '$' },
      { value: 'CVE', label: '$' },
      { value: 'CZK', label:  'Kč' },
      { value: 'DJF', label: 'Fdj' },
      { value: 'DKK', label: 'kr'},
      { value: 'DOP', label: 'RD$' },
      { value: 'DZD', label:  'د.ج' },
      { value: 'EGP', label:  '£'},
      { value: 'ERN', label: 'Nfk' },
      { value: 'ETB', label: 'Br' },
      { value: 'EUR', label: '€' },
      { value: 'FJD', label: '$' },
      { value: 'FKP', label: '£' },
      { value: 'FOK', label:  'kr' },
      { value: 'GBP', label: '£' },
      { value: 'GEL', label: 'kr'},
      { value: 'GGP', label: 'RD$' },
      { value: 'GHS', label:  '₵' },
      { value: 'GIP', label:  '£'},
      { value: 'GMD', label: 'D' },
      { value: 'GNF', label: 'FG' },
      { value: 'GTQ', label: 'Q' },
      { value: 'GYD', label: '$'},
      { value: 'HKD', label: 'HK$' },
      { value: 'HNL', label:  'L' },
      { value: 'HRK', label:  'kn'},
      { value: 'HTG', label: 'G' },
      { value: 'HUF', label: 'Ft' },
      { value: 'IDR', label: 'Rp' },
      { value: 'ILS', label: '₪' },
      { value: 'IMP', label: '£'},
      { value: 'INR', label: '₹'},
      { value: 'IQD', label: 'ع.د' },
      { value: 'IRR', label:  '﷼' },
      { value: 'ISK', label: 'kr'},
      { value: 'JEP', label: '£' },
      { value: 'JMD', label: 'J$' },
      { value: 'JOD', label: 'د.ا' },
      { value: 'IDR', label: 'Rp' },
      { value: 'JPY', label:  '¥' },
      { value: 'KES', label: 'KSh'},
      { value: 'KGS', label: 'сом'},
      { value: 'KHR', label:  '៛' },
      { value: 'KID', label:  '$'},
      { value: 'KRW', label: '₩'},
      { value: 'KWD', label: 'د.ك' },
      { value: 'KYD', label: '$' },
      { value: 'KZT', label: '₸' },
      { value: 'LAK', label:  '₭' },
      { value: 'LBP', label: 'ل.ل' },
      { value: 'LKR', label: '₨' },
      { value: 'LRD', label:  '$' },
      { value: 'LSL', label: 'L'},
      { value: 'LYD', label: 'ل.د'},
      { value: 'MAD', label: 'د.م.'},
      { value: 'MDL', label:   'L'},
      { value: 'MGA', label: 'Ar'},
      { value: 'MKD', label: 'ден' },
      { value: 'MMK', label: 'Ks' },
      { value: 'MNT', label: '₮' },  
      { value: 'MOP', label:  'MOP$' },
      { value: 'MRY', label: 'UM' },
      { value: 'MUR', label:  '₨'},
      { value: 'MVY', label: 'ރ.'},
      { value: 'MWK', label: 'MK'},
      { value: 'MXN', label: '$'},
      { value: 'MYR', label:  'RM'},
      { value: 'MZN', label: 'MT'},
      { value: 'NAD', label:'$' },
      { value: 'NGN', label: '₦' },
      { value: 'NIO', label: 'C$' },  
      { value: 'NOK', label:  'kr' },
      { value: 'NPR', label:'₨' },
      { value: 'NZD', label:  '$'},
      { value: 'OMR', label:  'ر.ع.'},
      { value: 'PAB', label: 'B/.'},
      { value: 'PEN', label:'S/.'},
      { value: 'PGK', label:  'K'},
      { value: 'PHP', label:  '₱'},
      { value: 'PKR', label:'₨'},
      { value: 'PLN', label: 'zł' },
      { value: 'PYG', label: '₲' }, 
      { value: 'QAR', label: 'ر.ق' },
      { value: 'RON', label:'lei' },
      { value: 'RSD', label: 'din.'},
      { value: 'RUB', label:  '₽'},
      { value: 'RWF', label: 'R₣'},
      { value: 'SAR', label:'ر.س'},
      { value: 'SBD', label: '$'},
      { value: 'SCR', label:  '₨'},
      { value: 'SDG', label:'ج.س.'},
      { value: 'SEK', label: 'kr' },
      { value: 'SGD', label: '$' }, 
      { value: 'SHP', label:'£' },
      { value: 'SLL', label:'Le' },
      { value: 'SOS', label: 'S'},
      { value: 'SRD', label: '$'},
      { value: 'SSP', label: '£'},
      { value: 'STN', label:'Db'},
      { value: 'SYP', label: '£'},
      { value: 'SZL', label:'L'},
      { value: 'THB', label: '฿' },
      { value: 'TJS', label: 'ЅМ'}, 
      { value: 'TMT', label: 'T' }, 
      { value: 'TND', label:'د.ت' },
      { value: 'TOP', label:'T$' },
      { value: 'TRY', label: '₺'},
      { value: 'TTD', label: 'TT$'},
      { value: 'TVD', label: '$'},
      { value: 'TWD', label:'NT$'},
      { value: 'TZS', label: 'TSh'},
      { value: 'UAH', label:'₴'},
      { value: 'UGX', label:'USh' },
      { value: 'USD', label:  '$'},  
      { value: 'UYU', label: '$U' }, 
      { value: 'UZS', label:'лв'},
      { value: 'VES', label:'Bs' },
      { value: 'VND', label: '₫'},
      { value: 'VUV', label: 'VT'},
      { value: 'WST', label: 'T'},
      { value: 'XAF', label:'FCFA'},
      { value: 'XCD', label: '$'},
      { value: 'XDR', label:'SDR'},
      { value: 'XOF', label:'CFA' },
      { value: 'XPF', label:  '₣'},  
      { value: 'YER', label: '﷼'},
      { value: 'ZAR', label:'R'},
      { value: 'ZMW', label:'ZK' },
      { value: 'ZWD', label:'Z$'},  
    
    
    
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
       placeholder='$'
       className='w-full focus:outline-none bg-black'  />
    </div>
  );
};

export default Choose0;

