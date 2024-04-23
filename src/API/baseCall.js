import axios from "axios";

// Create a custom Axios instance with the desired configuration
const axiosInstance = axios.create({
  // baseURL: "http://64.176.167.246:3000/api/", // Set the base URL for all requests
  baseURL: "https://illuminals.io/api/api", // Set the base URL for all requests
  
  withCredentials: true,
  crossDomain:true, // Allow credentials to be sent with cross-origin requests
  headers: {
    'Access-Control-Expose-Headers': 'Set-Cookie', // Expose Set-Cookie header
  },
});

// Define your custom HTTP methods using the axiosInstance
export const BASE_CALL = {
  post: async (url, payload) => await axiosInstance.post(url, payload),
  put: async (url, payload) => await axiosInstance.put(url, payload),
  get: async (url) => await axiosInstance.get(url),
  delete: async (url) => await axiosInstance.delete(url),
};

