// // src/api/auth.js

// import api from "./axiosClient";

// export const login = async (credentials) => {
//     // **No need for separate CSRF token fetch:**
//     const response = await api.post('/login', credentials);
//     return response.data;
// };

// export const logout = async () => {
//     try {  
//         const response = await api.post('/logout');
//         return response.data
//     } catch (error) {
//         console.log(error)
//     }
// }

