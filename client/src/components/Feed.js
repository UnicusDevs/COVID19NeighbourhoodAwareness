import React,  {useEffect, useState} from 'react';

// Redux 
import {connect} from 'react-redux';

// API Calls
import axiosAPI from './../api/baseURL';
import { getAllPosts } from './../api/handlePost';

// Components
import LogStatus from './LogStatus';
import LogStatusButton from './LogStatusButton';

// Styles
import styles from './../sass/components/Feed.module.scss';

const Feed = (props) => {

  const [allPostsArray, setAllPostsArray] = useState([])

  useEffect(() => {
    async function fetchAPI() {
      await axiosAPI.get('/post').then(async (response) => {
        const posts = response.data;
        setAllPostsArray(posts)
      }).catch((err) => {
        console.log(err)
      })
    };

    fetchAPI()
  }, []);


  const handleAllPosts = () => {

    const posts = allPostsArray.map((post) => {
    
      const userId = post.User;
      const claps = post.Claps;
      const createdAt = post.createdAt;
      const suburb = post.Suburb;
      const postId = post._id;
      
      return (
        <div key={post._id}>
          <LogStatus  postId={postId} user={userId} createdAt={createdAt} suburb={suburb} claps={claps} />
        </div>
      )
    });

    return posts
  };

  return (
    <div className={styles.feed}>
      <div className={styles.logFeedContainer}>
        <LogStatusButton />
        {handleAllPosts()}
      
      </div>
    </div>
  );
};


function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser
  }
};

export default connect(mapStateToProps, null)(Feed);