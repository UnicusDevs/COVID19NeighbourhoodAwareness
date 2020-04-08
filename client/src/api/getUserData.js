import axiosAPI from './baseURL';

export const getUserData = (id) => {
  return axiosAPI.get(`/user/${id}`).then((response) => {
    return response;
  }).catch((err) => {
    console.log(err);
  })
};

export let checkUser = () => {
  return axiosAPI.get('/user/current').then((response) => {
    return response;
  }).catch((err) => {
    console.log(err.response);
  })
};