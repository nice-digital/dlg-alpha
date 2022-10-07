import fs from "fs-extra";
import path from "path";
import {
	type TopicAssembly,
	type PartialTopic,
	ContentResponse,
} from "./types";
import topic from "./../public/sample-feed-data/topic.json";

const contentAPIMockFilesDir = path.join(
	process.cwd(),
	"public",
	"sample-feed-data",
	"content-api"
);

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
export const getTopic = async (slug: string): Promise<TopicAssembly | null> =>
	slug === "breast-cancer" ? (topic.assembly as TopicAssembly) : null;

/**
 * Requests content from the Content API with the given guid id
 *
 * @param contentGuid The guid ID of the content to request
 * @returns A promise that resolves with the content response, or null if the content doesn't exist
 */
export const getContent = async (
	contentGuid: string
): Promise<ContentResponse | null> => {
	// We're mocking the content API here from a bunch of static JSON files
	const filePath = path.join(contentAPIMockFilesDir, contentGuid);

	return (await fs.pathExists(filePath)) ? fs.readJson(filePath) : null;
};
