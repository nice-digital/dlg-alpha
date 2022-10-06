import { type FC } from "react";
import { RecommendationInstructionsGroup } from "../../feeds/types";
import { Recommendation } from "../Recommendation/Recommendation";

export interface InstructionsRecGroupProps {
	recGroup: RecommendationInstructionsGroup;
}

export const InstructionsRecGroup: FC<InstructionsRecGroupProps> = ({
	recGroup: { title, nodes },
}) => {
	return (
		<section>
			<h2>{title}</h2>

			{nodes.map((node) => (
				<section key={node.id}>
					<h2>{node.title}</h2>

					{Array.isArray(node.nodes) ? (
						node.nodes.map((rec, i) => (
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
						))
					) : (
						<Recommendation
							id={node.nodes.metadata["content-id"]}
							dateUpdated={node.nodes.changes[0].completed}
							evidenceLink={true}
							updateLink={true}
							sdmLink={true}
						>
							{JSON.stringify(node.nodes, null, 2)}
						</Recommendation>
					)}
				</section>
			))}
			{/* 
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
			))} */}
		</section>
	);
};
