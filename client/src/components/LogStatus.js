import React, {useState, useEffect} from 'react';
import moment from 'moment';

// Redux 
import {connect} from 'react-redux';

// API
import {addClapsToPost} from './../api/handlePost';
import {getUserData} from './../api/getUserData';

// SASS
import styles from './../sass/components/LogStatus.module.scss';

// Other 
import ProfileImageDefault from './../assets/icons8-name-96.png';

const LogStatus = (props) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [createdAt, setCreatedAt] = useState("");
  const [count, setCount] = useState(0);
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function fetchAPI() {
      const id = props.user;
      await getUserData(id).then((response) => {
        const {FirstName, LastName, Age, ImageURL } = response.data;
        setFirstName(FirstName);
        setLastName(LastName);
        setAge(Age);
        setCount(props.claps);
        setImage(ImageURL);
      }).catch((err) => {
        console.log(err)
      })
    };

    fetchAPI()
  }, [props.user, props.claps ]);
 
  const handleClaps = (event) => {
    const postId = props.postId;
    setCount(count + 1)
    return addClapsToPost(postId);
  };

  const handleProfileImage = () => {
    if (!image) {
      return <img src={ProfileImageDefault} className={styles.image} alt="Avatar" /> 
    } else if (image) {
      return <img src={image} className={styles.image} alt="Avatar" />
    }
  };

  return (
    <div className={styles.logStatus}>
      <div className={styles.imageContainer} >
        {handleProfileImage()}
      </div>
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
        <li onClick={handleClaps}><span role="img">👏</span> + {count} </li>
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