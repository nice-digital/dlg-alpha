import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { ColumnList } from "@nice-digital/nds-column-list";
import { PageHeader } from "@nice-digital/nds-page-header";
import { GetServerSideProps } from "next";
import { getAllGuidanceProducts } from "../../feeds/products";
import { PartialProduct } from "../../feeds/types";
import Link from "next/link";
import { NextSeo } from "next-seo";

export interface GuidanceIndexPageProps {
	products: PartialProduct[];
}

export default function GuidanceIndexPage({
	products,
}: GuidanceIndexPageProps): JSX.Element {
	return (
		<>
			<NextSeo title="NICE guidance" />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb>NICE guidance</Breadcrumb>
			</Breadcrumbs>

			<PageHeader heading="NICE guidance" id="content-start" />

			<h2>All guidance products</h2>

			<ColumnList>
				{products.map((p) => (
					<li key={p.title}>
						<Link href={`/guidance/${p.slug}`}>
							<a>{p.title}</a>
						</Link>
					</li>
				))}
			</ColumnList>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	const products = await getAllGuidanceProducts();

	return { props: { products } };
};
