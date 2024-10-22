import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Centralized response handler
const handleResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new Error(response.statusText || "Request failed");
};

// Centralized error handler
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

// Auth Service Functions
export const registerClient = async (userData) => {
  try {
    const response = await apiClient.post("/auth/register", userData);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await apiClient.get(`/verify/verify-email?token=${token}`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const loginClient = async (loginData) => {
  try {
    const response = await apiClient.post("/auth/login", loginData);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const verifyOTP = async (otpData) => {
  try {
    console.log("Sending OTP Data:", otpData);
    const response = await apiClient.post("/auth/verify-otp", otpData);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const Logout = async (navigate) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await apiClient.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    localStorage.removeItem("accessToken");
    navigate("/login");
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await apiClient.post("/auth/request-password-reset", { email });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const resetPassword = async (token, newPassword, confirmNewPassword) => {
  try {
    const response = await apiClient.post(`/auth/reset-password`, {
      token,
      newPassword,
      confirmNewPassword,
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
