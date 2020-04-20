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
						<div className={styles.videoLinkText}>
							<p>Fun fact: this project was inspired by the ABC's 7.30 Report. <a target="_blank" href="https://www.youtube.com/watch?v=dJ1l5pGbFw0" alt="7.30 report video about how to stop the spread of covid-19">Watch the video here.</a></p>
						</div>
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