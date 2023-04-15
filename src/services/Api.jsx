import axios from "~/utils";

export const postRegister = (fullName, email, password, phone) => {
  return axios.post("/api/v1/user/register", {
    fullName,
    email,
    password,
    phone,
  });
};
export const postLogin = (username, password, delay) => {
  return axios.post("/api/v1/auth/login", {
    username,
    password,
    delay,
  });
};

export const getFetchAccount = () => {
  return axios.get("/api/v1/auth/account");
};

export const getAllUserPaginate = (page, pageSize) => {
  return axios.get(`/api/v1/user?pageSize=${pageSize}&current=4`);
};
