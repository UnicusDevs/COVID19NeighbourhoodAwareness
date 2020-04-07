import React from "react"
import { Link } from 'react-router-dom';
import styles from '../sass/components/Header.module.scss';

// Redux 
import { connect } from 'react-redux';
import { togglePopUpOnSignUp, togglePopUpOnLogin, togglePopUpOffLogin, togglePopUpOffSignUp } from "./../redux/actions/popUpActions";

const Header = (props) => {

  const handleTogglePopUpOnSignUp = () => {
    props.togglePopUpOffLogin()
    props.togglePopUpOnSignUp()
  };

  const handleTogglePopUpOnLogin = () => {
    props.togglePopUpOffSignUp()
    props.togglePopUpOnLogin()
  };

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.innercontainer}>
          <div className={styles.logo}>
            <Link to="/">LOGO</Link>
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
};

// Below calls dispatch with redux store. 
const mapDispatchToProps = (dispatch) => {
  return {
    togglePopUpOnSignUp: () => dispatch(togglePopUpOnSignUp()),
    togglePopUpOffSignUp: () => dispatch(togglePopUpOffSignUp()),
    togglePopUpOnLogin: () => dispatch(togglePopUpOnLogin()),
    togglePopUpOffLogin: () => dispatch(togglePopUpOffLogin())
  }
};

export default connect(null, mapDispatchToProps)(Header);