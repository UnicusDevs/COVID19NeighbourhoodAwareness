import React from 'react';

// Components
import LoginForm from './../components/LoginForm';
import BackButton from './../components/BackButton';

// CSS
import styles from './../sass/pages/LoginPage.module.scss';

const LoginPage = () => {

  return (
    <div className={styles.LoginPageContainer}>
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
        <div className={styles.loginComponentContainer}>
          <h3> Login </h3>
          <h3> Fight COVID-19 as a community</h3>
          <LoginForm />
        </div>
      </div>
    </div>
  )
};

export default LoginPage;