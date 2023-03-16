import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthenticated(token);
  }, []);

  return {isAuthenticated, setAuthenticated};
};

export default useAuth;
