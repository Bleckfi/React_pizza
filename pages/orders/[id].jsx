import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";
const Order = ({ order }) => {
	const status = order.status;

	const statusClass = (index) => {
		if (index - status < 1) return styles.done;
		if (index - status === 1) return styles.inProgress;
		if (index - status > 1) return styles.undone;
	};
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<div className={styles.row}>
					<table className={styles.table}>
						<thead>
							<tr className={styles.trTitle}>
								<th>ID </th>
								<th>Custumer</th>
								<th>Address</th>
								<th>Total</th>
								<th>Email</th>
							</tr>
							<tr className={styles.tr}>
								<td>
									<span className={styles.id}>{order._id}</span>
								</td>
								<td>
									<span className={styles.name}>{order.custumer}</span>
								</td>
								<td>
									<span className={styles.address}>{order.address}</span>
								</td>
								<td>
									<span className={styles.total}>${order.total}</span>
								</td>
								<td>
									<span className={styles.total}>{order.email}</span>
								</td>
							</tr>
						</thead>
					</table>
				</div>
				<div className={styles.row}>
					<div className={statusClass(0)}>
						<Image src="/img/paid.png" width={30} height={30} alt="" />
						<span>Payment</span>
						<div className={styles.checkedIcon}>
							<Image
								className={styles.checkedIcon}
								src="/img/checked.png"
								width={20}
								height={20}
								alt=""
							/>
						</div>
					</div>
					<div className={statusClass(1)}>
						<Image src="/img/bake.png" width={30} height={30} alt="" />
						<span>Cooked</span>
						<div className={styles.checkedIcon}>
							<Image
								className={styles.checkedIcon}
								src="/img/checked.png"
								width={20}
								height={20}
								alt=""
							/>
						</div>
					</div>
					<div className={statusClass(2)}>
						<Image src="/img/bike.png" width={30} height={30} alt="" />
						<span>In way</span>
						<div className={styles.checkedIcon}>
							<Image
								className={styles.checkedIcon}
								src="/img/checked.png"
								width={20}
								height={20}
								alt=""
							/>
						</div>
					</div>
					<div className={statusClass(3)}>
						<Image src="/img/delivered.png" width={30} height={30} alt="" />
						<span>Delivered</span>
						<div className={styles.checkedIcon}>
							<Image
								className={styles.checkedIcon}
								src="/img/checked.png"
								width={20}
								height={20}
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.right}>
				<div className={styles.wrapper}>
					<h2 className={styles.title}>Total</h2>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>Cost:</b>${order.total}
					</div>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>Discount</b>$0.00
					</div>
					<div className={styles.totalText}>
						<b className={styles.totalTextTitle}>Tolal: </b>${order.total}
					</div>
					<button disabled className={styles.button}>
						Pay
					</button>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = async ({ params }) => {
	const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
	return {
		props: {
			order: res.data,
		},
	};
};

export default Order;
