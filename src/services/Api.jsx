import axios from "~/utils"

/* ========================= User ===============================*/
export const postRegister = (fullName, email, password, phone) => {
  return axios.post("/api/v1/user/register", {
    fullName,
    email,
    password,
    phone,
  })
}
export const postLogin = (username, password, delay) => {
  return axios.post("/api/v1/auth/login", {
    username,
    password,
    delay,
  })
}

export const getFetchAccount = () => {
  return axios.get("/api/v1/auth/account")
}

export const getAllUserPaginate = (page, pageSize) => {
  return axios.get(`/api/v1/user?pageSize=${pageSize}&current=4`)
}

// create a new user
export const postCreateNewUser = (fullName, email, password, phone) => {
  return axios.post("/api/v1/user", {
    fullName,
    email,
    password,
    phone,
  })
}

// add import data from excel file
export const postImportData = (data) => {
  return axios.post("/api/v1/user/bulk-create", data)
}

// update the user by admin
export const putUpdateUser = (_id, fullName, phone) => {
  return axios.put("/api/v1/user", { _id, fullName, phone })
}

// delete the user by admin
export const deleteUser = (id) => {
  return axios.delete(`/api/v1/user/${id}`)
}

// update the user by user
export const postUpdateAvatar = (fileImg) => {
  const dataImage = new FormData()
  dataImage.append("fileImg", fileImg)
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: dataImage,
    headers: { "Content-Type": "multipart/form-data", "upload-type": "avatar" },
  })
}
// update the user by user
export const putUpdateUserByUser = (_id, fullName, phone, avatar) => {
  return axios.put("/api/v1/user", { _id, fullName, phone, avatar })
}

// change password of user
export const postChangePassword = (email, oldpass, newpass) => {
  return axios.post("/api/v1/user/change-password", {
    email,
    oldpass,
    newpass,
  })
}
// ********************* Book =========================*/
// get all categories
export const getAllCategories = () => {
  return axios.get("/api/v1/database/category")
}
//
export const postUploadImage = (fileImg) => {
  const dataImage = new FormData()
  dataImage.append("fileImg", fileImg)
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: dataImage,
    headers: { "Content-Type": "multipart/form-data", "upload-type": "book" },
  })
}

// create a new book
export const postNewBook = (
  thumbnail,
  slider,
  mainText,
  author,
  price,
  sold,
  quantity,
  category
) => {
  return axios.post("/api/v1/book", {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category,
  })
}

// update the book
export const putUpdateBook = (
  _id,
  thumbnail,
  slider,
  mainText,
  author,
  price,
  sold,
  quantity,
  category
) => {
  return axios.put(`/api/v1/book/${_id}`, {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category,
  })
}

// delete book
export const deleteBook = (id) => {
  return axios.delete(`/api/v1/book/${id}`)
}

// get data book details
export const getBookDetail = (id) => {
  return axios.get(`/api/v1/book/${id}`)
}

// send request order
export const postDataOrder = (data) => {
  return axios.post("/api/v1/order", { ...data })
}

// get history order
export const getHistory = () => {
  return axios.get("/api/v1/history")
}

// get dashboard
export const getDashboard = () => {
  return axios.get("/api/v1/database/dashboard")
}

// get history order
export const getManageOrder = (query) => {
  // query = current=${currentPage}&pageSize=${pageSize}

  return axios.get(`/api/v1/order?${query}`)
}
