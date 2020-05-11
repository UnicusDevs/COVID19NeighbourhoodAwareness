import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import jwt from 'jsonwebtoken'

// Redux
import { connect } from 'react-redux';

// API Calls
import { getUserData } from './../api/getUserData';

const UserProfileForm = props => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const userName = firstName + ' ' + lastName;

  let paramsId = useParams();

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {

    let userId = '';
  
    await getUserData(paramsId.id).then((response) => {
      userId = response.data.id;
      const data = response.data;
      jwt.decode(response.config.headers.Authorization);
      console.log(response.data)
      setFirstName(data.FirstName);
      setLastName(data.LastName);
      setAge(data.Age);
      setImageURL(data.ImageURL);
    })
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <img src={imageURL} />
          </div>
          <h1> {userName} </h1>
          <h3> {age} </h3>
        </div>
      </div>
    </div>
  )
};


function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser
  }
};

export default connect(mapStateToProps)(UserProfileForm);