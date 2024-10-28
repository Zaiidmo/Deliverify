import React, { useState } from "react";
import {
  Bell,
  Package,
  User,
  Clock,
  CheckCircle,
  RotateCw,
  MapPin,
  Star,
  Calendar,
  Search,
  Phone,
  Mail,
} from "lucide-react";

const UserProfile = () => {
  const [isDeliveryPerson, setIsDeliveryPerson] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showNotification, setShowNotification] = useState(false);

  const pastOrders = [
    {
      id: 1,
      restaurant: "Burger King",
      items: ["Whopper", "Fries", "Coke"],
      date: "2024-10-24",
      total: "$25.99",
      status: "Delivered",
      rating: 4,
      deliveryTime: "35 mins",
      orderNumber: "BK-001",
    },
  ];

  const notifications = [
    {
      id: 1,
      message: "New order ready for pickup",
      time: "5 mins ago",
      address: "123 Main St, City",
      contact: "+1 234-567-8900",
      status: "pending",
    },
  ];

  const handleDeliveryConfirmation = (id) => {
    // Handle delivery confirmation
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-24">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-gray-800 text-white">
          <div className="max-w-6xl mx-auto p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center">
                  <User size={40} className="text-orange-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">John Doe</h1>
                  <p className="text-sm">john.doe@example.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center cursor-pointer">
                  <div className="mr-3 text-sm">
                    {isDeliveryPerson ? "Delivery Mode" : "Client Mode"}
                  </div>
                  <div
                    onClick={() => setIsDeliveryPerson(!isDeliveryPerson)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isDeliveryPerson ? "bg-green-500" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isDeliveryPerson ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto p-8">
          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-6 py-3 rounded-lg ${
                activeTab === "orders"
                  ? "bg-orange-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              Orders History
            </button>
            {isDeliveryPerson && (
              <button
                onClick={() => setActiveTab("deliveries")}
                className={`px-6 py-3 rounded-lg ${
                  activeTab === "deliveries"
                    ? "bg-orange-600 text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                Active Deliveries
              </button>
            )}
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
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

          {/* Content */}
          <div className="space-y-4">
            {activeTab === "orders"
              ? pastOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg shadow p-6"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {order.restaurant}
                        </h3>
                        <p className="text-sm text-gray-600">{order.date}</p>
                        <div className="mt-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{order.total}</p>
                        <button className="mt-2 text-orange-600 hover:text-orange-800">
                          Reorder
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              : notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="bg-white rounded-lg shadow p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{notif.message}</p>
                        <p className="text-sm text-gray-600">{notif.time}</p>
                        <p className="mt-2">{notif.address}</p>
                        <p className="text-sm text-gray-600">{notif.contact}</p>
                      </div>
                      {notif.status === "pending" && (
                        <button
                          onClick={() => handleDeliveryConfirmation(notif.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                          Confirm Delivery
                        </button>
                      )}
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Notification Toast */}
        {showNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 z-50 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle size={20} />
              <span>Action completed successfully!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
