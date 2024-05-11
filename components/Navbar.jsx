import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
	const quantity = useSelector((state) => state.cart.quantity);

	return (
		<div className={styles.container}>
			<div className={styles.item}>
				<div className={styles.callButton}>
					<Image src="/img/telephone.png" alt="" width="32" height="32" />
				</div>
				<div className={styles.texts}>
					<div className={styles.text}>Order Now!</div>
					<div className={styles.text}>(80)523-88-13</div>
				</div>
			</div>
			<div className={styles.item}>
				<ul className={styles.list}>
					<Link href="/" passHref>
						<li className={styles.listItem}>Home</li>
					</Link>
					<Link href="#pizzaList" passHref>
						<a>
							<li className={styles.listItem}>Menu</li>
						</a>
					</Link>
					<Image src="/img/logo.png" alt="" width="160px" height="69px" />
					<li className={styles.listItem}>Events</li>
					<li className={styles.listItem}>Blog</li>
					<Link href="#footer" passHref>
						<li className={styles.listItem}>Contacts</li>
					</Link>
				</ul>
			</div>
			<Link href="/cart" passHref>
				<div className={styles.item}>
					<div className={styles.cart}>
						<Image src="/img/cart.png" alt="" width="30px" height="30px" />
						<div className={styles.counter}>{quantity}</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default Navbar;
