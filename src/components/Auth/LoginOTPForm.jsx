import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verifyOTP } from "../../services/AuthService";
// import { toast, ToastContainer } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import { GridLoader } from "react-spinners";

export const LoginOTPForm = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const notify = ({ message, type = "info" }) => {
    toast[type](message, {
      duration: 4000,
      position: "bottom-right",
    });
  };

  // Handle OTP input changes
  const handleOtpChange = (index, value) => {
    if (isNaN(value) || value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input if not the last one
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Handle key press for navigating OTP inputs
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index]) {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  // Handle OTP form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      return notify({ message: "Please enter a 6 digit OTP.", type: "error" });
    }

    // Get the stored email from local storage
    const email = localStorage.getItem("email");

    if (!email) {
      return notify({
        message: "Email not found. Please try again.",
        type: "error",
      });
    }

    setLoading(true);

    const rememberDevice = document.getElementById("rememberDevice");
    const otpData = { identifier: email, otp: enteredOtp, rememberDevice: rememberDevice.checked };
    

    try {
      // Send OTP and email to the backend for verification
      const response = await verifyOTP(otpData);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.removeItem("email");
      notify({ message: "OTP verified successfully.", type: "success" });
      notify({ message: "Welcome Back !", type: "success" });
      setTimeout(() => {
        navigate("/", 2000);
      });
    } catch (error) {
      notify({ message: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <div className="relative h-screen flex justify-center items-center top-10">
        {/* Background with two shapes */}
        <div className="hidden md:block absolute w-[700px] h-[520px] -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4">
          <div className="shape h-[200px] w-[200px] absolute rounded-full -left-20 -top-20 bg-gradient-to-r from-violet-800 to-violet-400"></div>
          <div className="shape h-[200px] w-[200px] absolute rounded-full -right-[90px] -bottom-20 bg-gradient-to-r from-[#ff512f] to-[#f09819]"></div>
        </div>

        {/* Form Section */}
        <div className="w-[90%] md:w-full mx-10 relative">
          <form
            onSubmit={handleSubmit}
            className="text-black w-full flex flex-col dark:text-white max-w-screen-sm bg-[rgba(255,255,255,0.13)] absolute -translate-x-2/4 -translate-y-2/4 backdrop-blur-[10px] shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[35px] py-[50px] rounded-[10px] border-2 border-solid border-[rgba(255,255,255,0.1)] left-2/4 dark:bg-[rgba(0,0,0,0.5)]"
          >
          {!loading ? (
            <>
              <header className="mb-8 text-center">
                <h1 className="text-2xl font-bold mb-1">OTP Verification</h1>
                <p className="text-[15px] text-slate-500">
                  One Time Password(OTP) has been sent via Email to{" "}
                  <span className="font-bold">
                    {localStorage.getItem("email") || "example@email.com"}
                  </span>
                  .
                </p>
                <p className="text-[15px] text-slate-500">
                  OTP expires in 5 minutes.
                </p>
              </header>
              <div className="flex items-center justify-center gap-3 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    id={`otp-input-${index}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    maxLength={1}
                    className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                ))}
              </div>
              <div className="flex items-start my-5">
                <div className="flex items-center h-5">
                  <input
                    id="rememberDevice"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <label
                  htmlFor="rememberDevice"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember this device for 30 days
                </label>
              </div>
              <div className="max-w-[260px] mx-auto mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium text-white shadow-sm ${
                    loading ? "bg-gray-400" : "bg-indigo-500 hover:bg-indigo-600"
                  } transition-colors duration-150 focus:outline-none focus:ring focus:ring-indigo-300`}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
              <div className="text-sm text-slate-500 mt-4">
                Didn't receive code?{" "}
                <Link
                  to="/resendOTP"
                  className="font-medium text-indigo-500 hover:text-indigo-600"
                >
                  Resend
                </Link>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex justify-center items-center"><GridLoader color="#622BBC" size={15} /></div>
          )}
          </form>
        </div>
      </div>
    </>
  );
};
