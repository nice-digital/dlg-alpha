import slugify from "@sindresorhus/slugify";
import { GetServerSideProps } from "next";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Breadcrumb, Breadcrumbs } from "@nice-digital/nds-breadcrumbs";
import { ErrorPageContent } from "../../../../components/ErrorPageContent/ErrorPageContent";
import { getTopic } from "../../../../feeds/products";
import {
	TopicAssembly,
	RecsPageNode,
	SubTopicNode,
	RecGroupClass,
} from "../../../../feeds/types";
import { NextSeo } from "next-seo";
import { ElementType } from "react";
import { ConversationsRecGroup } from "../../../../components/ConversationsRecGroup/ConversationsRecGroup";
import { InstructionsRecGroup } from "../../../../components/InstructionsRecGroup/InstructionsRecGroup";
import { Link } from "../../../../components/Link/Link";

const RecGroupComponents: Record<RecGroupClass, ElementType> = {
	"rec-conversations-group": ConversationsRecGroup,
	"rec-instructions-group": InstructionsRecGroup,
};

export interface GuidanceRecsPageProps {
	topic: TopicAssembly;
	topicSlug: string;
	subTopic: SubTopicNode;
	subTopicSlug: string;
	recsPage: RecsPageNode;
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
	return (
		<>
			<NextSeo title={recsPage.title} />

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
					{subTopic.content.title}
				</Breadcrumb>
				<Breadcrumb>{recsPage.content.title}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				preheading={subTopic.content.title}
				heading={recsPage.content.title}
			/>

			{recsPage.nodes.map((recGroup) => {
				const RecGroupComponent = RecGroupComponents[recGroup.class];

				return <RecGroupComponent key={recGroup.title} recGroup={recGroup} />;
			})}
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
