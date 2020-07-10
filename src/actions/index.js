import queryString from 'query-string';
import axios from 'axios';
import {ADD_PARAMS, DELETE_PARAM, SEARCH_API_INTIATE, SAVE_BATTLES, SAVE_LOCATIONS} from './constants';

export const addParams = (params) => {
	return {
		type: ADD_PARAMS,
		payload: params,
	};
};

export const deleteParam = (key) => {
	return {
		type: DELETE_PARAM,
		payload: key,
	};
};

export const saveBattles = (battles) => {
	return {
		type: SAVE_BATTLES,
		payload: battles,
	};
};

export const saveLocations = (locations) => {
	return {
		type: SAVE_LOCATIONS,
		payload: locations,
	};
};

export const searchBattles = (params) => {
	return (dispatch) => {
		dispatch({type: SEARCH_API_INTIATE});
		const stringifiedParams = queryString.stringify(params);
		const url = `https://n97x5g3hyl.execute-api.us-east-2.amazonaws.com/dev/search${
			stringifiedParams && `?${stringifiedParams}`
		}`;
		axios.get(url).then((response) => {
			if (response.data) dispatch(saveBattles(response.data));
		});
	};
};

export const getLocations = () => {
	return (dispatch) => {
		axios.get('https://n97x5g3hyl.execute-api.us-east-2.amazonaws.com/dev/list').then((response) => {
			if (response.data) dispatch(saveLocations(response.data));
		});
	};
};
