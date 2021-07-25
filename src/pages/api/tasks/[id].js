const fs = require("fs");
let tasks = require("src/data/tasks.json");

const handler = (req, res) => {
	const saveData = () => {
		fs.writeFileSync("src/data/tasks.json", JSON.stringify(tasks, null, 4));
	};

	function updateTask() {
		try {
			const id = req.query.id;
			const data = req.body;
			const findIndex = tasks.findIndex((task) => task.id === id);
			let findTask = tasks.find((task) => task.id === id);
			if (findIndex !== -1) {
				if (
					data.name !== findTask.name &&
					tasks.find(
						(task) =>
							task.name === data.name &&
							task.userId === data.userId
					)
				) {
					throw {
						message: "Task already exist!",
						statusCode: 409,
					};
				} else {
					findTask = Object.assign(findTask, { ...data });
					tasks = [
						...tasks.slice(0, findIndex),
						{ ...findTask },
						...tasks.slice(findIndex + 1),
					];
					saveData();
				}
			} else {
				throw { message: "Task not found", statusCode: 404 };
			}
			return res.status(200).json({
				statusCode: 200,
				result: { ...findTask },
			});
		} catch (error) {
			return res
				.status(error.statusCode)
				.json({ message: error.message });
		}
	}

	function deleteTask() {
		try {
			const id = req.query.id;
			const findIndex = tasks.findIndex((task) => task.id === id);
			if (findIndex !== -1) {
				tasks = tasks.filter((task) => task.id !== id);
			}
			saveData();
			return res.status(200).json({ statusCode: 200, result: id });
		} catch (error) {
			return res.status(404).json({ message: error });
		}
	}

	switch (req.method) {
		case "PATCH":
			return updateTask();
		case "DELETE":
			return deleteTask();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
};

export default handler;
