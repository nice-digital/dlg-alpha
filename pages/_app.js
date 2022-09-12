import "../styles/globals.scss";
import { Header, Footer, Main } from "@nice-digital/global-nav";
import { GuidanceWarning } from "../components/GuidanceWarning/GuidanceWarning";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Header service="guidance" skipLinkId="content-start" />
			<GuidanceWarning />
			<Main withPadding={false}>
				<Component {...pageProps} />
			</Main>
			<Footer />
		</>
	);
}

export default MyApp;
