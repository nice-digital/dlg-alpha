import Head from "next/head";
import Link from "next/link";
import { Header, Footer, Main } from "@nice-digital/global-nav";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";

export default function Home() {
	return (
		<>
			<Head>
				<title>Evidence | DLG Alpha</title>
				<meta
					name="description"
					content="Prototype front end build for Digital Living Guidelines"
				/>
			</Head>

			<Header service="guidance" skipLinkId="content-start" />

			<Main>
				<div className="container">
					<Breadcrumbs>
						<Breadcrumb to="/">Overview</Breadcrumb>
						<Breadcrumb to="/recommendations">Recommendations</Breadcrumb>
						<Breadcrumb>Evidence</Breadcrumb>
					</Breadcrumbs>

					<h1>Evidence</h1>
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