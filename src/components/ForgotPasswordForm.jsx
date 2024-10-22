import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../services/AuthService";
import { Mail} from 'lucide-react';
import toast , { Toaster } from 'react-hot-toast';
import { GridLoader } from "react-spinners";


// import axios from "axios";
export const ForgotPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();


  // Handle input changes for the form fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const notify = ({message, type = "info", duration = 4000}) => {
    toast[type](message, {
      duration: duration,
      position: "bottom-right"
    });
  };

  // Handle form submission
  const sendResetRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError("");
      // Call the requestPasswordReset function to send password reset link
      await requestPasswordReset(formData.email);
      setSuccessMessage("Password reset link sent to your email. Please check your inbox.");
      notify({message: "Password reset link sent to your email. Please check your inbox.", type: "success"});
      setTimeout(() => {
        navigate("/");
      },0);
    } catch (err) {
      setError(err.message || "Failed to send password reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Toaster />
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
            </div>
        ) : (
          <form onSubmit={sendResetRequest} className="text-black w-full flex flex-col dark:text-white max-w-screen-sm  bg-[rgba(255,255,255,0.13)] absolute -translate-x-2/4 -translate-y-2/4 backdrop-blur-[10px] shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[35px] py-[50px] rounded-[10px] border-2 border-solid border-[rgba(255,255,255,0.1)] left-2/4 dark:bg-[rgba(0,0,0,0.5)]">
            <h3 className="text-[32px] mb-10 font-medium leading-[42px] text-center font-titles">
              Please Enter Your Email To Receive A Password Reset Link
            </h3>

            {/* {successMessage && (
              <div className="text-center text-green-500 py-2 border rounded-lg border-green-500 alert alert-success">
                {successMessage}
              </div>
            )}
            {error && (
              <div className="alert text-center text-red-500 py-2 border rounded-lg border-red-500 alert-danger">
                {error}
              </div>
            )} */}

            {/* Email Field */}
              <div className="">
                <label
                  htmlFor="email"
                  className="block text-base font-medium mt-[10px]"
                >
                  Email
                </label>
                <div className="relative flex items-center mt-2">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    strokeWidth={2.75}
                    size={20}
                  />{" "}
                  <input
                  type="text"
                  placeholder="Email"
                  onChange={handleChange}
                  name="email"
                  id="email"
                  className="block h-[50px] w-full bg-gray-200 border border-white focus:bg-gray-300 dark:border-gray-400 text-sm font-light pl-10 pr-2.5 py-0 rounded-[8px] dark:bg-[rgba(255,255,255,0.1)]"
                />
                </div>
                
              </div>
            

            {/* Submit Button */}
            <button
              className="w-1/2 self-center bg-white hover:bg-violet-400 hover:text-white text-lg font-semibold cursor-pointer mt-[20px] px-0 py-[15px] rounded-[10px] dark:bg-gray-800 dark:hover:bg-violet-700 dark:text-white"
              type="submit"
            >
              Send Reset Link
            </button>

            {/* Login Link */}
            <label className="block text-center mt-5 ">
              Remember It?
              <Link
                className="text-blue-600 hover:underline dark:text-blue-300 ml-2"
                to="/login"
              >
                  Login Again
              </Link>
            </label>
          </form>
        )}
        </div>
      </div>
    </>
  );
};

