import axiosAPI from './baseURL';

export const handlePost = ({id, Suburb}, response) => {
  return axiosAPI.post('post/create', {
    User: id,
    DidSelfIsolate: true,
    Suburb: Suburb
  });
};

export const getAllPosts = () => {
  return axiosAPI.get('/post')
};