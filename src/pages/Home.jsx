import React, { useState, useEffect } from "react";

export function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Sample data
  const restaurants = [
    {
      id: 1,
      name: "Italian Delight",
      image:
        "https://nutriciously.com/wp-content/uploads/Easy-Vegan-Dinner-Recipes-by-Nutriciously-Featured-Image.jpg",
      rating: 4.8,
      cuisine: "Italian",
      deliveryTime: "25-35",
      minOrder: 15,
    },
    {
      id: 2,
      name: "Sushi Master",
      image:
        "https://cdn.sortiraparis.com/images/1001/100789/834071-too-restaurant-too-hotel-paris-photos-menu-entrees.jpg",
      rating: 4.6,
      cuisine: "Japanese",
      deliveryTime: "30-45",
      minOrder: 20,
    },
    {
      id: 3,
      name: "Burger House",
      image:
        "https://mylittlekech.com/wp-content/uploads/2022/12/restaurant-assyl-a-marrakech.jpg",
      rating: 4.5,
      cuisine: "American",
      deliveryTime: "20-30",
      minOrder: 10,
    },
  ];

  const foodItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      restaurant: "Italian Delight",
      price: 14.99,
      image:
        "https://nutriciously.com/wp-content/uploads/Easy-Vegan-Dinner-Recipes-by-Nutriciously-Featured-Image.jpg",
      cuisine: "Italian",
      isPopular: true,
    },
    {
      id: 2,
      name: "California Roll",
      restaurant: "Sushi Master",
      price: 12.99,
      image:
        "https://img.hellofresh.com/w_3840,q_auto,f_auto,c_fill,fl_lossy/hellofresh_s3/image/winner-winner-chicken-orzo-dinner-20387f10.jpg",
      cuisine: "Japanese",
      isPopular: true,
    },
    {
      id: 3,
      name: "Classic Burger",
      restaurant: "Burger House",
      price: 9.99,
      image:
        "https://rainbowplantlife.com/wp-content/uploads/2021/08/20-minute-meals-3-meals-on-wooden-board-1-of-1.jpg",
      cuisine: "American",
      isPopular: true,
    },
  ];

  const cuisineCategories = [
    { name: "All", icon: "🍽️" },
    { name: "Italian", icon: "🍝" },
    { name: "Japanese", icon: "🍣" },
    { name: "American", icon: "🍔" },
    { name: "Indian", icon: "🍛" },
    { name: "Chinese", icon: "🥢" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % restaurants.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredItems = foodItems.filter(
    (item) =>
      (selectedCuisine === "All" || item.cuisine === selectedCuisine) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.restaurant.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-24">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Top Banner */}
        <div className="bg-orange-500 text-white py-2 text-center">
          <p>Free delivery on orders over $30! Use code: FREEDEL</p>
        </div>

        {/* Hero Section */}
        <div className="relative w-full h-96 overflow-hidden">
          <div
            className="absolute inset-0 flex transition-transform duration-500"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="w-full h-full flex-shrink-0">
                <div className="relative w-full h-full">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40">
                    <div className="flex flex-col justify-end h-full p-8 text-white">
                      <h2 className="text-4xl font-bold mb-2">
                        {restaurant.name}
                      </h2>
                      <div className="flex items-center gap-2">
                        <span>⭐</span>
                        <span>{restaurant.rating}</span>
                        <span className="mx-2">•</span>
                        <span>{restaurant.cuisine}</span>
                        <span className="mx-2">•</span>
                        <span>⏰</span>
                        <span>{restaurant.deliveryTime} mins</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              setActiveSlide(
                (prev) => (prev - 1 + restaurants.length) % restaurants.length
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
          >
            ‹
          </button>
          <button
            onClick={() =>
              setActiveSlide((prev) => (prev + 1) % restaurants.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
          >
            ›
          </button>
        </div>

        {/* Quick Categories */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {cuisineCategories.map((cuisine) => (
              <button
                key={cuisine.name}
                onClick={() => setSelectedCuisine(cuisine.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-colors ${
                  selectedCuisine === cuisine.name
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>{cuisine.icon}</span>
                {cuisine.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search for food or restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <span>📊</span>
              Filters
            </button>
          </div>
        </div>

        {/* Trending Now Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Trending Now</h2>
            <span className="text-orange-500">📈</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems
              .filter((item) => item.isPopular)
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                      <span className="text-gray-400 hover:text-red-500">
                        ❤️
                      </span>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {item.restaurant}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-orange-500">
                        ${item.price}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors flex items-center gap-2"
                      >
                        <span>🛒</span>
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Featured Restaurants Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Featured Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <span>⏰</span>
                    <span>{restaurant.deliveryTime} mins</span>
                    <span className="mx-2">•</span>
                    <span>Min. ${restaurant.minOrder}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>⭐</span>
                    <span className="font-semibold">{restaurant.rating}</span>
                    <span className="text-gray-600">
                      • {restaurant.cuisine}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <span className="text-4xl mb-4 block">📍</span>
                <h3 className="text-lg font-semibold mb-2">Our Location</h3>
                <p className="text-gray-600">123 Foodie Street, Cuisine City</p>
              </div>
              <div className="text-center">
                <span className="text-4xl mb-4 block">📞</span>
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
              <div className="text-center">
                <span className="text-4xl mb-4 block">✉️</span>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-600">support@fooddelivery.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shopping Cart Sidebar */}
        <div className="fixed right-4 bottom-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center gap-2 text-orange-500">
              <span>🛒</span>
              <span className="font-semibold">{cartItems.length} items</span>
            </div>
            {cartItems.length > 0 && (
              <div className="mt-2">
                <p className="font-bold">
                  Total: $
                  {cartItems
                    .reduce((sum, item) => sum + item.price, 0)
                    .toFixed(2)}
                </p>
                <button className="mt-2 w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default Home;
