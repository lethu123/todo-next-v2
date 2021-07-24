/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-05-12 22:08:37
*------------------------------------------------------- */

// import async from 'neo-async';
import fetchAPI from 'src/utils/fetch-api';

import { SINGLE_API/* , CHAIN_API, PARALLEL_API, REQUEST_ERROR */ } from 'src/redux/actions/types';

const mandatory = () => {
	throw new Error('Missing parameter!');
};

const singleApi = async (dataApi = mandatory(), dispatch) => {
	const { url = mandatory(), options, payload = {}, beforeCallType, successType, errorType, next = f => f } = dataApi;

	try {
		dispatch({ type: 'START_LOADING' });

		if (beforeCallType) {
			dispatch({ type: beforeCallType });
		}

		const response = await fetchAPI({
			url,
			options,
			payload,
			dispatch,
		});

		next(null, response);

		if (successType) {
			dispatch({ type: successType, payload: response });
		}

		return response;
	} catch (error) {
		next(error);

		if (errorType) {
			dispatch({ type: errorType, payload: error });
		}

		// dispatch({ type: REQUEST_ERROR, payload: error });
		throw error;
	}
};

const middleware = ({ dispatch/* , getState */ }) => next => action => {
	switch (action.type) {
		case SINGLE_API:
			return singleApi(action.payload, dispatch);
		default:
			return next(action);
	}
};

export default middleware;
