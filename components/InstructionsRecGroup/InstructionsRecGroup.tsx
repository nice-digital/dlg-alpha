import { type FC } from "react";
import { RecommendationInstructionsGroup } from "../../feeds/types";

export interface InstructionsRecGroupProps {
	recGroup: RecommendationInstructionsGroup;
}

export const InstructionsRecGroup: FC<InstructionsRecGroupProps> = ({
	recGroup: { title, content },
}) => {
	return (
		<section>
			<h2>{title}</h2>

			{content.recommendations.map((rec, i) => (
				<p key={i}>rec</p>
			))}
		</section>
	);
};
