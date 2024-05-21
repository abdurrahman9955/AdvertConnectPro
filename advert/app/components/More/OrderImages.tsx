import React, { useEffect, useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns';
import Cookies from 'js-cookie';

const OrderImages: React.FC = () => {
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
        
        const response = await fetch('http://localhost:3500/orderRequest/orders', {
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
    return <div className='text-2xl'>Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div className='flex justify-center text-2xl 
    font-bold max-sm:text-xl text-indigo-900   mb-4'>No orders available for product Images.</div>;
  }

  return (
    <div className="mt-8 text-xl ">
      <h2 className="flex justify-center text-2xl lg:text-3xl xl:text-4xl font-bold max-sm:text-xl text-indigo-900   mb-4">Order Request for  product images</h2>
      {orders.map((order: any) => (
        <div key={order.id} className="mb-4  border-4 border-slate-950 p-4">
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
              <p className="font-bold lg:text-2xl text-lg">
                {order.User.firstName} {order.User.lastName}
              </p>

              <p className="text-gray-600 text-lg">
                {formatDistanceToNow(new Date(order.createdAt))} ago
              </p>

              <p className="font-bold xl:text-2xl  text-lg">
               FullName: {order.fullName}
              </p>
              <p className="font-bold xl:text-2xl  text-lg">
               Email Address: {order.email}
              </p>
              <p className="font-bold xl:text-2xl  text-lg">
               PhoneNumber:{order.phoneNumber}
              </p>

              <p className="font-bold xl:text-2xl  text-lg">
               FullAddress:{order.fullAddress}
              </p>

              <p className="font-bold xl:text-2xl text-lg text-indigo-700">
               And See All Description below!
              </p>


            </div>
          </div>
          <div className="whitespace-pre-line">
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

export default OrderImages;
