import { SINGLE_API } from "src/redux/actions/types";

const getListTask = async (userId, next) => {
	return {
		type: SINGLE_API,
		payload: {
			url: `/tasks/?filter=${userId}`,
			options: { method: "GET" },
			next,
		},
	};
};

/**
 * payload: name task & user id
 * @param {*} payload
 * @returns
 */
const addTask = async (payload, next = (f) => f) => {
	return {
		type: SINGLE_API,
		payload: {
			url: `/tasks/`,
			options: { method: "POST" },
			payload,
			next,
		},
	};
};

/**
 *
 * @param {*} id
 * @returns
 */
const deleteTask = (id) => {
	// return axios.delete(link_api.delete_task.replace(":id", id));
	return null;
};

/**
 *
 * @param {*} id
 * @param {*} data : name of task
 * @returns
 */
const updateTask = (id, data) => {
	// return axios.patch(link_api.update_task.replace(":id", id), data);
	return null;
};

// export const update = async (payload = {}, next = f => f) => {
// 	const { id, ...data } = payload;

// 	return {
// 		type: SINGLE_API,
// 		payload: {
// 			url: `/${MODEL_PLURAL}/${id}`,
// 			payload: data,
// 			options: { method: 'PATCH' },
// 			successType: 'UPDATE_' + MODEL_NAME + '_SUCCESS',
// 			next,
// 		},
// 	};
// };

export const TaskService = {
	getListTask,
	addTask,
	deleteTask,
	updateTask,
};
