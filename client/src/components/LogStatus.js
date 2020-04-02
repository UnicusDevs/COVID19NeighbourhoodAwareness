import React from 'react';

// SASS
import styles from './../sass/components/LogStatus.module.scss';

const LogStatus = (props) => {

  console.log(props)
  return (
    <div className={styles.logStatus}>
      <div className={styles.imageContainer} >
        <img src={props.imageURL} className={styles.image} alt="Avatar" /> 
      </div>
      <div className={styles.textContainer}>
        <p> Your neighbour {props.firstName} self-isolated today! </p>
        <div>
          <ul className={styles.subContentContainer}> 
            <ol> {props.date} </ol>
            <ol> • </ol>
            <ol> {props.suburb} </ol>
            <ol> 👏 + {props.claps} </ol>
          </ul>
        </div> 
      </div>
    </div>
  );
};

export default LogStatus;