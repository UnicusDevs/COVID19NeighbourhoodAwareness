import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

// CSS
import styles from './../sass/components/LoginPageHeader.module.scss';

const LoginPageHeader = (props) => {
	
	const renderLoginOrSignup = () => {
		if (window.location.pathname === "/signup")
			return (
				<nav>
					<p>Already have an account?</p>
					<Link to={"/login"}>Log in now</Link>
				</nav>
			)
		else if (window.location.pathname === "/login") {
			return (
				<nav>
					<p>Not a member?</p>
					<Link to={"/signup"}>Sign up now</Link>
				</nav>
			);
		}
	}

  return (
		<header>
			<div className={styles.container}>
				<div className={styles.innercontainer}>
					<div className={styles.logo}>
						<Link to={"/"}>Back</Link>
					</div>
					<div className={styles.navigation}>
						{renderLoginOrSignup()}
          </div>
				</div>
			</div>
		</header>
  )
};

export default LoginPageHeader;