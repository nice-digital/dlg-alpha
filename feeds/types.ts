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
	nodes: (RecommendationConversationsGroup | RecommendationInstructionsGroup)[];
}

export const ConversationsGroupClass = "rec-conversations-group";
export interface RecommendationConversationsGroup
	extends BaseNode<typeof ConversationsGroupClass> {
	changes: FeedChanges;
	metadata: FeedMetadata;
	content: {
		recommendations: ConversationRecommendation[];
	};
}

export const InstructionsGroupClass = "rec-instructions-group";
export interface RecommendationInstructionsGroup
	extends BaseNode<typeof InstructionsGroupClass> {
	content: {
		recommendations: InstructionRecommendation[];
	};
}

export type RecGroupClass =
	| typeof ConversationsGroupClass
	| typeof InstructionsGroupClass;

export interface BaseRecommendationCard<
	TRecType extends "conversation" | "instruction"
> {
	class: "recommendation-card";
	changes: null;
	metadata: FeedMetadata & {
		"content-id": string;
		"rec-type": TRecType;
	};
	content: { "": null };
}

export type ConversationRecommendation = BaseRecommendationCard<"conversation">;

export interface InstructionRecommendation
	extends BaseRecommendationCard<"instruction"> {
	nodes: (EvidenceGroup | ServiceUserInformation)[];
}

export interface EvidenceGroup {
	class: "rec-evidence-group";
	title: string;
}

export interface ServiceUserInformation {
	class: "rec-service-user-info-group";
	title: string;
	content: unknown;
}
