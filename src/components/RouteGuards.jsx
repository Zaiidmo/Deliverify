import { Navigate } from "react-router-dom";

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  return token !== null;
};

// Private Route Component
export const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Public Route Component
export const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/" /> : children;
};
