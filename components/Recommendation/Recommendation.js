import Link from "next/link";
import styles from "./Recommendation.module.scss";

export const Recommendation = () => {
	return (
		<div className={styles.recommendation}>
			<div className={styles.id}>NG101-1.8.4</div>
			<div className={styles.updated}>
				Updated: <time>18 July 2018</time>
			</div>
			<div className={styles.description}>
				<p>
					Offer adjuvant trastuzumab if the person has early HER2-positive
					invasive breast cancer and a tumour that is larger than 1 cm (T1c and
					above).
				</p>
			</div>
			<ul className={styles.linkList}>
				<li>
					<Link href="/">Evidence</Link>
				</li>
				<li>
					<Link href="/">Update information</Link>
				</li>
				<li>
					<Link href="/">Shared decision making</Link>
				</li>
			</ul>
		</div>
	);
};
