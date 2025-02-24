import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerClient } from "../../services/AuthService";
import {
  validateField,
  validateForm,
  hasFormErrors,
} from "../../helper/AuthFormValidator";
import { User, Phone, KeyRound, Eye, EyeOff, Mail, Key } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { GridLoader } from "react-spinners";

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const [Loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: {
      fname: "",
      lname: "",
    },
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    roles: ["Client"],
  });

  const notify = ({ message, type = "info", duration }) => {
    toast[type](message, {
      duration: duration || 4000,
      position: "bottom-right",
    });
  };

  const [formErrors, setFormErrors] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes for the form fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    let updatedErrors = { ...formErrors };
    if (id === "fname" || id === "lname") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        fullname: {
          ...prevFormData.fullname,
          [id]: value,
        },
      }));
      updatedErrors[id] = validateField(id, value);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }));
      updatedErrors[id] = validateField(id, value);
    }

    setFormErrors(updatedErrors);
  };

  // Handle form submissionfname
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const errors = validateForm(formData);
    setFormErrors(errors);

    if (hasFormErrors(errors)) {
      setError("Please fill in all fields correctly");
      setLoading(false);
      notify({ message: "Please fill in all fields correctly", type: "error" });
      return;
    }
    try {
      const response = await registerClient(formData);
      if (response) {
        notify({
          message:
            "Registered successfully. Please check your email for verification link.",
          type: "success",
        });
        setTimeout(() => {
          navigate("/login", 0);
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      notify({ message: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const getInputClasses = (fieldError) => {
    if (fieldError) return "border-red-500 "; //Invalid
    return "border-neutral-300 dark:border-neutral-700 "; //Neutral
    if (fieldError === "") return "border-green-500 "; //Valid
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
          {!Loading ? (
            <form
              className="text-black w-full flex flex-col dark:text-white max-w-screen-sm lg:max-w-screen-md bg-[rgba(255,255,255,0.13)] absolute -translate-x-2/4 -translate-y-2/4 backdrop-blur-[10px] shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[35px] py-[50px] rounded-[10px] border-2 border-solid border-[rgba(255,255,255,0.1)] left-2/4 dark:bg-[rgba(0,0,0,0.5)]"
              onSubmit={handleRegister}
            >
              <h3 className="text-[32px] mb-10 font-medium leading-[42px] text-center font-titles">
                Get Started Now
              </h3>

              {/* Error Message */}
              {error && <p className="text-red-500 text-center">{error}</p>}

              {/* Name Fields */}
              <div className="flex w-full justify-between gap-2">
                <div className="w-1/2">
                  <label
                    htmlFor="fname"
                    className="block text-base font-medium mt-[10px]"
                  >
                    First name
                  </label>
                  <div className="relative flex items-center mt-2">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      strokeWidth={2.75}
                      size={20}
                    />{" "}
                    <input
                      type="text"
                      value={formData.fullname.fname}
                      onChange={handleChange}
                      name="fname"
                      id="fname"
                      className={`${getInputClasses(
                        formErrors.fname
                      )} block h-[50px] w-full bg-gray-200 border  text-sm font-light pl-10 pr-2.5 py-0 rounded-[8px] dark:bg-[rgba(255,255,255,0.1)]`}
                    />
                  </div>

                  {formErrors.fname && (
                    <span className="text-red-500">{formErrors.fname}</span>
                  )}
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="lname"
                    className="block text-base font-medium mt-[10px]"
                  >
                    Last Name
                  </label>
                  <div className="relative flex items-center mt-2">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      strokeWidth={2.75}
                      size={20}
                    />{" "}
                    <input
                      type="text"
                      value={formData.fullname.lname}
                      onChange={handleChange}
                      name="lname"
                      id="lname"
                      className={`block h-[50px] w-full bg-gray-200 border  text-sm font-light pl-10 pr-2.5 py-0 rounded-[8px] dark:bg-[rgba(255,255,255,0.1)] ${getInputClasses(
                        formErrors.lname
                      )}`}
                    />
                  </div>

                  {formErrors.lname && (
                    <span className="text-red-500">{formErrors.lname}</span>
                  )}
                </div>
              </div>

              {/* Username & Phone Number Fields */}
              <div className="flex w-full justify-between gap-2">
                <div className="w-1/2">
                  <label
                    htmlFor="username"
                    className="block text-base font-medium mt-[10px]"
                  >
                    User Name
                  </label>
                  <div className="relative flex items-center mt-2">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      strokeWidth={2.75}
                      size={20}
                    />{" "}
                    <input
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      name="username"
                      id="username"
                      className={`block h-[50px] w-full bg-gray-200 border  text-sm font-light pl-10 pr-2.5 py-0 rounded-[8px] dark:bg-[rgba(255,255,255,0.1)] ${getInputClasses(
                        formErrors.username
                      )}`}
                    />
                  </div>

                  {formErrors.username && (
                    <span className="text-red-500">{formErrors.username}</span>
                  )}
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-base font-medium mt-[10px]"
                  >
                    Phone Number
                  </label>
                  <div className="relative flex items-center mt-2">
                    <Phone
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      strokeWidth={2.75}
                      size={20}
                    />
                    <input
                      type="text"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      name="phoneNumber"
                      id="phoneNumber"
                      className={`block h-[50px] w-full bg-gray-200 border  text-sm font-light pl-10 pr-2.5 py-0 rounded-[8px] dark:bg-[rgba(255,255,255,0.1)] ${getInputClasses(
                        formErrors.phoneNumber
                      )}`}
                    />
                  </div>

                  {formErrors.phoneNumber && (
                    <span className="text-red-500">
                      {formErrors.phoneNumber}
                    </span>
                  )}
                </div>
              </div>

              {/* Email Field */}
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
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  id="email"
                  className={`block h-[50px] w-full bg-gray-200 border  text-sm font-light pl-10 pr-2.5 py-0 rounded-[8px] dark:bg-[rgba(255,255,255,0.1)] ${getInputClasses(
                    formErrors.email
                  )}`}
                />
              </div>

              {formErrors.email && (
                <span className="text-red-500">{formErrors.email}</span>
              )}

              {/* Password Field */}
              <label
                htmlFor="password"
                className="block text-base font-medium mt-[10px]"
              >
                Password
              </label>
              <div className="relative flex items-center mt-2">
                <KeyRound
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  strokeWidth={2.75}
                  size={20}
                />{" "}
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  id="password"
                  className={`block h-[50px] w-full bg-gray-200 border  text-sm font-light pl-10 pr-2.5 py-0 rounded-[8px] dark:bg-[rgba(255,255,255,0.1)] ${getInputClasses(
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
                <span className="text-red-500">{formErrors.password}</span>
              )}

              {/* Submit Button */}
              <button
                className="w-1/2 self-center bg-white hover:bg-violet-400 hover:text-white text-lg font-semibold cursor-pointer mt-[20px] px-0 py-[15px] rounded-[10px] dark:bg-gray-800 dark:hover:bg-violet-700 dark:text-white"
                type="submit"
              >
                Register
              </button>

              {/* Login Link */}
              <label className="block text-center mt-5">
                Already have an account? <br />
                <Link
                  className="text-blue-600 hover:underline dark:text-blue-300"
                  to="/login"
                >
                  Login now
                </Link>
              </label>
            </form>
          ) : (
            <div
              role="status"
              className="flex justify-center items-center w-1/2 h-64 max-w-screen-sm bg-[rgba(255,255,255,0.13)] absolute -translate-x-2/4 -translate-y-2/4 backdrop-blur-[10px] shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[35px] py-[50px] rounded-[10px] border-2 border-solid border-[rgba(255,255,255,0.1)] left-2/4 dark:bg-[rgba(0,0,0,0.5)]"
            >
              <GridLoader color="#622BBC" size={15} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
