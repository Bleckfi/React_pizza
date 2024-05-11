import dbConnect from "../../../util/mongo";
import Order from "../../../models/order";
import nodemailer from "nodemailer";

const handler = async (req, res) => {
	const { method } = req;

	await dbConnect();

	if (method === "GET") {
		try {
			const orders = await Order.find();
			res.status(200).json(orders);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	if (method === "POST") {
		try {
			const { custumer, address, email, total } = req.body;
			console.log(req.body);
			const transporter = nodemailer.createTransport({
				host: "smtp.mail.ru",
				port: "465",
				secure: true,
				auth: {
					user: "pashkovskiy-serge@mail.ru",
					pass: "WTTRpajRG0AWna6ZzCcg",
				},
			});

			const mailOptions = {
				from: "pashkovskiy-serge@mail.ru",
				to: email,
				subject: "Новый заказ",
				html: `<h1 style="text-align:center; font-size:26px; ">Спасибо за заказ!</h1>
				<p style="text-weight:bold; font-size: 16px;">Заказ будет доставлен на имя: ${custumer}</p>
				<p style="text-weight:bold; font-size: 16px;">Адресс получателя: ${address}</p>
				<p style="text-weight:bold; font-size: 16px;">Общая цена: $${total}</p>`,
			};

			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.error(error);
					res
						.status(500)
						.json({ error: "Ошибка отправки уведомления на почту" });
				} else {
					console.log("Email sent: " + info.response);
				}
			});

			const order = await Order.create(req.body);

			res.status(201).json(order);
		} catch (err) {
			console.error(err);
			res.status(500).json(err);
		}
	}
};

export default handler;
