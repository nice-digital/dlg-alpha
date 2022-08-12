import Head from "next/head";

import styles from "../styles/Home.module.scss";

export default function Home() {
	return (
		<div className="container container--full">
			<Head>
				<title>DLG Alpha</title>
				<meta
					name="description"
					content="Prototype front end build for Digital Living Guidelines"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1>DLG Prototype</h1>
				<p className={styles.intro}>Under construction!</p>
			</main>
		</div>
	);
}
