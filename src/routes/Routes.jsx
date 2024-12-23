// src/routes/Routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "../App.jsx";
import Register from "../pages/Auth/Register.jsx";
import Login from "../pages/Auth/Login.jsx";
import ForgotPassword from "../pages/Auth/ForgotPassword.jsx";
import { Logout } from "../services/AuthService.js";
import {ResetPasswordForm } from "../components/ResetPasswordForm.jsx";
import OTPLogin from "../pages/Auth/LoginOTP.jsx";
import Layout from "../pages/Layout.jsx";
import { EmailVerification } from "../components/EmailVerification.jsx";
import { PrivateRoute, PublicRoute } from "../components/RouteGuards.jsx";

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
        <Route
          index
          element={
            <PrivateRoute>
              <App />
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
      </Route>
    </Routes>
  );
};

export default AppRoutes;
