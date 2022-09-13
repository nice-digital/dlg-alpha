import slugify from "@sindresorhus/slugify";
import { GetServerSideProps } from "next";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Breadcrumb, Breadcrumbs } from "@nice-digital/nds-breadcrumbs";
import { ErrorPageContent } from "../../../../components/ErrorPageContent/ErrorPageContent";
import { getGuidanceProduct } from "../../../../feeds/products";
import {
	GuidelineAssembly,
	RecsPageNode,
	SubTopicNode,
	RecGroupClass,
} from "../../../../feeds/types";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { ElementType } from "react";
import { ConversationsRecGroup } from "../../../../components/ConversationsRecGroup/ConversationsRecGroup";
import { InstructionsRecGroup } from "../../../../components/InstructionsRecGroup/InstructionsRecGroup";

const RecGroupComponents: Record<RecGroupClass, ElementType> = {
	"rec-conversations-group": ConversationsRecGroup,
	"rec-instructions-group": InstructionsRecGroup,
};

export interface GuidanceProductOverviewProps {
	product: GuidelineAssembly;
	productSlug: string;
	subTopic: SubTopicNode;
	subTopicSlug: string;
	recsPage: RecsPageNode;
	recsSlug: string;
}

export default function GuidanceProductOverviewPage({
	product,
	productSlug,
	subTopic,
	subTopicSlug,
	recsPage,
	recsSlug,
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

	if (!recsPage)
		return (
			<ErrorPageContent
				heading="Recommendations page not found"
				title="Recommendations page not found"
			/>
		);

	return (
		<>
			<NextSeo title={recsPage.title} />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/guidance">NICE guidance</Breadcrumb>
				<Breadcrumb to={`/guidance/${slugify(product.title)}`}>
					{product.title}
				</Breadcrumb>
				<Breadcrumb
					to={`/guidance/${slugify(product.title)}/${slugify(subTopic.title)}`}
				>
					{subTopic.title}
				</Breadcrumb>
				<Breadcrumb>{recsPage.title}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader heading={recsPage.title} preheading={subTopic.title} />

			{recsPage.nodes.map((recGroup) => {
				const RecGroupComponent = RecGroupComponents[recGroup.class];

				return <RecGroupComponent key={recGroup.title} recGroup={recGroup} />;
			})}
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
