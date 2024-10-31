// components/ListClientOrders.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserOrders } from "../../services/UserService";
import toast, { Toaster } from "react-hot-toast";
import { GridLoader } from "react-spinners";

export const ListClientOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const notify = ({ message, type = "info", duration }) => {
    toast[type](message, {
      duration: duration || 4000,
      position: "bottom-right",
    });
  };

  useEffect(() => {
    console.log("Fetching orders for user with id:", id);

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        // console.log("Token:", token);
        
        const response = await getUserOrders(id, token);
        notify({
          message: "Orders fetched successfully",
          type: "success",
          duration: 2000,
        });
        console.log("response:", response);
        setOrders(response);
        console.log("Orders:", orders);
        
      } catch (error) {
        console.error("Error fetching orders:", error);
        notify({
          message: "Error fetching orders",
          type: "error",
          duration: 2000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [id]);

  useEffect(() => {
    if (loading) {
      notify({
        message: "Submitting ...",
        type: "loading",
        duration: 2000,
      });
    }
  }, [loading]);

  return (
    <div>
      <Toaster />
      {loading ? (
        <GridLoader color="#f27405" loading={loading} size={10} />
      ) : (
        <div className="w-screen h-screen max-w-screen-xl flex gap-12 justify-center items-center">
          <h2>Client Orders : {orders.ordersCount}</h2>
          {orders.orders.length > 0 ? (
            <ul>
              {orders.orders.map((order) => (
                <li key={order._id}>
                  {order._id} :: {order.totalAmount}
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders found for this client.</p>
          )}
        </div>
      )}
    </div>
  );
};
