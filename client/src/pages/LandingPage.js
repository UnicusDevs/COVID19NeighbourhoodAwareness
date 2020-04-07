import React from 'react';
<<<<<<< HEAD
import Header from './../components/Header';
import About from './../components/About';
=======

// Components
import Header from './../components/Header';
import About from './../components/About';
import SignUpModule from './../components/SignUpModule';

// Redux
import { useDispatch, connect } from "react-redux";
import Store from './../redux/configureStore';
>>>>>>> 9e91760d66397ac21fd791019340f3446c2b0737

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
<<<<<<< HEAD
      <div>
        <Header />
        <About />
      </div>
=======
    <div>
      {handlePopUp()} 
    </div>
>>>>>>> 9e91760d66397ac21fd791019340f3446c2b0737
  )
};

function mapStateToProps(state) {
  return {
    displayPopUp: state.popUpReducer.displayPopUp
  };
};

export default connect(mapStateToProps)(LandingPage);

