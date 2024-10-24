import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginClient } from "../../services/AuthService";
import {
  validateField,
  validateForm,
  hasFormErrors,
} from "../../helper/AuthFormValidator";
import { User, KeyRound, Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { GridLoader } from "react-spinners";
export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({
    identifier: "",
    password: "",
  });

  const notify = ({ message, type = "info", duration }) => {
    toast[type](message, {
      duration: duration || 4000,
      position: "bottom-right",
    });
  };

  useEffect(() => {
    if (loading) {
      notify({
        message: "Submitting ...",
        type: "loading",
        duration: 2000
      });
    }
  }, [loading]);

  // Handle input changes for the form fields and validate each field
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [id]: updatedValue,
    }));

    // Validate the changed field and update errors
    const updatedErrors = { ...formErrors };
    updatedErrors[id] = validateField(id, updatedValue);
    setFormErrors(updatedErrors);
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const errors = validateForm(formData);
    setFormErrors(errors);

    if (hasFormErrors(errors)) {
      setError("Please fill in all required fields correctly.");
      setLoading(false);
      return notify({
        message: "Please fill in all required fields correctly.",
        type: "error",
      });
    }

    console.log("Form data:", formData);

    try {
      // Clear previous error messages
      setError("");

      // Call the loginClient to submit login details
      const response = await loginClient(formData);
      console.log("Login response:", response);
      if (response.otpCode) {
        localStorage.setItem("email", response.user.email);
        setSuccessMessage("OTP sent to your email. Please check your inbox.");
        notify({
          message: "OTP sent to your email. Please check your inbox.",
          type: "success",
        });
        setTimeout(() => {
          navigate("/otp-login", 0);
        });
      } else if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        setSuccessMessage("Login successful! Redirecting...");
        notify({
          message: "Login successful! Redirecting...",
          type: "success",
        });
        setTimeout(() => {
          navigate("/", 0);
        });
      } else if(response.message === "Please verify your email.") {
        setSuccessMessage(response.message);
        notify({ message: response.message, type: "warning" });
      } else {
        setSuccessMessage(response.message);
        notify({ message: response.message, type: "warning" });
        setTimeout(() => navigate("/", 0));
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      notify({ message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Determine the input CSS class based on validation errors
  const getInputClasses = (fieldError) => {
    return fieldError
      ? "border-red-500"
      : "border-neutral-300 dark:border-neutral-700";
  };
  return (
    <>
      <Toaster position="bottom-right" />
      {/* <ToastContainer position="top-right" autoClose={5000} /> */}
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
            <form
              onSubmit={handleLogin}
              className="text-black w-full flex flex-col dark:text-white max-w-screen-sm bg-[rgba(255,255,255,0.13)] absolute -translate-x-2/4 -translate-y-2/4 backdrop-blur-[10px] shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[35px] py-[50px] rounded-[10px] border-2 border-solid border-[rgba(255,255,255,0.1)] left-2/4 dark:bg-[rgba(0,0,0,0.5)]"
            >
              <h3 className="text-[32px] mb-10 font-medium leading-[42px] text-center font-titles">
                Welcome Back
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

              {/* Identifier Field */}
              <div className="">
                <label
                  htmlFor="identifier"
                  className="block text-base font-medium mt-[10px]"
                >
                  Identifier
                </label>
                <div className="relative flex items-center mt-2">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    strokeWidth={2.75}
                    size={20}
                  />{" "}
                  <input
                    type="text"
                    name="identifier"
                    id="identifier"
                    value={formData.identifier}
                    onChange={handleChange}
                    className={`block h-[50px] w-full bg-gray-200 border text-sm font-light pl-10 pr-2.5 py-0 rounded-[8px] dark:bg-[rgba(255,255,255,0.1)] ${getInputClasses(
                      formErrors.identifier
                    )}`}
                  />
                </div>
                {formErrors.identifier && (
                  <p className="text-red-500 text-sm mt-2">
                    {formErrors.identifier}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="flex justify-between items-center mt-[10px]">
                <label
                  htmlFor="password"
                  className="block text-base font-medium"
                >
                  Password
                </label>
                <Link
                  className="text-blue-600 hover:underline dark:text-blue-300"
                  to="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative flex items-center mt-2">
                <KeyRound
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  strokeWidth={2.75}
                  size={20}
                />
                <KeyRound
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  strokeWidth={2.75}
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  name="password"
                  id="password"
                  onChange={handleChange}
                  className={`relative block h-[50px] w-full bg-gray-200 border text-sm font-light pl-10 pr-2.5 py-0 rounded-[8px] dark:bg-[rgba(255,255,255,0.1)] ${getInputClasses(
                    formErrors.password
                  )}`}
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
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {formErrors.password}
                </p>
              )}
              <div className="flex items-start my-5">
                <div className="flex items-center h-5">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    onChange={handleChange}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <label
                  htmlFor="rememberMe"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <button
                className="w-1/2 self-center bg-white hover:bg-violet-400 hover:text-white text-lg font-semibold cursor-pointer mt-[20px] px-0 py-[15px] rounded-[10px] dark:bg-gray-800 dark:hover:bg-violet-700 dark:text-white"
                type="submit"
              >
                Login
              </button>

              {/* Login Link */}
              <label className="block text-center mt-5">
                New to the community? <br />
                <Link
                  className="text-blue-600 hover:underline dark:text-blue-300"
                  to="/register"
                >
                  Join us now
                </Link>
              </label>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
