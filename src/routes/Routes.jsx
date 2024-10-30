// src/routes/Routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "../App.jsx";
import Register from "../pages/Auth/Register.jsx";
import Login from "../pages/Auth/Login.jsx";
import ForgotPassword from "../pages/Auth/ForgotPassword.jsx";
import { Logout } from "../services/AuthService.js";
import { ResetPasswordForm } from "../components/Auth/ResetPasswordForm.jsx";
import OTPLogin from "../pages/Auth/LoginOTP.jsx";
import Layout from "../pages/Layout.jsx";
import { EmailVerification } from "../components/Auth/EmailVerification.jsx";
import { PrivateRoute, PublicRoute } from "../components/RouteGuards.jsx";
import RestoManager from "../pages/Restaurants/RestoManager.jsx";
import AddRestaurant from "../components/Restaurant/AddRestaurant.jsx";
import UserProfile from "../pages/Delivery/UserProfile.jsx";
import { Dashboard } from "../pages/Admin/Dashboard.jsx";
import { Restaurants } from "../pages/Admin/Restaurants.jsx";
import AdminLogsPage from "../pages/Admin/AdminLogsPage.jsx";
import UserLogsPage from "../pages/UserLogsPage.jsx";
import { Users } from "../pages/Admin/Users.jsx";
import RestaurantItems from "../pages/RestaurantItems.jsx";
import { Roles } from "../pages/Admin/Roles.jsx";
import UpdateRestaurant from "../components/Restaurant/UpdateRestaurant.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout Route */}
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route
          path="/*"
          element={
            <PublicRoute>
              <Routes>
                <Route path="register" element={<Register />} />
                <Route path="verify-email" element={<EmailVerification />} />
                <Route path="login" element={<Login />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPasswordForm />} />
                <Route path="otp-login" element={<OTPLogin />} />
               
              </Routes>
            </PublicRoute>
          }
        />
         <Route path="/user/logs" element={<UserLogsPage />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="/restaurants-items/:id" element={<RestaurantItems />} />
          <Route index element={<App />} />
        {/* Private Routes */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="restaurants" element={<Restaurants />} />
                <Route path="users" element={<Users />} />
                <Route path="roles" element={<Roles />} />
                <Route path="logs" element={<AdminLogsPage />} />
                <Route path="manager"element={<RestoManager />}/>
              </Routes>
            </PrivateRoute>
          }
        />

        <Route
          path="logout"
          element={
            <PrivateRoute>
              <Logout />
            </PrivateRoute>
          }
        />

        
<Route
  path="manager/add-restaurant"
  element={
    <PrivateRoute>
      <AddRestaurant />
    </PrivateRoute>
  }
/>
<Route path="/update-restaurant/:id" element={
  <PrivateRoute>
    <UpdateRestaurant />
  </PrivateRoute>
} />
        {/* <Route
          path="user-profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        /> */}
      </Route>
      
    </Routes>
  );
};
export default AppRoutes;
