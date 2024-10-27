import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlertCircle, CheckCircle, Package, Truck } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/UI/card";
import { Alert, AlertDescription } from "../../components/UI/Alert";
import { io } from "socket.io-client";

const OrderCard = ({
  order,
  onConfirmDelivery,
  onSelectOrder,
  selectedOrder,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "Paid":
        return "text-blue-500";
      case "Delivered":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Card key={order._id} className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Order #{order._id.slice(-6)}</CardTitle>
        <span className={`font-semibold ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span>Items: {order.items.length}</span>
          </div>
          <div>Total: ${order.totalAmount.toFixed(2)}</div>
          {order.status !== "Delivered" && (
            <div className="mt-4">
              {selectedOrder === order._id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    onChange={(e) =>
                      onConfirmDelivery(e.target.value, order._id)
                    }
                    className="w-full p-2 border rounded"
                    aria-label="OTP input"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => onConfirmDelivery(order._id)}
                      className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Confirm
                    </button>
                    <button
                      onClick={() => onSelectOrder(null)}
                      className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => onSelectOrder(order._id)}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  <Truck className="h-4 w-4" />
                  Mark as Delivered
                </button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const DeliveryDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [notification, setNotification] = useState(null);
  const [otpInput, setOtpInput] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("newOrder", (order) => {
      setNotification(`New order received: #${order._id}`);
      fetchOrders();
    });

    fetchOrders();

    return () => socket.disconnect();
  }, []);

  // const fetchOrders = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(
  //       "http://localhost:3000/api/order/pending-orders",
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     setOrders(response.data.orders || []);
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error fetching orders:", error);
  //     setError(error.response?.data?.message || "Failed to fetch orders");
  //     setOrders([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
 

  // const confirmDelivery = async (orderId) => {
  //   if (!otpInput) {
  //     setNotification("Please enter OTP before confirming delivery.");
  //     return;
  //   }

  //   try {
  //     const token = localStorage.getItem("token");
  //     await axios.post(
  //       "http://localhost:3000/api/order/confirm-delivery",
  //       {
  //         orderId,
  //         OtpConfirm: otpInput,
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     setNotification("Delivery confirmed successfully!");
  //     setSelectedOrder(null);
  //     setOtpInput("");
  //     fetchOrders();
  //   } catch (error) {
  //     setNotification(
  //       `Error: ${
  //         error.response?.data?.message || "Failed to confirm delivery"
  //       }`
  //     );
  //   }
  // };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <p className="ml-4">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-4" aria-live="polite">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Delivery Dashboard</h1>
        <Truck className="h-8 w-8 text-blue-500" />
      </div>

      {notification && (
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{notification}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {orders.length === 0 && !error ? (
        <Card className="p-8 text-center">
          <CardContent>
            <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">No pending orders at the moment</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onConfirmDelivery={confirmDelivery}
              onSelectOrder={setSelectedOrder}
              selectedOrder={selectedOrder}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryDashboard;
