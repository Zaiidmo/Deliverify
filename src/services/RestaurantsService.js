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
export const createRestaurantWithItems = async (token, formData) => {
  // const formData = {
  //   name: "haja",
  //   address: "tmme ",
  //   phoneNumber: 2132133132,
  //   owner: "6717d2d2184066d54ae9cf11",
  //   location: {
  //     type: "Point",
  //     coordinates: [2.3232, 48.3525],
  //   },
  //   closeAt: "22:00",
  //   openAt: "08:00",
  //   category: {
  //     name: "sdgs",
  //     description: "dsgsdgdg",
  //   },
  //   isApprouved: true,
  //   items: [
  //     {
  //       name: "Casey Rowe",
  //       price: "318",
  //       description: "Quos ut reprehenderi",
  //       category: "balls",
  //     },
  //     {
  //       name: "Virginia Sharp",
  //       price: "548",
  //       description: "Eos exercitationem i",
  //       category: "gutts",
  //     },
  //   ],
  // };

  try {
    console.log("token", `Bearer ${token}`);
    const response = await apiClient.post(
      "/restaurants/create-restaurant-with-items",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.error("Error creating restaurant", err);
    throw err;
  }
};
