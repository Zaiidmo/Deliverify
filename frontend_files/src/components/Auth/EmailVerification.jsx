// src/pages/Auth/EmailVerification.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyEmail } from "../../services/AuthService"; 

export const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token"); 

    const verifyUserEmail = async () => {
      if (token) {
        try {
          const response = await verifyEmail(token);
          setSuccessMessage(response.message); 
          setTimeout(() => {
            navigate("/login", { state: { successMessage: response.message } });
          }, 0); 
        } catch (error) {
          console.error(error.message); 
          setErrorMessage(error.message);
          setTimeout(() => {
            navigate("/login", { state: { errorMessage: error.message } });
          }, 0); 
        } finally {
          setLoading(false);}
      } else {
        setErrorMessage("No token provided for verification.");
        setLoading(false);
      }
    };

    verifyUserEmail();
  }, [location.search, navigate]);

  if (loading) {
    return <div>Verifying your email...</div>;
  }

  return (
    <div>
      <h1>Email Verification</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {!errorMessage && !successMessage && (
        <p>Something went wrong. Please try again later.</p>
      )}
    </div>
  );
};
