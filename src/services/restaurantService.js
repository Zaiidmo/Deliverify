// src/services/restaurantService.js
import axios from "axios";


const getToken = () => {
  return localStorage.getItem("accessToken");
};

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/restaurants",
 
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const handleResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new Error(response.statusText || "Request failed");
};


const handleError = (error) => {
  let message = "An error occurred";
  if (error.response) {
    console.error("Response Error:", error.response.data);
    message = error.response.data.message || message;
  } else if (error.request) {
    console.error("Request Error:", error.request);
    message = "No response received from server";
  } else {
    console.error("General Error:", error.message);
    message = error.message || message;
  }
  throw new Error(message);
};


export const createRestaurant = async (restaurantData) => {
  try {
   const response = await apiClient.post("/create", restaurantData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const getRestaurantsByOwnerId = async () => {
    try {
      const response = await apiClient.get("/my-restaurants");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };


export const getRestaurantById = async (id) => {
  try {
    const response = await apiClient.get(`/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const updateRestaurantById = async (id, updatedData, token) => {
  try {
    const response = await apiClient.put(`/restaurants/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (err) {
    console.error("Erreur lors de la mise à jour du restaurant :", err);
    throw err;
  }
};
export const softDeleteRestaurant = async (id) => {
  try {
    const response = await apiClient.delete(`/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
