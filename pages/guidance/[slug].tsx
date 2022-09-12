import { GetServerSideProps } from "next";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Breadcrumb, Breadcrumbs } from "@nice-digital/nds-breadcrumbs";
import { ErrorPageContent } from "../../components/ErrorPageContent/ErrorPageContent";
import { getGuidanceProduct } from "../../feeds/products";
import { GuidelineAssembly } from "../../feeds/types";
import Link from "next/link";
import { NextSeo } from "next-seo";

export interface GuidanceProductOverviewProps {
	product: GuidelineAssembly;
	slug: string;
}

export default function GuidanceProductOverviewPage({
	product,
	slug,
}: GuidanceProductOverviewProps) {
	if (!product)
		return (
			<ErrorPageContent
				heading="Guidance not found"
				title="Guidance not found"
			/>
		);

	return (
		<>
			<NextSeo title={product.title} />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/guidance">NICE guidance</Breadcrumb>
				<Breadcrumb>{product.title}</Breadcrumb>
			</Breadcrumbs>
			<PageHeader heading={product.title} />

			<h2>Sub topics</h2>

			{product.nodes
				.filter((node) => node.class === "subtopic")
				.map((subtopic) => (
					<p key={subtopic.title}>
						<Link href={`/guidance/${slug}/${subtopic.title}`}>
							<a>{subtopic.title}</a>
						</Link>
					</p>
				))}
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({
	params,
	res,
}) => {
	const { slug } = params;
	const product = await getGuidanceProduct(slug as string);

	if (!product) res.statusCode = 404;

	return { props: { product, slug } };
};
