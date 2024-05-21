'use client'
import React, { useEffect, useState } from 'react';
import { getUserOrders } from '@/app/utils/order';
import OrderBanner from './OrderBanner';
import OrderImages from './OrderImages';
import OrderVideos from './OrderVideos';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const More = () => {

  const  router = useRouter();

  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
   
      const token = Cookies.get('accessToken');
      if (!token) {
        router.push('/Sign_In');
      }
    
  }, [router]);

  useEffect(() => {

    const fetchTotalOrders = async () => {
      try {
        const userId = Cookies.get('userId');
        const token = Cookies.get('accessToken');
        if (!token || !userId) {
          throw new Error('Access token or user ID not found');
        }

        let totalCount = 0;

        const endpoints = [
          'http://localhost:3500/orderRequest/banners',
          'http://localhost:3500/orderRequest/orders',
          'http://localhost:3500/orderRequest/Videos',
        ];

        for (const endpoint of endpoints) {
          const response = await fetch(endpoint, {
            headers: {
              Authorization: `Bearer ${token}`,
              'user-id': userId,
            }
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch orders from ${endpoint}`);
          }

          const ordersData = await response.json();
          if (Array.isArray(ordersData)) {
            totalCount += ordersData.length;
          } else {
            console.error(`Error fetching orders from ${endpoint}:`, ordersData.error); 
          }
        }

        setTotalOrders(totalCount);
      } catch (error) {
        console.error('Error fetching orders:', error); 
      } finally {
        setLoading(false);
      }
    };
  
    fetchTotalOrders();
  }, []);

  return (
    <div className='flex justify-center flex-col  pt-2 w-full font-boldborder-4 border-blue-950 '>
        
        <h1 className='flex justify-center mb-2  text-5xl text-blue-950 font-bold max-md:text-2xl
        '>You now have ({totalOrders}) Order</h1>
         <div className='flex justify-center'>
         <div className='flex flex-col    lg:w-2/4 md:mb-10 max-lg:w-3/4 font-bold 
          border-8 border-blue-950 pt-5 max-md:w-full m-1   md:text-xl '> 

              <div className="flex justify-between w-full px-2
                border-slate-950  gap-4">

          
               <div className=" shadow-lg w-full bg-blue-950 border-2  h-10
                border-slate-950 rounded flex-initial">
                  
                   <h1 className='flex justify-center font-bold text-white mt-1
                   text-2xl'> See All  Order Below</h1>
                </div>

                </div>
                
                <div className='w-full mt-2  border-4
                 border-blue-950'></div>

         <div className='flex flex-row min-h-screen overflow-y-auto bg-white p-3'>
         <div className='  w-full gap-4  '>

              <OrderImages />
              <OrderBanner />
              <OrderVideos />
   
          </div>
          </div>
          </div>
        </div>
    </div>
  )
}

export default More



