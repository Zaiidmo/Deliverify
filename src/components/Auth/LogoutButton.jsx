import React from "react";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../services/AuthService";
import toast, { Toaster } from "react-hot-toast";

const LogoutButton = () => {
  const navigate = useNavigate();
  const notify = ({ message, type = "info", duration }) => {
    toast[type](message, {
      duration: duration,
      position: "bottom-right",
    });
  }
  const handleLogout = async () => {
    try {
      notify({ message: "Logged out successfully.", type: "success", duration: 4000 });
      await Logout(navigate);
    } catch (error) {
      console.error("Logout failed:", error.message);
      notify({ message: "Failed to logout. Please try again.", type: "error", duration: 4000 });
    }
  };

  return (
    <>
      <Toaster />
      <button
        onClick={handleLogout}
        className="size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-black hover:bg-violet-500 focus:outline-none focus:bg-violet-500 disabled:opacity-50 disabled:pointer-events-none dark:text-yellow-500 dark:hover:bg-white dark:focus:bg-neutral-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M14 3.095A10 10 0 0 0 12.6 3C7.298 3 3 7.03 3 12s4.298 9 9.6 9q.714 0 1.4-.095M21 12H11m10 0c0-.7-1.994-2.008-2.5-2.5M21 12c0 .7-1.994 2.008-2.5 2.5"
            color="currentColor"
          />
        </svg>
      </button>
    </>
  );
};

export default LogoutButton;
