import React, { useState, useRef, useEffect } from 'react';
import './SelectDropdown.scss';

import arrow from '../../assets/img/selectArrow.svg';
import { FormProps } from '../../pages/FormPage/FormPage';
import { IFormData } from '../../pages/FormPage/FormPage';

import { useSelector } from 'react-redux';

interface ISelectOption {
	id: string,
	title: string,
	choosen: boolean
}

const SelectDropdown: React.FC<FormProps> = ({formData, setFormData}) => {
	const data: any = useSelector<IFormData>(state => state.message);
	const state: IFormData = data[0];
	const { theme } = state;

	const dropDownList = useRef<HTMLUListElement| null>(null);
	const imgArrowRef = useRef<HTMLImageElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const [msgTheme, setMsgTheme] = useState<string>(theme);	
	const [selectOption] = useState<Array<ISelectOption>>([
		{id: '1',
		 title: 'Тема 1',
		 choosen: false},
		{id: '2',
	 	 title: 'Тема 2',
		 choosen: false},
		{id: '3',
		 title: 'Тема 3',
		 choosen: false},
		{id: '4',
		 title: 'Тема 4',
		 choosen: false}])

	
	useEffect(() => {
		document.addEventListener('keydown', keyboardHandler);
		return () => {
			document.removeEventListener('keydown', keyboardHandler);
		};
	})

	useEffect(() => {
		if (theme.length === 0) {
			setMsgTheme(theme);
			buttonRef.current!.style.fontSize = '1rem'
			buttonRef.current!.style.top = '0px';
			console.log('theme.length === 0')
		} else {
			buttonRef.current!.style.fontSize = '.8rem'
			buttonRef.current!.style.top = '-20px';
			console.log('else')
		}
	}, [state])

	const keyboardHandler = (e: KeyboardEvent) => {
		if (e.key === "Escape" && !dropDownList.current!.classList.contains('dropdown-hide')) {
			closeSelectOption();
		}
	};

	const openSelectOption = (): void => {
		dropDownList.current!.classList.toggle('dropdown-hide')
		imgArrowRef.current!.classList.toggle('dropdown-open')
	}

	const closeSelectOption = (): void => {
		dropDownList.current!.classList.add('dropdown-hide')
		imgArrowRef.current!.classList.add('dropdown-open')
	}
	
	const chooseSelectOption = (e: React.MouseEvent<HTMLLIElement>): void => {
		setMsgTheme((e.currentTarget as HTMLLIElement).innerHTML);
		closeSelectOption();
		setFormData({
			...formData,
			theme: (e.currentTarget as HTMLLIElement).innerHTML
		})

		buttonRef.current!.style.fontSize = '.8rem'
		buttonRef.current!.style.top = '-20px';
	}

	return (
		<div className="select__dropdown-wrap">
			<div className="dropdown__select">
				<div className="dropdown__select_title" onClick={openSelectOption}>
					<button ref={buttonRef}>Тема сообщения</button>
					<span>{msgTheme}</span>
					<img ref={imgArrowRef} src={arrow} alt="arrow-icon" />
				</div>
				<ul ref={dropDownList} className='dropdown__list dropdown-hide'>
					{
						selectOption.map((item: ISelectOption) => {
							return (
								<li 
								onClick={(e) => chooseSelectOption(e)}
								className="dropdown__item" 
								key={item.id}>{item.title}</li>
							)
						})
					}
				</ul>
			</div>
		</div>
	)
}

export default SelectDropdown