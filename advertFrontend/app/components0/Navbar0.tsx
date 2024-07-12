'use client'
import Link from "next/link"
import { FiMenu, FiX } from 'react-icons/fi'; 
import { useState, useEffect } from "react";
import Menu from "./Menu";
import { FaHome } from "react-icons/fa";
import { setAuthenticated } from "../app/authenticateSlice";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../utils/logout";
import { useRouter } from "next/navigation";
import { RootState } from "@/app/app/store";
import {  signOut, useSession } from 'next-auth/react';
import Cookies from 'js-cookie';


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
          Cookies.remove('userId', { path: '/' }); 
          Cookies.remove('accessToken', { path: '/' }); 
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
            Cookies.remove('userId', { path: '/' }); 
            Cookies.remove('accessToken', { path: '/' }); 
            dispatch(setAuthenticated(false));
            router.push('/Sign_In'); 
          } catch (error:any) {
            console.error('Error during logout:', error.message);
          }
        };

      useEffect(() => {
        if (session && session.user && (session.user as User).id) {
          Cookies.set('accessToken', "fbeae2838c3783ad69b03b656af22fbeae2838c3783ad69b03b656af2",{ path: '/', expires: 7 });
          Cookies.set('userId', (session.user as User).id, { path: '/', expires: 7 });
          dispatch(setAuthenticated(true));
        }
      }, [session]);

  return (
    <div className=" w-full  " >
     
      <div className="bg-blue-950 py-1 border-2 border-slate-50 overflow-x-auto ">
        <div className=" flex justify-normal  ">
          <div className="text-white  px-5 ml-1   "> 
            <button 
            onClick={handleMenuClick} className="text-xl mt-2 font-bold"> 
            {MenuVisible ? ( <FiX />  ) : (<FiMenu  />  )}
             
            </button>
            <div onClick={closeMenu}>
            {MenuVisible &&  (<Menu /> ) }
            </div>
            </div>
            <Link href={{pathname:'/'}} >             
            <FaHome className='text-xl text-white mt-2 mr-5 '/>
          </Link>

          <Link href={{pathname:'/'}} className="max-md:flex flex-1">
          <h1 className="text-lg max-md:text-xl text-white mt-1 font-bold 
          max-sm:hidden ">AdvertConnectPro</h1>
          </Link>
          <div className="flex flex-row mr-2  ">

          {status == 'authenticated' && (
          <button type="button" className="bg-gray-950 h-8 px-4 text-sm 
          rounded-full text-slate-50 mr-2 hover:bg-slate-800 border  
          border-slate-300 flex-1 "
          onClick={handleSignOut} >
          Logout
          </button>)}

          {isAuthenticated ? (
          <>
          {status !== 'authenticated' && ( 
          <button type="button" className="bg-gray-950 h-8 px-4 text-sm  
          rounded-full text-slate-50 mr-2 hover:bg-slate-800 border 
          border-slate-300 flex-1 "
          onClick={handleLogout} >
          Logout</button>)}
          </>

          ) : (
          <>
          {status !== 'authenticated' && (
          <Link href={{ pathname: '/Sign_Up' }}>
            <button type="button" className="bg-gray-950 h-8  px-4 rounded-full
             text-slate-50 mr-3 hover:bg-slate-800 border max-sm:hidden text-sm  
             border-slate-300 ">
              SignUp
            </button>
          </Link>)}

          {status !== 'authenticated' && (
          <Link href={{ pathname: '/Sign_In' }}>
            <button type="button" className="bg-gray-950 h-8  px-4  rounded-full
             text-slate-50 mr-2 hover:bg-slate-800 border text-sm 
              border-slate-300 flex-1 ">
              SignIn
            </button>
          </Link>)}
          </>
          )}
              
         </div>    
        </div>              
       </div>
      </div>
    
  )
}

export default Navbar0

