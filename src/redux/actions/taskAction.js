import { SINGLE_API } from "src/redux/actions/types";
import * as types from "./types";

export const getTaskAction = (userId, next) => (dispatch) => {
	dispatch({
		type: SINGLE_API,
		payload: {
			url: `/tasks?filter=${userId}`,
			successType: types.LIST_TASK,
			options: { method: "GET" },
			next,
		},
	});
};

export const addTaskAction =
	(payload, next = (f) => f) =>
	(dispatch) => {
		dispatch({
			type: SINGLE_API,
			payload: {
				url: `/tasks`,
				successType: types.ADD_TASK,
				options: { method: "POST" },
				payload,
				next,
			},
		});
	};

export const deleteTaskAction =
	(id, next = (f) => f) =>
	(dispatch) => {
		dispatch({
			type: SINGLE_API,
			payload: {
				url: `/tasks/${id}`,
				payload: id,
				options: { method: "DELETE" },
				successType: types.DELETE_TASK,
				next,
			},
		});
	};

export const updateTaskAction =
	(id, data, next = (f) => f) =>
	(dispatch) => {
		dispatch({
			type: SINGLE_API,
			payload: {
				url: `/tasks/${id}`,
				payload: data,
				options: { method: "PATCH" },
				successType: types.UPDATE_TASK,
				next,
			},
		});
	};
