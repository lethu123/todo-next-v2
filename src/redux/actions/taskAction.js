import { notification } from "antd";
import { TaskService } from "src/services/task";
import * as types from "./types";

export const getTaskAction = (userId) => async (dispatch) => {
	try {
		const res = await dispatch(await TaskService.getListTask(userId));
		if (res) {
			dispatch({
				type: types.LIST_TASK,
				payload: res,
			});
		}
	} catch (error) {
		console.log(error);
	}
};

export const addTaskAction = (data) => async (dispatch) => {
	try {
		const result = await dispatch(await TaskService.addTask(data));
		if (result) {
			dispatch({
				type: types.ADD_TASK,
				payload: result.data.result,
			});
			notification.success({
				message: "Success!",
				description: "Add task successfully",
			});
		}
	} catch (error) {
		console.log("error", error);
	}
};
export const deleteTaskAction = (id) => async (dispatch) => {
	try {
		const res = await TaskService.deleteTask(id);
		if (res) {
			dispatch({
				type: types.DELETE_TASK,
				payload: id,
			});
			notification.success({
				message: "Success!",
				description: "Delete task successfully",
			});
		}
	} catch (error) {
		notification.error({
			message: "Error!",
			description:
				error.response.data.message || "Can not delete, try again !",
		});
	}
};
export const updateTaskAction = (id, data) => async (dispatch) => {
	try {
		const res = await TaskService.updateTask(id, data);
		if (res) {
			dispatch({
				type: types.UPDATE_TASK,
				payload: res.data.result,
			});
			notification.success({
				message: "Success!",
				description: "Update task successfully",
			});
		}
	} catch (error) {
		notification.error({
			message: "Error!",
			description:
				error.response.data.message || "Can not update, try again!",
		});
	}
};
