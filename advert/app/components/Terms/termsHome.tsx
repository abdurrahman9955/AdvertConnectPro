'use client'
import Link from "next/link"
import { useState } from "react";
import { useRouter } from "next/navigation";
import TermsAbout from "./termsAbout";
import TermsRules from "./termsRules";
import TermsViolate from "./termsViolate";
import TermsAds from "./termsAds";
import TermsChange from "./termsChange";
import TermsContact from "./termsContact";


const TermsHome = () => {

  const router = useRouter();

  const initialRoute = localStorage.getItem('selectedRoute') || 'TermsAbout'
  const [selectedRoute, setSelectedRoute] = useState<string>(initialRoute);

  return (
    <div className="w-full ">
       
        <div>
            <div className="flex justify-between  gap-4 overflow-x-auto 
             overscroll-auto bg-cyan-00 text-xl 
             py-3 border-8 border-green-950  " >


               <button  onClick={() => setSelectedRoute('TermsAbout')}
              type="submit" className="h-11 px-10 ml-4 hover:bg-green-800 
               rounded-xl bg-green-950 text-slate-50">AboutAdvertConnectPro
               </button>

               <button onClick={() => setSelectedRoute('TermsRules')}
              type="submit" className="h-11 px-10 ml-4 hover:bg-green-800 
               rounded-xl  bg-green-950 text-slate-50">IntroductionAndAcceptance
               </button>

              <button onClick={() => setSelectedRoute('TermsViolate')}
               type="submit" className="h-11 px-10 hover:bg-green-800 
              rounded-xl  bg-green-950 text-slate-50">Rules&Regulations
              </button>
              
              <button onClick={() => setSelectedRoute('TermsAds')}
              type="submit" className="h-11 px-10 hover:bg-green-800 
              rounded-xl  bg-green-950 text-slate-50">IntegrationOfAdvertisements
              </button>

              <button onClick={() => setSelectedRoute('TermsChange')}
              type="submit" className="h-11 px-10 hover:bg-green-800
               rounded-xl   bg-green-950 text-slate-50">ChangesToTermsAndConditions
               </button> 
             
              <button onClick={() => setSelectedRoute('TermsContact')}
              type="submit" className="h-11 px-10 hover:bg-green-800 
              rounded-xl   mr-4 bg-green-950 text-slate-50">ContactUs
              </button>

            </div>
          </div>
          <div>
        </div>
            
      {selectedRoute === 'TermsAbout' && <TermsAbout />}
      {selectedRoute === 'TermsRules' && <TermsRules />}
      {selectedRoute === 'TermsViolate' && <TermsViolate />}
      {selectedRoute === 'TermsAds' && <TermsAds />}
      {selectedRoute === 'TermsContact' && <TermsContact />}
      {selectedRoute === 'TermsChange' && <TermsChange />}
     
               
    </div>
  )
}

export default TermsHome




