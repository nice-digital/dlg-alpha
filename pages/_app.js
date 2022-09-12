import "../styles/globals.scss";
import { DefaultSeo } from "next-seo";
import { Header, Footer, Main } from "@nice-digital/global-nav";
import { Container } from "@nice-digital/nds-container";
import { GuidanceWarning } from "../components/GuidanceWarning/GuidanceWarning";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<DefaultSeo titleTemplate="%s | NICE" />
			<Header service="guidance" skipLinkId="content-start" />
			<GuidanceWarning />
			<Main withPadding={false}>
				<Container>
					<Component {...pageProps} />
				</Container>
			</Main>
			<Footer />
		</>
	);
}

export default MyApp;
