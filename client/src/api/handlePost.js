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

export const getLimitedPosts = (pageNumber) => {

  let limit = 15;
  let page = pageNumber;

  return axiosAPI.get(`/post/limit?limit=${limit}&page=${page}`)
};


export const getUserPosts = (props) => {
  return axios.all([
    axiosAPI.get(`/post/latest/${props}`),
    axiosAPI.get(`/post/suburb/${props}`)
  ]);
};

export const addClapsToPost = (postId) => {
  axiosAPI.post(`/post/addClap/${postId}`)
};

export const filterPostsBasedOffUserSuburb = (userSuburb) => {
  axiosAPI.get(`/post/suburb/${userSuburb}`)
};