import slugify from "@sindresorhus/slugify";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { Breadcrumb, Breadcrumbs } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Link } from "@/components/Link/Link";
import { getGuidanceProduct } from "@/feeds/products";
import { GuidelineAssembly, RecsPageNode, SubTopicNode } from "@/feeds/types";
import {
	RecHorizontalNav,
	RecHorizontalNavOption,
} from "@/components/RecHorizontalNav/RecHorizontalNav";

export interface RecsPageSDMProps {
	product: GuidelineAssembly;
	subTopic: SubTopicNode;
	recsPage: RecsPageNode;
}

export default function recommendationSDMPage({
	product,
	subTopic,
	recsPage,
}: RecsPageSDMProps) {
	return (
		<>
			<NextSeo title="SDM page"></NextSeo>

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

			<PageHeader
				id="content-start"
				heading="Shared decision making"
				lead={recsPage.title}
			/>

			<RecHorizontalNav currentLink={RecHorizontalNavOption.SDM} />

			<p>TODO: Shared Decision Making page content...</p>
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
