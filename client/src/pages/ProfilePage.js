import React from 'react';
import {connect} from 'react-redux';

// Components
import UserProfileForm from './../components/UserProfileForm';
import Header from './../components/Header';
import BackButton from './../components/BackButton';
import Feed from './../components/Feed';

// Styles
import styles from './../sass/components/About.module.scss';

const ProfilePage = (props) => {
  return (
    <>
      <div>
        <BackButton />
        <h1> Profile Page </h1>
        <UserProfileForm />
        <div className={styles.right}>
          <Feed />
        </div>
      </div>
    </>
  )
};

export default ProfilePage;
