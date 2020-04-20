import React from 'react';

// Components
import SignUpForm from './../components/SignUpForm';
import SecondaryHeader from './../components/SecondaryHeader';
// CSS
import styles from './../sass/pages/SignupPage.module.scss';

const SignupPage = () => {

  return (
    <>
      <SecondaryHeader />
      <div className={styles.container}> 
        <SignUpForm />
      </div>  
    </>  
  )
};

export default SignupPage;