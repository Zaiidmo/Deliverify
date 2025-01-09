import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Clock, MapPin, Phone } from 'lucide-react';
import api from '../../axiosConfig';

export function Home()  {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get('/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleViewItems = (restaurantId) => {
    navigate(`/restaurants-items/${restaurantId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Restaurants</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <Card key={restaurant._id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <img
                src={restaurant.cover === 'default-cover.jpg' ? '/placeholder-cover.jpg' : restaurant.cover}
                alt={restaurant.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            
            <CardContent className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={restaurant.logo === 'default-restaurant.jpg' ? '/placeholder-logo.jpg' : restaurant.logo}
                  alt={`${restaurant.name} logo`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <CardTitle className="text-xl">{restaurant.name}</CardTitle>
              </div>
              
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{restaurant.address}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{restaurant.phoneNumber}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.openAt} - {restaurant.closeAt}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-4">
              <Button 
                className="w-full"
                onClick={() => handleViewItems(restaurant._id)}
              >
                View Menu Items
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;