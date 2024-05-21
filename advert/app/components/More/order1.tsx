import React, { useEffect, useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import Cookies from 'js-cookie';

const OrderImage: React.FC = () => {
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
    return <div className='text-2xl'>No orders available.</div>;
  }

  return (
    <div className="mt-8 text-xl">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {orders.map((order: any) => (
        <div key={order.id} className="mb-4">
          <div className="flex items-center mb-2">
            {order.User.profile.photoUrl ? (
              <img
                src={order.User.profile.photoUrl}
                alt={`${order.User.firstName} ${order.User.lastName}`}
                className="w-10 h-10 rounded-full mr-2"
              />
            ) : (
              <FaRegUserCircle className="w-10 h-10 rounded-full mr-2 text-gray-900" />
            )}
            <div>
              <p className="font-bold text-2xl">
                {order.User.firstName} {order.User.lastName}
              </p>
              <p className="text-gray-600 text-lg">{order.createdAt}</p>
            </div>
          </div>
          <div className="whitespace-pre-line">
            {order.description.length > 100 && !expandedOrders.includes(order.id) ? (
              <>
                {order.description.slice(0, 100)}...
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

export default OrderImage;
