import axios from "axios";
import { apiClient } from "../helper/apiClient";

// get user by id and token
export const getUserByIdAndToken = async (id, token) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllUsers = async (token) => {
  try {
    const response = await apiClient.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const banUser = async (userId, token) => {
  try {
    const id = userId;
    console.log("User to ban:", id);
    
    const response = await apiClient.put(`/users/banneUser/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
