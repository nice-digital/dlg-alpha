import Head from "next/head";
import Link from "next/link";
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
			</Head>

			<Header service="guidance" skipLinkId="content-start" />

			<Main>
				<div className="container">
					<h1>DLG Prototype</h1>
					<h2>
						<Link href="/recommendations">
							Treating early HER2-positive invasive breast cancer
						</Link>
					</h2>
					<ul>
						<li>Lorem ipsum dolor sit amet,</li>
						<li>consectetur adipiscing elit.</li>
						<li>Aenean euismod bibendum laoreet.</li>
						<li>Proin gravida dolor sit amet lacus accumsan</li>
					</ul>
				</div>
			</Main>

			<Footer />
		</>
	);
}
