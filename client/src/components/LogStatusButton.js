import React, {useEffect} from 'react';

// Redux 
import { connect } from 'react-redux';
import { togglePopUpOnLogin } from "./../redux/actions/popUpActions";
import { savePostDataToStore, addNewPostToAllPostStore } from './../redux/actions/postActions';

// API
import { handlePost, getLatestPost } from './../api/handlePost';

// Styles
import styles from './../sass/components/LogStatusButton.module.scss';

const LogStatusButton = (props) => {

  const handleStatusButtonOnClick = (currentUser) => {
    handlePost(props.currentUser).then((response) => {
      const newPost = response.data;
      props.savePostDataToStore(newPost);
      props.addNewPostToAllPostStore(newPost)
    })
  };

  const handleButtonDisable =  (currentUser) => {

  };

  const handleStatusButtonWhenUserHasLoggedIn = (currentUser) => {
    
    if (props.currentUser === null) {
      return (
        <button className={styles.button}> Click me to signup/login </button>
      )
    } else {
      return (
        <div>
          <button className={styles.button} onClick={handleStatusButtonOnClick}> Click me to log your fight against COVID-19! </button>
        </div>
      )
    }
  };

  
  return (
    <div className={styles.buttonContainer}>
      {handleStatusButtonWhenUserHasLoggedIn()}
    </div>
  );
};

// Below calls dispatch with redux store. 
const mapDispatchToProps = (dispatch) => {
  return {
    togglePopUpOnLogin: () => dispatch(togglePopUpOnLogin()),
    savePostDataToStore: (postData) => dispatch(savePostDataToStore(postData)),
    addNewPostToAllPostStore: (newPost) => dispatch(addNewPostToAllPostStore(newPost))
  };
};

function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser,
    latestPost: state.postReducer.latestPost
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogStatusButton);