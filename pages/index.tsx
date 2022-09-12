import Link from "next/link";

export default function Home() {
	return (
		<h1>
			Try going to{" "}
			<Link href="/guidance">
				<a>/guidance</a>
			</Link>
		</h1>
	);
}
