import axios from "axios";

export let URL = process.env.NEXT_PUBLIC_API_KEY;

// console.log(URL,'url')
// Create a custom Axios instance with the desired configuration
const axiosInstance = axios.create({
  // baseURL: "http://64.176.167.246:3000/api/", // Set the base URL for all requests
  baseURL:URL,
  
  withCredentials: true,
  crossDomain:true, // Allow credentials to be sent with cross-origin requests
  // headers: {
  //   'Access-Control-Expose-Headers': 'Set-Cookie',
  // },
});

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log(config,'config');
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log(response,'response');
//     const cookieHeader = response.headers['set-cookie'];
//     console.log(cookieHeader,'cookiemyran');
//     if (cookieHeader) {
//       document.cookie = cookieHeader.join(';');
//     }
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Define your custom HTTP methods using the axiosInstance
export const BASE_CALL = {
  post: async (url, payload) => await axiosInstance.post(url, payload),
  put: async (url, payload) => await axiosInstance.put(url, payload),
  get: async (url) => await axiosInstance.get(url),
  delete: async (url) => await axiosInstance.delete(url),
};

