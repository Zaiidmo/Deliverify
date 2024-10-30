import React, { useState } from 'react';
import Button from "./Layouts/Button";
import UpdateRestaurant from "../Restaurant/UpdateRestaurant"; // Assurez-vous que le chemin d'importation est correct

const RestaurantCard = ({ restaurant, onEdit, onDelete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  

  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      <img
  src={`http://localhost:3000/uploads/${restaurant.cover}`}  
  alt={`${restaurant.name} - Cover`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <img
          src={restaurant.logo}
          alt={`${restaurant.name} - Logo`}
          className="w-16 h-16 object-cover rounded-full mb-2"
        />
        <h2 className="text-lg font-semibold">{restaurant.name}</h2>
        <div className="flex justify-between mt-4">
          <Button onClick={handleEditClick}>Modifier</Button>
          <Button onClick={() => onDelete(restaurant._id)} className="ml-2">
            Supprimer
          </Button>
        </div>
      </div>

      {/* Modale pour l'édition */}
      {isEditModalOpen && (
        <UpdateRestaurant
          onUpdateRestaurant={onEdit}
          onClose={handleCloseModal}
          restaurants={[]} 
          restaurantToUpdate={restaurant} 
        />
      )}
    </div>
  );
};

export default RestaurantCard;
