import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";
const Add = ({ setClose }) => {
	const [file, setFile] = useState(null);
	const [title, setTitle] = useState(null);
	const [desc, setDesc] = useState(null);
	const [prices, setPrices] = useState([]);
	const [extra, setExtra] = useState(null);
	const [extraOptions, setExtraOption] = useState([]);

	const handleExtraInput = (e) => {
		setExtra({ ...extra, [e.target.name]: e.target.value });
	};

	const handleExtra = () => {
		setExtraOption((prev) => [...prev, extra]);
	};

	const chanPrice = (e, index) => {
		const currentPrices = prices;
		currentPrices[index] = e.target.value;
		setPrices(currentPrices);
	};

	const handleCreate = async () => {
		const data = new FormData();
		data.append("file", file);
		data.append("upload_preset", "uploads");
		try {
			const uploadRes = await axios.post(
				"https://api.cloudinary.com/v1_1/drwohhyc2/image/upload",
				data
			);
			const { url } = uploadRes.data;
			const newProduct = {
				title,
				desc,
				prices,
				extraOptions,
				img: url,
			};

			axios.post("http://localhost:3000/api/products", newProduct);
			setClose(true);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<span onClick={() => setClose(true)} className={styles.close}>
					X
				</span>
				<h1>Add a new Pizza</h1>
				<div className={styles.item}>
					<label className={styles.label}> Coose an image</label>
					<input type="file" onChange={(e) => setFile(e.target.files[0])} />
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Title</label>
					<input
						className={styles.input}
						onChange={(e) => setTitle(e.target.value)}
						type="text"
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Desc</label>
					<textarea
						rows={4}
						type="text"
						onChange={(e) => setDesc(e.target.value)}></textarea>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Prices</label>
					<div className={styles.priceContainer}>
						<input
							className={`${styles.input} ${styles.inputSm}`}
							type="number"
							placeholder="Small"
							onChange={(e) => chanPrice(e, 0)}
						/>
						<input
							className={`${styles.input} ${styles.inputSm}`}
							type="number"
							placeholder="Medium"
							onChange={(e) => chanPrice(e, 1)}
						/>
						<input
							className={`${styles.input} ${styles.inputSm}`}
							type="number"
							placeholder="Large"
							onChange={(e) => chanPrice(e, 2)}
						/>
					</div>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Extra</label>
					<div className={styles.exta}>
						<div className={styles.priceContainer}>
							<input
								className={styles.input}
								type="text"
								placeholder="Name"
								name="text"
								onChange={handleExtraInput}
							/>
							<input
								className={styles.input}
								type="number"
								placeholder="Price"
								name="price"
								onChange={handleExtraInput}
							/>
						</div>
						<button className={styles.extraButton} onClick={handleExtra}>
							Add
						</button>
					</div>
					<div className={styles.extraItems}>
						{extraOptions.map((option) => (
							<span key={option.text} className={styles.extraItem}>
								{option.text}
							</span>
						))}
					</div>
				</div>
				<button className={styles.addButton} onClick={handleCreate}>
					Create
				</button>
			</div>
		</div>
	);
};

export default Add;
