import axios from "axios";

import {
	type TopicAssembly,
	type PartialTopic,
	ContentResponse,
} from "./types";

const apiRoot = "https://dlg-alpha-sample-feed.s3.eu-west-1.amazonaws.com";

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
		let assembly: TopicAssembly = null;
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
