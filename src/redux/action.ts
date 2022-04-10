import { IFormData } from '../pages/FormPage/FormPage';

export const ADD_FORM_DATA = 'ADD_FORM_DATA';
export const CLEAR_FORM_DATA = 'CLEAR_FORM_DATA';

export function addFormDataAction(payload: IFormData) {
	return ({type: ADD_FORM_DATA, payload});
}

export function clearFormDataAction() {
	return ({type: CLEAR_FORM_DATA});
}