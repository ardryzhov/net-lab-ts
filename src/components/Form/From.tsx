import React, { useState, useRef, MutableRefObject, useEffect } from 'react';
import './Form.scss'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import warning from '../../assets/img/warning.svg';
import success from '../../assets/img/success.svg';

import { FormProps } from '../../pages/FormPage/FormPage';
import { IFormData } from '../../pages/FormPage/FormPage';

const From: React.FC<FormProps> = ({formData, setFormData}) => {

	const data: any = useSelector<IFormData>(state => state.message);
	const state: IFormData = data[0];
	const { name, email } = state;
	const { pathname } = useLocation();
	
	const [stateEmail, setStateEmail] = useState<string>(email)
	const [stateName, setStateName] = useState<string>(name);

	const nameInputFieldRef = useRef<HTMLDivElement | null>(null);
	const emailInputFieldRef = useRef<HTMLDivElement | null>(null);
	const [isCorrectEmail, setIsCorrectEmail] = useState<number | null>(1);
	const [isCorrectName, setIsCorrectName] = useState<number | null>(1);

	useEffect(() => {
		if (name && email && pathname === '/form/edit') {
			onblurInputHadle(nameInputFieldRef);
			onblurInputHadle(emailInputFieldRef);
		}
	}, [])

	useEffect(() => {
		setStateEmail(email);
		setStateName(name);

		if (name.length === 0 && email.length === 0) {
			defaultStateInput(nameInputFieldRef);
			defaultStateInput(emailInputFieldRef);
		}
	}, [state])

	const successHandler = (img: HTMLImageElement, input: HTMLInputElement): void =>{
		img.classList.add('success')
		img.classList.remove('warning');
		input.style.border = '2px solid #219653'
	}

	const warningHandler = (img: HTMLImageElement, input: HTMLInputElement): void => {
		img.classList.add('warning')
		img.classList.remove('success')
		input.style.border = '2px solid #eb5757'
	}

	const validateEmail = (email: string): boolean => {
		const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		 return regex.test(String(email).toLowerCase());
	}

	const validateWord = (word: string): boolean => {
		const regex = /^^([A-aZ-zА-аЯ-яЁё\s]+)$/i;
		return regex.test(word);
	}

	const onfocusInputHadle = (refInputField: MutableRefObject<HTMLDivElement | null>) => {
		const parent = refInputField.current!.children;
		const input = parent[0] as HTMLInputElement;
		const label = parent[1] as HTMLInputElement;

		if (label !== null) {
			label.style.opacity = '0';

			if (input !== null && input.value.trim().length === 0) {
				label.style.top = '40%'
			}
		}
	}


	const defaultStateInput = (refInputField: MutableRefObject<HTMLDivElement | null>): void => {
		const parent = refInputField.current!.children;
		const input = parent[0] as HTMLInputElement;
		const label = parent[1] as HTMLInputElement;
		const img = parent[2] as HTMLImageElement;
		const typeOfField = refInputField.current!.classList[1];

		label.style.top = '45%'
		label.style.fontSize = '1rem';

		img.classList.remove('warning')
		img.classList.remove('success')
		input.style.border = '2px solid #9B99AA'

		if (typeOfField === 'input_name') {
			setIsCorrectName(1);
		} else {
			setIsCorrectEmail(1);
		}
	}

	const onblurInputHadle = (refInputField: MutableRefObject<HTMLDivElement | null>) => {
		const parent = refInputField.current!.children;
		const input = parent[0] as HTMLInputElement;
		const label = parent[1] as HTMLInputElement;
		const img = parent[2] as HTMLImageElement;
		const typeOfField = refInputField.current!.classList[1];

		if (label !== null) {
			label.style.opacity = '1';
			if (input !== null && input.value.trim().length !== 0) {
				label.style.fontSize = '.8rem';
				label.style.top = '23%'
			} else {
				label.style.top = '45%'
				label.style.fontSize = '1rem';
			}
		}

		if (typeOfField === 'input_name') {
			if (validateWord(stateName.trim())) {
				setIsCorrectName(3)
				successHandler(img, input)
			} else {
				setIsCorrectName(2)
				warningHandler(img, input)
			}

		} 

		if (typeOfField === 'input_email') {
			if (validateEmail(stateEmail.trim())) {
				setIsCorrectEmail(3)
				successHandler(img, input)
			} else {
				setIsCorrectEmail(2)
				warningHandler(img, input)
			}
		}

		if (isCorrectEmail !== 2 && isCorrectName !== 2 ) {
			const Email = stateEmail.trim();
			const Name = stateName.trim();
			setFormData({
				...formData,
				email: Email,
				name: Name
			})
		}
	}


	return (
		<div className="form-wrap">
			<div className="content__inputs">
				<div className="input_field input_name" ref={nameInputFieldRef}>
					<input 
					onFocus={() => onfocusInputHadle(nameInputFieldRef)} 
					onBlur={() => onblurInputHadle(nameInputFieldRef)} 
					id='name' 
					type="text"
					value={stateName}
					onChange={(e) => setStateName(e.target.value)} />
					<label htmlFor="name">Представьтесь пожалуйста</label>
					<img src={isCorrectName === 2 ? warning : isCorrectName === 3 ? success : '' } alt="warning/success" />
				</div>

				<div className="input_field input_email" ref={emailInputFieldRef}>
					<input 
					onFocus={() => onfocusInputHadle(emailInputFieldRef)} 
					onBlur={() => onblurInputHadle(emailInputFieldRef)} 
					id='email' 
					type="text"
					value={stateEmail}
					onChange={(e) => setStateEmail(e.target.value)}/>
					<label htmlFor="email">Введите ваш e-mail</label>
					<img src={isCorrectEmail === 2 ? warning : isCorrectEmail === 3 ? success : '' } alt="warning/success" />
				</div>
			</div>
		</div>
	)
}

export default From