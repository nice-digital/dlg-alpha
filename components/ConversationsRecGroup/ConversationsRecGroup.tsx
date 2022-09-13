import { type FC, type ReactNode } from "react";
import { RecommendationConversationsGroup } from "../../feeds/types";
import { Accordion } from "../Accordion/Accordion";
import { AccordionGroup } from "../AccordionGroup/AccordionGroup";

export interface ConversationsRecGroupProps {
	recGroup: RecommendationConversationsGroup;
}

export const ConversationsRecGroup: FC<ConversationsRecGroupProps> = ({
	recGroup: { title, content },
}) => {
	return (
		<AccordionGroup title={title}>
			{content.recommendations.map((rec, i) => (
				<Accordion key={i} title={`Rec ${i}`}>
					<code>{JSON.stringify(rec, null, 2)}</code>
				</Accordion>
			))}
		</AccordionGroup>
	);
};
