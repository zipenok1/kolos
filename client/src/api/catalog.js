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

export const getCatalog = async () => {
  return (await api.get('catalog/')).data
}

export const postCatalog = async (values) => {
  return (await api.post('catalog/', values, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })).data
}

export const putCatalog = async (id, values) => {
  return (await api.put(`catalog/${id}`, values, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })).data
}

export const deleteCatalog = async (id) => {
  return (await api.delete(`catalog/${id}`)).data
}