import { type FC } from "react";
import Link from "next/link";

import styles from "./Contents.module.scss";

export interface ContentsItem {
	title: string;
	link: string;
	current?: boolean;
}

export interface ContentsProps {
	items: ContentsItem[];
}

export const Contents: FC<ContentsProps> = ({ items }) => {
	return (
		<>
			<h2 className={styles.heading}>Contents</h2>
			<nav aria-label="Contents">
				<ul className={styles.list}>
					{items.map(({ title, link, current }) => {
						return (
							<li className={current ? styles.current : null} key={title}>
								<Link href={link}>{title}</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</>
	);
};
