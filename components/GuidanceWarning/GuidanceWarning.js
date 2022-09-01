import styles from "./GuidanceWarning.module.scss";

export const GuidanceWarning = () => (
	<div className={styles.guidanceWarning}>
		<div className="container">
			This content does not replace NICE’s current breast cancer guidance. It
			has not gone through NICE’s quality assurance processes and is not
			suitable for use in clinical practice.{" "}
			<a href="#">
				After exploring the prototype, please complete our feedback survey
			</a>
		</div>
	</div>
);
