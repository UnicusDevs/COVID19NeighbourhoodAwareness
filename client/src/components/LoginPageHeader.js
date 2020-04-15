import React from 'react';
import {Link} from "react-router-dom";

// CSS
import styles from './../sass/components/LoginPageHeader.module.scss';

const LoginPageHeader = () => {
  return (
		<header>
			<div className={styles.container}>
				<div className={styles.innercontainer}>
					<div className={styles.logo}>
						<Link to={"/"}></Link>
					</div>
					<div className={styles.navigation}>
						<nav>
							<p>Not a member?</p>
							<Link to={"/signup"}>Sign up now</Link>
						</nav>
          </div>
				</div>
			</div>
		</header>
  )
};

export default LoginPageHeader;