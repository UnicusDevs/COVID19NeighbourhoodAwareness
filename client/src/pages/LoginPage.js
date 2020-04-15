import React from 'react';

// Components
import Header from './../components/Header';
import LoginForm from './../components/LoginForm';
import BackButton from './../components/BackButton';
import LoginPageHeader from './../components/LoginPageHeader';

// CSS
import styles from './../sass/pages/LoginPage.module.scss';

const LoginPage = () => {

  return (
    <div className={styles.logInBody}>
      <LoginPageHeader />
      <div className={styles.container}>
        <LoginForm />
      </div>
    </div>
  )
};

export default LoginPage;