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

export const getNews = async () => {
  return (await api.get('news/')).data
}

export const postNews = async (values) => {
  return (await api.post('news/', values, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })).data
}

export const putNews = async (id, values) => {
  return (await api.put(`news/${id}`, values, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })).data
}

export const deleteNews = async (id) => {
  return (await api.delete(`news/${id}`)).data
}