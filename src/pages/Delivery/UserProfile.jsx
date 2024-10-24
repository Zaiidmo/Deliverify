import React, { useState } from "react";

// Card Component
const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
    {children}
  </div>
);

// CardHeader Component
const CardHeader = ({ children }) => (
  <div className="border-b pb-2 mb-2">{children}</div>
);

// CardTitle Component
const CardTitle = ({ children }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);

// CardDescription Component
const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-600">{children}</p>
);

// CardContent Component
const CardContent = ({ children }) => <div className="pt-4">{children}</div>;

// Button Component
const Button = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`py-2 px-4 rounded-md text-white ${className}`}
  >
    {children}
  </button>
);

// Switch Component
const Switch = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`w-12 h-6 flex items-center rounded-full ${
      checked ? "bg-green-500" : "bg-gray-400"
    }`}
  >
    <span
      className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
        checked ? "translate-x-6" : "translate-x-0"
      }`}
    />
  </button>
);

// Badge Component
const Badge = ({ children }) => (
  <span className="bg-green-500 text-white text-xs font-bold rounded-full px-2 py-1">
    {children}
  </span>
);

// Icons
const UserIcon = () => <span className="text-gray-400">👤</span>;
const MapPin = () => <span className="text-gray-500">📍</span>;
const Star = () => <span className="text-yellow-500">⭐</span>;
const ShoppingBag = () => <span className="text-blue-500">🛍️</span>;
const Bike = () => <span className="text-green-500">🚲</span>;
const Clock = () => <span className="text-green-500">🕒</span>;

const UserProfile = () => {
  const [isDeliveryMode, setIsDeliveryMode] = useState(false);

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    memberSince: "January 2024",
    profileImage: "/api/placeholder/150/150",
    rating: 4.8,
    completedOrders: 156,
    address: "123 Main St, New York, NY",
  };

  // Mock order data
  const recentOrders = [
    {
      id: 1,
      restaurant: "Pizza Palace",
      date: "October 23, 2024",
      items: ["Margherita Pizza", "Garlic Bread"],
      total: "$24.99",
      image: "/api/placeholder/64/64",
      status: "Delivered",
      rating: 5,
    },
    {
      id: 2,
      restaurant: "Burger House",
      date: "October 21, 2024",
      items: ["Cheeseburger", "Fries", "Milkshake"],
      total: "$18.50",
      image: "/api/placeholder/64/64",
      status: "Delivered",
      rating: 4,
    },
    {
      id: 3,
      restaurant: "Sushi Express",
      date: "October 19, 2024",
      items: ["California Roll", "Miso Soup"],
      total: "$32.00",
      image: "/api/placeholder/64/64",
      status: "Delivered",
      rating: 5,
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 pt-20">
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Profile Header */}
            <Card className="mb-8 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-orange-400 h-32"></div>
              <CardContent className="relative pt-0">
                <div className="flex flex-col md:flex-row items-center gap-6 -mt-16">
                  {/* Profile Image */}
                  <div className="relative">
                    <div className="ring-4 ring-white rounded-full">
                      {user.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt="Profile"
                          className="rounded-full w-32 h-32 object-cover border-4 border-white bg-white"
                        />
                      ) : (
                        <div className="rounded-full w-32 h-32 bg-gray-200 flex items-center justify-center border-4 border-white">
                          <UserIcon />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="text-center md:text-left pt-4 md:pt-0 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                        <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                          <MapPin />
                          <span className="text-sm text-gray-500">
                            {user.address}
                          </span>
                        </div>
                      </div>

                      {/* Role Switcher */}
                      <div className="mt-4 md:mt-0 flex items-center gap-2 justify-center md:justify-end">
                        <span className="text-sm font-medium">
                          {isDeliveryMode ? "Delivery Mode" : "Customer Mode"}
                        </span>
                        <Switch
                          checked={isDeliveryMode}
                          onChange={setIsDeliveryMode}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Star />
                          <span className="font-semibold">{user.rating}</span>
                        </div>
                        <p className="text-sm text-gray-600">Rating</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <ShoppingBag />
                          <span className="font-semibold">
                            {user.completedOrders}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Orders</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2">
                          <Clock />
                          <span className="font-semibold">
                            {user.memberSince}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Member Since</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mode-specific content */}
            {isDeliveryMode ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bike />
                    Delivery Dashboard
                  </CardTitle>
                  <CardDescription>
                    Manage your delivery operations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      Start Accepting Deliveries
                    </Button>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4">
                        <h3 className="font-semibold">Today's Earnings</h3>
                        <p className="text-2xl font-bold">$85.50</p>
                      </Card>
                      <Card className="p-4">
                        <h3 className="font-semibold">Active Hours</h3>
                        <p className="text-2xl font-bold">4.5 hrs</p>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Recent Orders Section */
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag />
                    Recent Orders
                  </CardTitle>
                  <CardDescription>
                    Your latest restaurant orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <Card
                        key={order.id}
                        className="p-4 flex items-center gap-4"
                      >
                        <img
                          src={order.image}
                          alt="Order"
                          className="w-16 h-16 rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{order.restaurant}</h4>
                          <p className="text-sm text-gray-500">{order.date}</p>
                          <p className="text-gray-600">
                            {order.items.join(", ")}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-bold">{order.total}</span>
                          <Badge>{order.status}</Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
