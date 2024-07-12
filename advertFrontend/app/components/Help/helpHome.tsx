'use client'
import Link from "next/link"
import { useState } from "react";
import { useRouter } from "next/navigation";
import HelpImage from "./helpImages";
import HelpBanner from "./helpBanner";
import HelpVideo from "./helpVideos";
import HelpSettings from "./helpSettings";
import HelpContact from "./helpContact";


const HelpHome = () => {

  const router = useRouter();

  
  const [selectedRoute, setSelectedRoute] = useState<string>('HelpImage');

  return (
    <div className="w-full ">
       
        <div>
            <div className="flex justify-between  gap-4 overflow-x-auto 
             overscroll-auto bg-cyan-00 text-sm max-sm:py-1
             py-2 border-4 border-yellow-950  " >


               <button  onClick={() => setSelectedRoute('HelpImage')}
              type="submit" className="h-7 px-10 max-sm:px-3 ml-4 hover:bg-green-800 
               rounded-sm max-sm:h-6 bg-yellow-950 text-slate-50">HowToUploadImages
               </button>

               <button onClick={() => setSelectedRoute('HelpBanner')}
              type="submit" className="h-7 max-sm:px-3 px-10 ml-4 hover:bg-green-800 
               rounded-sm max-sm:h-6  bg-yellow-950 text-slate-50">HowToUploadBanners
               </button>

              <button onClick={() => setSelectedRoute('HelpVideo')}
               type="submit" className="h-7 max-sm:px-3 px-10 hover:bg-green-800 
              rounded-sm max-sm:h-6  bg-yellow-950 text-slate-50">HowToUploadVideos
              </button>
              
              <button onClick={() => setSelectedRoute('HelpSettings')}
              type="submit" className="h-7 max-sm:px-3 px-10 hover:bg-green-800 
              rounded-sm max-sm:h-6  bg-yellow-950 text-slate-50">SetYourPreferences
              </button>
             
              <button onClick={() => setSelectedRoute('HelpContact')}
              type="submit" className="h-7 max-sm:px-3 px-10 hover:bg-green-800 
              rounded-sm max-sm:h-6  mr-4 bg-yellow-950 text-slate-50">ContactUs
              </button>

            </div>
          </div>
          <div>
        </div>
            
      {selectedRoute === 'HelpImage' && <HelpImage />}
      {selectedRoute === 'HelpBanner' && <HelpBanner />}
      {selectedRoute === 'HelpVideo' && <HelpVideo />}
      {selectedRoute === 'HelpSettings' && <HelpSettings />}
      {selectedRoute === 'HelpContact' && <HelpContact />}
     
             
    </div>
  )
}

export default HelpHome




