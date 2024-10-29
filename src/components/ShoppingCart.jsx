import React, { useState, useEffect } from 'react';
import { Trash } from 'lucide-react';
import api from '../../axiosConfig';
import toast from 'react-hot-toast';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    // Récupérer les éléments du panier depuis le localStorage
    const storedCartItems = localStorage.getItem('cart');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
      calculateTotal(JSON.parse(storedCartItems));
    }
  }, []);

  const handleDeleteItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    calculateTotal(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const calculateTotal = (items) => {
    const newTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal);
  };

  const handleCheckout = async () => {
    setLoading(true); // Start loading

    try {
      const response = await api.post('/order/purchase', {
        items: cartItems.map((item) => ({
            itemId: item.id,
            quantity: item.quantity,
        })),
      });

      if (response.status === 201) {
        setCartItems([]);
        setTotal(0);
        localStorage.removeItem('cart');
        notify('Order placed successfully!');
       
      } else {
        notify('Error placing order: ' + response.status);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      notify('Error placing order: ' + error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-right">Quantity</th>
                <th className="px-4 py-2 text-right">Price</th>
                <th className="px-4 py-2 text-right">Total</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-gray-600">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2 text-right">{item.quantity}</td>
                  <td className="px-4 py-2 text-right">${item.price.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleDeleteItem(index)}
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-2 w-100 bg-white dark:bg-gray-800 shadow-lg rounded-md z-10">
          <p className="flex items-center justify-center w-100 h-32 text-lg font-semibold text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-md shadow-md">
            Your cart is empty.
          </p>
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 md:mt-0 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleCheckout}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Processing...' : 'Pay'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
