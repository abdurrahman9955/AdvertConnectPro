import { useState, useEffect } from "react";
import Link from "next/link";
import { registerUser} from "../utils/register";
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { setUser } from "../app/userSlice";
import { UserData } from "./interface";
import validator from 'validator';
import { setEmail } from "../app/registerOtp";
import Verify from "./verify";
import {  useSession } from 'next-auth/react';
import { setAuthenticated } from '../app/authenticateSlice';

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  token?:string | null
}

const Sign_up =  ()  => {

  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '', 
  });
  const [loginError, setLoginError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [agreedTerms, setAgreedTerms] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('accessToken');
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (isAuthenticated === 'true' && userId && token) {
      router.push('/');
    }
  }, []); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleAgreeTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedTerms(e.target.checked);
  };
  
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
         e.preventDefault(); 

    try {
      setLoginError('');
      setSuccessMessage(''); 

      if (!agreedTerms) {
       
        setLoginError('Please agree to the terms and conditions.');
        return;
      }
  

      if (formData.password !== formData.confirmPassword) {
        setLoginError('Password and confirm password do not match');
        return;
      }
     
      if (!validator.isEmail(formData.email)) {
        setLoginError('Invalid email address: please provide a valid email address');
        return;
      }
      
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@&#!%])[A-Za-z\d@&#!%]{8,}$/;

      if (!passwordRegex.test(formData.password)) {
      setLoginError('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character.');
      return;
      }
      
      
      setLoginError('');
      setSuccessMessage(''); 
      setLoading(true);

      const registrationResponse = await registerUser(formData);
      console.log('Registration Response:', registrationResponse);

      if (registrationResponse.success) {
          //@ts-ignore
        const registeredUserData: UserData | undefined = registrationResponse.data;

        if (registeredUserData) {
            //@ts-ignore
            dispatch(setUser(registeredUserData));
            dispatch(setEmail(formData.email));
            setSuccessMessage('Registration successful! verify your email and continue');
            router.push('/OtpInput2');
        } else {
          setLoginError('Error: User registration data is undefined');
        }
      } else {
        //@ts-ignore
        setLoginError(`Error registering user: ${registrationResponse.data?.error}`);
      }
    } catch (error: any) {
      setLoginError(`Error: ${error.message}`);
    } finally {
     
      setLoading(false);
    }
  };

  const isSubmitDisabled = !agreedTerms || !formData.email || !formData.firstName ||
      !formData.lastName || !formData.password || !formData.confirmPassword;


  return (
    <div className='flex flex-col py-10 pt-15 font-bold'>
      <div>
        <h1 className='flex justify-center text-5xl text-blue-950  '> sign up </h1>
      </div>    

      <form onSubmit={handleSignUp}>
     
    <div className="flex justify-center mt-6">
      <input
        type="email"
        id="email"
        className="h-10 p-4
        mt-5 border-4 border-slate-950 lg:w-1/3 max-lg:w-2/4 max-sm:w-full
        focus:outline  max-sm:m-2  bg-white text-xl"
        placeholder="Enter your email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
    </div>
  

        <div className="flex justify-center mt-3">
        <input
          type='text'
          className='lg:w-1/3 max-lg:w-2/4 max-sm:w-full h-10 p-4 mt-5 
          border-4 border-blue-950 max-sm:m-2 focus:outline bg-white text-xl'
          placeholder='first name'
          name='firstName'
          value={formData.firstName}
          onChange={handleInputChange}
        />
        </div>

        <div className="flex justify-center mt-3">
        <input
          type='text'
          className='lg:w-1/3 max-lg:w-2/4 max-sm:w-full h-10 p-4 mt-5 border-4
           border-blue-950 max-sm:m-2 focus:outline bg-white text-xl'
          placeholder='last name'
          name='lastName'
          value={formData.lastName}
          onChange={handleInputChange}
        />
        </div>

        <div className="flex justify-center mt-3">
        <input
          type='password'
          className='lg:w-1/3 max-lg:w-2/4 max-sm:w-full h-10 p-4 mt-5 border-4
           border-blue-950 max-sm:m-2 focus:outline bg-white text-xl'
          placeholder='password'
          name='password'
          value={formData.password}
          onChange={handleInputChange}
        />
        </div>
           
        <div className="flex justify-center mt-3">
        <input
          type='password'
          className='lg:w-1/3 max-lg:w-2/4 max-sm:w-full h-10 p-4 mt-5 border-4
           border-blue-950 max-sm:m-2 focus:outline bg-white text-xl'
          placeholder='confirm password'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        </div>
      
      
      <div className='flex justify-center mt-3 '>
          <input type='checkbox' id='agreeTerms' className='mr-2 w-6 h-6'
           onChange={handleAgreeTermsChange} />
          <label htmlFor='agreeTerms' className=' text-lg text-gray-700'>
            I agree with terms and conditions</label>
        </div>

        <div className='flex justify-center'>
          <button
            type='submit'
            disabled={loading || isSubmitDisabled}
            className={`text-slate-50 bg-blue-950 lg:w-1/4 max-lg:w-2/5 
            max-sm:w-3/5 h-10 hover:bg-purple-950 max-sm:4/5 mt-2 ${
            isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}  >
           {loading ? 'Signing Up...' : 'Send Otp'}
          </button>

        </div>
       
      </form>

      <div className='flex justify-center '>
       <Link href={{pathname: '/Sign_In'}}> <p className='text-xl  mt-1'>
        already have an account? <span className='text-indigo-950 text-2xl font-bold
        '>Sign Up</span></p> </Link>
      </div>

      {loginError && <p className='flex justify-center text-red-500 text-2xl m-5'>{loginError}</p>}
      
      {successMessage && ( <p className='flex justify-center text-green-500 text-2xl m-5'>{successMessage}</p>)}
       <Verify />

    </div>
  );
};

export default Sign_up;
