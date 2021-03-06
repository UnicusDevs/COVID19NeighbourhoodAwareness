import React from 'react';

// Components
import About from './../components/About';
import SignUpModule from './../components/SignUpModule';
import LoginModule from './../components/LoginModule';
import Header from './../components/Header';

// Redux
import { connect } from "react-redux";

// CSS
import styles from './../sass/pages/HomePage.module.scss';

const HomePage = (props) => {

  const handlePopUp = (displayPopUpLogin, displayPopUpSignUp) => {
    if (displayPopUpSignUp === true) {
      return (
        <div>
          <Header />
          <SignUpModule />
          <About />
        </div>
      )
    } else if (displayPopUpLogin === true) {
      return (
        <div>
          <Header />
          <LoginModule />
          <About />
        </div>
      )
    } else {
      return (
        <div>
          <Header />
          <About /> 
        </div>
      )
    }
  };

  return (
    <div className={styles.mainContainer}>
      {handlePopUp(props.displayPopUpLogin, props.displayPopUpSignUp)} 
    </div>
  )
};


// Connects to redux store so don't need to import.
function mapStateToProps(state) {
  return {
    displayPopUpSignUp: state.popUpReducer.displayPopUpSignUp,
    displayPopUpLogin: state.popUpReducer.displayPopUpLogin
  };
};

export default connect(mapStateToProps, null)(HomePage);

