import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import slugify from "@sindresorhus/slugify";
import { Breadcrumb, Breadcrumbs } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Grid, GridItem } from "@nice-digital/nds-grid";

import { Contents, type ContentsItem } from "@/components/Contents/Contents";
import { Link } from "@/components/Link/Link";
import { Recommendation } from "@/components/Recommendation/Recommendation";
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

export interface RecsPageEvidenceProps {
	topic: TopicAssembly & { contentResponse: ContentResponse };
	topicSlug: string;
	subTopic: SubTopicNode;
	subTopicSlug: string;
	recsPage: RecsPageNode;
	recsSlug: string;
	recommendation: InstructionRecommendation;
}

export default function recommendationEvidencePage({
	topic,
	topicSlug,
	subTopic,
	subTopicSlug,
	recsPage,
	recsSlug,
	recommendation,
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
				<Breadcrumb>Evidence</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				heading="Evidence"
				lead={recsPage.content.title}
			/>

			<RecHorizontalNav currentLink={RecHorizontalNavOption.Evidence} />

			<Grid gutter="loose">
				<GridItem cols={12} md={4} lg={3}>
					<Contents items={contentsItems} />
				</GridItem>
				<GridItem cols={12} md={8} lg={9}>
					<h2>Recommendation</h2>
					<Recommendation
						id={recommendation.metadata["content-id"]}
						dateUpdated={recommendation.changes[1].completed}
					>
						{topic.contentResponse.content.data}
					</Recommendation>
					<p>TODO: Evidence page content...</p>
				</GridItem>
			</Grid>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<
	RecsPageEvidenceProps
> = async ({ params, res }) => {
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
		return node.metadata["content-id"] === recID;
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
