import { type FC, type ReactNode } from "react";
import {
	ContentResponse,
	RecommendationConversationsGroup,
} from "../../feeds/types";
import { Accordion } from "../Accordion/Accordion";
import { AccordionGroup } from "../AccordionGroup/AccordionGroup";

export interface ConversationsRecGroupProps {
	recGroup: RecommendationConversationsGroup;
	recContents: ContentResponse[];
}

export const ConversationsRecGroup: FC<ConversationsRecGroupProps> = ({
	recGroup: { nodes },
	recContents,
}) => {
	return (
		<AccordionGroup title={nodes.title}>
			{nodes.nodes.map((rec, i) => {
				const recContent = recContents.find((r) => r.id === rec.content.href);

				return (
					<Accordion key={i} title={rec.content.title}>
						<div
							dangerouslySetInnerHTML={{ __html: recContent.content.data }}
						/>
					</Accordion>
				);
			})}
		</AccordionGroup>
	);
};
