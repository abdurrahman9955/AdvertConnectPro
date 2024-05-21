'use client'
import   Link from "next/link"
import { FiMenu, FiX } from 'react-icons/fi'; 
import { useState,useEffect } from "react";
import   Menu0 from "./Menu0";
import { FaSearch } from 'react-icons/fa';
import { FaHome } from "react-icons/fa";
import   SearchMenu from "./SearchMenu";
import { useSearch } from "../Context/HomeContext";
import { setAuthenticated } from "../app/authenticateSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "../utils/logout";
import { Provider } from 'react-redux';
import store from '@/app/app/store';
import { RootState } from "@/app/app/store";
import { getCurrentUser } from "@/app/utils/userToken";
import {  signOut, useSession } from 'next-auth/react';
import Cookies from 'js-cookie';

interface UserInfo {
  firstName?: string;
  lastName?: string;
  profile?: {
    photoUrl: string | null;
  };
}

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null
}

const Navbar = () => {
  
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const isAuthenticated = useSelector((state: RootState) => state.authenticate.isAuthenticated);

  const [MenuVisible, setMenuVisible] = useState(false);
   const [SearchVisible, setSearchVisible] = useState(false);
   const { searchTerm, setSearchTerm } = useSearch();
   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
   const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (session && session.user && (session.user as User).id) {
      Cookies.set('accessToken', "fbeae2838c3783ad69b03b656af22fbeae2838c3783ad69b03b656af2",{ path: '/', expires: 7 });
      Cookies.set('userId', (session.user as User).id, { path: '/', expires: 7 });
      dispatch(setAuthenticated(true));
    }
  }, [session]);

   const handleHomeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
     setSearchTerm(e.target.value);
   };

  const handleMenuClick = ()=>{
     setMenuVisible(!MenuVisible);

  };      const  closeMenu = ()=> {
        setMenuVisible(false);  
       };

        const handleSearch = ()=>{
    setSearchVisible(!SearchVisible);

  };  const  closeSearch = ()=> {
      setMenuVisible(false);   };

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(setAuthenticated(false));
      router.push('/Sign_In'); 
    } catch (error:any) {
      console.error('Error during logout:', error.message);
    }
  };

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
    async function fetchUserInfo() {
      try {
        const userData = await getCurrentUser();
        setUserInfo(userData);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setErrorMessage('Failed to fetch user information. Please try again.');
      }
    }

    fetchUserInfo();
  }, []);

  return (
    <div className=" w-full  " >
      <Provider store={store}>
      <div className="bg-blue-950 py-3 border-4 border-slate-50 overflow-x-auto ">
        <div className=" flex justify-normal  ">
          
          <div className=" text-white py-2 px-5 ml-1   "> 
            <button 
             onClick={handleMenuClick} className="text-3xl font-bold"> 
               {MenuVisible ? (
             <FiX />  ) : (
             <FiMenu  />  )}
             
              </button>
              <div onClick={closeMenu}>
            {MenuVisible && 
            
               (<Menu0 /> )
               
               }
               </div>
            </div>

              <Link href={{pathname:'/'}} >             
            <FaHome className='text-3xl text-white  mr-5 mt-2'/>
            </Link>

            <Link href={{pathname:'/'}} className="max-md:flex max-lg:flex-1">
              <h1 className="text-3xl max-md:text-2xl text-white mt-1 font-bold 
             max-sm:hidden ">AdvertConnectPro</h1>
            </Link>

            <input type="text" 
                value={searchTerm}
                onChange={handleHomeSearch}
                className="flex justify-center border-2 border-black  px-24 
                rounded-l-full  flex-1  ml-10 pl-5 max-md:mx-3 max-lg:hidden h-12
                 lg:w-full text-2xl xl:px-40 bg-white" 
                placeholder="search here "  /> 
  
                <button type="submit"
                value={searchTerm}
                 className="bg-lime-950 mr-4 text-slate-200
                rounded-r-full px-4 max-lg:hidden h-12 border border-white lg:mr-10
                font-bold   hover:bg-orange-950 ">search</button>

            <div className="flex flex-row mr-2  ">

            {userInfo ? (
          <div className="flex items-center justify-center">
          <div className="flex flex-col items-start">
            <h1 className="text-3xl hidden font-bold">{userInfo.firstName} {userInfo.lastName}</h1>
            {userInfo.profile?.photoUrl && (
              <img className="relative rounded-full w-12 h-12 mr-3 " src={userInfo.profile?.photoUrl} alt="Profile Image" />
            )}
          </div>
         </div>
         ) : (
        <p className="text-center hidden text-red-500">{errorMessage}</p>
        )}
            
                
            <button  onClick={handleSearch}  className='text-3xl text-white 
            lg:hidden mr-5 '>

                {SearchVisible ? (
             <FiX />  ) : (
             <FaSearch />  )}
            
            </button>

            <div onClick={closeSearch} >
            {SearchVisible && 
            
            (<SearchMenu />)
               
               }
               </div>

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
            Logout
            </button>)}
            </>
            ):(
            <>

          {status !== 'authenticated' && (
          <Link href={{ pathname: '/Sign_Up' }}>
            <button type="button" className="bg-gray-950 py-2 px-6 rounded-full
             text-slate-50 mr-3 hover:bg-slate-800 border-2 max-lg:hidden
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

export default Navbar


