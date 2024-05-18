'use client'
import Link from "next/link"
import { FiMenu, FiX } from 'react-icons/fi'; 
import { useState, useEffect } from "react";
import Menu from "./Menu";
import { FaHome } from "react-icons/fa";
import { setAuthenticated } from "../app/authenticateSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../utils/logout";
import { Provider } from 'react-redux';
import store from '@/app/app/store';
import { useRouter } from "next/navigation";
import { RootState } from "@/app/app/store";
import {  signOut, useSession } from 'next-auth/react';


interface UserInfo {
  firstName: string;
  lastName: string;
  profile: {
    photoUrl: string | null;
  };
}

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const Navbar0 = () => {

  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state: RootState) => state.authenticate.isAuthenticated);
  const [MenuVisible, setMenuVisible] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleMenuClick = ()=>{
     setMenuVisible(!MenuVisible);

  };      const  closeMenu = ()=> {
        setMenuVisible(false);  
       };

       const handleLogout = async () => {
        try {
          await signOut();
          localStorage.removeItem('userId');
          localStorage.removeItem('accessToken');
          dispatch(setAuthenticated(false)); 
          await logout();
          dispatch(setAuthenticated(false)); 
          router.push('/Sign_In');
        } catch (error:any) {
          console.error('Error during logout:', error.message);
        }};

        const handleSignOut = async () => {
          try {
            await signOut();
            localStorage.removeItem('userId');
            localStorage.removeItem('accessToken');
            dispatch(setAuthenticated(false));
            router.push('/Sign_In'); 
          } catch (error:any) {
            console.error('Error during logout:', error.message);
          }
        };

      useEffect(() => {
        if (session && session.user && (session.user as User).id) {
          localStorage.setItem('userId', (session.user as User).id);
          localStorage.setItem('accessToken',"fbeae2838c3783ad69b03b656af22fbeae2838c3783ad69b03b656af2");
          dispatch(setAuthenticated(true));
        }
      }, [session]);

  return (
    <div className=" w-full  " >
      <Provider store={store}>
      <div className="bg-blue-950 py-3 border-4 border-slate-50 overflow-x-auto ">
        <div className=" flex justify-normal  ">
          <div className="text-white py-2 px-5 ml-1   "> 
            <button 
            onClick={handleMenuClick} className="text-3xl font-bold"> 
            {MenuVisible ? ( <FiX />  ) : (<FiMenu  />  )}
             
            </button>
            <div onClick={closeMenu}>
            {MenuVisible &&  (<Menu /> ) }
            </div>
            </div>
            <Link href={{pathname:'/'}} >             
            <FaHome className='text-3xl text-white  mr-5 mt-2'/>
          </Link>

          <Link href={{pathname:'/'}} className="max-md:flex flex-1">
          <h1 className="text-3xl max-md:text-2xl text-white mt-1 font-bold 
          max-sm:hidden ">AdvertConnectPro</h1>
          </Link>
          <div className="flex flex-row mr-2  ">

          {status == 'authenticated' && (
          <button type="button" className="bg-gray-950 py-2 px-6 
          rounded-full text-slate-50 mr-2 hover:bg-slate-800 border-2
          border-slate-300 flex-1 font-bold"
          onClick={handleSignOut} >
          Logout
          </button>)}

          {isAuthenticated ? (
          <>
          {status !== 'authenticated' && ( 
          <button type="button" className="bg-gray-950 py-2 px-6 
          rounded-full text-slate-50 mr-2 hover:bg-slate-800 border-2
          border-slate-300 flex-1 font-bold"
          onClick={handleLogout} >
          Logout</button>)}
          </>

          ) : (
          <>
          {status !== 'authenticated' && (
          <Link href={{ pathname: '/Sign_Up' }}>
            <button type="button" className="bg-gray-950 py-2 px-6 rounded-full
             text-slate-50 mr-3 hover:bg-slate-800 border-2 max-sm:hidden
             border-slate-300 font-bold">
              SignUp
            </button>
          </Link>)}

          {status !== 'authenticated' && (
          <Link href={{ pathname: '/Sign_In' }}>
            <button type="button" className="bg-gray-950 py-2 px-6 rounded-full
             text-slate-50 mr-2 hover:bg-slate-800 border-2
              border-slate-300 flex-1 font-bold">
              SignIn
            </button>
          </Link>)}
          </>
          )}
              
         </div>    
        </div>              
       </div>
       </Provider>
      </div>
    
  )
}

export default Navbar0

