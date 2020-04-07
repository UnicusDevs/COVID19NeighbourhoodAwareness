import React from "react"
import { Link } from 'react-router-dom';
import styles from '../sass/components/Header.module.scss';

<<<<<<< HEAD
const Header = () => (
  <header>
    <div className={styles.container}>
      <div className={styles.innercontainer}>
        <div className={styles.logo}>
          <Link to="/">LOGO</Link>
        </div>
        <div className={styles.navigation}>
          <nav>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
            <Link to="/about">About</Link>
          </nav>
        </div>
      </div>
    </div>
  </header>
)

export default Header;
=======
// Redux 
import { connect } from 'react-redux';
import { togglePopUpOn } from "./../redux/actions/popUpActions";

// Component
import SignUpModule from './SignUpModule';

const Header = (props) => {

  const handleTogglePopUpOn = () => {
    props.togglePopUpOn()
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
              <Link to="/login">Log in</Link>
              <button onClick={handleTogglePopUpOn}>Sign up</button>
              <Link to="/about">About</Link>
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
    togglePopUpOn: () => dispatch(togglePopUpOn()),
  }
};



export default connect(null, mapDispatchToProps)(Header);
>>>>>>> 9e91760d66397ac21fd791019340f3446c2b0737
