import React from 'react';


// Components
import LoginForm from './../components/LoginForm';
import SecondaryHeader from './../components/SecondaryHeader';

// CSS
import styles from './../sass/pages/LoginPage.module.scss';

const LoginPage = () => {

  return (
    <>
      <SecondaryHeader />
      <div className={styles.container}>
        <LoginForm />
      </div>
    </>
  )
};

export default LoginPage;