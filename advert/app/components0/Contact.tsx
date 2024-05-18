'use client'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactRequest,submitContactSuccess,submitContactFailure } from '../app/contactActions';
import { submitContact } from '../utils/contact';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Contact = () => {

  const router = useRouter();

  const dispatch = useDispatch();
  
  const contactState = useSelector((state:any) => state.contact);

  const user = useSelector((state:any) => state.user); 


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    statement: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleInputChange = (e:any) => {
    setFormData({ ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleContactSubmit = async () => {
    try {
      setError('');

      const { name, email, reason, statement } = formData;

      if (!name || !email || !reason || !statement) {
        setError('All fields are required.');
        return;
      }

      if (!formData.name || !formData.email  || !formData.reason || !formData.statement) {
        setError('All fields are required.');
        return;
      }


      if (!user) {
      router.push('/Sign_In');
      }

      setLoading(true);
      dispatch(submitContactRequest(formData));


      const response = await submitContact(dispatch, formData);
      //@ts-ignore
      dispatch(submitContactSuccess(response));

      setSuccessMessage('Contact submitted successfully!');

      setFormData({
        name: '',
        email: '',
        reason: '',
        statement: '',
      });
    } catch (error:any) {
      console.error('Error submitting contact:', error.message);
      dispatch(submitContactFailure(error.message));
      setError('Failed to submit contact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col  text-blue-950 pt-10 border-4 pb-20
    border-purple-950 '>
       <div className='flex justify-center text-3xl max-sm:text-lg max-md:text-2xl
        font-bold
       '> contact us for deal or more information</div>

       <div className='flex justify-center '>
        <Link href={{pathname:'/contact/contactList'}}>
       <button  
         type='button'
         className=' rounded-full bg-green-950  px-5 hidden
         text-2xl text-white  py-2 mt-10 hover:bg-purple-950 mb-2'>
          see all contacts
         </button>
         </Link>
         </div>
       <div>

       <div className='flex justify-center mt-0 '>
      <label
      htmlFor='name'
       className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-4/5 h-12 mt-5  text-2xl 
        focus:outline p-2
        bg-lime-00 font-bold
       '>write your name here</label>
      </div>

       
      <div className='flex justify-center '>
      <input type='text' 
       name='name'
       value={formData.name}
       onChange={handleInputChange}
       className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-full max-sm:mx-2 h-10   text-xl 
        focus:outline p-2 bg-white
        bg-lime-00 font-bold
        border-4 border-blue-950' />
      </div>

      <div className='flex justify-center '>
      <label
      htmlFor='email'
       className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-full max-sm:mx-2 h-12 mt-5  text-2xl 
        focus:outline p-2
        bg-lime-00 font-bold
       '>write your Email here</label>
      </div>

      <div className='flex justify-center'>
      <textarea
        name='email'
        value={formData.email}
        onChange={handleInputChange}
       className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-full max-sm:mx-2 h-20   text-xl 
        focus:outline p-2
        bg-lime-00  font-bold
        border-4 border-blue-950' />
      </div>

      <div className='flex justify-center '>
      <label
      htmlFor='reason'
       className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-full max-sm:mx-2 h-12 mt-5  text-2xl 
        focus:outline p-2
        bg-lime-00 font-bold
       '>reason you want contact us</label>
      </div>
     
      <div className='flex justify-center'>
      <textarea
       name='reason'
       value={formData.reason}
       onChange={handleInputChange}
       className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-full max-sm:mx-2 h-32   text-xl 
        focus:outline p-2
        bg-lime-00  font-bold
        border-4 border-blue-950' />
      </div>

      <div className='flex justify-center '>
      <label
      htmlFor='statement'
       className=' lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-full max-sm:mx-2 h-12 mt-5  text-2xl 
        focus:outline p-2
        bg-lime-00 font-bold
       '>write your statements here</label>
      </div>

      <div className='flex justify-center'>
      <textarea
        name='statement'
        value={formData.statement}
        onChange={handleInputChange}
        className='lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-full max-sm:mx-2 h-80   text-xl 
        focus:outline  p-2 text-black
        bg-lime-00 font-bold 
        border-4 border-blue-950' />
      </div>
    
       </div>
       
       <div className='flex justify-center'>
       <button  
         type='submit'
         onClick={handleContactSubmit}
         disabled={loading || !!validationError}
         className=' rounded-full bg-green-950 lg:w-2/5 max-lg:w-2/3 max-md:w-4/5 max-sm:w-4/5
         text-2xl text-white  py-2 mt-10 hover:bg-purple-950 mb-2'>
         {loading ? 'Submitting...' : 'Contact us'}
         </button>
         </div>

         {contactState.error && (
         <div className='flex justify-center text-red-500 text-2xl m-5'>
         Error: {contactState.error}
         </div> )}

         {validationError && (
        <div className='flex justify-center text-red-500 text-2xl m-5'>
          Validation Error: {validationError}
        </div> )}
       
         {error && (
          <div className='flex justify-center text-red-500 text-2xl m-5'>
          Error: {error}
          </div>
        )}

        {successMessage && (
          <div className='flex justify-center text-green-500 text-2xl m-5 mb-10'>
          {successMessage}
          </div>
        )}

       </div>
    
  )
}

export default Contact

