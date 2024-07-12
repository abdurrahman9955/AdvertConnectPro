import React, { useState,useEffect } from 'react';
import { getSession, signIn, useSession } from 'next-auth/react';
import { setAuthenticated } from '../app/authenticateSlice';
import { FaFacebook } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface Session {
  token?: any,
}

const Verify: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (session && session.user && (session.user as User).id) {
      Cookies.set('accessToken', "fbeae2838c3783ad69b03b656af22fbeae2838c3783ad69b03b656af2",{ path: '/', expires: 7 });
      Cookies.set('userId', (session.user as User).id, { path: '/', expires: 7 });

      dispatch(setAuthenticated(true));
      
    }
  }, [session]);

  const handleSignInWithGoogle = async () => {
    try {
      await signIn('google');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleSignInWithFacebook = async () => {
    try {
      await signIn('facebook');
    } catch (error) {
      console.error('Error signing in with Facebook:', error);
    }
  }; 

  return (
    <div className='font-bold'>
      <div className='flex justify-center mt-3'>
        <div className='flex flex-col'>
          <div className='border-2 border-blue-950 h-auto w-auto lg:px-5 p-2'>
            <h1 className='flex justify-center text-sm max-sm:text-sm'>or continue with </h1>

            <div className='flex flex-row justify-between'>
              <div className='flex justify-center mb-3 mt-3 text-2xl'>
                <button
                  onClick={handleSignInWithGoogle}
                  type='button'
                  className='flex flex-row bg-white h-9 w-28 pt-2 hover:bg-cyan-200
                   border-2
                  border-blue-950 pb-1 text-center pl-3'>
                  <FaGoogle size={20} className='mr-1  text-red-700' />
                  <span className='text-green-800 text-sm   font-bold'>
                    Google
                  </span>
                </button>
              </div>

              <div className='flex justify-center m-3 text-xl '>
                <button
                  onClick={handleSignInWithFacebook}
                  type='button'
                  className='flex flex-row bg-white h-9 pt-2  pl-2  w-28
                   hover:bg-cyan-200
                  border-2 border-blue-950 text-sm pb-2  text-blue-700 text-center'>
                  <FaFacebook size={20} className='mr-1 ' /> Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
