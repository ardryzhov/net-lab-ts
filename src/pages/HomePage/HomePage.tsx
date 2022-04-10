import React from 'react'
import './HomePage.scss';

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { IFormData } from '../FormPage/FormPage';

const HomePage: React.FC = () => {
	const data: any = useSelector<IFormData>(state => state.message);

	const state: IFormData = data[0];
	const { name, email } = state;

	return (
		<div className="homepage__wrap">
			<div className="homepage__title">
				<span>Form data: </span>
			</div>

			<div className="homepage__data">
				{
					!name && !email 
					? (
						<span>Форма пока не заполнена</span>
					) 
					: (
						<div className="data__info">
							<div className="info__labels">
								<label>Фио: </label><span>{state.name}</span>
							</div>
							<div className="info__labels">
								<label>E-mail: </label><span>{state.email}</span>
							</div>
							<div className="info__labels">
								<label>Тема: </label><span>{state.theme}</span>
							</div>
						</div>
					)
				}
			</div>

			<div className="homepage__btn">
				{
					!name && !email 
					? (
						<Link to='/form'>Заполнить форму</Link>
					)
					: (
						<Link to='/form/edit'>Изменить</Link>
					)
				}
			</div>
		</div>
	)
}

export default HomePage