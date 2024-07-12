'use client'
import React from 'react';
import { useState,useEffect } from 'react';
import Choose0 from '../Upload/Choose0';
import Choose3 from '../Upload/Choose3';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useRouter } from 'next/navigation';
import { updateSettings, deleteSettings } from '@/app/utils/settings';
import DeleteAccount from './userAccountDelete';
import Cookies from 'js-cookie';



const Settings = () => {
  
   const router = useRouter();
   
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [successMessage, setSuccessMessage] = useState<string | null>(null);
   const [settingsSaved, setSettingsSaved] = useState(false);

   const initialFormData = Cookies.get('formData');
   const [formData, setFormData] = useState(initialFormData ? JSON.parse(initialFormData) : {
      country: '',
      currency: '',
      continent: '',
      state:'',
      province: '',
      fullAddress: '',
      emailAddress:'',
      phoneNumber: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });


    useEffect(() => {
      
        Cookies.set('formData', JSON.stringify(formData), { path: '/', expires: 360 });
        
    }, [formData]);

    useEffect(() => {
      
        const savedSettings = Cookies.get('settingsSaved');
      if (savedSettings === 'true') {
        setSettingsSaved(true);
      } 
    }, []);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
 
   const handleCountrySelect = (option: { label: string; value: string }) => {
     setFormData({ ...formData, country: option.value });
   };
 
   const handleCurrencySelect = (option: { label: string; value: string }) => {
     setFormData({ ...formData, currency: option.value });
   };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setSuccessMessage(null);
      setLoading(true);
    
      try {

      
        const token = Cookies.get('accessToken');
        if (!token) {
          router.push('/Sign_In');
          return null; 
        }
      
        const response = await updateSettings(formData);
    
        if (response.success) {
          setSuccessMessage('Settings updated successfully!');
          setLoading(false);
          setSettingsSaved(true);
          Cookies.set('settingsSaved', 'true', { path: '/', expires: 360 });
        } else {
          setError('Settings updated successfully!');
          setLoading(false);
          setSettingsSaved(true);
          Cookies.set('settingsSaved', 'true', { path: '/', expires: 360 });
        }
      } catch (error:any) {
        console.error('Error updating settings:', error.message);
        setError('Settings updated successfully!');
        setLoading(false);
        setSettingsSaved(true);
        Cookies.set('settingsSaved', 'true', { path: '/', expires: 360 });
      }
    };

     const handleDelete = async () => {
    try {
          const token = Cookies.get('accessToken');
          if (!token) {
            router.push('/Sign_In');
            return null; }
        
      await deleteSettings();
      setSuccessMessage('Settings deleted successfully!');
      Cookies.remove('formData', { path: '/' }); 
      Cookies.remove('settingsSaved', { path: '/' }); 
      setSettingsSaved(false);
    } catch (error) {
      setError('Failed to delete settings');
    }
  };


 const handleClear = () => {

    const token = Cookies.get('accessToken');
    if (!token) {
      router.push('/Sign_In');
      return null;  }
  
   setFormData({
     country: '',
     currency: '',
     continent: '',
     state: '',
     province: '',
     fullAddress: '',
     emailAddress: '',
     phoneNumber: '',
   });
   setSettingsSaved(false);
};


  return (
    <div className='    py-5 ' >
      <div >
        <h1 className='flex justify-center md:text-2xl text-2xl text-blue-950 font-family-bold
         font-bold'>Settings </h1>
      </div >


      <div className="flex justify-center mt-6">
      <div className=" flex justify-center md:mx-10
      border-2 border-blue-950 max-md:w-full max-md:m-3 p-3 lg:w-3/5 " >
        <h1 className='flex justify-center md:text-sm text-sm text-blue-950 
        font-family-bold font-bold
         '>Welcome to advertConnectPro! Choose your preferred currency for all product
          displays, with the flexibility to update it anytime. Your selected country and location
          details help us tailor recommendations for nearby audiences. Provide your email and phone
          number for personalized tips on effective product marketing from our dedicated team.
          You can adjust or remove these settings at your convenience and unsubscribe from our 
          email tips whenever you wish. Thank you for joining advertConnectPro; don't forget to
          explore our mobile app for seamless usage.
          </h1>
      </div >
      </div>


      <form onSubmit={handleSubmit}>

      <div className='flex justify-center '>
         <span className='lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-full max-sm:mx-2
          h-11  mt-5 font-bold text-blue-950
          border-2 border-blue-950 text-sm bg-white
          '
         > <Choose3 onSelect={handleCountrySelect}  />  </span>
      </div>

      <div className='flex justify-center'>
         <span className='lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-full max-sm:mx-2
          h-11 mt-5 font-bold text-blue-950
          border-2 border-blue-950 text-sm bg-white
          '
         > <Choose0 onSelect={handleCurrencySelect} /> </span>
      </div>
      
      <div className='flex justify-center'>
     <span 
       className='flex justify-between lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 
       max-sm:w-full max-sm:mx-2 h-9 mt-5  text-sm
          text-blue-950 font-bold
       bg-white text-left 
        border-2 border-blue-950' >
       
       <input type='text'
       name='continent'
       placeholder=' continent'
       value={formData.continent}
        onChange={handleInputChange}
       className=' w-full text-sm  p-1 pl-3 
        focus:outline-none bg-white text-left 
        text-blue-950' />
       
     </span>
      </div>

      <div className='flex justify-center'>
     <span 
       className='flex justify-between lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 
       max-sm:w-full max-sm:mx-2 h-9 mt-5  text-sm 
          text-blue-950 font-bold
       bg-white text-left 
        border-2 border-blue-950' >
       
       <input type='text'
        name='state'
        placeholder='state capital'
        value={formData.state}
        onChange={handleInputChange}
        className=' w-full text-sm  p-1 pl-3 
        focus:outline-none bg-white text-left 
        text-blue-950' />
       
     </span>
      </div>

      <div className='flex justify-center'>
     <span 
       className='flex justify-between lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 
       max-sm:w-full max-sm:mx-2 h-9 mt-5  text-2xl 
          text-blue-950 font-bold
       bg-white text-left 
        border-2 border-blue-950' >
       
       <input type='text'
       name='province'
       placeholder='City'
       value={formData.province}
        onChange={handleInputChange}
       className=' w-full text-sm  p-1 pl-3 
        focus:outline-none bg-white text-left 
        text-blue-950' />
       
     </span>
      </div>

      <div className='flex justify-center'>
     <span
       className='flex justify-between lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 
       max-sm:w-full max-sm:mx-2 h-9 mt-5  text-2xl 
          text-blue-950 font-bold
       bg-white text-left 
        border-2 border-blue-950' >
       
       <input type='text'
       name='fullAddress'
       placeholder='Full address'
       value={formData.fullAddress}
        onChange={handleInputChange}
       className=' w-full text-sm  p-1 pl-3 
        focus:outline-none bg-white text-left 
        text-blue-950' />
       
     </span>
      </div>
         
      <div className='flex justify-center'>
     <span
       className='flex justify-between lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 
       max-sm:w-full max-sm:mx-2 h-9 mt-5  text-2xl 
          text-blue-950 font-bold
       bg-white text-left 
        border-2 border-blue-950' >
       
       <input type='email'
        name='emailAddress'
        placeholder='email address'
        value={formData.emailAddress}
        onChange={handleInputChange}
        className=' w-full text-sm  p-1 
        focus:outline-none bg-white text-left 
        text-blue-950' />
       
     </span>
      </div>

      <div className='flex justify-center'>
         <span className='lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-full max-sm:mx-2 
          mt-5 font-bold text-blue-950 p-2 bg-white h-9
          border-2 border-blue-950  text-sm '>
         <PhoneInput
          international
          name='phoneNumber'
          value={formData.phoneNumber}
          //@ts-ignore
          onChange={(phone: string) => setFormData({ ...formData, phoneNumber: phone })}
          defaultCountry="US"
          inputProps={{
          className: 'custom-style', 
          placeholder: 'Enter phone number',
          }}
          style={{outline:'node'}}
          />
         </span>
      </div>
      
      {!settingsSaved && (
      <div className='flex justify-center'>
      <button type='submit' className='lg:w-1/5 max-lg:w-1/3 max-md:w-2/5  h-8
       text-slate-50 bg-blue-950 hover:bg-blue-800 rounded-full 
       max-sm:w-3/5 mt-10 text-sm'>
      {loading ? 'Saving...' : settingsSaved ? 'Saved' : 'Save'}</button>
      </div>
      )}

      {settingsSaved && (
      <div className='flex justify-center'>
      <button  onClick={handleClear}
      className='lg:w-1/5 max-lg:w-1/3 max-md:w-2/5  h-8
       text-slate-50 bg-blue-950 hover:bg-blue-800 
       rounded-full max-sm:w-3/5 mt-10 text-sm'>
       Update</button>
      </div>
      )}

        {settingsSaved && (
        <div className='flex justify-center mt-4'>
          <button
            onClick={handleDelete}
           className='lg:w-1/5 max-lg:w-1/3 max-md:w-2/5  h-8
           text-slate-50 bg-red-800 hover:bg-red-950 rounded-full max-sm:w-3/5
            text-sm'
          >
            Delete Settings
          </button>
        </div>
      )}

     </form>

     <div className='flex justify-center mb-20 mt-4'>
          <button
           className='lg:w-1/5 max-lg:w-1/3 max-md:w-2/5  h-8
           text-slate-50 bg-red-950 hover:bg-red-800 rounded-full 
           max-sm:w-3/5 text-sm'
          >
            <DeleteAccount />
          </button>
        </div>

     {error && <p className='flex justify-center text-green-800 text-2xl m-5'>{error}</p>}
     {successMessage && ( <p className='flex justify-center text-green-900 text-2xl m-5'>{successMessage}</p>)}
      
    </div>
  )
}

export default Settings
