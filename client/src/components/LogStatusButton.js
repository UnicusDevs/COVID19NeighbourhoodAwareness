import React from 'react';

// Redux 
import {connect} from 'react-redux';
import { togglePopUpOnLogin } from "./../redux/actions/popUpActions";

// Styles
import styles from './../sass/components/LogStatusButton.module.scss';

const LogStatusButton = (props) => {

  const handleStatusLogButton = (currentUser) => {
    if (!currentUser) {
      props.togglePopUpOnLogin();
    } else  {
      console.log("Hello")
    }
  };

  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button} onClick={handleStatusLogButton}> Click me to log your fight against COVID-19! </button>
    </div>
  );
};

// Below calls dispatch with redux store. 
const mapDispatchToProps = (dispatch) => {
  return {
    togglePopUpOnLogin: () => dispatch(togglePopUpOnLogin()),
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser,
    displayPopUpLogin: state.popUpReducer.displayPopUpLogin
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogStatusButton);