import React, {useState, useEffect} from 'react';
import moment from 'moment';
// API
import axiosAPI from './../api/baseURL';

// SASS
import styles from './../sass/components/LogStatus.module.scss';

const LogStatus = (props) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    async function fetchAPI() {
      const id = props.user;
      await axiosAPI.get(`/user/${id}`).then((response) => {
        const {FirstName, LastName, Age } = response.data;
        
        setFirstName(FirstName);
        setLastName(LastName);
        setAge(Age);

      }).catch((err) => {
        console.log(err)
      })
    };

    fetchAPI()
  }, []);
  
  return (
    <div className={styles.logStatus}>
      {/* <div className={styles.imageContainer} >
        <img src={props.imageURL} className={styles.image} alt="Avatar" /> 
      </div> */}
      <div className={styles.textContainer}>
        <p> Your neighbour {firstName} self-isolated today! </p>
        <div>
          <ul className={styles.subContentContainer}> 
            <li> {moment(new Date(props.createdAt)).calendar()} </li>
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