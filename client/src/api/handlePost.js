import axiosAPI from './baseURL';

export const handlePost = ({_id}, response) => {
  return axiosAPI.post('post/create', {
    User: _id,
    DidSelfIsolate: true,
  });
};