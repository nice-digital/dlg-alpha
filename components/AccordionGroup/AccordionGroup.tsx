import { type ReactNode, type FC } from "react";

import styles from "./AccordionGroup.module.scss";

export interface AccordionGroupProps {
	children: ReactNode;
	title: ReactNode;
}

export const AccordionGroup: FC<AccordionGroupProps> = ({
	title,
	children,
}) => {
	return (
		<section className={styles.wrapper}>
			<h2 className={styles.heading}>{title}</h2>
			{children}
		</section>
	);
};
