import axios, { type InternalAxiosRequestConfig, AxiosError } from "axios";
import { store } from "../redux/store"; // Import the Redux store
import { logout } from "../redux/slices/auth-slice/authSlice";

const API = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL || "https://final-year-project-9shd.onrender.com/api/v1",
});

// Request interceptor to add auth token dynamically
API.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Skip auth header for login/signup endpoints
        const publicEndpoints = ['/auth/login', '/auth/signup', '/auth/register'];
        const isPublicEndpoint = publicEndpoints.some(endpoint => 
            config.url?.includes(endpoint)
        );

        if (!isPublicEndpoint) {
            // Get token from Redux store
            const token = store.getState().auth.token || localStorage.getItem("token");

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                console.warn("No token found in Redux or localStorage for protected endpoint:", config.url);
            }
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Response interceptor to handle 401/403 errors
API.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        // Handle 401 Unauthorized or 403 Forbidden
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Clear invalid token
            localStorage.removeItem("token");
            store.dispatch(logout());
            
            // Only redirect if not already on login page
            if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
                console.warn("Authentication failed. Redirecting to login...");
                window.location.href = '/login';
            }
        }
        
        return Promise.reject(error);
    }
);

export default API;
