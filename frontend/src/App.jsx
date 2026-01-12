import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import api from "./api/axios";
import { useAuthStore } from "./store/authStore";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  // axios response interceptor
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response, (error) => {
        if (error.response?.status === 401){
            console.log("token expired or invalid. logging out...");
            navigate("/login"); // redirect to login page
            logout(); // clear auth state
        }
        return Promise.reject(error);
      }
    );

    // cleanup: remove interceptor when component unmounts
    return () => api.interceptors.response.eject(interceptor);
  }, [navigate, logout]);
  return <AppRoutes />;
}

export default App;
