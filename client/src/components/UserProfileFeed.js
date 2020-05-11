import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router';

// API Calls
import { getAllPostsMadeByUser } from './../api/handlePost';

// Redux 
import { connect } from 'react-redux';
import { addNewPostToAllPostStore } from './../redux/actions/postActions';

// Components
import LogStatus from './LogStatus';
import LogStatusButton from './LogStatusButton';

// Styles
import styles from './../sass/components/Feed.module.scss';

const UserProfileFeed = (props) => {

  const [pageNumber, setPageNumber] = useState(1);
  const [userPosts, setUserPosts] = useState(null);
  let paramsId = useParams();

  useEffect(() => {
    onLoad();
  },[]);


  async function onLoad() {
    await getAllPostsMadeByUser(pageNumber, paramsId.id).then(async (response) => {
      const newPosts = response.data;
      console.log(newPosts)
      setUserPosts(newPosts);
    })
  };

  const onScroll = async (event) => {
    let element = event.target

    if (element.scrollHeight - element.scrollTop === element.clientHeight && paramsId.id) {
      setPageNumber(pageNumber + 1)
      await getAllPostsMadeByUser(pageNumber, paramsId.id).then(async (response) => {
        const newPosts = response.data;
        console.log(newPosts)
        setUserPosts(newPosts);
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  const handleAllPosts = () => {

    if (userPosts) {

      let posts = userPosts;

      console.log(userPosts)
      posts.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      posts = userPosts.map((post) => {

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
      // If the use is logged in it will only display the posts in their suburb.
    } else {
      return (
        <div className={styles.noPostsContainer}>
          <h1> Loading... </h1>
        </div>
      )
    }
  };

  return (
    <div className={styles.feed} onScroll={onScroll} >
      <div className={styles.logFeedContainer}>
        <div> 
          <h1> Your Posts </h1>
        </div>
        {handleAllPosts()}
      </div>
    </div>
  );
};

// Below calls dispatch with redux store. 
const mapDispatchToProps = (dispatch) => {
  return {
    addNewPostToAllPostStore: (newPost) => dispatch(addNewPostToAllPostStore(newPost))
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser,
    allPosts: state.postReducer.allPosts,
    filteredPosts: state.postReducer.filteredPosts
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileFeed);