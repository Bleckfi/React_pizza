import axios from "axios";
import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import reset from "../redux/cartSlice";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useState } from "react";
const Cart = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [active, setActive] = useState(false);
	const router = useRouter();
	const createOrder = async () => {
		try {
			const res = await axios.post("http://localhost:3000/api/orders", {
				custumer: name,
				address: address,
				total: cart.total,
				status: 0,
				method: 0,
				email: email,
			});
			if (res.status === 201) {
				router.push("/orders/" + res.data._id);
				dispatch(reset());
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className={styles.container}>
			<div
				className={active ? styles.active : styles.modal}
				onClick={() => {
					setActive(!active);
					enablePageScroll();
				}}>
				<form className={styles.form} onClick={(e) => e.stopPropagation()}>
					<div className={styles.inputs}>
						<label htmlFor="">Name: </label>
						<input onChange={(e) => setName(e.target.value)} type="text" />
						<label htmlFor="address">Address: </label>
						<input onChange={(e) => setAddress(e.target.value)} type="text" />
						<label htmlFor="address">Email: </label>
						<input onChange={(e) => setEmail(e.target.value)} type="email" />
						<button
							className={styles.button_conf}
							type="submit"
							onClick={(e) => {
								e.preventDefault();
								createOrder();
							}}>
							Confirm
						</button>
					</div>
				</form>
			</div>
			<div className={styles.left}>
				<table className={styles.table}>
					<thead>
						<tr className={styles.trTitle}>
							<th>Product</th>
							<th>Name</th>
							<th>Extra</th>
							<th>Cost</th>
							<th>Quantity</th>
							<th>Cost</th>
						</tr>
					</thead>
					<tbody>
						{cart.products.map((product) => (
							<tr className={styles.tr} key={product._id}>
								<td>
									<div className={styles.imgContainer}>
										<Image
											src={product.img}
											layout="fill"
											objectFit="cover"
											alt=""
										/>
									</div>
								</td>
								<td>
									<span className={styles.name}>{product.title}</span>
								</td>
								<td>
									<span className={styles.extras}>
										{product.extras.map((extra) => (
											<span key={extra._id}> {extra.text},</span>
										))}
									</span>
								</td>
								<td>
									<span className={styles.price}>${product.price}</span>
								</td>
								<td>
									<span className={styles.quantity}>{product.quantity}</span>
								</td>
								<td>
									<span className={styles.total}>
										${product.price * product.quantity}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className={styles.right}>
				<div className={styles.wrapper}>
					<h2 className={styles.title}>CART TOTAL</h2>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>Cost:</b>${cart.total}
					</div>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>Discount:</b>$0.00
					</div>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>Total:</b>${cart.total}
					</div>
					<button
						className={styles.button}
						onClick={() => {
							setActive(true);
							disablePageScroll();
						}}>
						Order now!
					</button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
