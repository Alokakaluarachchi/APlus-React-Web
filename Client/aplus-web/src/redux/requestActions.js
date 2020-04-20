import { POPUP_SPINNER, SET_SESSION_EXPIRED, UPDATE_REQUEST_DETAILS_LIST } from './actionTypes';
import axios from 'axios';
import {  UPDATE_REQUEST_ENDPOINT,  GET_REQUEST_ENDPOINT, REMOVE_REQUEST_ENDPOINT } from '../config';
import { decrypt } from '../services/EncryptionService';
import { GetSession } from '../services/sessionManagement';
import { SetSessionExpiredStatus } from './systemActions';
import { popupSpinner } from './systemActions';
import { any } from 'prop-types';

/*export const updateRequestDetails = ()  => async (dispatch) =>
{

	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	//spinner
	dispatch({
		type    : POPUP_SPINNER,
		payload : true
	});

	//API call
	axios({
		method  : 'get',
		url     : GET_REQUEST_LIST_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token }
	})
		.then(function(response)
		{
			dispatch({
				type    : UPDATE_REQUEST_LIST,
				payload : response.data
			});

			//spinner
			dispatch({
				type    : POPUP_SPINNER,
				payload : false
			});

			return response.data;
		})
		.catch(function(error)
		{
			//spinner
			dispatch({
				type    : POPUP_SPINNER,
				payload : false
			});

			if(error.response.status === 401){

				dispatch({
					type    : SET_SESSION_EXPIRED,
					payload : true
				});
				return
			}
			throw error;
		});
}

/*export const addNewRole = (roleData) => async (dispatch) => {
	
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	//API call
	await axios({
		method  : 'post',
		url     : REGISTER_NEW_ROLE_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : roleData
	})
		.then(function(response)
		{
			return true;
		})
		.catch(function(error)
		{
			if(error.response.status === 401){
				dispatch({
					type    : SET_SESSION_EXPIRED,
					payload : true
				});

			}
			throw error;
		});
	
}*/

export const updateRequest = (requestData) => async (dispatch) => {

	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	//API call
	await axios({
		method  : 'post',
		url     : UPDATE_REQUEST_ENDPOINT,
		headers : { Authorization: 'Bearer ' + token },
		data    : requestData
	})
		.then(function(response)
		{
			return true;
		})
		.catch(function(error)
		{
			if(error.response.status === 401){
				dispatch({
					type    : SET_SESSION_EXPIRED,
					payload : true
				});

			}
			throw error;
		});

}

export const getRequestInformation = () => async (dispatch) => {
    console.log('abcd');
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	let responseData;

	//API call
	await axios({
		method  : 'get',
		url     : GET_REQUEST_ENDPOINT,
		headers : { 
			Authorization : 'Bearer ' + token
		}
	}) 
		.then(function(response )
		{
			dispatch({
				type    : UPDATE_REQUEST_DETAILS_LIST,
				payload : response.data
			});
		})
		.catch(function(error)
		{
			if(error.response.status === 401){
				dispatch({
					type    : SET_SESSION_EXPIRED,
					payload : true
				});

			}
			throw error;
		});

	return responseData;

}

export const removeRequest = (requestId) => async (dispatch) => {
    console.log('acc')
	const localData = JSON.parse(GetSession());
	let token = localData.sessionData.token;
	token = decrypt(token); //decrypt the token

	let responseData;

	//API call
	await axios({
		method  : 'post',
		url     : REMOVE_REQUEST_ENDPOINT,
		headers : {
			Authorization : 'Bearer ' + token
		},
		data : { requestId }
	})
		.then(function(response)
		{
			responseData = true;
		})
		.catch(function(error)
		{
			if(error.response.status === 401){
				dispatch({
					type    : SET_SESSION_EXPIRED,
					payload : true
				});

			}else if(error.response.status === 409){
				responseData = false;
			}
			throw error;
		});

	return responseData;

}
