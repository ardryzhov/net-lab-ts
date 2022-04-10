import { ADD_FORM_DATA, CLEAR_FORM_DATA } from './action';

const initialState = [
	{
		name: '',
		email: '',
		theme: '',
		message: ''
	},
];

export function messageReducer (state = initialState, action) {
	switch (action.type) {
		case ADD_FORM_DATA:
			return [action.payload];

		case CLEAR_FORM_DATA:
			const newState = {
				name: '',
				email: '',
				theme: '',
				message: ''
			};
			return [newState];
	
		default:
			return state;
	}
}