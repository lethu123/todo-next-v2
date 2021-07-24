import React from "react";
import PropTypes from "prop-types";

import Image from "next/image";

import { Button, Modal } from "antd";
import Link from "next/link";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { actionLogout } from "src/redux/actions/auth";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import classes from "./style.module.less";

const propTypes = {
	style: PropTypes.object,
};

const defaultProps = {
	style: {},
};

const Header = (props) => {
	const { style } = props;
	const router = useRouter();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const handleLogout = React.useCallback(async () => {
		Modal.confirm({
			title: "Are you sure?",
			icon: <ExclamationCircleOutlined />,
			// content: 'Are you sure?',
			onOk: async () => {
				await dispatch(
					await actionLogout(() => {
						router.push("/login");
					})
				);
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	}, []);

	return (
		<div className={classes.headerWrapper} style={style}>
			<div className={classes.header}>
				<div className="container">
					<div className="row align-items-center">
						<div className="col">
							<Link href="/">
								<a>
									<div className={classes.logo}>
										<Image
											src="/images/logo.png"
											alt="Logo"
											width={30}
											height={30}
											className="rounded"
										/>
										<h1 className="font-weight-bold">
											TODO APP
										</h1>
									</div>
								</a>
							</Link>
						</div>
						<div className="col col-auto d-flex align-items-center">
							{auth && (
								<div className="d-flex align-items-center">
									<h3 className="text-white mr-2 mb-0">
										Xin chào, {auth.fullName}
									</h3>
									<Button
										size="small"
										ghost
										className="px-3"
										onClick={handleLogout}
									>
										Logout
									</Button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
