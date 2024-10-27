import React, { useEffect, useState } from "react";
import { StatisticsTable } from "../../components/Dashboard/StatisticsTable";
import { fetchAllRestaurants, acceptRestaurant } from "../../services/RestaurantsService";
import toast, { Toaster } from "react-hot-toast";
import { PropagateLoader } from "react-spinners";

export const Restaurants = () => {
  const tableHeader = [
    { label: "Restaurant", fields: ["name"] },
    { label: "Owner", fields: ["owner", "email"] },
    { label: "Approval Status", fields: ["isApprouved"] },
    { label: "Deletion Status", fields: ["isDeleted"] },
  ];

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const notify = ({ message, type = "info", duration }) => {
    toast[type](message, {
      duration: duration || 4000,
      position: "bottom-right",
    });
  };

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      notify({
        message: "Getting Restaurants Data ...",
        type: "loading",
        duration: 1000,
      });
      const token = localStorage.getItem("accessToken");

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

  return (
    <>
      <Toaster />
      <div className="max-w-screen-xl mx-auto pt-24 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-macondo text-gray-900 dark:text-yellow-500 pb-8">
          Restaurants Management
        </h1>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <PropagateLoader color="#622BBC" size={15} />
          </div>
        ) : (
          <StatisticsTable
            head={tableHeader}
            data={tableData}
            showActions={true}
            onApprove={handleAcceptRestaurant}
          />
        )}
      </div>
    </>
  );
};
