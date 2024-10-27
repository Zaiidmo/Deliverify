import React from "react";

const Alert = ({ children, variant = "default" }) => {
  const bgColor = variant === "destructive" ? "bg-red-500" : "bg-gray-100";
  return (
    <div className={`${bgColor} text-white p-4 rounded-lg shadow-md`}>
      {children}
    </div>
  );
};

const AlertTitle = ({ children }) => (
  <h2 className="font-semibold text-lg">{children}</h2>
);

const AlertDescription = ({ children }) => (
  <p className="text-sm">{children}</p>
);

export { Alert, AlertTitle, AlertDescription };
