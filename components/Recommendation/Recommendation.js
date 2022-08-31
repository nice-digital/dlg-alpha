import Link from "next/link";
import styles from "./Recommendation.module.scss";

export const Recommendation = () => {
	return (
		<div className={styles.recommendation}>
			<span>NG101-1.8.4</span>
			<span>Updated: 18 July 2018</span>
			<p>
				Offer adjuvant trastuzumab if the person has early HER2-positive
				invasive breast cancer and a tumour that is larger than 1 cm (T1c and
				above).
			</p>
			<ul>
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
