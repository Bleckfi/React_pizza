import dbConnect from "../../../util/mongo";
import Product from "../../../models/product";
export default async function handler(req, res) {
	dbConnect();
	const { method, cookies } = req;

	const token = cookies.token;
	if (method === "GET") {
		try {
			const products = await Product.find();
			res.status(200).json(products);
		} catch {}
	}
	if (method === "POST") {
		if (!token || token !== process.env.TOKEN) {
			return res.status(401).json("Not auth");
		}
		try {
			const product = await Product.create(req.body);
			res.status(201).json(product);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
