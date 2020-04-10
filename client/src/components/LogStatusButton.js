import React from 'react';

// Redux 
import { connect } from 'react-redux';
import { togglePopUpOnLogin } from "./../redux/actions/popUpActions";
import { savePostDataToStore } from './../redux/actions/postActions';

// API
import { handlePost } from './../api/handlePost';

// Styles
import styles from './../sass/components/LogStatusButton.module.scss';

const LogStatusButton = (props) => {

  const handleStatusButtonOnClick = (currentUser) => {
    handlePost(props.currentUser).then((response) => {
      const postData = response.data;
      props.savePostDataToStore(postData);
    })
  }

  const handleStatusButtonWhenUserHasLoggedIn = (currentUser) => {
    if (props.currentUser === null) {
      return (
        <button className={styles.button}> Click me to signup/login </button>
      )
    } else {
      return (
        <button className={styles.button} onClick={handleStatusButtonOnClick}> Click me to log your fight against COVID-19! </button>
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
    savePostDataToStore: (postData) => dispatch(savePostDataToStore(postData))
  };
};

function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogStatusButton);