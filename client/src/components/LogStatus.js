import React, {useState, useEffect} from 'react';
import moment from 'moment';

// Redux 
import {connect} from 'react-redux';

// API
import {addClapsToPost} from './../api/handlePost';
import {getUserData} from './../api/getUserData';

// SASS
import styles from './../sass/components/LogStatus.module.scss';

const LogStatus = (props) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [createdAt, setCreatedAt] = useState("");
  const [count, setCount] = useState(0)

  useEffect(() => {
    async function fetchAPI() {
      const id = props.user;
      await getUserData(id).then((response) => {
        const {FirstName, LastName, Age } = response.data;
        
        setFirstName(FirstName);
        setLastName(LastName);
        setAge(Age);
        setCount(props.claps)

      }).catch((err) => {
        console.log(err)
      })
    };

    fetchAPI()
  }, []);
 
  const handleClaps = (event) => {
    const postId = props.postId;
    setCount(count + 1)
    return addClapsToPost(postId);
  };

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
        <li> <span role="img" onClick={handleClaps}>👏</span> + {count} </li>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser
  };
};

export default connect(mapStateToProps)(LogStatus);