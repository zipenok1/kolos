import { api } from './axiosConfig'

export const get = async () => {
  return (await api.get('catalog/')).data
}

export const post = async (values) => {
  return (await api.post('catalog/', values, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })).data
}

export const put = async (id, values) => {
  return (await api.put(`catalog/${id}`, values, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })).data
}

export const delet = async (id) => {
  return (await api.delete(`catalog/${id}`)).data
}