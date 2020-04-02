import React from 'react';

// Components
import LogStatus from './LogStatus';

// Styles
import styles from './../sass/components/LogStatusButton.module.scss';

const LogStatusButton = (props) => {

  const state = {
    isUserLoggedIn: false
  }

  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button}> Click me to log your fight against COVID-19! </button>
    </div>
  );
}

export default LogStatusButton;