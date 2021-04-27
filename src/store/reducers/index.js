import { combineReducers } from 'redux';
import mainReducer from './mainReducer';

const rootReducer = combineReducers({
	bitnifex_data: mainReducer
});

export default rootReducer;
