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
    <div className="w-full  ">
      
        <div>
            <div className="flex justify-between gap-2  overflow-x-auto 
             overscroll-auto bg-cyan-00 text-sm 
             max-sm:py-1 py-2   border-2 border-purple-950  " >


               <button  onClick={() => setSelectedRoute('All')}
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 
              ml-2 hover:bg-indigo-700 
               rounded-sm  bg-blue-950 text-slate-50">Home
               </button>

               <Link href={{pathname:'/Product'}}><button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3  hover:bg-indigo-700 
               rounded-sm  bg-blue-950 text-slate-50">AllProducts
               </button></Link>

               <Link href={{pathname:'/Product/Fashion'}}><button 
               type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3
                hover:bg-indigo-700 
              rounded-sm  bg-blue-950 text-slate-50">Fashion
              </button></Link>
              
              <Link href={{pathname:'/Product/Electronics'}}><button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700 
              rounded-sm  bg-blue-950 text-slate-50">Electronic
              </button></Link>

              <Link href={{pathname:'/Product/Recipe'}}><button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700
               rounded-sm  bg-blue-950 text-slate-50">Recipe
               </button></Link>   
              
               <Link href={{pathname:'/Product/Equipments'}}><button 
               type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700 
              rounded-sm bg-blue-950 text-slate-50">Equipment
              </button></Link>

               <Link href={{pathname:'/Product/Sports'}}><button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700
               rounded-sm  bg-blue-950 text-slate-50">Sports
               </button> </Link>

               <Link href={{pathname:'/Product/Fruits'}}><button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700
              rounded-sm  bg-blue-950 text-slate-50">Fruits
              </button></Link>

               <Link href={{pathname:'/Product/Books'}}><button  
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3  hover:bg-indigo-700 
               rounded-sm  bg-blue-950 text-slate-50">Books
               </button></Link>
             
               <Link href={{pathname:'/Product/SparePart'}}> <button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700 
              rounded-sm  bg-blue-950 text-slate-50">SparePart
              </button></Link>

              <Link href={{pathname:'/Product/Babies&Kids'}}><button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700 
              rounded-sm bg-blue-950 text-slate-50">Babies&kinds
              </button></Link>

              <Link href={{pathname:'/Product/Accessories'}}><button  
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700
               rounded-sm  bg-blue-950 text-slate-50">Accessories
               </button></Link>

               <Link href={{pathname:'/Product/Animals'}}> <button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700
               rounded-sm  bg-blue-950 text-slate-50">Animals
               </button></Link>
             
               <Link href={{pathname:'/Product/Jewelry'}}> <button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700 
              rounded-sm  bg-blue-950 text-slate-50">Jewelry
              </button></Link>
             
              <Link href={{pathname:'/Product/Grocery'}}><button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700 
              rounded-sm  bg-blue-950 text-slate-50">Grocery
              </button></Link>
              
              <Link href={{pathname:'/Product/Beverage'}}><button 
              type="submit" className="h-7  max-sm:h-6  px-10 max-sm:px-3 hover:bg-indigo-700
               rounded-sm  bg-blue-950 text-slate-50">Beverage
               </button></Link>
              
               <Link href={{pathname:'/Product/HealthCare'}}><button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700
               rounded-sm  bg-blue-950 text-slate-50">HealthCare
               </button></Link>
              
               <Link href={{pathname:'/Product/Properties'}}><button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700
               rounded-sm  bg-blue-950 text-slate-50">Properties
               </button> </Link>

               <Link href={{pathname:'/Product/Shops&Stores'}}><button 
              type="submit" className="h-7  max-sm:h-6  px-10 max-sm:px-3 hover:bg-indigo-700
               rounded-sm  bg-blue-950 text-slate-50">Shops&Stores
               </button></Link>
              
               <Link href={{pathname:'/Product/Restaurants'}}><button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700
               rounded-sm  bg-blue-950 text-slate-50">Restaurants
               </button></Link>
              
               <Link href={{pathname:'/Product/EventCenter'}}><button 
               type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700
               rounded-sm  bg-blue-950 text-slate-50">EventCenter
               </button> </Link>

               <Link href={{pathname:'/Product/Medical'}}><button 
              type="submit" className="h-7  max-sm:h-6  px-10 max-sm:px-3 hover:bg-indigo-700
               rounded-sm  bg-blue-950 text-slate-50">Medical
               </button></Link>
             
               <Link href={{pathname:'/Product/Metals&Aluminum'}}><button 
               type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700
               rounded-sm  bg-blue-950 text-slate-50">Metal&Aluminum
               </button></Link>
              
               <Link href={{pathname:'/Product/Kitchen'}}><button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700
               rounded-sm  bg-blue-950 text-slate-50">Kitchen
               </button> </Link>

               <Link href={{pathname:'/Product/Cosmetics'}}><button 
              type="submit" className="h-7  max-sm:h-6  px-10 max-sm:px-3 hover:bg-indigo-700
               rounded-sm  bg-blue-950 text-slate-50">Cosmetics
               </button></Link>
              
               <Link href={{pathname:'/Product/Materials'}}><button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700
               rounded-sm  bg-blue-950 text-slate-50">Materials
               </button></Link>
              
               <Link href={{pathname:'/Product/Cloths'}}><button 
               type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700
               rounded-sm  bg-blue-950 text-slate-50">Cloths
               </button> </Link>

               <Link href={{pathname:'/Product/Vehicles'}}><button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700 
              rounded-sm  bg-blue-950 text-slate-50">Vehicles
              </button></Link>

              <Link href={{pathname:'/Product/Homes'}}><button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3  hover:bg-indigo-700 
               rounded-sm  bg-blue-950 text-slate-50">Homes
               </button></Link>

               <Link href={{pathname:'/Product/SuperMarkets'}}><button
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700
               rounded-sm  bg-blue-950 text-slate-50">SuperMarkets
               </button> </Link>

               <Link href={{pathname:'/Product/CoffeeShops'}}><button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700
               rounded-sm  bg-blue-950 text-slate-50">CoffeeShops
               </button> </Link>

               <Link href={{pathname:'/Product/Software'}}><button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700
               rounded-sm  bg-blue-950 text-slate-50">Software
               </button> </Link>
               

               <Link href={{pathname:'/Product/Musics'}}><button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700
              rounded-sm  bg-blue-950 text-slate-50">MusicInstrument
              </button></Link>

              <Link href={{pathname:'/Product/Furniture'}}><button
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700
              rounded-sm  bg-blue-950 text-slate-50">Furniture
              </button></Link>

              <Link href={{pathname:'/Product/Building'}}><button
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700
              rounded-sm bg-blue-950 text-slate-50">BuildingMaterials
              </button></Link>

              <Link href={{pathname:'/Product/Others'}}><button 
              type="submit" className="h-7  max-sm:h-6 px-10 max-sm:px-3 hover:bg-indigo-700
              rounded-sm mr-2 bg-blue-950 text-slate-50">Others
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


