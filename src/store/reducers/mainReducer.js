import * as actionTypes from '../actions/actionTypes.js';

const initalState = {
	data: null
};

const mainReducer = (state = initalState, action) => {
	switch (action.type) {
		case actionTypes.TICKER_DATA:
			return { ...state, data: action.value };
		case actionTypes.SOCKET_ERROR:
			return { ...state, data: action.value };
		default:
			return state;
	}
};

export default mainReducer;
