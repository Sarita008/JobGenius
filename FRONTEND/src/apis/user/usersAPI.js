import axios from "axios";
//=======Registration=====

export const registerAPI = async (userData) => {
  const response = await axios.post(
    // "http://localhost:8090/api/v1/users/register",
    "https://jobgenius-6odl.onrender.com/api/v1/users/register",
    {
      email: userData?.email,
      password: userData?.password,
      username: userData?.username,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
//=======Login=====

export const loginAPI = async (userData) => {
  const response = await axios.post(
    // "http://localhost:8090/api/v1/users/login",
     "https://jobgenius-6odl.onrender.com/api/v1/users/login",
    {
      email: userData?.email,
      password: userData?.password,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
//=======Check auth=====

export const checkUserAuthStatusAPI = async () => {
  console.log("check reques");
  
  const response = await axios.get(
    // "http://localhost:8090/api/v1/users/auth/check",
     "https://jobgenius-6odl.onrender.com/api/v1/users/auth/check",
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
//=======Logout =====

export const logoutAPI = async () => {
  const response = await axios.post(
    // "http://localhost:8090/api/v1/users/logout",
     "https://jobgenius-6odl.onrender.com/api/v1/users/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
//=======userProfile =====

export const getUserProfileAPI = async () => {
  const response = await axios.get(
    // "http://localhost:8090/api/v1/users/profile",
     "https://jobgenius-6odl.onrender.com/api/v1/users/profile",
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
