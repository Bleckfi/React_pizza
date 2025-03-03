import Order from "../../../models/order";
import dbConnect from "../../../util/mongo";
const handler = async (req, res) => {
	const {
		method,
		query: { id },
	} = req;

	dbConnect();

	if (method === "GET") {
		try {
			const order = await Order.findById(id);
			res.status(200).json(order);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	if (method === "PUT") {
		try {
			const order = await Order.findByIdAndUpdate(id, req.body);
			res.status(201).json(order);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	if (method === "DELETE") {
	}
};

export default handler;
