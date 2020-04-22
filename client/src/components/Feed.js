import React, {useState} from 'react';

// API Calls
import { getLimitedPosts } from './../api/handlePost';

// Redux 
import { connect } from 'react-redux';
import { addNewPostToAllPostStore } from './../redux/actions/postActions';

// Components
import LogStatus from './LogStatus';
import LogStatusButton from './LogStatusButton';

// Styles
import styles from './../sass/components/Feed.module.scss';

const Feed = (props) => {

  const [pageNumber, setPageNumber] = useState(1);
 
  const onScroll = async (event) => {
    let element = event.target
    if (element.scrollHeight - element.scrollTop === element.clientHeight && props.currentUser === null) {
      setPageNumber(pageNumber + 1)
      await getLimitedPosts(pageNumber).then(async (response) => {
        const newPosts = response.data;
        props.addNewPostToAllPostStore(newPosts)
      }).catch((err) => {
        console.log(err)
      })
    } else if (element.scrollHeight - element.scrollTop === element.clientHeight && props.currentUser) {
      setPageNumber(pageNumber + 1)
      await getLimitedPosts(pageNumber, props.currentUser.id).then(async (response) => {
        const newPosts = response.data;
        props.addNewPostToAllPostStore(newPosts)
      }).catch((err) => {
        console.log(err)
      })
    }
  } 
  
  const handleAllPosts = () => {

    if (props.allPosts === null) {
      return (
        <div>
          <h1> Loading...</h1>
        </div>
      )
    } else if (props.currentUser === null && props.allPosts) {

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
      // If the use is logged in it will only display the posts in their suburb.
    } else if (props.currentUser && props.filteredPosts.length > 0 ){
      let filteredPosts = props.filteredPosts;

      filteredPosts.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      filteredPosts = props.filteredPosts.map((post) => {
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

      return filteredPosts;
    } else if (props.currentUser && props.filteredPosts.length <= 0) {
      return (
        <div className={styles.noPostsContainer}>
          <h1> Oops... Looks like there are no posts <span role="img">😟</span>. Be the first to post!</h1>
        </div>
      )
    } else {
      return (
        <div className={styles.noPostsContainer}>
          <h1> Oops... something went wrong <span role="img">😟</span></h1>
        </div>
      )
    }
  };

  return (
    <div className={styles.feed} onScroll={onScroll} >
      <div className={styles.logFeedContainer}>
        <LogStatusButton />
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

export default connect(mapStateToProps, mapDispatchToProps)(Feed);