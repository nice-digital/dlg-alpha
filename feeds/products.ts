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

export const getAllGuidanceTopics = async (): Promise<PartialTopic[]> => [
	{
		title: "Breast cancer",
		slug: "breast-cancer",
		type: "topic",
	},
];

export const getTopic = async (slug: string): Promise<TopicAssembly | null> =>
	slug === "breast-cancer" ? (topic.assembly as TopicAssembly) : null;

export const getContent = async (
	contentGuid: string
): Promise<ContentResponse | null> => {
	const filePath = path.join(contentAPIMockFilesDir, contentGuid);

	return (await fs.pathExists(filePath)) ? fs.readJson(filePath) : null;
};
