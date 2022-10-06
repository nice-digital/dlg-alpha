export interface PartialTopic {
	title: string;
	slug: string;
	type: "topic";
}

export type FeedChange = {
	completed: string;
	"change-summary": string;
};

export type FeedChanges = FeedChange[];

export type FeedMetadata = {
	"content-id"?: string;
	population?: string;
	"care-stage"?: string;
	"condition-disease"?: string;
	medicine?: string;
	services?: string;
	"service-roles"?: string;
	intervention?: string;
} & Record<string, string>;

export type DebugDITATag = "topicref" | "topichead" | "topicgroup";

export interface FeedContent {
	id: string;
	class: string;
	debugDITATag: DebugDITATag;
	title: string;
	href: string;
	"api-content": string;
	metadata: FeedMetadata;
}

export interface ProductResponse {
	$schema: string;
	assembly: TopicAssembly;
}

export interface TopicAssembly {
	type: "topic";
	title: string;
	metadata: FeedMetadata;
	content: FeedContent;
	nodes: SubTopicNode | SubTopicNode[];
}

export interface BaseNode<TClass extends string> {
	id: string;
	debugDITATag: string;
	class: TClass;
	title: string;
}

export interface SubTopicNode extends BaseNode<"subtopic"> {
	metadata: FeedMetadata;
	changes: FeedChanges;
	content: FeedContent;
	nodes: RecsPageNode | RecsPageNode[];
}

export interface RecsPageNode extends BaseNode<"recspage"> {
	content: FeedContent;
	nodes: (RecommendationConversationsGroup | RecommendationInstructionsGroup)[];
}

export const ConversationsGroupClass = "rec-conversations-group";
export interface RecommendationConversationsGroup
	extends BaseNode<typeof ConversationsGroupClass> {
	changes: FeedChanges;
	metadata: FeedMetadata;
	nodes: ConversationsHeading;
}

export interface ConversationsHeading extends BaseNode<null> {
	metadata: FeedMetadata;
	changes: FeedChanges;
	nodes: ConversationRecommendation[];
}

export const InstructionsGroupClass = "rec-instructions-group";
export interface RecommendationInstructionsGroup
	extends BaseNode<typeof InstructionsGroupClass> {
	nodes: InstructionsGroupHeading[];
}

export interface InstructionsGroupHeading extends BaseNode<null> {
	metadata: FeedMetadata;
	changes: FeedChanges;
	nodes: InstructionRecommendation | InstructionRecommendation[];
}

export type RecGroupClass =
	| typeof ConversationsGroupClass
	| typeof InstructionsGroupClass;

export interface BaseRecommendationCard<
	TRecType extends "conversation" | "instruction"
> extends BaseNode<"recommendation-card"> {
	class: "recommendation-card";
	changes: FeedChanges;
	metadata: FeedMetadata & {
		"content-id": string;
		"rec-type": TRecType;
	};
	search: { q: string };
	content: FeedContent;
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

export interface ContentResponse {
	id: string;
	url: string;
	title: string;
	outline: string;
	content: {
		mime: "application/xml";
		data: string;
	};
}
