import React from 'react';

// Components
import SignUpForm from './../components/SignUpForm';
import BackButton from './../components/BackButton';
import LoginPageHeader from './../components/LoginPageHeader';
// CSS
import styles from './../sass/pages/SignupPage.module.scss';

const SignupPage = () => {

  return (
    <>
      <div className={styles.container}>
        <LoginPageHeader /> 
        <div classNAme={styles.row}>  
          <SignUpForm />
        </div>
      </div>  
    </>
  )
};

export default SignupPage;