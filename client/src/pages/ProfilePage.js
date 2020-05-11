import React from 'react';
import {connect} from 'react-redux';

// Components
import UserProfileForm from './../components/UserProfileForm';
import Header from './../components/Header';

// CSS


const ProfilePage = (props) => {
  return (
    <>
      <div>
        <button> Back </button>
        <h1> Profile Page </h1>
        <UserProfileForm />
      </div>
    </>
  )
};

export default ProfilePage;
