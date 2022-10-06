import slugify from "@sindresorhus/slugify";
import { GetServerSideProps } from "next";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Breadcrumb, Breadcrumbs } from "@nice-digital/nds-breadcrumbs";
import { Card } from "@nice-digital/nds-card";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { getTopic } from "@/feeds/products";
import { TopicAssembly, SubTopicNode, RecsPageNode } from "@/feeds/types";
import { NextSeo } from "next-seo";
import { Link } from "@/components/Link/Link";

const RecsPageLink = ({
	recsPage,
	subTopicSlug,
	topicSlug,
}: {
	recsPage: RecsPageNode;
	subTopicSlug: string;
	topicSlug: string;
}) => (
	<Card
		headingElementType={"h2"}
		headingText={recsPage.content.title}
		link={{
			destination: `/guidance/${topicSlug}/${subTopicSlug}/${slugify(
				recsPage.content.title
			)}`,
			elementType: Link,
		}}
	>
		TODO
	</Card>
);

export interface GuidanceSubTopicPageProps {
	topic: TopicAssembly;
	topicSlug: string;
	subTopic: SubTopicNode;
	subTopicSlug: string;
}

export default function GuidanceSubTopicPage({
	topic,
	topicSlug,
	subTopic,
	subTopicSlug,
}: GuidanceSubTopicPageProps) {
	return (
		<>
			<NextSeo title={subTopic.title} />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb elementType={Link} to="/guidance">
					NICE guidance
				</Breadcrumb>
				<Breadcrumb
					elementType={Link}
					to={`/guidance/${slugify(topic.content.title)}`}
				>
					{topic.content.title}
				</Breadcrumb>
				<Breadcrumb>{subTopic.content.title}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				preheading={topic.content.title}
				heading={subTopic.content.title}
			/>

			<Grid gutter="loose">
				{Array.isArray(subTopic.nodes) ? (
					subTopic.nodes
						.filter((node) => node.class === "recspage")
						.map((recsPage) => (
							<GridItem key={recsPage.title}>
								<RecsPageLink
									recsPage={recsPage}
									subTopicSlug={subTopicSlug}
									topicSlug={topicSlug}
								/>
							</GridItem>
						))
				) : (
					<GridItem>
						<RecsPageLink
							recsPage={subTopic.nodes}
							subTopicSlug={subTopicSlug}
							topicSlug={topicSlug}
						/>
					</GridItem>
				)}
			</Grid>

			{/* {subTopic.nodes
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
				))} */}
		</>
	);
}

export const getServerSideProps: GetServerSideProps<
	GuidanceSubTopicPageProps
> = async ({ params }) => {
	const topicSlug = params.topicSlug as string,
		subTopicSlug = params.subTopicSlug as string,
		topic = await getTopic(topicSlug);

	if (!topic) return { notFound: true };

	const subTopics = Array.isArray(topic.nodes) ? topic.nodes : [topic.nodes];

	const subTopic = subTopics.find(
		(node) => slugify(node.content.title) === subTopicSlug
	);

	if (!subTopic) return { notFound: true };

	return { props: { topic, topicSlug, subTopic, subTopicSlug } };
};
