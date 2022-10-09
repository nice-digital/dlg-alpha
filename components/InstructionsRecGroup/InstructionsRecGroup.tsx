import { type FC } from "react";
import {
	ContentResponse,
	InstructionRecommendation,
	RecommendationInstructionsGroup,
} from "../../feeds/types";
import { Recommendation } from "../Recommendation/Recommendation";

export interface InstructionsRecGroupProps {
	recGroup: RecommendationInstructionsGroup;
	recContents: ContentResponse[];
}

export const InstructionsRecGroup: FC<InstructionsRecGroupProps> = ({
	recGroup: { title, nodes },
	recContents,
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
								dateUpdated={rec.changes[1].completed}
								evidenceLink={true}
								updateLink={true}
								sdmLink={true}
							>
								<div
									dangerouslySetInnerHTML={{
										__html:
											recContents.find((r) => r.id === rec.content.href)
												?.content?.data || "Missing content",
									}}
								/>
							</Recommendation>
						))
					) : (
						<Recommendation
							id={node.nodes.metadata["content-id"]}
							dateUpdated={node.nodes.changes[1].completed}
							evidenceLink={true}
							updateLink={true}
							sdmLink={true}
						>
							<div
								dangerouslySetInnerHTML={{
									__html: recContents.find(
										(r) =>
											r.id ===
											(node.nodes as InstructionRecommendation).content.href
									).content.data,
								}}
							/>
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
