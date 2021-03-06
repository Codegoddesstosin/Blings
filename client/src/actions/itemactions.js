import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';



export const getItems = () => dispatch => {
	dispatch(setItemsLoading());
	axios
	.get('/api/items')
	.then(res =>
        dispatch({
        	type: GET_ITEMS,
        	payload: res.data
        })
      
	);
};


export const deleteItem = id => (dispatch, getState) => {
	axios.delete(`/api/items/${id}`, tokenConfig(getState))
	.then(res => 
        dispatch({
        	type:DELETE_ITEM,
        	payload: id
        }))
	     
    
};

export const addItem = item => (dispatch, getState) => {
	axios.post('/api/items', item, tokenConfig(getState))
	.then(res => dispatch ({
		type: ADD_ITEM,
		payload: res.data
	}))
};

export const updateItem = item => (dispatch, getState) => {
	axios.put('/api/items', item, tokenConfig(getState))
	.then(res => dispatch ({
		type: UPDATE_ITEM,
		payload: res.data
	}))
};


export const setItemsLoading = () => {
	return {
		type: ITEMS_LOADING
	};
};