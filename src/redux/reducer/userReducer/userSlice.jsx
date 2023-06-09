import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "~/utils"

//

const initialState = {
  listUsers: [],
  listUsersPaginate: [],
  totalPages: "",
  user: {
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: "",
  },
  isAuthenticated: false,
  isLoading: true,
}

export const postLogOut = createAsyncThunk("users/postLogOut", async () => {
  const response = await axios.post("/api/v1/auth/logout")
  return response
})

export const getAllUser = createAsyncThunk("users/getAllUser", async () => {
  const response = await axios.get("/api/v1/user")
  return response
})

export const getAllUserWithPaginate = createAsyncThunk(
  "users/getAllUserWithPaginate",
  async (query) => {
    const response = await axios.get(
      ///pageSize=1&current=4
      `/api/v1/user?${query}`
    )
    return response.data
  }
)

// create a new user

//  handle actions in your reducers:
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // set các giá trị khi đăng nhập thành công
    doLoginAction: (state, action) => {
      state.isAuthenticated = true
      state.isLoading = false
      state.user = action.payload
    },
    // dùng để fetch lại account khi F5 lại trang
    doFetchAccount: (state, action) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload
    },
    doLogOutAction: (state, action) => {
      localStorage.removeItem("access_token")
      state.isLoading = true
      state.isAuthenticated = false
      state.user = {
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      }
    },
    doUpdateAvatarAction: (state, action) => {
      state.user.avatar = action.payload.avatar
    },
    doUpdateUser: (state, action) => {
      state.user.fullName = action.payload.fullName
      state.user.phone = action.payload.phone
      state.user.avatar = action.payload.avatar
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.listUsers = action.payload.data
      })
      .addCase(getAllUserWithPaginate.fulfilled, (state, action) => {
        state.listUsersPaginate = action.payload.result
        state.totalPages = action.payload.meta.total
      })
  },
})

export const {
  doLoginAction,
  doFetchAccount,
  doLogOutAction,
  doUpdateUserAction,
  doUpdateAvatarAction,
  doUpdateUser,
} = usersSlice.actions
export default usersSlice.reducer
