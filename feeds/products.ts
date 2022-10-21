import axios from "axios";

import {
	type TopicAssembly,
	type PartialTopic,
	ContentResponse,
} from "./types";

const apiRoot = "https://dlg-alpha-sample-feed.s3.eu-west-1.amazonaws.com";
const baseUrl = "https://sandbox.congility.net/NotusCloudApi";
let authToken: string | null = null;

// Get an auth token back from the Congility API
const authenticate = async () => {
	const credentials = `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`;

	await axios
		.post(
			`${baseUrl}/v3/login?fallback=true&silo=nice`,
			{},
			{
				headers: {
					Authorization: `Basic ${Buffer.from(credentials).toString("base64")}`,
				},
			}
		)
		.then((response) => {
			if (response?.data?.authenticated === true) {
				authToken = response?.data?.skey;
				console.log("Success: auth token is", authToken);
			} else {
				console.log("Auth failure:", response);
			}
		})
		.catch((error) => {
			console.log("Auth error:", error);
		});
};

/**
 * Gets a list of the available guidance topics
 *
 * @returns A promise that resolves with a list of all the available guidance topics
 */
export const getAllGuidanceTopics = async (): Promise<PartialTopic[]> => [
	{
		title: "Breast cancer",
		slug: "breast-cancer",
		type: "topic",
	},
];

/**
 * Gets a full topic assembly, from the given topic slug.
 *
 * @param slug The slug (slugified title) of the topic to retrieve
 * @returns A promise that resolve with the full topic assembly if it exists, otherwise a promise that resolves to null
 */
export const getTopic = async (slug: string): Promise<TopicAssembly | null> => {
	if (slug === "breast-cancer") {
		// Authenticate first
		await authenticate();

		// Now get the publication outline
		let assembly: TopicAssembly = null;
		const publicationGuid = "d71345ff-7469-4fef-918b-02afe7db51f6"; // Let's just hard-code for now

		await axios
			.get(`${baseUrl}/v3/publication/${publicationGuid}/outline`, {
				headers: {
					skey: authToken,
				},
				params: {
					format: "pubSource",
					formatTransform: "map2assembly-v3",
				},
			})
			.then((response) => {
				console.log("Got the outline:", response.data);
				let testAssembly: TopicAssembly = response.data.content.data.assembly;
				console.log({ testAssembly });
			})
			.catch((error) => {
				console.log("Error getting outline:", error);
			});

		// Local temp request - to be replaced by API call
		await axios(`${apiRoot}/topic.json`)
			.then((response) => {
				assembly = response.data.assembly;
			})
			.catch((error) => {
				console.log("Error fetching data:", error);
				assembly = null;
			});

		return assembly;
	} else {
		return null;
	}
};

/**
 * Requests content from the Content API with the given guid id
 *
 * @param contentGuid The guid ID of the content to request
 * @returns A promise that resolves with the content response, or null if the content doesn't exist
 */
export const getContent = async (
	contentGuid: string
): Promise<ContentResponse | null> => {
	let contentResponse: ContentResponse = null;

	await axios(`${apiRoot}/v3/content/${contentGuid}`)
		.then((response) => {
			contentResponse = response.data;
		})
		.catch((error) => {
			console.log("Error fetching content:", error);
			contentResponse = null;
		});

	return contentResponse;
};
