import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import slugify from "@sindresorhus/slugify";
import { Breadcrumb, Breadcrumbs } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Grid, GridItem } from "@nice-digital/nds-grid";

import { Contents, type ContentsItem } from "@/components/Contents/Contents";
import { Link } from "@/components/Link/Link";
import {
	RecHorizontalNav,
	RecHorizontalNavOption,
} from "@/components/RecHorizontalNav/RecHorizontalNav";
import { getGuidanceProduct } from "@/feeds/products";
import { GuidelineAssembly, RecsPageNode, SubTopicNode } from "@/feeds/types";

export interface RecsPageEvidenceProps {
	product: GuidelineAssembly;
	subTopic: SubTopicNode;
	recsPage: RecsPageNode;
}

export default function recommendationEvidencePage({
	product,
	subTopic,
	recsPage,
}: RecsPageEvidenceProps) {
	const contentsItems: ContentsItem[] = [
		{
			title: "Why we made this recommendation",
			link: "/",
			current: true,
		},
		{
			title: "Evidence and committee discussion",
			link: "https://example.com",
		},
	];

	return (
		<>
			<NextSeo title="Evidence page"></NextSeo>

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb elementType={Link} to="/guidance">
					NICE guidance
				</Breadcrumb>
				<Breadcrumb
					elementType={Link}
					to={`/guidance/${slugify(product.title)}`}
				>
					{product.title}
				</Breadcrumb>
				<Breadcrumb
					elementType={Link}
					to={`/guidance/${slugify(product.title)}/${slugify(subTopic.title)}`}
				>
					{subTopic.title}
				</Breadcrumb>
				<Breadcrumb
					elementType={Link}
					to={`/guidance/${slugify(product.title)}/${slugify(
						subTopic.title
					)}/${slugify(recsPage.title)}`}
				>
					{recsPage.title}
				</Breadcrumb>
				<Breadcrumb>Evidence</Breadcrumb>
			</Breadcrumbs>

			<PageHeader id="content-start" heading="Evidence" lead={recsPage.title} />

			<RecHorizontalNav currentLink={RecHorizontalNavOption.Evidence} />

			<Grid gutter="loose">
				<GridItem cols={12} md={4} lg={3}>
					<Contents items={contentsItems} />
				</GridItem>
				<GridItem cols={12} md={8} lg={9}>
					<p>TODO: Evidence page content...</p>
				</GridItem>
			</Grid>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({
	params,
	res,
}) => {
	const { productSlug, subTopicSlug, recsSlug } = params;
	const product = await getGuidanceProduct(productSlug as string);

	if (!product) res.statusCode = 404;

	const subTopic = product
		? product.nodes.find((n) => slugify(n.title) === subTopicSlug)
		: null;

	if (!subTopic) res.statusCode = 404;

	const recsPage = subTopic
		? subTopic.nodes.find(
				(n) => n.class === "recspage" && slugify(n.title) === recsSlug
		  )
		: null;

	if (!recsPage) res.statusCode = 404;

	return {
		props: { product, productSlug, subTopic, subTopicSlug, recsPage, recsSlug },
	};
};
