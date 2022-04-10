import { createStore, combineReducers } from 'redux';
import { messageReducer } from './messageReducer';

export const rootReducer = combineReducers({
	message: messageReducer
});

export const store = createStore(rootReducer)