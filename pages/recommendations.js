import Head from "next/head";
import Link from "next/link";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";

import { Recommendation } from "../components/Recommendation/Recommendation";

export default function Recommendations() {
	return (
		<>
			<Head>
				<title>Recommendations | DLG Alpha</title>
				<meta
					name="description"
					content="Prototype front end build for Digital Living Guidelines"
				/>
			</Head>

			<div className="container">
				<Breadcrumbs>
					<Breadcrumb to="/">Overview</Breadcrumb>
					<Breadcrumb>Recommendations</Breadcrumb>
				</Breadcrumbs>

				<h1>Treating early HER2-positive invasive breast cancer</h1>

				<Grid gutter="loose">
					<GridItem cols={12} md={4} lg={3}>
						Menu here!
					</GridItem>
					<GridItem cols={12} md={8} lg={9}>
						<h2>When to offer adjuvant trastuzumab</h2>

						<h3>For tumours that are T1c and above</h3>
						<Recommendation
							id="NG101-1.8.4"
							dateUpdated="18 July 2022"
							evidenceLink="/evidence"
							updateLink="/update"
							sdmLink="/sdm"
						>
							<p>
								Offer adjuvant trastuzumab if the person has early HER2-positive
								invasive breast cancer and a tumour that is larger than 1 cm
								(T1c and above).
							</p>
						</Recommendation>

						<h3>For tumours that are T1a or T1b</h3>
						<Recommendation id="NG101-1.8.5" dateUpdated="19 July 2022">
							<p>A very simple recommendation with no additional links</p>
						</Recommendation>
					</GridItem>
				</Grid>
			</div>
		</>
	);
}
