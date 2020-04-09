import React from 'react';

// Redux 
import { connect } from 'react-redux';
import { togglePopUpOnLogin } from "./../redux/actions/popUpActions";

// Styles
import styles from './../sass/components/LogStatusButton.module.scss';

const LogStatusButton = (props) => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button}> Click me to log your fight against COVID-19! </button>
    </div>
  );
};

// Below calls dispatch with redux store. 
const mapDispatchToProps = (dispatch) => {
  return {
    togglePopUpOnLogin: () => dispatch(togglePopUpOnLogin()),
  };
};

function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogStatusButton);