import Link from "next/link";
import { useRouter } from "next/router";
import { type FC, type ReactNode } from "react";
import styles from "./Recommendation.module.scss";
import { formatDate } from "@/utils/dates";

export interface RecommendationProps {
	children: ReactNode;
	id: string;
	dateUpdated: string;
	evidenceLink?: boolean;
	updateLink?: boolean;
	sdmLink?: boolean;
}

export const Recommendation: FC<RecommendationProps> = ({
	children,
	id,
	dateUpdated,
	evidenceLink,
	updateLink,
	sdmLink,
}) => {
	const router = useRouter();

	return (
		<div className={styles.recommendation}>
			<div className={styles.id}>{id}</div>
			<div className={styles.updated}>
				Updated: <time>{formatDate(dateUpdated, true)}</time>
			</div>
			<div className={styles.description}>{children}</div>
			{(evidenceLink || updateLink || sdmLink) && (
				<ul className={styles.linkList}>
					{evidenceLink && (
						<li>
							<Link href={`${router.asPath}/${id}/evidence`}>Evidence</Link>
						</li>
					)}
					{updateLink && (
						<li>
							<Link href={`${router.asPath}/${id}/updates`}>
								Update information
							</Link>
						</li>
					)}
					{sdmLink && (
						<li>
							<Link href={`${router.asPath}/${id}/sdm`}>
								Shared decision making
							</Link>
						</li>
					)}
				</ul>
			)}
		</div>
	);
};
