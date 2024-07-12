import React, { useEffect, useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns';
import Cookies from 'js-cookie';

const OrderVideos: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = Cookies.get('userId');
        const token = Cookies.get('accessToken');
        if (!token || !userId) {
          throw new Error('Access token or user ID not found');
        }
       
        const response = await fetch('https://advertconnectpro.shop/orderRequest/Videos', {
          headers: {
            Authorization: `Bearer ${token}`,
            'user-id': userId,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const ordersData = await response.json();
        console.log('Orders images Data data:', ordersData);
        if (Array.isArray(ordersData)) {
          setOrders(ordersData);
        } else {
          console.error('Error fetching orders:', ordersData.error); 
        }
      } catch (error) {
        console.error('Error fetching orders:', error); 
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);

  const toggleExpandedOrder = (orderId: number) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders(expandedOrders.filter(id => id !== orderId));
    } else {
      setExpandedOrders([...expandedOrders, orderId]);
    }
  };

  if (loading) {
    return <div className='text-2xl'></div>;
  }

  if (orders.length === 0) {

    return <div className='flex justify-center text-xl 
    font-bold max-sm:text-xl text-indigo-900   mb-4'>No orders available for product videos.</div>;
  }

  return (
    <div className="mt-8 text-xl ">
      <h2 className="flex justify-center text-xl lg:text-xl xl:text-xl font-bold 
      max-sm:text-xl text-indigo-900   mb-4">Order Request for  product videos</h2>
      {orders.map((order: any) => (
        <div key={order.id} className="mb-4  border-2 border-slate-950 p-2">
          <div className="flex items-center flex-wrap mb-2">
            {order.User.profile.photoUrl ? (
              <img
                src={order.User.profile.photoUrl}
                alt={`${order.User.firstName} ${order.User.lastName}`}
                className="w-40 h-40 rounded-full mr-2"
              />
            ) : (
              <FaRegUserCircle className="w-40 h-40 rounded-full mr-2 text-gray-900" />
            )}
            <div className=''>
              <p className="font-bold lg:text-lg text-lg">
                {order.User.firstName} {order.User.lastName}
              </p>

               <p className="text-gray-600 text-lg">
                {formatDistanceToNow(new Date(order.createdAt))} ago
              </p>

              <p className="font-bold xl:text-lg  text-lg">
               FullName: {order.fullName}
              </p>
              <p className="font-bold xl:text-lg  text-lg">
               Email Address: {order.email}
              </p>
              <p className="font-bold xl:text-lg  text-lg">
               PhoneNumber:{order.phoneNumber}
              </p>

              <p className="font-bold xl:text-lg  text-lg">
               FullAddress:{order.fullAddress}
              </p>

              <p className="font-bold xl:text-lg text-lg text-indigo-700">
               And See All Description below!
              </p>


            </div>
          </div>
          <div className="whitespace-pre-line text-sm">
            {order.description.length > 300 && !expandedOrders.includes(order.id) ? (
              <>
                {order.description.slice(0, 300)}...
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => toggleExpandedOrder(order.id)}
                >
                  Read more
                </button>
              </>
            ) : (
              order.description
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderVideos;
