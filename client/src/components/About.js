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
						<p>The fight against COVID-19 depends on each of us doing the right thing. But in isolation it can be hard to see or feel the good we’re doing. PROJECT NAME is designed to change that. Through the simple daily click of a button, users can let their neighbours know they’re acting to protect the community. By visiting the page, they can easily visualise, and be inspired by, the amazing and caring efforts of those around them. The only way to beat this virus is by working together. Log your fight against COVID-19 today!
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