import React from 'react';
import {connect} from 'react-redux';

// Components
import UserProfile from './../components/UserProfile';
import Header from './../components/Header';
import BackButton from './../components/BackButton';
import UserProfileFeed from './../components/UserProfileFeed';

// Styles
import styles from './../sass/components/About.module.scss';

const ProfilePage = (props) => {
  return (
    <>
      <div>
        <BackButton />
        <h1> Profile Page </h1>
        <UserProfile />
        <div className={styles.right}>
          <UserProfileFeed />
        </div>
      </div>
    </>
  )
};

export default ProfilePage;
