import React, { useState } from "react";
import { PlusCircle, Trash2, X } from "lucide-react";
import { createRestaurantWithItems } from "../../services/RestaurantsService";

const CreateRestaurantForm = ({ onClose }) => {
  const [restaurantCreation, setRestaurantCreation] = useState(0);
  const [restaurant, setRestaurant] = useState({
    name: "",
    address: "",
    description: "",
  });
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleRestaurantChange = (e) => {
    const { name, value } = e.target;
    setRestaurant((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const addItem = () => {
    if (newItem.name && newItem.price && newItem.description) {
      setItems((prevItems) => [...prevItems, newItem]);
      setNewItem({ name: "", price: "", description: "" });
    } else {
      alert("Please fill in all item fields.");
    }
  };

  const removeItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await createRestaurantWithItems(
        token,
        restaurant,
        items
      );
      if (response) {
        console.log(response);
        alert("Restaurant created successfully!");
      }
    } catch (error) {
      console.error("Error creating restaurant and items:", error);
      alert("Failed to create restaurant and items.");
    }
  };

  const handleRestaurantCreation = async (e) => {
    e.preventDefault();
    setRestaurantCreation(1);
  };

  return (
    <form
      onSubmit={handleRestaurantCreation}
      className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
      >
        <X size={16} className="text-gray-700 dark:text-gray-300" />
      </button>
      <h3 className="text-2xl font-semibold text-center mb-4">
        Create Restaurant
      </h3>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          name="name"
          value={restaurant.name}
          onChange={handleRestaurantChange}
          placeholder="Restaurant Name"
          className="w-full p-2 bg-gray-100 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
          required
        />
        <input
          type="text"
          name="address"
          value={restaurant.address}
          onChange={handleRestaurantChange}
          placeholder="Restaurant Address"
          className="w-full p-2 bg-gray-100 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
          required
        />
        <textarea
          name="description"
          value={restaurant.description}
          onChange={handleRestaurantChange}
          placeholder="Restaurant Description"
          className="w-full p-2 bg-gray-100 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-medium">Add Items</h4>
        <button
          type="button"
          onClick={addItem}
          className="text-blue-500 hover:text-blue-700"
        >
          <PlusCircle size={20} />
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleNewItemChange}
          placeholder="Item Name"
          className="w-full p-2 bg-gray-100 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="number"
          name="price"
          value={newItem.price}
          onChange={handleNewItemChange}
          placeholder="Item Price"
          className="w-full p-2 bg-gray-100 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <textarea
          name="description"
          value={newItem.description}
          onChange={handleNewItemChange}
          placeholder="Item Description"
          className="w-full p-2 bg-gray-100 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <ul className="space-y-2 mb-6">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-3 bg-gray-100 rounded dark:bg-gray-700"
          >
            <div>
              <h5 className="font-semibold">{item.name}</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Price: ${item.price}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>

      <button
        type="submit"
        className="w-full py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
      >
        Create Restaurant
      </button>
    </form>
  );
};

export default CreateRestaurantForm;
