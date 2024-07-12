'use client'
import React, { useState, useEffect } from 'react';
import { forgotPassword, ForgotPasswordData, ForgotPasswordResponse, resendOtp,
verifyOtp } from '../utils/resetPassword'; import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setAuthenticated } from '../app/authenticateSlice';
import Link from 'next/link';


const Forgot = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
 
  const [otpSending, setOtpSending] = useState(false);
  const [otpResendLoading, setOtpResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);


  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (otpSent && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    } else if (otpSent) {
      handleOtpResend();
    }

    return () => clearInterval(countdownInterval);
  }, [otpSent, countdown]);

  
  const handleOtpSend = async () => {
    try {
      if (otpSending) return;
  
      if (!isEmailValid(email)) {
        setError('Please enter a valid email address.');
        return;
      }
  
      setOtpSending(true);
  
      const response: ForgotPasswordResponse = await resendOtp(email);
  
      if (response.success) {
        setSuccess('OTP sent successfully!');
        setCountdown(60);
        setOtpSent(true);
      } else {
        setError(response.error || 'Failed to initiate Forgot Password');
        setSuccess(null);
      }
    } catch (error) {
      console.error(error);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setOtpSending(false);
    }
  };

  
  const handleOtpResend = async () => {
    try {
      if (otpResendLoading) return;
  
      if (!isEmailValid(email)) {
        setError('Please enter a valid email address.');
        return;
      }
  
      setOtpResendLoading(true);
  
      const response: ForgotPasswordResponse = await resendOtp(email);
  
      if (response.success) {
        setSuccess('OTP resent successfully!');
        setCountdown(60);
      } else {
        setError(response.error || 'Failed to resend OTP');
        setSuccess(null);
      }
    } catch (error) {
      console.error(error);
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setOtpResendLoading(false);
    }
  };
  

  
  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (!isEmailValid(email)) {
      setError('Please enter a valid email address.');
    } else {
      setError(null);
    }

    if (newPassword) {
      const hasNumber = /\d/.test(newPassword);
      const hasUppercase = /[A-Z]/.test(newPassword);
      const hasLowercase = /[a-z]/.test(newPassword);
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
      const hasMinLength = newPassword.length >= 8;
      
      if (!(hasNumber && hasUppercase && hasLowercase && hasSpecialCharacter && hasMinLength)) {
        setError('Password must meet the following criteria: at least 8 characters, one number, one uppercase letter, one lowercase letter, and one special character.');
      } else {
        setError(null);
      }
    }
  }, [email, newPassword]);

  const handleSubmit = async () => {
    try {
      if (loading) return;
  
      if (!agreeTerms) {
        setError('Please agree to the terms and conditions.');
        return;
      }
  
      if (!email) {
        setError('Email is required.');
        return;
      }
  
      if (newPassword !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
  
      if (!isEmailValid(email)) {
        setError('Please enter a valid email address.');
        return;
      }
  
      if (!otp) {
        setError('Please enter the OTP.');
        return;
      }
  
      setLoading(true);
  
      const otpVerificationResponse = await verifyOtp(email, otp);
  
      if (otpVerificationResponse.success) {
        const forgotPasswordData: ForgotPasswordData = {
          email,
          newPassword: newPassword,
          confirmNewPassword: confirmPassword,
        };
  
        const passwordUpdateResponse = await forgotPassword(forgotPasswordData);
  
        if (passwordUpdateResponse.success) {
          dispatch(setAuthenticated(true));
          setSuccess('Password reset successfully!');
          router.push('/');
          setError(null);
        } else {
          setError(passwordUpdateResponse.error || 'Failed to reset password');
          setSuccess(null);
        }
      } else {
        setError('Invalid OTP. Please enter a valid OTP.');
        setSuccess(null);
      }
    } catch (error) {
      console.error(error);
      setError(' invalid otp or was expired. Please try again.');
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };
  
  
  const isSubmitDisabled =
    loading || !agreeTerms || !email || !newPassword || !confirmPassword || !!error;


  return (
    <div className='h-screen  font-bold'>
      <div>
        <h1 className='flex justify-center text-xl text-slate-950 mt-16'>
          Reset Password
        </h1>
      </div>

      <div className='flex justify-center'>
        <input
          type='email'
          className='h-7 p-2 mt-5 border-2 border-slate-950 lg:w-1/3 
          max-lg:w-2/4 max-sm:w-full focus:outline max-sm:m-2 bg-white text-sm'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className='flex justify-center'>
        <input
          type='password'
          className='lg:w-1/3 max-lg:w-2/4 max-sm:w-full h-7 max-sm:m-2 p-2 
          mt-5 border-2 border-slate-950 focus:outline bg-white text-sm'
          placeholder='Enter new password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className='flex justify-center'>
        <input
          type='password'
          className='lg:w-1/3 max-lg:w-2/4 max-sm:w-full h-7 max-sm:m-2 p-2 mt-5 
          border-2 border-slate-950 focus:outline bg-white text-sm'
          placeholder='Confirm new password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className='flex justify-center sm:mt-4'>
     <button type='button' 
       className='flex justify-between lg:w-1/3 max-lg:w-2/4 max-sm:w-full 
       h-auto max-sm:m-2   border-2
    border-slate-950 focus:outline bg-white text-sm ' >
       
       <input type='number'
       placeholder='Enter the otp'
       className='flex flex-1 text-sm bg-white h-7 pl-5' 
       value={otp}
       onChange={(e) => setOtp(e.target.value)}/>

       <button className=' w-auto h-7 text-slate-50 bg-slate-950 px-2
         hover:bg-blue-950
       border-l-2 border-black ml-5'
       onClick={handleOtpSend}
       > {loading ? 'sending...' : 'SendOtp'}</button>
     </button>
      </div>

      <div className='flex justify-center '>
      <span  className=' w-60  h-8 mt-5  text-sm
         text-left  max-sm:m-5 '>   
          <h1 className='flex justify-between '>

          <button className='w-auto h-8 max-sm:text-sm
         px-5  bg-slate-0 text-black border-l-2 border-slate-950 
        '> {countdown}</button>

       <button  className={`w-auto h-8 hover:bg-indigo-950 max-sm:text-sm 
             rounded-xl px-2  
              bg-slate-0 text-black border-l-2 border-slate-950 hover:text-white
              ${otpResendLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleOtpResend}
              disabled={otpResendLoading}
              >{loading ? 'sending...' : 'RESEND OTP'}</button>

       </h1>
      </span>
      </div>



      <div className='flex justify-center mt-3'>
        <input
          type='checkbox'
          className='mr-2 w-4 h-4 mt-1'
          checked={agreeTerms}
          onChange={() => setAgreeTerms(!agreeTerms)}
        />
         <Link href={{pathname:'/Terms'}}>
        <p className='text-sm text-indigo-800'>I agree with terms and conditions</p>
        </Link>
     </div>

      <div className='flex justify-center'>
        <button
          type='submit'
          className={`text-slate-50 bg-slate-950 lg:w-1/4 max-lg:w-2/5 
          max-sm:w-5/6 h-7 hover:bg-blue-950 rounded-xl mt-2 ${
            isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleSubmit}
        >
          {loading ? 'Resetting Password...' : 'Update'}
        </button>
      </div>

       {error && (
        <div className='flex justify-center text-red-500 text-sm m-2'>
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className='flex justify-center text-green-500 text-sm m-2'>
          <p>{success}</p>
        </div>
      )}

    </div>
  );
};

export default Forgot;
