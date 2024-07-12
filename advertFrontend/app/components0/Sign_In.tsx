'use client'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { loginUser } from "../utils/login";
import { useDispatch } from 'react-redux';
import { loginUserSuccess } from "../app/loginSlice";
import Link from "next/link";
import Verify from "./verify";
import validator from 'validator';
import { setEmail } from '../app/LoginOTP';
import {  useSession } from 'next-auth/react';
import { setAuthenticated } from '../app/authenticateSlice';
import Cookies from 'js-cookie';


interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  token?:string | null
}

const Sign_in = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user && (session.user as User).id) {
      router.push('/');
    }
  }, [session, router]);

  useEffect(() => {
    
      const userId =  Cookies.get('userId');
      const token = Cookies.get('accessToken');
      const isAuthenticated = Cookies.get('isAuthenticated');

      if (isAuthenticated === 'true' && userId && token) {
        router.push('/');
      } 
    
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAgreeTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedTerms(e.target.checked);
  };

  const isSubmitDisabled = !agreedTerms || !formData.email || !formData.password;

  const handleSignIn = async () => {
    try {
      setLoginError('');
      setLoading(true);

      if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(formData.email) &&
        !/^\+\d{1,3}\.\d{1,14}$/.test(formData.email)) {
        setLoginError('Invalid email: check the email and continue ');
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

      const loginResponse = await loginUser({
        email: formData.email,
        password: formData.password,
      });


      if (loginResponse.success) {
          dispatch(loginUserSuccess(loginResponse.data));
          dispatch(setEmail(formData.email));
          setSuccessMessage('login successful! verify an otp to continue');
          router.push('/OtpInput');
        
      } else  {
        //@ts-ignore
        setLoginError(`Error logging in: ${loginResponse.message}`);
      }
    } catch (error:any) {
      setLoginError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='py-10 pt-15 font-bold mt-10 h-screen'>
      <div>
        <h1 className='flex justify-center text-2xl text-blue-950'> Sign In</h1>
      </div>

     
      <form >

          <div className="flex justify-center  mt-2">
            <input
              type="email"
              id="email"
              className="h-8 p-2
              mt-5 border-2 border-slate-950 lg:w-1/3 max-lg:w-2/4 max-sm:w-full
              focus:outline  max-sm:m-2  bg-white text-sm"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

        <div className="flex justify-center mt-3 ">
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleInputChange}
          className="lg:w-1/3 max-lg:w-2/4 max-sm:w-full h-8 p-2 mt-3
          border-2 border-blue-950 max-sm:m-2
          focus:outline     bg-white text-sm"
        />
        </div>

        <div className='flex justify-center mt-3 '>
          <input type='checkbox' id='agreeTerms' className='mr-2 w-4 h-4 mt-1' 
           onChange={handleAgreeTermsChange}
           checked={agreedTerms} />
           <Link href={{pathname:'/Terms'}}>
          <label htmlFor='agreeTerms' className='text-xs text-indigo-800'>
            I agree with terms and conditions</label></Link>
        </div>
     
        <div className="flex justify-center">
        <button
        onClick={handleSignIn}
          type='button'
          disabled={loading || isSubmitDisabled}
          className={`text-slate-50 bg-blue-950 lg:w-1/4 max-lg:w-2/5 
            max-sm:w-5/6 h-7 text-sm hover:bg-purple-950 max-sm:4/5 mt-2 ${
            isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Signing In...' : 'Send Otp'}
        </button>
        </div>

       </form>

       <div className='flex justify-center '>
       <Link href={{pathname: '/Sign_Up'}}> <p className='text-sm  mt-1'>
       don't have an account? <span className='text-indigo-800 text-lg font-bold
        '>Sign Up</span></p> </Link>
      </div>

      <div className='flex justify-center '>
       <Link href={{pathname: '/Sign_In/Forgot_Password'}}> <p className='text-sm  mt-5'>
       <span className='text-indigo-900 text-sm font-bold
        '>forgot your password?</span></p> </Link>
      </div>

      {loginError && <p className='flex justify-center   text-red-500  text-sm m-2'>{loginError}</p>}
      {successMessage && <p className='flex justify-center text-green-500 text-sm m-2'>{successMessage}</p>}
      
      <Verify />
    </div>
  );
};


export default Sign_in;


