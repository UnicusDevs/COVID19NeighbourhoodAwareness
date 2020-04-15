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
    <>
      <LoginPageHeader />
      <div className={styles.container}>
        <LoginForm />
        {/* <div>Forgot password?</div> */}
      </div>
    </>
  )
};

export default LoginPage;