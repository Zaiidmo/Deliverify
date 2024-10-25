import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

// Changed the component name to 'Home' and made it a named export
export function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);

  // Sample data - replace with your actual data
  const restaurants = [
    {
      id: 1,
      name: "Italian Delight",
      image:
        "https://s7g10.scene7.com/is/image/kerry/Chicken-Dishes?ts=1663135267751&dpr=off&$HERO-PRIMARY-Small$",
      rating: 4.8,
      cuisine: "Italian",
    },
    {
      id: 2,
      name: "Sushi Master",
      image:
        "https://www.eatingwell.com/thmb/QYZnBgF72TIKI6-A--NyoPa6avY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/greek-salmon-bowl-f681500cbe054bb1adb607ff55094075.jpeg",
      rating: 4.6,
      cuisine: "Japanese",
    },
    {
      id: 3,
      name: "Burger House",
      image:
        "https://rainbowplantlife.com/wp-content/uploads/2021/08/20-minute-meals-3-meals-on-wooden-board-1-of-1.jpg",
      rating: 4.5,
      cuisine: "American",
    },
  ];

  const foodItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      restaurant: "Italian Delight",
      price: 14.99,
      image:
        "https://rainbowplantlife.com/wp-content/uploads/2021/08/20-minute-meals-3-meals-on-wooden-board-1-of-1.jpg",
    },
    {
      id: 2,
      name: "California Roll",
      restaurant: "Sushi Master",
      price: 12.99,
      image:
        "https://www.eatingwell.com/thmb/QYZnBgF72TIKI6-A--NyoPa6avY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/greek-salmon-bowl-f681500cbe054bb1adb607ff55094075.jpeg",
    },
    {
      id: 3,
      name: "Classic Burger",
      restaurant: "Burger House",
      price: 9.99,
      image:
        "https://s7g10.scene7.com/is/image/kerry/Chicken-Dishes?ts=1663135267751&dpr=off&$HERO-PRIMARY-Small$",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % restaurants.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredItems = foodItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.restaurant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="min-h-screen p-12 bg-gray-50 dark:bg-gray-900">
        {/* Hero Slider Section */}
        <div className="relative w-full h-96 mt-6 overflow-hidden">
          <div
            className="absolute inset-0 flex transition-transform duration-500"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {restaurants.map((restaurant, index) => (
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
                        <Star className="fill-yellow-400 stroke-yellow-400" />
                        <span>{restaurant.rating}</span>
                        <span className="mx-2">•</span>
                        <span>{restaurant.cuisine}</span>
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
            <ChevronLeft />
          </button>
          <button
            onClick={() =>
              setActiveSlide((prev) => (prev + 1) % restaurants.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Search Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for food or restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Food Items Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Popular Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-2">{item.restaurant}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-orange-500">
                      ${item.price}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors flex items-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Cart Sidebar */}
        <div className="fixed right-4 bottom-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center gap-2 text-orange-500">
              <ShoppingCart />
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Also adding a default export for flexibility
export default Home;
