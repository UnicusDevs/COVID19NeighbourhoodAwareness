import React from 'react';
import Feed from './../components/Feed';
import styles from '../sass/components/About.module.scss';

const About = (props) => {
	return (
		<div className={styles.about}>
			<div className={styles.container}>
				<div className={styles.row}>
					<div className={styles.left}>
						<p className={styles.title}>Stay apart. Remain united</p>
						<p>The fight against COVID-19 depends on each of us doing the right thing. However, in isolation it can be hard to see or feel the good we’re doing. Home2Home is designed to change that. <span className={styles.br}> </span>Through the simple daily click of a button, you can let your neighbours know you're acting to protect the community. Home2Home will help you to visualise and be inspired by the amazing efforts of people around you. The only way to beat this virus is by working together. Log your fight against COVID-19 today!
						</p>
					</div>
					<div className={styles.right}>
						<Feed />
					</div>
				</div>
			</div>
		</div>
	)
}

export default About;