import axios from "axios"

const baseURL = import.meta.env.VITE_BACKEND_URL

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
})

const handleRefreshToken = async () => {
  try {
    const res = await instance.get("/api/v1/auth/refresh")
    console.log("check refresh token", res.data)

    if (res && res.data) return res.data.access_token
  } catch (e) {
    console.log("Error", e)
  }
}

//Here is a unique way of setting Authorization token in axios. Setting configuration to every axios call is not a good idea and you can change the default Authorization token by:
instance.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
}

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
const NO_RETRY_HEADER = "x-no-retry"
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response
  },

  async function (error) {
    console.log(error)
    // refresh token
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      const access_token = await handleRefreshToken()
      console.log("checking access token", access_token)
      error.config.headers[NO_RETRY_HEADER] = "true"
      if (access_token) {
        error.config.headers["Authorization"] = `Bearer ${access_token}`
        localStorage.setItem("access_token", access_token)
        return instance.request(error.config)
      }
    }

    // khi hết thời gian của refresh token

    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      error.config.url === "/api/v1/auth/refresh"
    ) {
      console.log("check url", error.config.url)
      window.location.href = "/login"
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error?.response?.data ?? Promise.reject(error)
  }
)

export default instance
