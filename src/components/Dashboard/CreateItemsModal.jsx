import React, { useState } from "react";
import { X } from "lucide-react";

export const CreateItemsModal = ({ addItem, onClose }) => {
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleAddItem = (event) => {
    event.preventDefault();
    addItem(newItem);
    setNewItem({ name: "", price: "", description: "", category: "" }); //
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form
        // onSubmit={handleAddItem}
        className="text-black text-left w-full flex flex-col dark:text-white max-w-screen-sm lg:max-w-screen-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          Close
          <X size={16} className="text-gray-700 dark:text-gray-300" />
        </button>

        <h3 className="text-2xl font-semibold text-center mb-4">
        Add Items
        </h3>

        <div className="space-y-4 mb-6">

            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={newItem.name}
              onChange={handleItemChange}
              required
              className="w-full rounded-md p-2 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="text"
              name="price"
              placeholder="Item Price"
              value={newItem.price}
              onChange={handleItemChange}
              required
              className="w-full rounded-md p-2 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="text"
              name="description"
              placeholder="Item Description"
              value={newItem.description}
              onChange={handleItemChange}
              required
              className="w-full rounded-md p-2 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="text"
              name="category"
              placeholder="Item Category"
              value={newItem.category}
              onChange={handleItemChange}
              required
              className="w-full rounded-md p-2 bg-gray-100 border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
        </div>
        <button type="button" onClick={handleAddItem}>Add Item</button>
      </form>
    </div>
  );
};
