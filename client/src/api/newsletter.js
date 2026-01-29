import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const get = async () => {
  return (await api.get('newsletter/')).data
}

export const post = async (values) => {
  return (await api.post('newsletter/', values)).data
}

export const delet = async (id) => {
  return (await api.delete(`newsletter/${id}`)).data
}