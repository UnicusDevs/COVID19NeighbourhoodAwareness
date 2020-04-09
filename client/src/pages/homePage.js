import React from 'react';

// Components
import About from './../components/About';
import SignUpModule from './../components/SignUpModule';
import LoginModule from './../components/LoginModule';

// Redux
import { connect } from "react-redux";


const HomePage = (props) => {

  const handlePopUp = (displayPopUpLogin, displayPopUpSignUp) => {
    if (displayPopUpSignUp === true) {
      return (
        <div>
          <SignUpModule />
          <About />
        </div>
      )
    } else if (displayPopUpLogin === true) {
      return (
        <div>
          <LoginModule />
          <About />
        </div>
      )
    } else {
      return (
        <div>
          <About /> 
        </div>
      )
    }
  };

  return (
    <div>
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

export default connect(mapStateToProps)(HomePage);

