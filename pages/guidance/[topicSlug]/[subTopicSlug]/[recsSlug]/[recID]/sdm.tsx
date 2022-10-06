import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import slugify from "@sindresorhus/slugify";
import { Breadcrumb, Breadcrumbs } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Link } from "@/components/Link/Link";
import {
	RecHorizontalNav,
	RecHorizontalNavOption,
} from "@/components/RecHorizontalNav/RecHorizontalNav";
import { TopicAssembly, RecsPageNode, SubTopicNode } from "@/feeds/types";
import { getTopic } from "@/feeds/products";

export interface RecsPageSDMProps {
	topic: TopicAssembly;
	topicSlug: string;
	subTopic: SubTopicNode;
	subTopicSlug: string;
	recsPage: RecsPageNode;
	recsSlug: string;
}

export default function recommendationSDMPage({
	topic,
	topicSlug,
	subTopic,
	subTopicSlug,
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
				<Breadcrumb elementType={Link} to={`/guidance/${topicSlug}`}>
					{topic.content.title}
				</Breadcrumb>
				<Breadcrumb
					elementType={Link}
					to={`/guidance/${topicSlug}/${subTopicSlug}`}
				>
					{subTopic.title}
				</Breadcrumb>
				<Breadcrumb
					elementType={Link}
					to={`/guidance/${topicSlug}/${subTopicSlug}/${slugify(
						recsPage.title
					)}`}
				>
					{recsPage.title}
				</Breadcrumb>
				<Breadcrumb>Shared decision making</Breadcrumb>
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

export const getServerSideProps: GetServerSideProps<RecsPageSDMProps> = async ({
	params,
	res,
}) => {
	const topicSlug = params.topicSlug as string,
		subTopicSlug = params.subTopicSlug as string,
		recsSlug = params.recsSlug as string,
		topic = await getTopic(topicSlug);

	if (!topic) return { notFound: true };

	const subTopics = Array.isArray(topic.nodes) ? topic.nodes : [topic.nodes],
		subTopic = subTopics.find(
			(node) => slugify(node.content.title) === subTopicSlug
		);

	if (!subTopic) return { notFound: true };

	const recsPages = Array.isArray(subTopic.nodes)
		? subTopic.nodes
		: [subTopic.nodes];

	const recsPage = recsPages.find((n) => slugify(n.content.title) === recsSlug);

	if (!recsPage) return { notFound: true };

	return {
		props: {
			topic,
			topicSlug,
			subTopic,
			subTopicSlug,
			recsPage,
			recsSlug,
		},
	};
};
