import React, { useEffect } from "react"
import { Link } from 'react-router-dom';

// Redux 
import { connect } from 'react-redux';
import { togglePopUpOnSignUp, togglePopUpOnLogin, togglePopUpOffLogin, togglePopUpOffSignUp } from "./../redux/actions/popUpActions";
import { setCurrentUser } from './../redux/actions/userActions';

//Styles
import styles from '../sass/components/Header.module.scss';

// API Calls
import axiosAPI from './../api/baseURL';
import jwt from 'jsonwebtoken'

const Header = (props) => {

  useEffect(() => {
    async function fetchAPI() {
      await axiosAPI.get('/user/current').then(async (response) => {
        let token = jwt.decode(response.config.headers.Authorization)
        props.setCurrentUser(response.data);
      }).catch((err) => {
        props.setCurrentUser(null);
      })
    };

    fetchAPI()
  }, []);

  const handleSignOut = () => {
    const now = new Date()
    now.setTime(now.getTime() - 1)
    document.cookie = `covid19Project=;expires=${now.toUTCString()};path=/`;
    props.setCurrentUser(null);
    return window.location.reload();
  }

  // The below handles the pop up for signup. More can be found in the signup Form.
  const handleTogglePopUpOnSignUp = () => {
    props.togglePopUpOffLogin()
    props.togglePopUpOnSignUp()
  };

  // The below handles the pop up for the login. More can be found in the login form.
  const handleTogglePopUpOnLogin = () => {
    props.togglePopUpOffSignUp()
    props.togglePopUpOnLogin()
  };

  const handleHeaderDisplay = (currentUser) => {
    if (!props.currentUser) {
      return (
        <header>
          <div className={styles.container}>
            <div className={styles.innercontainer}>
              <div className={styles.logo}>
                <Link to="/">Home2Home</Link>
              </div>
              <div className={styles.navigation}>
                <nav>
                  <Link to={"/login"}>Log in</Link>
                  <Link to={"/signup"}>Sign up</Link>
                </nav>
              </div>
            </div>
          </div>
        </header>
      )
    } else {
      return (
        <header>
          <div className={styles.container}>
            <div className={styles.innercontainer}>
              <div className={styles.logo}>
                <Link to="/">Home2Home</Link>
              </div>
              <div className={styles.navigation}>
                <nav>
                  <button onClick={handleSignOut}>Sign out</button>
                </nav>
              </div>
            </div>
          </div>
        </header>
      )
    }
  };

  return (
    <div>
      {handleHeaderDisplay(props.currentUser)}
    </div>
  )
};

// Below calls dispatch with redux store. 
const mapDispatchToProps = (dispatch) => {
  return {
    togglePopUpOnSignUp: () => dispatch(togglePopUpOnSignUp()),
    togglePopUpOffSignUp: () => dispatch(togglePopUpOffSignUp()),
    togglePopUpOnLogin: () => dispatch(togglePopUpOnLogin()),
    togglePopUpOffLogin: () => dispatch(togglePopUpOffLogin()),
    setCurrentUser: (userData) => dispatch(setCurrentUser(userData))
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);