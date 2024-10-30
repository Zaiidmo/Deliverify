import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import api from '../../axiosConfig';


const RestaurantItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const getRandomMealImage = () => {
    const mealImages = [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
      'https://images.unsplash.com/photo-1551218808-94e220e084d2',
      'https://images.unsplash.com/photo-1546069901-eacef0df6022',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
      'https://images.unsplash.com/photo-1528756514091-dee5ecaa3278',
      'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9',
      'https://images.unsplash.com/photo-1432139509613-5c4255815697?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1432139509613-5c4255815697?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
    return mealImages[Math.floor(Math.random() * mealImages.length)];
  };
  
  const notify = (message) => {
    toast.success(message, {
      duration: 4000,
      position: 'top-center',
    });
  };

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItem = {
      id: item._id,
      name: item.name,
      price: item.price,
      image: item.image || getRandomMealImage(),
      quantity: 1,
      restaurantId: id
    };

    const existingItemIndex = cart.findIndex(i => i.id === item._id);

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    notify(`${item.name} has been added to the cart`);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (!id) {
          throw new Error('Restaurant ID not provided');
        }
        const response = await api.get(`/item/restaurants-items/${id}`);
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch items');
        setLoading(false);
      }
    };

    fetchItems();
  }, [id]);

  const LoadingState = () => (
    <div className="flex items-center justify-center min-h-[400px] dark:text-gray-300">
      <div className="animate-spin h-8 w-8 text-blue-500 border-4 border-blue-500 rounded-full"></div>
      <span className="ml-2 text-gray-600 dark:text-gray-400">Loading menu...</span>
    </div>
  );

  const ErrorState = ({ message }) => (
    <div className="p-4">
      <div className="flex items-center gap-2 p-4 text-red-800 bg-red-50 dark:bg-red-800 dark:text-red-100 rounded-lg">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p>{message}</p>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <svg className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">No items available</h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2">This restaurant has not added any items to their menu yet.</p>
    </div>
  );

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (items.length === 0) return <EmptyState />;

  return (
    <div className="mx-auto px-4 py-8 dark:bg-gray-900">
      <h1 className="text-3xl text-center pt-20 md:text-4xl lg:text-6xl font-macondo text-gray-900 dark:text-yellow-500 pb-8">
        Restaurant Menu
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div 
            key={item._id} 
            className="bg-white dark:bg-gray-800 dark:text-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48">
              <img
                src ={getRandomMealImage()}
                alt={item.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {!item.available && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium dark:bg-red-600">
                  Unavailable
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="mb-4">
                <div className="flex justify-between items-start gap-2">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">
                    {item.name}
                  </h2>
                  <span className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-200 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                    {item.category}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">{item.description}</p>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.price)}
                </span>
                {item.available && (
                  <button
                  onClick={() => addToCart(item)}
                  className="flex items-center gap-2 bg-gray-300 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-900 text-yellow-500 text-lg  px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <svg 
                    className="w-5 h-5 fill-current" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 4H3v2h2.6l3.36 6.59-1.35 2.45A1.992 1.992 0 008 16h10v-2H8.42c-.14 0-.27-.08-.33-.2l.03-.08L9.1 12h7.45a1 1 0 00.92-.62l3.5-7.84a1 1 0 00-.9-1.54H6.21l-.95-2H3v2h2.31l1.37 3zM18 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-9 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                  Add to Cart
                </button>
                
                )}
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Added on {new Date(item.createdAt).toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default RestaurantItems;