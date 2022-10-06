import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { ColumnList } from "@nice-digital/nds-column-list";
import { PageHeader } from "@nice-digital/nds-page-header";
import { GetServerSideProps } from "next";
import { getAllGuidanceTopics } from "../../feeds/products";
import { PartialTopic } from "../../feeds/types";
import Link from "next/link";
import { NextSeo } from "next-seo";

export interface GuidanceIndexPageProps {
	topics: PartialTopic[];
}

export default function GuidanceIndexPage({
	topics,
}: GuidanceIndexPageProps): JSX.Element {
	return (
		<>
			<NextSeo title="NICE guidance" />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb>NICE guidance</Breadcrumb>
			</Breadcrumbs>

			<PageHeader id="content-start" heading="NICE guidance" />

			<h2>Guidance topics</h2>

			<ColumnList>
				{topics.map((topic) => (
					<li key={topic.title}>
						<Link href={`/guidance/${topic.slug}`}>
							<a>{topic.title}</a>
						</Link>
					</li>
				))}
			</ColumnList>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<
	GuidanceIndexPageProps
> = async () => {
	const topics = await getAllGuidanceTopics();

	return { props: { topics } };
};
