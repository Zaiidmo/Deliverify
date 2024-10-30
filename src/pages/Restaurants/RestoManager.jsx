// src/components/Restaurant/RestoManager.jsx
import React, { useEffect, useState } from "react";
import {
  createRestaurant,
  updateRestaurantById,
  getRestaurantsByOwnerId,
  softDeleteRestaurant,
} from "../../services/restaurantService";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import AddRestaurant from "../../components/Restaurant/AddRestaurant";
import UpdateRestaurant from "../../components/Restaurant/UpdateRestaurant";
import Button from "../../components/Restaurant/Layouts/Button";
import RestaurantCard from "../../components/Restaurant/RestaurantCard";
import { Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';



const RestoManager = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddRestaurant, setShowAddRestaurant] = useState(false);
  const [restaurantToUpdate, setRestaurantToUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  const notify = ({ message, type = "info", duration }) => {
    toast[type](message, {
      duration: duration || 4000,
      position: "bottom-right",
    });
  };

  useEffect(() => {
    notify({
      message: "Getting Restaurants Data ...",
      type: "loading",
      duration: 1000,
    });
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurantsByOwnerId();
        setRestaurants(data);
        setFilteredRestaurants(data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
        setError("Erreur lors de la récupération des restaurants.");
      }
    };
    fetchRestaurants();
  }, []);

  const handleDeleteRestaurant = async (id) => {
    try {
    
      await softDeleteRestaurant(id);
     
      setRestaurants((prevRestaurants) =>
        prevRestaurants.filter((restaurant) => restaurant._id !== id)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression :", error.message);
    }
  };
  const handleAddRestaurant = async (newRestaurantData) => {
    try {
      const createdRestaurant = await createRestaurant(newRestaurantData);
      setRestaurants((prev) => [...prev, createdRestaurant]);
      setFilteredRestaurants((prev) => [...prev, createdRestaurant]);
      setShowAddRestaurant(false);
      notify({ message: "Restaurant ajouté avec succès", type: "success" });
      navigate('/resto-manager');
    } catch (error) {
      console.error("Failed to create restaurant:", error);
      setError("Erreur lors de la création du restaurant.");
    }
  };

  const handleUpdateRestaurant = async (id, updatedData) => {
    try {
      const updatedRestaurant = await updateRestaurantById(id, updatedData);
      setRestaurants((prev) =>
        prev.map((r) => (r._id === id ? updatedRestaurant : r))
      );
      setRestaurantToUpdate(null);
      notify({ message: "Restaurant mis à jour avec succès", type: "success" });
    } catch (error) {
      console.error("Failed to update restaurant:", error);
      setError("Erreur lors de la mise à jour du restaurant.");
    }
  };

  const handleEditClick = (restaurant) => {
    setRestaurantToUpdate(restaurant);
    setShowAddRestaurant(false); // Fermer le formulaire d'ajout si on édite
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRestaurants(
      restaurants.filter((restaurant) =>
        restaurant.name?.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="max-w-screen-xl mx-auto pt-24 text-center">
      <h1 className="text-3xl md:text-4xl lg:text-6xl font-macondo text-gray-900 dark:text-yellow-500 pb-8">
        Restaurants Management
      </h1>
      <Toaster />
      <div className="relative w-1/2 mx-auto mb-4">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            strokeWidth={2.75}
            size={20}
          />
        </div>
        <input
          onChange={handleSearch}
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search restaurant name..."
          required
        />
      </div>
      <Button
        onClick={() => {
          setShowAddRestaurant((prev) => !prev);
          setRestaurantToUpdate(null); 
        }}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
      >
        {showAddRestaurant ? "×" : "+"}
      </Button>

      {showAddRestaurant && (
        <AddRestaurant onSuccess={handleAddRestaurant} />
      )}

      {restaurantToUpdate && (
        <UpdateRestaurant
        restaurantToUpdate={restaurantToUpdate} 
        onUpdateRestaurant={handleUpdateRestaurant}
        onClose={() => setRestaurantToUpdate(null)}
        />
      )}

      {error && <p className="text-red-500">{error}</p>}

      {filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              restaurant={restaurant}
              onEdit={handleEditClick}
              onDelete={handleDeleteRestaurant}
            />
          ))}
        </div>
      ) : (
        <p>Aucun restaurant trouvé.</p>
      )}
    </div>
  );
};

export default RestoManager;
