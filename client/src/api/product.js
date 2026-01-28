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

export const getProduct = async () => {
  return (await api.get('product/')).data
}

export const postProduct = async (values) => {
  return (await api.post('product/', values, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })).data
}

export const putProduct = async (id, values) => {
  return (await api.put(`product/${id}`, values, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })).data
}

export const deleteProduct = async (id) => {
  return (await api.delete(`product/${id}`)).data
}