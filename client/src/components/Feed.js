import React,  {useEffect, useState} from 'react';

// Redux 
import {connect} from 'react-redux';

// API Calls
import axiosAPI from './../api/baseURL';

// Components
import LogStatus from './LogStatus';
import LogStatusButton from './LogStatusButton';

// Styles
import styles from './../sass/components/Feed.module.scss';

const Feed = (props) => {

  const handleAllPosts = () => {
    if (props.allPosts === null || undefined) {
      return (
        <div>
          <h1> Loading...</h1>
        </div>
      )
    } else if (props.allPosts) {
      const posts = props.allPosts.map((post) => {

        const userId = post.User;
        const claps = post.Claps;
        const createdAt = post.createdAt;
        const suburb = post.Suburb;
        const postId = post._id;

        return (
          <div key={post._id}>
            <LogStatus postId={postId} user={userId} createdAt={createdAt} suburb={suburb} claps={claps} />
          </div>
        )
      });

      return posts
    }
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
    currentUser: state.userReducer.currentUser,
    allPosts: state.postReducer.allPosts
  }
};

export default connect(mapStateToProps, null)(Feed);