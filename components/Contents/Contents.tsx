import { type FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Contents.module.scss";

export interface ContentsItem {
	title: string;
	link: string;
}

export interface ContentsProps {
	items: ContentsItem[];
}

export const Contents: FC<ContentsProps> = ({ items }) => {
	const router = useRouter(),
		path = router.asPath;

	return (
		<>
			<h2 className={styles.heading}>Contents</h2>
			<nav aria-label="Contents">
				<ul className={styles.list}>
					{items.map(({ title, link }) => {
						return (
							<li className={link === path ? styles.current : null} key={title}>
								<Link href={link}>{title}</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</>
	);
};
