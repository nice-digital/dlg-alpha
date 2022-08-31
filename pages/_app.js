import "../styles/globals.scss";
import { Header, Footer, Main } from "@nice-digital/global-nav";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Header service="guidance" skipLinkId="content-start" />
			<Main>
				<Component {...pageProps} />
			</Main>
			<Footer />
		</>
	);
}

export default MyApp;
