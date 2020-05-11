import React, {useState, useEffect} from 'react';
import jwt from 'jsonwebtoken'

// Redux
import {connect} from 'react-redux';

// Actions
import { setCurrentUser } from './../redux/actions/userActions';

// API Calls
import { getCurrentUser } from './../api/getUserData';
const UserProfileForm = props => {

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    
    let userId = '';

    await getCurrentUser().then((response) => {
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

// Below calls dispatch with redux store. 
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (userData) => dispatch(setCurrentUser(userData)),
  }
};


function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileForm);