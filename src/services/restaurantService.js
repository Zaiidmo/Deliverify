// src/services/restaurantService.js
import axios from "axios";

// Function to retrieve token from local storage
const getToken = () => {
  return localStorage.getItem("accessToken");
};

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/restaurants",
  headers: {
    "Content-Type": "application/json",
  },
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
    const response = await apiClient.post("/create", restaurantData);
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

export const updateRestaurantById = async (id, updateData) => {
  try {
    const response = await apiClient.put(`/${id}`, updateData);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
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
