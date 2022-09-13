import { type ReactNode, type FC } from "react";

import styles from "./Accordion.module.scss";

export interface AccordionProps {
	children: ReactNode;
	title: ReactNode;
}

export const Accordion: FC<AccordionProps> = ({ title, children }) => {
	return (
		<details className={styles.details}>
			<summary className={styles.summary}>{title}</summary>
			{children}
		</details>
	);
};
