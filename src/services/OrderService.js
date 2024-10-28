import axios from "axios";

// get pending-orders by user id
export const getPendingOrdersByUserId = async (userId) => {
    try {
        const response = await axios.get(
          `http://localhost:3000/api/order/pending-orders`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// get user orders by token
export const getUserOrdersByToken = async (token) => {
  try {
      const response = await axios.get(`http://localhost:3000/api/order/history`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


