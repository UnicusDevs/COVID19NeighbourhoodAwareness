import React from 'react';

// Styles
import styles from './../sass/components/LogStatusButton.module.scss';

const LogStatusButton = (props) => {

  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button}> Click me to log your fight against COVID-19! </button>
    </div>
  );
}

export default LogStatusButton;