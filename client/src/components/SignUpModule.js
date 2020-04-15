import React from 'react';
import SignUpForm from './SignUpForm';

// CSS
import styles from './../sass/components/SignUpModal.module.scss';

let SignUpModule = props => {
  return (
    <div className={styles.signUpModule}> 
      <SignUpForm />
    </div>
  )
};

export default SignUpModule;