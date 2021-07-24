import { objectId } from "src/utils/apply-url-filter";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require("fs");
const tasks = require("src/data/tasks.json");

const handler = (req, res) => {
	const saveData = () => {
		fs.writeFileSync("src/data/tasks.json", JSON.stringify(tasks, null, 4));
	};

	const getTask = () => {
		return res.status(200).json({
			statusCode: 200,
			result: tasks.filter((task) => task.userId === req.query.filter),
		});
	};

	const createTask = () => {
		try {
			const task = { name: req.body.name, userId: req.body.userId };
			const findItem = tasks.find(
				(x) => x.name === task.name && x.userId === task.userId
			);

			if (findItem) {
				throw "Task already exist!";
			}
			task.id = objectId();
			tasks.push(task);
			saveData();
			return res.status(200).json(task);
		} catch (error) {
			return res.status(400).json({ message: error });
		}
	};

	switch (req.method) {
		case "GET":
			return getTask();
		case "POST":
			return createTask();
		default:
			break;
	}
};
export default handler;
