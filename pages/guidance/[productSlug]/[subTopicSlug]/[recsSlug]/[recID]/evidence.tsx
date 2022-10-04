import { NextSeo } from "next-seo";
import { Breadcrumb, Breadcrumbs } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Link } from "../../../../../../components/Link/Link";
import {
	RecHorizontalNav,
	RecHorizontalNavOption,
} from "../../../../../../components/RecHorizontalNav/RecHorizontalNav";

export default function recommendationEvidencePage() {
	return (
		<>
			<NextSeo title="Evidence page"></NextSeo>

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb elementType={Link} to="/guidance">
					NICE guidance
				</Breadcrumb>
				<Breadcrumb>TODO: Evidence breadcrumbs</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				heading="Evidence"
				lead="TODO: Adjuvant trastuzumab for early HER2-positive breast cancer with T1c and above tumours"
			/>

			<RecHorizontalNav
				id="SomeID"
				currentLink={RecHorizontalNavOption.Evidence}
			/>

			<p>TODO: Evidence page content...</p>
		</>
	);
}
