import React, { useState } from "react";
import {
  User,
  Phone,
  KeyRound,
  Eye,
  EyeOff,
  Mail,
  X,
  IdCard,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import {
  validateField,
  validateRole,
  hasFormErrors,
} from "../../helper/RolesManagemtnValidator";
import { createRole } from "../../services/RoleService";

export const CreateRoleForm = ({ onRoleCreationSuccess, onClose }) => {
  const [Loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    roleName: "",
  });

  const notify = ({ message, type = "info", duration }) => {
    toast[type](message, {
      duration: duration || 4000,
      position: "bottom-right",
    });
  };

  const [formErrors, setFormErrors] = useState({
    roleName: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    let updatedErrors = { ...formErrors };
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    updatedErrors[id] = validateField(id, value);
    setFormErrors(updatedErrors);
  };

  const handleRoleCreation = async (e) => {
    e.preventDefault();
    setLoading(true);

    const errors = validateRole(formData);
    setFormErrors(errors);

    if (hasFormErrors(errors)) {
      setError("Please fill in all fields correctly");
      setLoading(false);
      notify({ message: "Please fill in all fields correctly", type: "error" });
      return;
    }
    try {
      const token = localStorage.getItem("accessToken");
      const response = await createRole(formData, token);
      if (response) {
        console.log(response);

        localStorage.setItem("id", response.role.id);
        notify({
          message: "Role Created Successfully.",
          type: "success",
        });
      }
      onRoleCreationSuccess();
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      notify({ message: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const getInputClasses = (fieldError) => {
    if (fieldError) return "border-red-500"; // Invalid
    return "border-neutral-300 dark:border-neutral-700"; // Neutral
  };

  return (
    <>
      <Toaster />
      <form
        className="text-black text-left w-full flex flex-col dark:text-white max-w-screen-sm lg:max-w-screen-md bg-[rgba(255,255,255,0.13)] absolute -translate-x-2/4 -translate-y-2/4 backdrop-blur-[10px] shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[35px] py-[50px] rounded-[10px] border-2 border-solid border-[rgba(255,255,255,0.1)] left-2/4 dark:bg-[rgba(0,0,0,0.5)]"
        onSubmit={handleRoleCreation}
      >
        <button
          onClick={onClose}
          className="p-1 hover:bg-yellow-200 dark:hover:bg-yellow-600 rounded w-fit"
        >
          <X size={16} className="text-yellow-500 hover:text-black " />
        </button>
        <h3 className="text-[32px] mb-10 font-medium leading-[42px] text-center font-titles">
          Create a Role
        </h3>
        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {/* Name Field */}
        <div className="w-full">
          <label
            htmlFor="name"
            className="block text-base font-medium mt-[10px]"
          >
            Role name
          </label>
          <div className="relative flex items-center mt-2">
            <KeyRound
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              strokeWidth={2.75}
              size={20}
            />
            <input
              type="text"
              value={formData.roleName}
              onChange={handleChange}
              name="roleName"
              id="roleName"
              className={`${getInputClasses(
                formErrors.roleName
              )} block h-[50px] w-full bg-gray-200 border text-sm font-light pl-10 pr-2.5 py-0 rounded-[8px] dark:bg-[rgba(255,255,255,0.1)]`}
            />
          </div>

          {formErrors.roleName && (
            <span className="text-red-500">{formErrors.roleName}</span>
          )}
        </div>
        {/* Submit Button */}
        <button
          className="w-1/2 self-center bg-white hover:bg-violet-400 hover:text-white text-lg font-semibold cursor-pointer mt-[20px] px-0 py-[15px] rounded-[10px] dark:bg-gray-800 dark:hover:bg-violet-700 dark:text-white"
          type="submit"
        >
          Create Role
        </button>
      </form>
    </>
  );
};
