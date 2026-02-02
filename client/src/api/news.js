import { api } from './axiosConfig'

export const get = async () => {
  return (await api.get('news/')).data
}

export const getById = async (id) => {
  return (await api.get(`news/${id}`)).data
}

export const post = async (values) => {
  return (await api.post('news/', values, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })).data
}

export const put = async (id, values) => {
  return (await api.put(`news/${id}`, values, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })).data
}

export const delet = async (id) => {
  return (await api.delete(`news/${id}`)).data
}