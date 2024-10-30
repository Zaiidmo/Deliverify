import React, { useEffect, useState } from "react";
import { StatisticsTable } from "../../components/Dashboard/StatisticsTable";
import {
  fetchAllRestaurants,
  acceptRestaurant,
} from "../../services/RestaurantsService";
import toast, { Toaster } from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { CreateUserForm } from "../../components/Dashboard/CreateUserModal";
import { CreateRestaurantForm } from "../../components/Dashboard/CreateRestaurantModal";
import { Search } from "lucide-react";

export const Restaurants = () => {
  const tableHeader = [
    { label: "Restaurant", fields: ["name"] },
    { label: "Owner", fields: ["owner", "email"] },
    { label: "Approval Status", fields: ["isApprouved"] },
    { label: "Deletion Status", fields: ["isDeleted"] },
  ];

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restaurantCreation, setRestaurantCreation] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleUserCreationSuccess = () => {
    setRestaurantCreation(1);
  };

  const notify = ({ message, type = "info", duration }) => {
    toast[type](message, {
      duration: duration || 4000,
      position: "bottom-right",
      id: message,
    });
  };

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      notify({
        message: "Getting Restaurants Data ...",
        type: "loading",
        duration: 1000,
      });

      try {
        const response = await fetchAllRestaurants(token);
        if (response) {
          const formattedData = response.map((restaurant) => ({
            ...restaurant,
            owner: restaurant.owner ? restaurant.owner.username : "N/A",
            email: restaurant.owner ? restaurant.owner.email : "N/A",
            isApprouved: restaurant.isApprouved ? "Yes" : "No",
            isDeleted: restaurant.isDeleted ? "Yes" : "No",
            id: restaurant._id,
          }));

          setTableData(formattedData);
          notify({
            message: "All Restaurants are retrieved successfully.",
            type: "success",
          });
        }
      } catch (error) {
        notify({
          message: "Something went wrong",
          type: "error",
        });
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAcceptRestaurant = async (restaurantId) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");

    try {
      const response = await acceptRestaurant(restaurantId, token);
      if (response) {
        notify({
          message: "Restaurant Accepted.",
          type: "success",
        });
        setTableData((prevData) =>
          prevData.map((restaurant) =>
            restaurant.id === restaurantId
              ? { ...restaurant, isApprouved: "Yes" }
              : restaurant
          )
        );
      } else {
        notify({
          message: "Failed to accept the restaurant.",
          type: "error",
        });
      }
    } catch (err) {
      notify({
        message: "Something went wrong... please try again later.",
        type: "error",
        duration: 3000,
      });
      console.error("Error accepting restaurant", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  // Filtered table data based on search query
  const filteredData = tableData.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery)
  );

  return (
    <>
      <div className="max-w-screen-xl mx-auto pt-24 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-macondo text-gray-900 dark:text-yellow-500 pb-8">
          Restaurants Management
        </h1>
        <div>
          <div>
            <div className="mx-4 md:w-full flex justify-between items-center mb-4">
              <div className="relative w-2/3 md:w-1/2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    strokeWidth={2.75}
                    size={20}
                  />
                </div>
                <input
                  onKeyUp={handleSearch}
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search restaurant name..."
                  required
                />
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
              >
                +
              </button>
            </div>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur">
              <div className="bg-white rounded-lg p-8 w-11/12 max-w-md shadow-lg">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-12 right-2"
                >
                  X
                </button>
                {/* Your form component goes here */}
                {restaurantCreation === 0 ? (
                  <CreateUserForm
                    onUserCreationSuccess={handleUserCreationSuccess}
                    onClose={() => setIsModalOpen(false)}
                  />
                ) : (
                  <p>Restaurant Creation Form</p>
                )}
              </div>
            </div>
          )}
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <PropagateLoader color="#622BBC" size={15} />
          </div>
        ) : (
          filteredData.length > 0 && (
            <StatisticsTable
              head={tableHeader}
              data={filteredData} 
              showActions={true}
              onApprove={handleAcceptRestaurant}
              onDelete={() => {
                console.log("Delete clicked");
              }}
            />
          )
        )}
      </div>
    </>
  );
};
