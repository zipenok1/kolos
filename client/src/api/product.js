import { api } from './axiosConfig'

export const get = async () => {
  return (await api.get('product/')).data
}

export const getByCatalog = async (id) => {
  return (await api.get(`product/${id}`)).data
}

export const post = async (values) => {
  return (await api.post('product/', values, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })).data
}

export const put = async (id, values) => {
  return (await api.put(`product/${id}`, values, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })).data
}

export const delet = async (id) => {
  return (await api.delete(`product/${id}`)).data
}