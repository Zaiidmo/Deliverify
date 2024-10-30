import { apiClient } from "../helper/apiClient";

export const fetchAllRestaurants = async (token) => {
  try {
    const response = await apiClient.get("/restaurants/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("error fetching data", err);
  }
};

export const acceptRestaurant = async (restaurantId, token) => {
  try {
    const response = await apiClient.post(
      "/restaurants/accept",
      { restaurantId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response: ", response);
    return response;
  } catch (err) {
    console.error("Error approving restaurant", err);
    throw err;
  }
};

export const createRestarantWithItems =async (token, items, ...restaurant) => {
  try {
    const response = await apiClient.post("/restaurants/create-restaurant-with-items", {items, ...restaurant}, 
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response: ", response);
    return response;
  } catch (err) {
    conspole.error("Error creating restaurant", err);
    throw err;
  }
}
