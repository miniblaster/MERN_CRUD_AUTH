import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        {"Back"}
      </button>
      <h1 className="text-danger text-center mt-4">Page Not Fount</h1>
    </div>
  );
};

export default NotFound;
