import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
//import AuthReducer from './AuthReducer';

export default combineReducers({
	item: itemReducer
	//Auth: AuthReducer
});