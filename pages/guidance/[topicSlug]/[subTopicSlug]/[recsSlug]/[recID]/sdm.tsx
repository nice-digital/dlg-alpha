import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import slugify from "@sindresorhus/slugify";
import { Breadcrumb, Breadcrumbs } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Recommendation } from "@/components/Recommendation/Recommendation";
import { Link } from "@/components/Link/Link";
import {
	RecHorizontalNav,
	RecHorizontalNavOption,
} from "@/components/RecHorizontalNav/RecHorizontalNav";
import {
	TopicAssembly,
	RecsPageNode,
	SubTopicNode,
	ContentResponse,
	RecommendationInstructionsGroup,
	InstructionsGroupHeading,
	InstructionRecommendation,
} from "@/feeds/types";
import { getTopic, getContent } from "@/feeds/products";

export interface RecsPageSDMProps {
	topic: TopicAssembly & { contentResponse: ContentResponse };
	topicSlug: string;
	subTopic: SubTopicNode;
	subTopicSlug: string;
	recsPage: RecsPageNode;
	recsSlug: string;
	recommendation: InstructionRecommendation;
}

export default function recommendationSDMPage({
	topic,
	topicSlug,
	subTopic,
	subTopicSlug,
	recsPage,
	recsSlug,
	recommendation,
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
				{/* <Breadcrumb
					elementType={Link}
					to={`/guidance/${topicSlug}/${subTopicSlug}`}
				>
					{subTopic.title}
				</Breadcrumb> */}
				<Breadcrumb
					elementType={Link}
					to={`/guidance/${topicSlug}/${subTopicSlug}/${recsSlug}`}
				>
					{recsPage.content.title}
				</Breadcrumb>
				<Breadcrumb>Shared decision making</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				heading="Shared decision making"
				lead={recsPage.content.title}
			/>

			<RecHorizontalNav currentLink={RecHorizontalNavOption.SDM} />

			<h2>Recommendation</h2>
			<Recommendation
				id={recommendation.metadata["content-id"]}
				dateUpdated={recommendation.changes[1].completed}
			>
				{topic.contentResponse.content.data}
			</Recommendation>

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
		recID = params.recID as string,
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

	// Get recommendation by reading node with metadata["content-id"] === recID
	const recInstructions = recsPage.nodes.find(
		(n) => n.class === "rec-instructions-group"
	) as RecommendationInstructionsGroup;
	const recInstructionsNodes =
		recInstructions?.nodes as InstructionsGroupHeading[];

	const instructionsGroup = recInstructionsNodes?.find((n) => {
		const node = n.nodes as InstructionRecommendation;
		if (Array.isArray(node)) {
			return node.find(
				(nestedNode) => nestedNode.metadata["content-id"] === recID
			);
		} else {
			return node.metadata["content-id"] === recID;
		}
	}) as InstructionsGroupHeading;

	if (!instructionsGroup) return { notFound: true };

	const recommendation: InstructionRecommendation = Array.isArray(
		instructionsGroup.nodes
	)
		? instructionsGroup.nodes[0]
		: instructionsGroup.nodes;

	// Get href (guid) from node's content.href, call getContent with that href
	const contentResponse = await getContent(recommendation.content.href);
	if (!contentResponse) return { notFound: true };

	return {
		props: {
			topic: {
				...topic,
				contentResponse,
			},
			topicSlug,
			subTopic,
			subTopicSlug,
			recsPage,
			recsSlug,
			recommendation,
		},
	};
};
