import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getFromLocalStorage } from "..";

const useLoggedInRedirect = () => {
    const navigate = useNavigate()
  useEffect(() => {
    const isLoggedIn = !!getFromLocalStorage("token");
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);
};

export default useLoggedInRedirect;
