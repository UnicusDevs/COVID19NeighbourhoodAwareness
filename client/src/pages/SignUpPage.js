import React from 'react';

// Components
import SignUpForm from './../components/SignUpForm';
import BackButton from './../components/BackButton';

// CSS
import styles from './../sass/pages/SignupPage.module.scss';

const SignupPage = () => {

  return (
    <div className={styles.signUpPageContainer}> 
      <div className={styles.leftSideContainer}>   
        <div className={styles.wording}>
          <BackButton />
          <ol>
            <li> Stay   </li>
            <li> Apar<span className={styles.individualLetter}>t</span></li>
            <li> Rema<span className={styles.individualLetter}>in</span></li>
            <li> United </li>
          </ol>
        </div>
      </div>

      <div className={styles.rightSideContainer}>
        <h3> Signup </h3>
        <SignUpForm />
      </div>

    </div>
  )
};

export default SignupPage;