import React from 'react';

// SASS
import styles from './../sass/components/LogStatus.module.scss';

const LogStatus = (props) => {
  return (
    <div className={styles.logStatus}>
      <div className={styles.imageContainer} >
        <img src={props.imageURL} className={styles.image} alt="Avatar" /> 
      </div>
      <div className={styles.textContainer}>
        <p> Your neighbour {props.firstName} self-isolated today! </p>
        <div>
          <ul className={styles.subContentContainer}> 
            <li> {props.date} </li>
            <li> • </li>
            <li> {props.suburb} </li>
          </ul>
        </div>   
      </div>
      <div className={styles.claps}>
        <li> <span role="img">👏</span> + {props.claps} </li>
      </div>
    </div>
  );
};

export default LogStatus;