import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
	return (
		<div className={styles.container} id="footer">
			<div className={styles.item}>
				<Image src="/img/bg.png" objectFit="cover" layout="fill" alt="" />
			</div>
			<div className={styles.item}>
				<div className={styles.card}>
					<h2 className={styles.motto}>Very yammy pizza</h2>
				</div>
				<div className={styles.card}>
					<h1 className={styles.title}>Restaraunts</h1>
					<p className={styles.text}>
						Держинского 45
						<br /> Гродно
						<br /> (33) 333-33-33
					</p>
					<p className={styles.text}>
						Держинского 45
						<br /> Гродно
						<br /> (33) 333-33-33
					</p>
					<p className={styles.text}>
						Держинского 45
						<br /> Гродно
						<br /> (33) 333-33-33
					</p>
					<p className={styles.text}>
						Держинского 45
						<br /> Гродно
						<br /> (33) 333-33-33
					</p>
				</div>
				<div className={styles.card}>
					<h1 className={styles.title}>Workd hours</h1>
					<p className={styles.text}>
						Monday - Friday
						<br /> 9:00 – 22:00
					</p>
					<p className={styles.text}>
						Saturday - Sunday
						<br /> 12:00 – 24:00
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
