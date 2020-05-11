import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import jwt from 'jsonwebtoken'

// Redux
import {connect} from 'react-redux';

// API Calls
import { getUserData } from './../api/getUserData';


const UserProfileForm = props => {

  let paramsId = useParams();

  useEffect(() => {
    onLoad();
  }, []);
  
  
  async function onLoad() {
    
    let userId = '';
  
    await getUserData(paramsId.id).then((response) => {
      userId = response.data.id;
      jwt.decode(response.config.headers.Authorization);
      console.log(response.data)
      setFirstName(response.data.FirstName);
      setLastName(response.data.LastName);
    })
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const userName = firstName + ' ' + lastName;

  const handleOnChangeFirstName = (event) => {
    const value = event.target.value;
    setFirstName(value);
  };

  return (
    <form>
      <div>
        <div>
          <h1> {userName} </h1>
        </div>

        <div>
          <div>
            <label> First Name </label>
          </div>

          <input 
            name="firstName"
            value={firstName}
            type="text"
            onChange={handleOnChangeFirstName}
          />
        </div>
      </div>
    </form>
  )
};


function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser
  }
};

export default connect(mapStateToProps)(UserProfileForm);