import axiosAPI from './baseURL';
import axios from "axios";

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

export const getLimitedPosts = (page, userId) => {
  let limit = 2;
  
  if (userId) {
    return axiosAPI.get(`/post/limit?limit=${limit}&page=${page}&id=${userId}`)
  } else {
    return axiosAPI.get(`/post/limit?limit=${limit}&page=${page}`)
  }
};

export const getAllPostsMadeByUser = (page, userId) => {
  let limit = 5;
  return axiosAPI.get(`/post/userposts?limit=${limit}&page=${page}&id=${userId}`)
} ;

export const getUserPosts = (props) => {
  return axios.all([
    axiosAPI.get(`/post/latest/${props}`),
    axiosAPI.get(`/post/suburb/${props}`)
  ]);
};

export const addClapsToPost = (postId) => {
  axiosAPI.post(`/post/addClap/${postId}`)
};