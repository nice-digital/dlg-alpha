import { type GuidelineAssembly, type PartialProduct } from "./types";
import product from "./__data__/indexed-assmebly.json";

export const getAllGuidanceProducts = async (): Promise<PartialProduct[]> => [
	{
		title: "TOPIC Breast Cancer",
		slug: "topic-breast-cancer",
		type: "guideline",
	},
];

export const getGuidanceProduct = async (
	slug: string
): Promise<GuidelineAssembly | null> =>
	slug === "topic-breast-cancer"
		? (product.assembly as GuidelineAssembly)
		: null;
