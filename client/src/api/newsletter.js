import { api } from './axiosConfig'

export const get = async () => {
  return (await api.get('newsletter/')).data
}

export const post = async (values) => {
  return (await api.post('newsletter/', values)).data
}

export const delet = async (id) => {
  return (await api.delete(`newsletter/${id}`)).data
}