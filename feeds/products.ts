import { type TopicAssembly, type PartialTopic } from "./types";
import topic from "./__data__/topic.json";

export const getAllGuidanceTopics = async (): Promise<PartialTopic[]> => [
	{
		title: "Breast cancer",
		slug: "breast-cancer",
		type: "topic",
	},
];

export const getTopic = async (slug: string): Promise<TopicAssembly | null> =>
	slug === "breast-cancer" ? (topic.assembly as TopicAssembly) : null;
