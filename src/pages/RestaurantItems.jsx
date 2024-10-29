import React, { useState, useEffect } from 'react';

const RestaurantItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/item/restaurants-items/67159f7bb7bb9cbc3396d723');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des items');
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Menu du Restaurant</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div 
            key={item._id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image Container */}
            <div className="relative aspect-video">
              <img 
                src={item.image === 'default-item.jpg' ? '/api/placeholder/400/300' : item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {!item.available && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                    Non disponible
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Header */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                    {item.category}
                  </span>
                </div>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center text-xl font-bold text-green-600 mb-3">
                <span className="text-base mr-1">€</span>
                {item.price.toFixed(2)}
              </div>

              {/* Footer */}
              <div className="text-sm text-gray-500 border-t pt-3">
                Ajouté le {new Date(item.createdAt).toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantItems;