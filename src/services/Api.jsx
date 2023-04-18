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

// create a new user
export const postCreateNewUser = (fullName, email, password, phone) => {
  return axios.post("/api/v1/user", {
    fullName,
    email,
    password,
    phone,
  });
};

// add import data from excel file
export const postImportData = (data) => {
  return axios.post("/api/v1/user/bulk-create", data);
};

// update the user
export const putUpdateUser = (_id, fullName, phone) => {
  return axios.put("/api/v1/user", { _id, fullName, phone });
};

// delete the user
export const deleteUser = (id) => {
  return axios.delete(`/api/v1/user/${id}`);
};
