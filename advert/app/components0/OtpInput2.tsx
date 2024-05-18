'use client'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail,setOtp,setResendDisabled } from '../app/registerOtp';
import Navbar0 from './Navbar0';
import OtpInput from 'react-otp-input';
import OTPRegistrationUtils from '../utils/verifyRegister';
import { useRouter } from 'next/navigation';
import { setAuthenticated } from "../app/authenticateSlice";
import { RootState } from '../app/store';

const OtpInput2 = () => {

  const email = useSelector((state: RootState)  => state.RegisterOtp.email);

  const [otp, setOtp] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();
  
  const handleResend = async () => {
    try {
      setResendDisabled(true);
      dispatch(setEmail(email));
      await OTPRegistrationUtils.resendOTP(email);
      console.log('OTP resent successfully');
      setSuccessMessage('OTP resent successfully');
    } catch (error:any) {
      console.error('ending OTError resP:', error.message);
      setErrorMessage(`your : ${error.message}`);
    } finally {
      setResendDisabled(false);
    }
  };

  const handleVerify = async () => {
    try {

        setLoading(true);
      
      const verifyResponse = await OTPRegistrationUtils.registerUser({
        email,
        otp,
      });
  
      if (verifyResponse.message === 'OTP verified successfully') {
        console.log('OTP verified successfully');
        dispatch(setAuthenticated(true));
        setSuccessMessage('OTP verified successfully');
        router.push('/');
      } else {
        console.error('Error verifying OTP:', verifyResponse.message);
        setErrorMessage(`Error verifying OTP: ${verifyResponse.message}`);
      }
    } catch (error: any) {
      console.error('Error verifying OTP:', error.message);
      setErrorMessage(`Error verifying OTP: ${error.message}`);
    } finally {
      setLoading(true);
  }
  };

  

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    } else {
      handleResend();
    }

    return () => clearInterval(countdownInterval);
  }, [countdown]);


  return (
    <div className='h-screen border-4 border-purple-950 font-bold'>
      <Navbar0 />
      <div>
        <h1 className='flex justify-center text-2xl text-slate-950 mt-40 max-md:text-xl'>
          We have sent your verification code to!
        </h1>
      </div>

      <div>
        <h1 className='flex justify-center text-3xl text-slate-950 mt-10 max-md:text-xl'>
         
         {email.replace(/(.*)(.{4})(?=@)/, (match, p1, p2) => p1 + p2.replace(/./g, '*'))}
        </h1>
      </div>



      <div className='flex justify-center mt-10'>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputStyle={{ width: 45, height: 45, gap: 20, backgroundColor: 'white' }}
          renderSeparator={<span className='m-1'>-</span>}
          renderInput={(props) => <input {...props} className='border-2 border-slate-950 gap-4' />}
        />
      </div>

      <div className='flex justify-center'>
        <span className='w-60 h-11 mt-10 text-lg text-left max-sm:m-10'>
          <h1 className='flex justify-between'>
            <button className='w-auto h-10 max-sm:text-lg px-5 bg-slate-0 text-black border-l-4 border-slate-950'>
            {countdown}
            </button>

            <button
              onClick={handleResend}
              className={`w-auto h-10 hover:bg-indigo-950 max-sm:text-lg rounded-xl px-5 bg-slate-0 text-black ${
                resendDisabled ? 'opacity-50 cursor-not-allowed' : 'border-l-4 border-slate-950 hover:text-white'
              }`}
              disabled={resendDisabled}
            >
              RESEND
            </button>
          </h1>
        </span>
      </div>

      <div className='flex justify-center'>
        <button
          type='submit'
          onClick={handleVerify}
          className='text-slate-50 bg-blue-950 lg:w-1/4 max-lg:w-3/6 
          max-md:w-3/5 h-10 rounded-xl hover:bg-purple-950 mt-6 text-xl'
        >
           {loading ? 'verifying...' : 'verify'}
        </button>
      </div>

      {successMessage && (
        <p className='flex justify-center text-green-500 text-2xl mt-2'>{successMessage}</p>
      )}
      {errorMessage && (
        <p className='flex justify-center text-red-500 text-2xl mt-2'>{errorMessage}</p>
      )}

    </div>
  );
};

export default OtpInput2;

