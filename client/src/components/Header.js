import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken'
import styles from '../sass/components/Header.module.scss';


// Redux 
import { connect } from 'react-redux';
import { togglePopUpOnSignUp, togglePopUpOnLogin, togglePopUpOffLogin, togglePopUpOffSignUp } from "./../redux/actions/popUpActions";
import { setCurrentUser } from './../redux/actions/userActions';

// API Calls
import axiosAPI from './../api/baseURL';
import { checkUser } from './../api/getUserData';

const Header = (props) => {

  let [dataIsLoaded, setDataIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchAPI() {
      await axiosAPI.get('/user/current').then((response) => {
        let token = jwt.decode(response.config.headers.Authorization)
        props.setCurrentUser(token);
      }).catch((err) => {
        setDataIsLoaded(dataIsLoaded = true);
        props.setCurrentUser(null);
      })
    };

    fetchAPI()
  }, []);

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
                  <button onClick={handleTogglePopUpOnLogin}>Log in</button>
                  <button onClick={handleTogglePopUpOnSignUp}>Sign up</button>
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
                  <button onClick={handleTogglePopUpOnLogin}>Sign out</button>
                </nav>
              </div>
            </div>
          </div>
        </header>
      )
    }
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