import React, { useState } from "react";
import { CreateItemsModal } from "./CreateItemsModal";
import { PlusCircle, X } from "lucide-react";
import { createRestaurantWithItems } from "../../services/RestaurantsService";

export const CreateRestaurantForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    owner: "",
    closeAt: "",
    openAt: "",
    category: {
      name: "",
      description: "",
    },
    isApproved: false,
    items: [],
  });

  const [itemsModal, setItemsModal] = useState(false);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      category: {
        ...prevData.category,
        [name]: value,
      },
    }));
  };

  const addItem = (item) => {
    setFormData((prevData) => ({
      ...prevData,
      items: [...prevData.items, item],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("formData", formData);
      
      const manager = localStorage.getItem("id");
      formData.owner = manager;
      localStorage.removeItem("id");
      const token = localStorage.getItem("accessToken");
      const response = await createRestaurantWithItems(token, formData);

      const result = await response.json();
      if (response.ok) {
        console.log("Restaurant created successfully:", result);
      } else {
        console.error("Error creating restaurant:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="text-black text-left w-full flex flex-col dark:text-white max-w-screen-sm lg:max-w-screen-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <X size={16} className="text-gray-700 dark:text-gray-300" />
        </button>

        <h3 className="text-2xl font-semibold text-center mb-4">
          Create Restaurant
        </h3>

        {/* Basic Restaurant Info */}
        <div className="space-y-4 mb-1">
          <input
            type="text"
            name="name"
            placeholder="Restaurant Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-md p-2 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
          />
          <div className="flex gap-3 w-full">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full rounded-md p-2 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full rounded-md p-2 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="flex gap-3 w-full">
            <input
              type="text"
              name="closeAt"
              placeholder="Close Time (e.g., 22:00)"
              value={formData.closeAt}
              onChange={handleChange}
              required
              className="w-full rounded-md p-2 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="text"
              name="openAt"
              placeholder="Open Time (e.g., 08:00)"
              value={formData.openAt}
              onChange={handleChange}
              required
              className="w-full rounded-md p-2 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>


          {/* Category Info */}
          <div className="flex gap-4">
            <input
              type="text"
              name="name"
              placeholder="Category Name"
              value={formData.category.name}
              onChange={handleCategoryChange}
              required
              className="w-full rounded-md p-2 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="text"
              name="description"
              placeholder="Category Description"
              value={formData.category.description}
              onChange={handleCategoryChange}
              required
              className="w-full rounded-md p-2 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-1/2 space-y-2">
            <label className="text-sm font-semibold">Logo</label>
            <input
              type="file"
              name="logo"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full rounded-md p-2 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="w-1/2 space-y-2">
            <label className="text-sm font-semibold">Cover</label>
            <input
              type="file"
              name="cover"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full rounded-md p-2 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Add Item Form */}
        {itemsModal && (
          <CreateItemsModal
            addItem={addItem}
            onClose={() => setItemsModal(false)}
          />
        )}

        {/* Submit Button */}
        <div className="flex w-full gap-4 justify-between mt-4">
          <button
            className="w-fit shrink-0 px-2 rounded-md py-2 bg-yellow-500 text-black font-semibold hover:bg-yellow-600"
            type="button"
            onClick={() => setItemsModal(true)}
          >
            <PlusCircle size={20} className="inline-block mr-2" /> Add Items
          </button>
          <button
            className="w-full rounded-md py-2 bg-green-500 text-white font-semibold hover:bg-green-600"
            type="submit"
          >
            Create Restaurant
          </button>
        </div>
      </form>
    </div>
  );
};
