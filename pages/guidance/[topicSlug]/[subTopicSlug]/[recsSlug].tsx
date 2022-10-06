import slugify from "@sindresorhus/slugify";
import { GetServerSideProps } from "next";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Breadcrumb, Breadcrumbs } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { getContent, getTopic } from "@/feeds/products";
import {
	TopicAssembly,
	RecsPageNode,
	SubTopicNode,
	RecGroupClass,
	ContentResponse,
} from "@/feeds/types";
import { NextSeo } from "next-seo";
import { ElementType } from "react";
import { ConversationsRecGroup } from "@/components/ConversationsRecGroup/ConversationsRecGroup";
import { InstructionsRecGroup } from "@/components/InstructionsRecGroup/InstructionsRecGroup";
import { Link } from "@/components/Link/Link";
import { Contents, type ContentsItem } from "@/components/Contents/Contents";
import { PageIntro } from "@/components/PageIntro/PageIntro";

const RecGroupComponents: Record<RecGroupClass, ElementType> = {
	"rec-conversations-group": ConversationsRecGroup,
	"rec-instructions-group": InstructionsRecGroup,
};

export interface GuidanceRecsPageProps {
	topic: TopicAssembly;
	topicSlug: string;
	subTopic: SubTopicNode;
	subTopicSlug: string;
	recsPage: RecsPageNode & { contentResponse: ContentResponse };
	recsSlug: string;
}

export default function GuidanceRecsPage({
	topic,
	topicSlug,
	subTopic,
	subTopicSlug,
	recsPage,
	recsSlug,
}: GuidanceRecsPageProps) {
	const mapRecsPageNodeToContentItem = (
		recsPageNode: RecsPageNode
	): ContentsItem => ({
		title: recsPageNode.content.title,
		link: "#",
		current: recsPageNode.title === recsPage.title,
	});

	const contentsItems: ContentsItem[] = Array.isArray(subTopic.nodes)
		? subTopic.nodes.map(mapRecsPageNodeToContentItem)
		: [mapRecsPageNodeToContentItem(subTopic.nodes)];

	return (
		<>
			<NextSeo title={recsPage.content.title + " | " + topic.content.title} />

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
					{subTopic.content.title}
				</Breadcrumb> */}
				<Breadcrumb>{recsPage.content.title}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				preheading={topic.content.title}
				heading={subTopic.content.title}
			/>

			<Grid gutter="loose">
				<GridItem cols={12} md={4} lg={3}>
					<Contents items={contentsItems} />
				</GridItem>
				<GridItem cols={12} md={8} lg={9}>
					<h2>{recsPage.content.title}</h2>

					<PageIntro>{recsPage.contentResponse.content.data}</PageIntro>

					{recsPage.nodes.map((recGroup) => {
						const RecGroupComponent = RecGroupComponents[recGroup.class];

						return (
							<RecGroupComponent key={recGroup.title} recGroup={recGroup} />
						);
					})}
				</GridItem>
			</Grid>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<
	GuidanceRecsPageProps
> = async ({ params, res }) => {
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

	// Second request to get the recs page intro body because of how the API is structured
	const contentResponse = await getContent(recsPage.content.href);

	if (!contentResponse) return { notFound: true };

	return {
		props: {
			topic,
			topicSlug,
			subTopic,
			subTopicSlug,
			recsPage: {
				...recsPage,
				contentResponse,
			},
			recsSlug,
		},
	};
};
