import { api } from './axiosConfig'

export const get = async () => {
  return (await api.get('feedback/')).data
}

export const post = async (values) => {
  return (await api.post('feedback/', values)).data
}

export const delet = async (id) => {
  return (await api.delete(`feedback/${id}`)).data
}