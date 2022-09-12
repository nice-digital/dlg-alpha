export interface PartialProduct {
	title: string;
	slug: string;
	type: "guideline";
}

export type FeedChanges = null;

export type FeedMetadata = Record<string, string>;

export interface ProductResponse {
	$schema: string;
	assembly: GuidelineAssembly;
}

export interface GuidelineAssembly {
	type: "guideline";
	title: string;
	changes: FeedChanges;
	metadata: FeedMetadata;
	nodes: SubTopicNode[];
}

export interface BaseNode<TClass extends string> {
	class: TClass;
	title: string;
}

export interface SubTopicNode extends BaseNode<"subtopic"> {
	changes: FeedChanges;
	metadata: FeedMetadata;
	nodes: (SubTopicNode | RecsPageNode)[];
}

export interface RecsPageNode extends BaseNode<"recspage"> {
	content: unknown;
}
