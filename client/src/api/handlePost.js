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

export const getLimitedPosts = (pageNumber) => {

  let limit = 10;
  let page = pageNumber;

  return axiosAPI.get(`/post/limit?limit=${limit}&page=${page}`)
};


export const getLatestPost = (props, response) => {
  return axiosAPI.get(`/post/latest/${props}`);
};

export const addClapsToPost = (postId) => {
  axiosAPI.post(`/post/addClap/${postId}`)
};