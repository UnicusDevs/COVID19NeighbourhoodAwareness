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

export const getLimitedPosts = () => {
  
  let limit = 5;

  return axiosAPI.get(`/post/limit?limit=${limit}`)
}
export const getLatestPost = (props, response) => {
  return axiosAPI.get(`/post/latest/${props}`);
};

export const addClapsToPost = (postId) => {
  axiosAPI.post(`/post/addClap/${postId}`)
};