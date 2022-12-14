import { ErrorPageContent } from "../components/ErrorPageContent/ErrorPageContent";

export default function FourOhFourPage(): JSX.Element {
	return (
		<ErrorPageContent
			title="Page not found"
			heading="We can't find this&nbsp;page"
			lead="It's probably been moved, updated or&nbsp;deleted."
		/>
	);
}
