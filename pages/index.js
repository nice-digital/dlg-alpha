import Head from "next/head";
import { Header, Footer, Main } from "@nice-digital/global-nav";

import styles from "../styles/Home.module.scss";

export default function Home() {
	return (
		<>
			<Head>
				<title>DLG Alpha</title>
				<meta
					name="description"
					content="Prototype front end build for Digital Living Guidelines"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header service="guidance" skipLinkId="content-start" />

			<Main>
				<div className="container">
					<h1>DLG Prototype</h1>
					<p className={styles.intro}>Under construction!</p>
				</div>
			</Main>

			<Footer />
		</>
	);
}
