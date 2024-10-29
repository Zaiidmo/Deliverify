import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/AuthService";
import { KeyRound, Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { GridLoader } from "react-spinners";

export const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    token: "", // This will be populated from the URL
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(false); // State for success message
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from URL
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    if (token) {
      setFormData((prevData) => ({ ...prevData, token }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const notify = ({ message, type = "info", duration }) => {
    toast[type](message, {
      duration: duration || 4000,
      position: "bottom-right",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (!token) {
      notify({
        message: "unauthorized access",
        type: "error",
      });
      setLoading(false);
      return; 
    }

    try {
      const response = await resetPassword(
        token,
        formData.newPassword,
        formData.confirmNewPassword
      );
      // console.log("Password reset successful:", response); // Log the response
      setSuccess(true);
      notify({
        message: response.message,
        type: "success",
      });
      setTimeout(() => {
        navigate("/login");
      }, 0);
    } catch (error) {
      // console.error("Password reset error:", error.message); // Log the error
      setError("Error resetting password. Please try again."); // Set error message
      notify({
        message: error.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative h-screen flex justify-center items-center top-10">
        {/* Background with two shapes */}
        <div className="hidden md:block absolute w-[700px] h-[520px] -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4">
          <div className="shape h-[200px] w-[200px] absolute rounded-full -left-20 -top-20 bg-gradient-to-r from-violet-800 to-violet-400"></div>
          <div className="shape h-[200px] w-[200px] absolute rounded-full -right-[90px] -bottom-20 bg-gradient-to-r from-[#ff512f] to-[#f09819]"></div>
        </div>

        {/* Form Section */}
        <div className="w-[90%] md:w-full mx-10 relative">
        {loading ? (
          <div
              role="status"
              className="flex justify-center items-center w-1/2 h-64 max-w-screen-sm bg-[rgba(255,255,255,0.13)] absolute -translate-x-2/4 -translate-y-2/4 backdrop-blur-[10px] shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[35px] py-[50px] rounded-[10px] border-2 border-solid border-[rgba(255,255,255,0.1)] left-2/4 dark:bg-[rgba(0,0,0,0.5)]"
            >
              <GridLoader color="#622BBC" size={15} />
            </div>) : (
          <form
            className="text-black w-full flex flex-col dark:text-white max-w-screen-sm bg-[rgba(255,255,255,0.13)] absolute -translate-x-2/4 -translate-y-2/4 backdrop-blur-[10px] shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[35px] py-[50px] rounded-[10px] border-2 border-solid border-[rgba(255,255,255,0.1)] left-2/4 dark:bg-[rgba(0,0,0,0.5)]"
            onSubmit={handleSubmit}
          >
            <h3 className="text-[32px] mb-10 font-medium leading-[42px] text-center font-titles">
              Please enter your new password
            </h3>

            {/* Error Message */}
            {/* {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && (
              <div className="text-green-500 mb-4">
                Password reset successful!
              </div>
            )} */}

            <div>
              <label
                htmlFor="newPassword"
                className="block text-base font-medium mt-[10px]"
              >
                New Password
              </label>
              <div className="relative flex items-center mt-2">
                <KeyRound
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  strokeWidth={2.75}
                  size={20}
                />{" "}
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  name="newPassword"
                  id="newPassword"
                  className="block h-[50px] w-full bg-gray-200 border border-white focus:bg-gray-300 dark:border-gray-400 text-sm font-light pl-10 pr-2.5 py-0 rounded-[8px] dark:bg-[rgba(255,255,255,0.1)]"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {/* Toggle Eye and EyeOff icons based on the showPassword state */}
                  {showPassword ? (
                    <EyeOff className="text-gray-400" size={20} />
                  ) : (
                    <Eye className="text-gray-400" size={20} />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-base font-medium mt-[10px]"
              >
                Confirm New Password
              </label>
              <div className="relative flex items-center mt-2">
                <KeyRound
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  strokeWidth={2.75}
                  size={20}
                />{" "}
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  name="confirmNewPassword"
                  id="confirmNewPassword"
                  className="block h-[50px] w-full bg-gray-200 border border-white focus:bg-gray-300 dark:border-gray-400 text-sm font-light pl-10 pr-2.5 py-0 rounded-[8px] dark:bg-[rgba(255,255,255,0.1)]"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {/* Toggle Eye and EyeOff icons based on the showPassword state */}
                  {showPassword ? (
                    <EyeOff className="text-gray-400" size={20} />
                  ) : (
                    <Eye className="text-gray-400" size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-1/2 self-center bg-white hover:bg-violet-400 hover:text-white text-lg font-semibold cursor-pointer mt-[20px] px-0 py-[15px] rounded-[10px] dark:bg-gray-800 dark:hover:bg-violet-700 dark:text-white"
              type="submit"
            >
              Reset
            </button>
          </form>
        )}
        </div>
      </div>
    </>
  );
};
