"use client";

import Bananas from "./bananas";
import styles from "./bananas.module.css";

export default function LandingScene() {
	return (
		<div className="relative w-full h-screen overflow-hidden">
			<div className="absolute inset-0">
				<Bananas />
			</div>

			<div className={styles.goldenWash} />
		</div>
	);
}
