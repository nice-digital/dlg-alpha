import Head from "next/head";
import Link from "next/link";
import { Header, Footer, Main } from "@nice-digital/global-nav";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";

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
					<Breadcrumbs>
						<Breadcrumb>Overview</Breadcrumb>
					</Breadcrumbs>

					<h1>Breast Cancer</h1>
					<p className="lead">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
						euismod bibendum laoreet. Proin gravida dolor sit amet lacus
						accumsan
					</p>
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
