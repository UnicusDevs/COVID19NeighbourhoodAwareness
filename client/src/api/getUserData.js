import axiosAPI from './baseURL';

export const getUserData = (id) => {
  return axiosAPI.get(`/user/${id}`)
};

export const getCurrentUser = () => {
  return axiosAPI.get('/user/current')
};