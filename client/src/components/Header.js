import React from "react"
import { Link } from 'react-router-dom';
import styles from '../sass/components/Header.module.scss';

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