import React, { useState, useEffect } from "react";
import {
  Bell,
  Package,
  User,
  Clock,
  CheckCircle,
  RotateCw,
  Search,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Camera,
} from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../../components/UI/Alert";

const UserProfile = () => {
  const [orders, setOrders] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // useEffect(() => {
  //   Promise.all([fetchUserProfile(), fetchOrders()]).finally(() =>
  //     setLoading(false)
  //   );
  // }, []);

  // const fetchUserProfile = async () => {
  //   try {
  //     // Replace with your actual user profile endpoint
  //     const response = await fetch(
  //       "http://localhost:3000/api/users/user",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch user profile");
  //     }

  //     const data = await response.json();
  //     setUserProfile(data);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/order/history", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []); 
    } catch (err) {
      setError(err.message);
      setOrders([]); 
    }
  };

  const handleReorder = async (items) => {
    try {
      const response = await fetch("http://localhost:3000/api/order/purchase", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      setNotificationMessage("Order placed successfully!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (err) {
      setError(err.message);
    }
  };


  const filteredOrders = orders.filter(
    (order) =>
      order?.restaurant?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order?.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <RotateCw className="animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with User Profile */}
      <div className="bg-gradient-to-r from-orange-600 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  {userProfile?.imageUrl ? (
                    <img
                      src={userProfile.imageUrl}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User size={48} className="text-orange-600" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-orange-600 rounded-full p-2 cursor-pointer hover:bg-orange-700">
                  <Camera size={16} />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                  />
                </label>
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  {userProfile?.name || "User"}
                </h1>
                <div className="flex flex-col space-y-1 mt-2">
                  <div className="flex items-center space-x-2">
                    <Mail size={16} />
                    <span className="text-sm">
                      {userProfile?.email || "No email provided"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={16} />
                    <span className="text-sm">
                      {userProfile?.phone || "No phone provided"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span className="text-sm">
                      {userProfile?.address || "No address provided"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-6">Order History</h2>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders by restaurant or order number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              No orders found
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-lg">
                        {order.restaurant}
                      </h3>
                      <span className="text-sm text-gray-500">
                        #{order.orderNumber}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                    <div className="mt-2">
                      {order.items?.map((item, index) => (
                        <div
                          key={index}
                          className="text-sm text-gray-600 flex items-center space-x-2"
                        >
                          <Package size={16} />
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{order.total}</p>
                    <button
                      onClick={() => handleReorder(order.items)}
                      className="mt-2 flex items-center space-x-1 text-orange-600 hover:text-orange-800"
                    >
                      <RotateCw size={16} />
                      <span>Reorder</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center space-x-2">
            <CheckCircle size={20} />
            <span>{notificationMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
