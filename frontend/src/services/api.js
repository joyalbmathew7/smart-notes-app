// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://smart-notes-app-15tf.onrender.com/api/",
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("access");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://smart-notes-app-15tf.onrender.com/api/",
});

api.interceptors.request.use((config) => {
  // Do not attach token for register or login endpoints
  const isPublicRoute = config.url.includes("register") || config.url.includes("login");

  if (!isPublicRoute) {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;