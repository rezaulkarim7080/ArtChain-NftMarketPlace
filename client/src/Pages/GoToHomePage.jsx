// GoToHomePage.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoToHomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg font-semibold text-gray-600">
        Redirecting to the homepage...
      </p>
    </div>
  );
};

export default GoToHomePage;
