import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// get pending-orders by user id
export const getPendingOrdersByUserId = async (userId) => {
    try {
        const response = await axios.get(
          `${API_URL}/order/pending-orders`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// get user orders by token
export const getUserOrdersByToken = async (token) => {
  try {
      const response = await axios.get(`${API_URL}/order/history`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


