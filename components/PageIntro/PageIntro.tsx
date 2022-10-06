import { type FC, type ReactNode } from "react";

import styles from "./PageIntro.module.scss";

export interface PageIntroProps {
	children: string;
}

export const PageIntro: FC<PageIntroProps> = ({ children }) => {
	return (
		<div
			className={styles.intro}
			dangerouslySetInnerHTML={{ __html: children }}
		/>
	);
};
