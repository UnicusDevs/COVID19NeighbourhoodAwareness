import React from 'react';

// Redux 
import {connect} from 'react-redux';

// Components
import LogStatus from './LogStatus';
import LogStatusButton from './LogStatusButton';
import useInfiniteScroll from './useInfiniteScroll';

// Styles
import styles from './../sass/components/Feed.module.scss';

const Feed = (props) => {

 
  const onScroll = (event) => {
    let element = event.target
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      console.log("HELLO THERE")
    }
  } 
   const handleAllPosts = () => {
    if (props.allPosts === null || undefined) {
      return (
        <div>
          <h1> Loading...</h1>
        </div>
      )
    } else if (props.allPosts) {

      let posts = props.allPosts;
      
      posts.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      posts = props.allPosts.map((post) => {

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
    <div className={styles.feed} onScroll={onScroll}>
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