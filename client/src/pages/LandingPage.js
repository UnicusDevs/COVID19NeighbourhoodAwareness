import React from 'react';

// Components
import Header from './../components/Header';
import About from './../components/About';
import SignUpModule from './../components/SignUpModule';

// Redux
import { useDispatch, connect } from "react-redux";
import Store from './../redux/configureStore';

const LandingPage = (props) => {

  const store = Store.getState();

  const handlePopUp = () => {
    if (store.popUpReducer.displayPopUp === true) {
      return (
        <div>
          <Header />
          <SignUpModule />
          <About />
        </div>
      )
    } else if (store.popUpReducer.displayPopUp === false) {
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
    displayPopUp: state.popUpReducer.displayPopUp
  };
};

export default connect(mapStateToProps)(LandingPage);

