import React from 'react';
import { useDispatch } from 'react-redux';
import './Buttons.scss';

import { FormProps } from '../../pages/FormPage/FormPage';

import { addFormDataAction, clearFormDataAction } from '../../redux/action';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Buttons: React.FC<FormProps> = ({formData, setFormData}) => {
	
	const { pathname } = useLocation();
	const editForm = pathname === '/form/edit';

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const sendHandler = () => {
		console.log(formData)
		const { name, email, theme, message } = formData;
		if (name && email && theme && message) {
			dispatch(addFormDataAction(formData));
			navigate('/')
		} else {
			alert('Пожалуйста, заполните все поля формы')
		}
	}

	const clearFormHandler = (): void => {
		if (editForm) {
			setFormData({
				name: '',
				email: '',
				theme: '',
				message: ''
			})
			dispatch(clearFormDataAction());
		}
	}
 
	return (
		<div className="buttons-wrap">
			<div className="btn_clear">
				<button onClick={clearFormHandler} className={editForm ? 'btn__on' : 'btn__of'} disabled={!editForm}>Очистить</button>
			</div>
			<div className="btn_send">
				<button onClick={sendHandler}>Отправить</button>
			</div>
		</div>
	)
}

export default Buttons