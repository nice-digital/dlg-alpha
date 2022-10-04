import { type FC } from "react";
import { RecommendationInstructionsGroup } from "../../feeds/types";
import { Recommendation } from "../Recommendation/Recommendation";

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
				<Recommendation
					key={i}
					id={rec.metadata["content-id"]}
					dateUpdated={rec.changes[0].completed}
					evidenceLink={true}
					updateLink={true}
					sdmLink={true}
				>
					{JSON.stringify(rec, null, 2)}
				</Recommendation>
			))}
		</section>
	);
};
