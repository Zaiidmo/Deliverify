import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserProfile = () => {
  const [isDeliveryMode, setIsDeliveryMode] = useState(false);
  const [recentOrders, setRecentOrders] = useState([]);
  const [deliveryData, setDeliveryData] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Example user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    memberSince: "January 2024",
    profileImage:
      "https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg",
    rating: 4.8,
    completedOrders: 156,
    address: "123 Main St, New York, NY",
  };

  useEffect(() => {
    // Simulating fetching recent orders
    setRecentOrders([
      { id: 1, meal: "Cheeseburger", status: "delivered", date: "2024-10-01" },
      { id: 2, meal: "Caesar Salad", status: "pending", date: "2024-10-10" },
      { id: 3, meal: "Pizza", status: "cancelled", date: "2024-10-15" },
    ]);
  }, []);

  useEffect(() => {
    // Simulating fetching delivery data
    setDeliveryData([
      {
        id: 1,
        package: "Order #1234",
        address: "456 Elm St, NY",
        contact: "Jane Smith - 555-1234",
        status: "In Transit",
      },
      {
        id: 2,
        package: "Order #5678",
        address: "789 Maple Ave, NY",
        contact: "Tom Johnson - 555-5678",
        status: "Delivered",
      },
    ]);
  }, []);

  useEffect(() => {
    // Simulating real-time notifications
    const interval = setInterval(() => {
      if (isDeliveryMode) {
        const newNotification = "You have a new delivery order!";
        setNotifications((prev) => [...prev, newNotification]);
        toast.info(newNotification);
      }
    }, 10000); // Notify every 10 seconds for demonstration

    return () => clearInterval(interval);
  }, [isDeliveryMode]);

  const getOrderStatus = (status) => {
    switch (status) {
      case "delivered":
        return "Delivered";
      case "pending":
        return "Pending";
      case "cancelled":
        return "Cancelled";
      case "in transit":
        return "In Transit";
      default:
        return "Unknown Status";
    }
  };

  const handleDeliveryConfirmation = (id) => {
    toast.success(`Delivery ${id} confirmed!`);
    setDeliveryData((prev) => prev.filter((delivery) => delivery.id !== id)); // Remove confirmed delivery
  };

  const handleReorder = (meal) => {
    toast.info(`Reordering: ${meal}`);
    // Logic to handle reordering can be added here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-20">
      <ToastContainer />
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-gree-600 to-orange-400 h-32"></div>
          <div className="relative pt-0">
            <div className="flex flex-col md:flex-row items-center gap-6 -mt-16">
              <div className="relative">
                <div className="ring-4 ring-white rounded-full">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="rounded-full w-32 h-32 object-cover border-4 border-white bg-white"
                    />
                  ) : (
                    <div className="rounded-full w-32 h-32 bg -gray-200 flex items-center justify-center border-4 border-white">
                      <span className="text-gray-400">👤</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center md:text-left pt-4 md:pt-0 flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                      <span className="text-gray-500">📍</span>
                      <span className="text-sm text-gray-500">
                        {user.address}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 flex items-center gap-2 justify-center md:justify-end">
                    <span className="text-sm font-medium">
                      {isDeliveryMode ? "Delivery Mode" : "Customer Mode"}
                    </span>
                    <button
                      onClick={() => setIsDeliveryMode(!isDeliveryMode)}
                      className={`w-12 h-6 flex items-center rounded-full ${
                        isDeliveryMode ? "bg-green-500" : "bg-gray-400"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                          isDeliveryMode ? "translate-x-6" : "translate-x-0"
                        }`}
                      ></span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold">{user.rating}</span>
                    </div>
                    <p className="text-sm text-gray-600">Rating</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500">🛍️</span>
                      <span className="font-semibold">
                        {user.completedOrders}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Orders</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg col-span-2 md:col-span-1">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">🕒</span>
                      <span className="font-semibold">{user.memberSince}</span>
                    </div>
                    <p className="text-sm text-gray-600">Member Since</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isDeliveryMode ? (
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="border-b pb-2 mb-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="text-green-500">🚲</span> Delivery Dashboard
              </h3>
              <p className="text-sm text-gray-600">
                Manage your delivery operations
              </p>
            </div>

            <div className="pt-4">
              {deliveryData.length > 0 ? (
                <ul>
                  {deliveryData.map((delivery) => (
                    <li key={delivery.id} className="py-2 border-b">
                      <div className="flex justify-between">
                        <span>{delivery.package}</span>
                        <span
                          className={`bg-${
                            delivery.status === "delivered"
                              ? "green"
                              : delivery.status === "pending"
                              ? "yellow"
                              : "red"
                          }-500 text-white text-xs font-bold rounded-full px-2 py-1`}
                        >
                          {getOrderStatus(delivery.status.toLowerCase())}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Delivery Address: {delivery.address}
                      </div>
                      <div className="text-sm text-gray-600">
                        Contact: {delivery.contact}
                      </div>
                      <button
                        onClick={() => handleDeliveryConfirmation(delivery.id)}
                        className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Confirm Delivery
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No delivery data found.</div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="border-b pb-2 mb-2">
              <h3 className="text-lg font-semibold flex items-center gap- 2">
                <span className="text-blue-500">🍽️</span> Past Orders
              </h3>
              <p className="text-sm text-gray-600">
                View and reorder your previous meals
              </p>
            </div>

            <div className="pt-4">
              {recentOrders.length > 0 ? (
                <ul>
                  {recentOrders.map((order) => (
                    <li key={order.id} className="py-2 border-b">
                      <div className="flex justify-between">
                        <span>{order.meal}</span>
                        <span
                          className={`bg-${
                            order.status === "delivered"
                              ? "green"
                              : order.status === "pending"
                              ? "yellow"
                              : "red"
                          }-500 text-white text-xs font-bold rounded-full px-2 py-1`}
                        >
                          {getOrderStatus(order.status)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Order Date: {order.date}
                      </div>
                      <button
                        onClick={() => handleReorder(order.meal)}
                        className="mt-2 bg-orange-500 text-white px-3 py-1 rounded"
                      >
                        Reorder
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No recent orders found.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
