'use client'
import React, { useState, useEffect } from 'react'
import { createOrder } from '@/app/utils/order';
import { FaCartArrowDown } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Cookies from 'js-cookie';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  fullAddress: string;
  description: string;
}


const Order = () => {

  const router = useRouter();

  const initialFormData: FormData = {
    fullName: '',
    email: '',
    phoneNumber: '',
    fullAddress: '',
    description: '',
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    fullAddress: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [orderVisible, setOrderVisible] = useState(false);

  const handleOrderClick = ()=>{
    setOrderVisible(!orderVisible);

 };      const  closeOrder = ()=> {
       setOrderVisible(false);  
      };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    setLoading(true);
    setError('');
    try {

      const token = Cookies.get('accessToken');
      if (!token) {
        router.push('/Sign_In');
        return;
      }

      //@ts-ignore
      const response = await createOrder(formData);
      if (response.success) {
        setSuccess(true);
        setFormData(initialFormData);
      } else {
        setError(response.error || 'Failed to submit order');
      }
    } catch (error) {
      setError('Failed to submit order');
    } finally {
      setLoading(false);
      setFormData(initialFormData);
     
    }};

     return (
           <div className=''>
                <div className='flex flex-row py-3 gap-1 mt-3 pl-1 '>
                <FaCartArrowDown size={32}
                className='ml-14 max-sm:ml-5'/>
                </div>

                <button className="bg-blue-950 hover:bg-green-950 max-sm:hidden text-lg
                  text-white px-4 py-1 mt-1 rounded"
                  onClick={handleOrderClick}
                  >
                  make an order
                 </button>

                 <button className="bg-blue-950 hover:bg-green-950 sm:hidden text-lg
                  text-white px-4 py-1 mt-1 rounded"
                  onClick={handleOrderClick}>
                  order
                 </button>

                 <div>
                 {orderVisible &&  (
                  
                <div className='fixed md:top-20 md:left-30 max-md:top-10  max-md:left-2 flex justify-center text-xl bg-slate-300 border-4 border-black p-5 flex-col'>
                <div className='flex flex-row text-slate-950 sm:text-3xl text-xl mb-3 gap-5'>
                  <FaRegWindowClose size={40} onClick={closeOrder}/>
                  <h1>Make your order here</h1>
                </div>

                <form onSubmit={handleSubmit}>
                <div  className='flex flex-col gap-4'>
                <input type="text" name="fullName"
                className='w-96 h-12  max-sm:w-80 p-3 border-4 border-black'
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name" required />

                <input type="email" name="email" 
                className='w-96 h-12  max-sm:w-80 p-3 border-4 border-black'
                value={formData.email}
                 onChange={handleChange} 
                placeholder="Email" required />

                <span className='  w-96 h-12  max-sm:w-80 p-2 bg-white border-4 border-black '>
                 <PhoneInput
                 international
                 name='phoneNumber'
                 //@ts-ignore
                 value={formData.phoneNumber}
                 //@ts-ignore
                 onChange={(phone: string) => setFormData({ ...formData, phoneNumber: phone })}
                 defaultCountry="US"
                 inputProps={{
                 className: 'custom-style', 
                 placeholder: 'Phone Number', require,
                 }}
                 style={{outline:'node'}} />
                </span>

                <input type="text" name="fullAddress" 
                className='w-96 h-12  max-sm:w-80 p-3 border-4 border-black'
                value={formData.fullAddress} 
                onChange={handleChange} 
                placeholder="Full Address" required />

                <textarea name="description" 
                className='w-96 h-48  max-sm:w-80 p-3 border-4 border-black'
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Description" required />
             
                <div className='flex justify-center'>
                <button type="submit" 
                className="flex justify-center w-40 h-10 bg-black hover:bg-green-900
                text-white font-bold pt-2 rounded-xl" 
                 disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
                </button></div>

                </div>

                </form>

                {success && <p className="flex justify-center m-2 text-green-800">submitted successfully!</p>}
                {error && <p className="flex justify-center mt-2 text-green-800 ">submitted successfully!</p>}
 .              {loading && <p className="text-blue-800 mt-2 flex justify-center">Submitting...</p>}
              </div> 
             ) }
               </div>

           </div>
  )
}

export default Order

