import slugify from "@sindresorhus/slugify";
import { GetServerSideProps } from "next";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Breadcrumb, Breadcrumbs } from "@nice-digital/nds-breadcrumbs";
import { Card } from "@nice-digital/nds-card";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { getTopic } from "../../feeds/products";
import { SubTopicNode, TopicAssembly } from "../../feeds/types";
import { NextSeo } from "next-seo";
import { Link } from "../../components/Link/Link";

export interface GuidanceTopicOverviewProps {
	topic: TopicAssembly;
	topicSlug: string;
}

const SubTopicLink = ({
	subTopic,
	topicSlug,
}: {
	subTopic: SubTopicNode;
	topicSlug: string;
}) => (
	<Card
		headingElementType={"h2"}
		headingText={subTopic.content.title}
		link={{
			destination: `/guidance/${topicSlug}/${slugify(subTopic.content.title)}`,
			elementType: Link,
		}}
	>
		TODO
	</Card>
);

export default function GuidanceTopicOverviewPage({
	topic,
	topicSlug,
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

			<Grid gutter="loose">
				{Array.isArray(topic.nodes) ? (
					topic.nodes
						.filter((node) => node.class === "subtopic")
						.map((subTopic) => (
							<GridItem key={subTopic.title}>
								<SubTopicLink subTopic={subTopic} topicSlug={topicSlug} />
							</GridItem>
						))
				) : (
					<GridItem>
						<SubTopicLink subTopic={topic.nodes} topicSlug={topicSlug} />
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

	return { props: { topic, topicSlug } };
};
