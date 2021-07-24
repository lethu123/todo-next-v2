import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Col, Popconfirm, Row, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTaskAction } from "src/redux/actions/taskAction";
import tets from "src/containers/Index/style.module.less";

const TaskItem = ({ item, index, setItem, setTask }) => {
	const dispatch = useDispatch();
	const confirm = (e) => {
		if (item) {
			dispatch(deleteTaskAction(item.id));
		}
	};

	const cancel = (e) => {
		message.error("Canceled");
	};
	const handleUpdate = () => {
		setItem(item);
		setTask(item.name);
	};
	return (
		<Card bordered={false} className={tets.card_hover}>
			<Row align="top">
				<Col className="m-auto" span="22">
					<span>
						{index + 1}. {item.name}
					</span>
				</Col>
				<Col className="m-auto mt-0 text-right" span="2">
					<Popconfirm
						title="Are you sure to delete this task?"
						onConfirm={confirm}
						onCancel={cancel}
						okText="Yes"
						cancelText="No"
					>
						<CloseOutlined
							size="20"
							className="cursor-pointer text-danger"
						/>
					</Popconfirm>

					<EditOutlined
						size="20"
						className="cursor-pointer text-warning"
						onClick={handleUpdate}
					/>
				</Col>
			</Row>
		</Card>
	);
};

export default TaskItem;
