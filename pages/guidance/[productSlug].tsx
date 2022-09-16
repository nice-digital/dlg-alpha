import slugify from "@sindresorhus/slugify";
import { GetServerSideProps } from "next";
import { PageHeader } from "@nice-digital/nds-page-header";
import { Breadcrumb, Breadcrumbs } from "@nice-digital/nds-breadcrumbs";
import { ErrorPageContent } from "../../components/ErrorPageContent/ErrorPageContent";
import { getGuidanceProduct } from "../../feeds/products";
import { GuidelineAssembly } from "../../feeds/types";
import { NextSeo } from "next-seo";
import { Link } from "../../components/Link/Link";

export interface GuidanceProductOverviewProps {
	product: GuidelineAssembly;
	productSlug: string;
}

export default function GuidanceProductOverviewPage({
	product,
	productSlug,
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
				<Breadcrumb elementType={Link} to="/guidance">
					NICE guidance
				</Breadcrumb>
				<Breadcrumb>{product.title}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader id="content-start" heading={product.title} />

			<h2>Sub topics</h2>

			{product.nodes
				.filter((node) => node.class === "subtopic")
				.map((subtopic) => (
					<p key={subtopic.title}>
						<Link href={`/guidance/${productSlug}/${slugify(subtopic.title)}`}>
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
	const { productSlug } = params;
	const product = await getGuidanceProduct(productSlug as string);

	if (!product) res.statusCode = 404;

	return { props: { product, productSlug } };
};
