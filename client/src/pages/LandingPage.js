import React from 'react';

// Components
import Header from './../components/Header';
import About from './../components/About';
import SignUpModule from './../components/SignUpModule';
import LoginModule from './../components/LoginModule';

// Redux
import { connect } from "react-redux";
import Store from './../redux/configureStore';

const LandingPage = (props) => {

  const store = Store.getState();

  const handlePopUp = () => {
    if (store.popUpReducer.displayPopUpSignUp === true) {
      return (
        <div>
          <Header />
          <SignUpModule />
          <About />
        </div>
      )
    } else if (store.popUpReducer.displayPopUpLogin === true) {
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
    <div>
      {handlePopUp()} 
    </div>
  )
};

function mapStateToProps(state) {
  return {
    displayPopUpSignUp: state.popUpReducer.displayPopUpSignUp,
    displayPopUpLogin: state.popUpReducer.displayPopUpLogin
  };
};

export default connect(mapStateToProps)(LandingPage);

