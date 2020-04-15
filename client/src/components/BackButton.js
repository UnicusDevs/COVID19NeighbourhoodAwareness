import React from 'react';
import {Link} from "react-router-dom";

// CSS
import styles from './../sass/components/BackButton.module.scss';

const BackButton = () => {
  return (
    <div className={styles.buttonContainer}>
      <Link to={"/"}><button>Back</button></Link>
    </div>
  )
};

export default BackButton;