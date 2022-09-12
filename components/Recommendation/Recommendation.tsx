import Link from "next/link";
import { type FC, type ReactNode } from "react";
import styles from "./Recommendation.module.scss";

export interface RecommendationProps {
	children: ReactNode;
	id: string;
	dateUpdated: string;
	evidenceLink?: string;
	updateLink?: string;
	sdmLink?: string;
}

export const Recommendation: FC<RecommendationProps> = ({
	children,
	id,
	dateUpdated,
	evidenceLink,
	updateLink,
	sdmLink,
}) => {
	return (
		<div className={styles.recommendation}>
			<div className={styles.id}>{id}</div>
			<div className={styles.updated}>
				Updated: <time>{dateUpdated}</time>
			</div>
			<div className={styles.description}>{children}</div>
			{(evidenceLink || updateLink || sdmLink) && (
				<ul className={styles.linkList}>
					{evidenceLink && (
						<li>
							<Link href={evidenceLink}>Evidence</Link>
						</li>
					)}
					{updateLink && (
						<li>
							<Link href={updateLink}>Update information</Link>
						</li>
					)}
					{sdmLink && (
						<li>
							<Link href={sdmLink}>Shared decision making</Link>
						</li>
					)}
				</ul>
			)}
		</div>
	);
};
