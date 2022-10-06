import slugify from "@sindresorhus/slugify";
import { GetServerSideProps } from "next";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Breadcrumb, Breadcrumbs } from "@nice-digital/nds-breadcrumbs";
import { Card } from "@nice-digital/nds-card";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { getContent, getTopic } from "@/feeds/products";
import { ContentResponse, SubTopicNode, TopicAssembly } from "@/feeds/types";
import { NextSeo } from "next-seo";
import { Link } from "@/components/Link/Link";

export interface GuidanceTopicOverviewProps {
	topic: TopicAssembly;
	topicSlug: string;
	content: ContentResponse;
	subTopicContentResponses: ContentResponse[];
}

const SubTopicLink = ({
	subTopic,
	topicSlug,
	intro,
}: {
	subTopic: SubTopicNode;
	topicSlug: string;
	intro: string;
}) => (
	<Card
		headingElementType={"h2"}
		headingText={subTopic.content.title}
		link={{
			destination: `/guidance/${topicSlug}/${slugify(subTopic.content.title)}`,
			elementType: Link,
		}}
	>
		<div dangerouslySetInnerHTML={{ __html: intro }} />
	</Card>
);

export default function GuidanceTopicOverviewPage({
	topic,
	topicSlug,
	content,
	subTopicContentResponses,
}: GuidanceTopicOverviewProps) {
	return (
		<>
			<NextSeo title={topic.content.title} />
			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb elementType={Link} to="/guidance">
					NICE guidance
				</Breadcrumb>
				<Breadcrumb>{topic.content.title}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader id="content-start" heading={topic.content.title} />

			<div dangerouslySetInnerHTML={{ __html: content.content.data }}></div>

			<Grid gutter="loose">
				{Array.isArray(topic.nodes) ? (
					topic.nodes
						.filter((node) => node.class === "subtopic")
						.map((subTopic) => (
							<GridItem key={subTopic.title}>
								<SubTopicLink
									subTopic={subTopic}
									topicSlug={topicSlug}
									intro={
										subTopicContentResponses.find(
											(c) => c.id === subTopic.content.href
										).content.data
									}
								/>
							</GridItem>
						))
				) : (
					<GridItem>
						<SubTopicLink
							subTopic={topic.nodes}
							topicSlug={topicSlug}
							intro={
								subTopicContentResponses.find(
									(c) => c.id === topic.nodes.content.href
								).content.data
							}
						/>
					</GridItem>
				)}
			</Grid>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<
	GuidanceTopicOverviewProps
> = async ({ params }) => {
	const topicSlug = params.topicSlug as string,
		topic = await getTopic(topicSlug as string);

	if (!topic) return { notFound: true };

	// Second request to get the topic intro body because of how the API is structured
	const content = await getContent(topic.content.href);

	if (!content) return { notFound: true };

	const contentPromises = Array.isArray(topic.nodes)
		? topic.nodes.map((node) => getContent(node.content.href))
		: [getContent(topic.nodes.content.href)];

	const subTopicContentResponses = await Promise.all(contentPromises);

	return { props: { topic, topicSlug, content, subTopicContentResponses } };
};
