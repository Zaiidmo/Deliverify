// src/components/Restaurant/RestoManager.jsx
import React, { useEffect, useState } from "react";
import {
    
    createRestaurant,
    updateRestaurantById,
    getRestaurantsByOwnerId,
    softDeleteRestaurant,
  } from "../../services/restaurantService";
import { Link } from "react-router-dom";
import AddRestaurant from "../../components/Restaurant/AddRestaurant"; // Importer le composant AddRestaurant
import Button from "../../components/Restaurant/Layouts/Button";
import RestaurantCard from "../../components/Restaurant/RestaurantCard";

const RestoManager = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState(null);
    const [showAddRestaurant, setShowAddRestaurant] = useState(false);
    const [restaurantToUpdate, setRestaurantToUpdate] = useState(null); // État pour gérer la mise à jour
  
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const data = await getRestaurantsByOwnerId();
                setRestaurants(data); 
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
        setRestaurants((prev) => prev.filter((r) => r._id !== id));
      } catch (error) {
        console.error("Failed to delete restaurant:", error);
        setError("Erreur lors de la suppression du restaurant.");
      }
    };
  
    const handleAddRestaurant = async (newRestaurantData) => {
      try {
        const createdRestaurant = await createRestaurant(newRestaurantData);
        setRestaurants((prev) => [...prev, createdRestaurant]);
        setShowAddRestaurant(false); // Fermer le formulaire après ajout
      } catch (error) {
        console.error("Failed to create restaurant:", error);
        setError("Erreur lors de la création du restaurant.");
      }
    };
  
    const handleUpdateRestaurant = async (id, updatedData) => {
      try {
        const updatedRestaurant = await updateRestaurantById(id, updatedData);
        setRestaurants((prev) => prev.map((r) => (r._id === id ? updatedRestaurant : r)));
        setRestaurantToUpdate(null); // Réinitialiser après mise à jour
      } catch (error) {
        console.error("Failed to update restaurant:", error);
        setError("Erreur lors de la mise à jour du restaurant.");
      }
    };
  
    const handleEditClick = (restaurant) => {
      setRestaurantToUpdate(restaurant);
      setShowAddRestaurant(true);
    };
  
    return (
        <div style={{ paddingTop: '60px' }}>
        <h1>Gestion des Restaurants</h1>
        <Button onClick={() => {
          setShowAddRestaurant((prev) => !prev);
          setRestaurantToUpdate(null); // Réinitialiser la sélection d'édition
        }}>
          {showAddRestaurant ? "Annuler" : "Ajouter un Restaurant"}
        </Button>
  
        {showAddRestaurant && (
          <AddRestaurant
          onSuccess={handleAddRestaurant}
            restaurantToUpdate={restaurantToUpdate}
            onUpdateRestaurant={handleUpdateRestaurant}
          />
        )}
  
        {error && <p className="text-red-500">{error}</p>} {/* Afficher le message d'erreur */}
  
        {restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map((restaurant) => (
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