'use client'
import Link from "next/link"
import { useState } from "react";
import { useRouter } from "next/navigation";
import PrivacyUse from "./privacyUse";
import PrivacyChange from "./privacyChange";
import PrivacyContact from "./privacyContact";
import PrivacyInfo from "./privacyInfo";
import PrivacyRights from "./privacyRights";
import PrivacySecurity from "./privacySecurity";
import PrivacyShare from "./privacyShare";
import FavoritePolicy from "./prisvacyPolicy";


const PrivacyHome = () => {

  const router = useRouter();

 
  const [selectedRoute, setSelectedRoute] = useState<string>('PrivacyUse');

  return (
    <div className="w-full ">
       
        <div>
            <div className="flex justify-between  gap-4 overflow-x-auto 
             overscroll-auto bg-cyan-00 text-xl 
             py-3 border-8 border-purple-950  " >


               <button  onClick={() => setSelectedRoute('PrivacyUse')}
              type="submit" className="h-11 px-10 ml-4 hover:bg-indigo-700 
               rounded-xl bg-blue-950 text-slate-50">UseOfInformation
               </button>

               <button onClick={() => setSelectedRoute('PrivacyInfo')}
              type="submit" className="h-11 px-10 ml-4 hover:bg-indigo-700 
               rounded-xl  bg-blue-950 text-slate-50">InformationWeCollect
               </button>

              <button onClick={() => setSelectedRoute('PrivacySecurity')}
               type="submit" className="h-11 px-10 hover:bg-indigo-700 
              rounded-xl  bg-blue-950 text-slate-50">DataSecurity
              </button>
              
              <button onClick={() => setSelectedRoute('PrivacyShare')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700 
              rounded-xl  bg-blue-950 text-slate-50">DataSharing
              </button>

              <button onClick={() => setSelectedRoute('PrivacyRights')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700
               rounded-xl   bg-blue-950 text-slate-50">UserRights
               </button> 
              
              <button onClick={() => setSelectedRoute('PrivacyChange')}
               type="submit" className="h-11 px-10 hover:bg-indigo-700 
              rounded-xl  bg-blue-950 text-slate-50">ChangesToPrivacyPolicy
              </button>
             
              <button onClick={() => setSelectedRoute('PrivacyContact')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700 
              rounded-xl   mr-4 bg-blue-950 text-slate-50">ContactUs
              </button>

            </div>
          </div>
          <div>
        </div>
            
      {selectedRoute === 'PrivacyChange' && <PrivacyChange />}
      {selectedRoute === 'PrivacyContact' && <PrivacyContact />}
      {selectedRoute === 'PrivacyInfo' && <PrivacyInfo />}
      {selectedRoute === 'PrivacyRights' && <PrivacyRights />}
      {selectedRoute === 'PrivacySecurity' && <PrivacySecurity />}
      {selectedRoute === 'PrivacyShare' && <PrivacyShare />}
      {selectedRoute === 'PrivacyUse' && <PrivacyUse />}
      {selectedRoute === 'FavoritePolicy' && <FavoritePolicy />}
               
    </div>
  )
}

export default PrivacyHome




