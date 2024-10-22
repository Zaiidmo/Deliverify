import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SidebarButton = ({ label, icon, href }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <Link to={href}>
        <button
          type="button"
          className="size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-black hover:bg-violet-500 focus:outline-none focus:bg-violet-500 disabled:opacity-50 disabled:pointer-events-none dark:text-yellow-500 dark:hover:bg-white dark:focus:bg-neutral-200"
          onMouseEnter={() => setShowTooltip(true)} 
          onMouseLeave={() => setShowTooltip(false)} 
        >
          {icon}
        </button>
      </Link>
      {showTooltip && (
        <span className="absolute z-10 py-1.5 px-2.5 text-xs text-white bg-gray-900 rounded-lg -top-8 left-1/2 transform -translate-x-1/2 opacity-100 transition-opacity duration-300">
          {label}
        </span>
      )}
    </div>
  );
};

