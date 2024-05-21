'use client'
import Link from "next/link"
import { useState } from "react";
import { FaSearch } from 'react-icons/fa';
import Posting from "../Components1/Posting/Posting";
import All from "../Components1/All/All";
import { useRouter } from "next/navigation";


const Header = () => {

  const router = useRouter();
  const [selectedRoute, setSelectedRoute] = useState<string>('All');

  return (
    <div className="w-full ">
       
        <div>
            <div className="flex justify-between gap-4 overflow-x-auto 
             overscroll-auto bg-cyan-00 text-xl
             py-3 border-4 border-purple-950  " >


               <button  onClick={() => setSelectedRoute('All')}
              type="submit" className="h-11 px-10 ml-4 hover:bg-indigo-700 
               rounded-xl  bg-blue-950 text-slate-50">Home
               </button>

               <Link href={{pathname:'/Product'}}>
               <button onClick={() => router.push('/Product')}
              type="submit" className="h-11 px-10 ml-4 hover:bg-indigo-700 
               rounded-xl  bg-blue-950 text-slate-50">AllProducts
               </button></Link>

               <Link href={{pathname:'/Product/Fashion'}}>
              <button onClick={() => router.push('/Product/Fashion')}
               type="submit" className="h-11 px-10 hover:bg-indigo-700 
              rounded-xl  bg-blue-950 text-slate-50">Fashion
              </button></Link>
              
              <Link href={{pathname:'/Product/Electronics'}}>
              <button onClick={() => router.push('/Product/Electronics')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700 
              rounded-xl  bg-blue-950 text-slate-50">Electronic
              </button></Link>

              <Link href={{pathname:'/Product/Recipe'}}>
                <button onClick={() => router.push('/Product/Recipe')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700
               rounded-xl  bg-blue-950 text-slate-50">Recipe
               </button></Link>   
              
               <Link href={{pathname:'/Product/Equipments'}}>
              <button onClick={() => router.push('/Product/Equipments')}
               type="submit" className="h-11 px-10 hover:bg-indigo-700 
              rounded-xl  bg-blue-950 text-slate-50">Equipment
              </button></Link>

               <Link href={{pathname:'/Product/Sports'}}>
              <button onClick={() => router.push('/Product/Sports')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700
               rounded-xl  bg-blue-950 text-slate-50">Sports
               </button> </Link>

               <Link href={{pathname:'/Product/Fruits'}}>
              <button onClick={() => router.push('/Product/Fruits')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700
              rounded-xl  bg-blue-950 text-slate-50">Fruits
              </button></Link>

               <Link href={{pathname:'/Product/Books'}}>
                <button  onClick={() => router.push('/Product/Books')}
              type="submit" className="h-11 px-10  hover:bg-indigo-700 
               rounded-xl  bg-blue-950 text-slate-50">Books
               </button></Link>
             
               <Link href={{pathname:'/Product/SparePart'}}>
              <button onClick={() => router.push('/Product/SparePart')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700 
              rounded-xl  bg-blue-950 text-slate-50">SparePart
              </button></Link>

              <Link href={{pathname:'/Product/Babies&Kids'}}>
              <button onClick={() => router.push('/Product/Babies&Kids')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700 
              rounded-xl  bg-blue-950 text-slate-50">Babies&kinds
              </button></Link>

              <Link href={{pathname:'/Product/Accessories'}}>
              <button  onClick={() => router.push('/Product/Accessories')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700
               rounded-xl  bg-blue-950 text-slate-50">Accessories
               </button></Link>

               <Link href={{pathname:'/Product/Animals'}}>
              <button onClick={() => router.push('/Product/Animals')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700
               rounded-xl  bg-blue-950 text-slate-50">Animals
               </button></Link>
             
               <Link href={{pathname:'/Product/Jewelry'}}>
              <button onClick={() => router.push('/Product/Jewelry')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700 
              rounded-xl  bg-blue-950 text-slate-50">Jewelry
              </button></Link>
             
              <Link href={{pathname:'/Product/Grocery'}}>
              <button onClick={() => router.push('/Product/Grocery')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700 
              rounded-xl  bg-blue-950 text-slate-50">Grocery
              </button></Link>
              
              <Link href={{pathname:'/Product/Beverage'}}>
              <button onClick={() => router.push('/Product/Beverage')}
              type="submit" className="h-11  px-10 hover:bg-indigo-700
               rounded-xl  bg-blue-950 text-slate-50">Beverage
               </button></Link>
              
               <Link href={{pathname:'/Product/HealthCare'}}>
              <button onClick={() => router.push('/Product/HealthCare')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700
               rounded-xl  bg-blue-950 text-slate-50">HealthCare
               </button></Link>
              
               <Link href={{pathname:'/Product/Properties'}}>
                <button onClick={() => router.push('/Product/Properties')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700
               rounded-xl  bg-blue-950 text-slate-50">Properties
               </button> </Link>

               <Link href={{pathname:'/Product/Shops&Stores'}}>
                <button onClick={() => router.push('/Product/Shops&Stores')}
              type="submit" className="h-11  px-10 hover:bg-indigo-700
               rounded-xl  bg-blue-950 text-slate-50">Shops&Stores
               </button></Link>
              
               <Link href={{pathname:'/Product/Restaurants'}}>
                <button onClick={() => router.push('/Product/Restaurants')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700
               rounded-xl  bg-blue-950 text-slate-50">Restaurants
               </button></Link>
              
               <Link href={{pathname:'/Product/EventCenter'}}>
                <button onClick={() => router.push('/Product/EVentCenter')}
               type="submit" className="h-11 px-10 hover:bg-indigo-700
               rounded-xl  bg-blue-950 text-slate-50">EventCenter
               </button> </Link>

               <Link href={{pathname:'/Product/Medical'}}>
              <button onClick={() => router.push('/Product/Medical')}
              type="submit" className="h-11  px-10 hover:bg-indigo-700
               rounded-xl  bg-blue-950 text-slate-50">Medical
               </button></Link>
              
               <Link href={{pathname:'/Product/Metal&Aluminum'}}>
                <button onClick={() => router.push('/Product/Metals&Aluminum')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700
               rounded-xl  bg-blue-950 text-slate-50">Metal&Aluminum
               </button></Link>
              
               <Link href={{pathname:'/Product/Kitchen'}}>
                <button onClick={() => router.push('/Product/Kitchen')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700
               rounded-xl  bg-blue-950 text-slate-50">Kitchen
               </button> </Link>

               <Link href={{pathname:'/Product/Cosmetics'}}>
                <button onClick={() => router.push('/Product/Cosmetics')}
              type="submit" className="h-11  px-10 hover:bg-indigo-700
               rounded-xl  bg-blue-950 text-slate-50">Cosmetics
               </button></Link>
              
               <Link href={{pathname:'/Product/Materials'}}>
              <button onClick={() => router.push('/Product/Materials')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700
               rounded-xl  bg-blue-950 text-slate-50">Materials
               </button></Link>
              
               <Link href={{pathname:'/Product/Cloths'}}>
                <button onClick={() => router.push('/Product/Cloths')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700
               rounded-xl  bg-blue-950 text-slate-50">Cloths
               </button> </Link>

               <Link href={{pathname:'/Product/Vehicles'}}>
              <button onClick={() => router.push('/Product/Vehicles')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700 
              rounded-xl  bg-blue-950 text-slate-50">Vehicles
              </button></Link>

              <Link href={{pathname:'/Product/Homes'}}>
              <button onClick={() => router.push('/Product/Homes')}
              type="submit" className="h-11 px-10  hover:bg-indigo-700 
               rounded-xl  bg-blue-950 text-slate-50">Homes
               </button></Link>

               <Link href={{pathname:'/Product/SuperMarkets'}}>
                <button onClick={() => router.push('/Product/SuperMarkets')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700
               rounded-xl  bg-blue-950 text-slate-50">SuperMarkets
               </button> </Link>

               <Link href={{pathname:'/Product/CoffeeShops'}}>
                <button onClick={() => router.push('/Product/CoffeeShops')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700
               rounded-xl  bg-blue-950 text-slate-50">CoffeeShops
               </button> </Link>

               <Link href={{pathname:'/Product/Software'}}>
              <button onClick={() => router.push('/Product/Software')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700
               rounded-xl  bg-blue-950 text-slate-50">Software
               </button> </Link>
               

               <Link href={{pathname:'/Product/Musics'}}>
              <button onClick={() => router.push('/Product/Musics')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700
              rounded-xl  bg-blue-950 text-slate-50">MusicInstrument
              </button></Link>

              <Link href={{pathname:'/Product/Furniture'}}>
              <button onClick={() => router.push('/Product/Furniture')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700
              rounded-xl  bg-blue-950 text-slate-50">Furniture
              </button></Link>

              <Link href={{pathname:'/Product/Building'}}>
              <button onClick={() => router.push('/Product/Building')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700
              rounded-xl  bg-blue-950 text-slate-50">BuildingMaterials
              </button></Link>

              <Link href={{pathname:'/Product/Others'}}>
              <button onClick={() => router.push('/Product/Others')}
              type="submit" className="h-11 px-10 hover:bg-indigo-700
              rounded-xl mr-5 bg-blue-950 text-slate-50">Others
              </button></Link>

            </div>
          </div>
          <div>
        </div>
            
      {selectedRoute === 'All' && <All />}
      {selectedRoute === 'Posting' && <Posting />}
               
    </div>
  )
}

export default Header




