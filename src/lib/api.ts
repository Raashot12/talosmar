import axios from "axios"

export const common_axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
})
common_axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token")
  config.headers.Authorization = token ? `Bearer ${token}` : ""
  return config
})

