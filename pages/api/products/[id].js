import dbConnect from "../../../util/mongo";
import Product from "../../../models/product";
export default async function handler(req, res) {
	dbConnect();
	const {
		method,
		query: { id },
		cookies,
	} = req;

	const token = cookies.token;
	if (method === "GET") {
		try {
			const product = await Product.findById(id);
			res.status(200).json(product);
		} catch {}
	}
	if (method === "PUT") {
		try {
			if (!token || token !== process.env.TOKEN) {
				return res.status(401).json("Not auth");
			}
			const product = await Product.create(req.body);
			res.status(201).json(product);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	if (method === "DELETE") {
		try {
			if (!token || token !== process.env.TOKEN) {
				return res.status(401).json("Not auth");
			}
			await Product.findByIdAndDelete(id);
			res.status(200).json("sucess deleted");
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
