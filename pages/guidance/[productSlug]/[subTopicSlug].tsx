import slugify from "@sindresorhus/slugify";
import { GetServerSideProps } from "next";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Breadcrumb, Breadcrumbs } from "@nice-digital/nds-breadcrumbs";
import { ErrorPageContent } from "../../../components/ErrorPageContent/ErrorPageContent";
import { getGuidanceProduct } from "../../../feeds/products";
import { GuidelineAssembly, SubTopicNode } from "../../../feeds/types";
import Link from "next/link";
import { NextSeo } from "next-seo";

export interface GuidanceProductOverviewProps {
	product: GuidelineAssembly;
	productSlug: string;
	subTopic: SubTopicNode;
	subTopicSlug: string;
}

export default function GuidanceProductOverviewPage({
	product,
	productSlug,
	subTopic,
	subTopicSlug,
}: GuidanceProductOverviewProps) {
	if (!product)
		return (
			<ErrorPageContent
				heading="Guidance not found"
				title="Guidance not found"
			/>
		);

	if (!subTopic)
		return (
			<ErrorPageContent heading="Topic not found" title="Topic not found" />
		);

	return (
		<>
			<NextSeo title={product.title} />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/guidance">NICE guidance</Breadcrumb>
				<Breadcrumb to={`/guidance/${slugify(product.title)}`}>
					{product.title}
				</Breadcrumb>
				<Breadcrumb>{subTopic.title}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader heading={subTopic.title} preheading={product.title} />

			<h2>Recs pages</h2>

			{subTopic.nodes
				.filter((node) => node.class === "recspage")
				.map((recsPage) => (
					<p key={recsPage.title}>
						<Link
							href={`/guidance/${productSlug}/${subTopicSlug}/${slugify(
								recsPage.title
							)}`}
						>
							<a>{recsPage.title}</a>
						</Link>
					</p>
				))}
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({
	params,
	res,
}) => {
	const { productSlug, subTopicSlug } = params;
	const product = await getGuidanceProduct(productSlug as string);

	if (!product) res.statusCode = 404;

	const subTopic = product
		? product.nodes.find((n) => slugify(n.title) === subTopicSlug)
		: null;

	if (!subTopic) res.statusCode = 404;

	return { props: { product, productSlug, subTopic, subTopicSlug } };
};
