import React, { useState } from 'react';
import './FormPage.scss';

import SelectDropdown from '../../components/SelectDropdown/SelectDropdown';
import Form from '../../components/Form/From';
import MsgTheme from '../../components/MsgTheme/MsgTheme';
import Buttons from '../../components/Buttons/Buttons';

import { useSelector } from 'react-redux';

export interface IFormData {
	name: string,
	email: string,
	theme: string,
	message: string
}

export interface FormProps {
	formData: IFormData,
	setFormData: React.Dispatch<React.SetStateAction<IFormData>>
}

const FormPage: React.FC = () => {
	const data = useSelector<IFormData>(state => state.message);
	console.log(data)

	const [formData, setFormData] = useState<IFormData>({
		name: '',
		email: '',
		theme: '',
		message: ''
	});

	return (
		<div className="formpage__wrap">
			<div className="form__content">
				<div className="content__wrap">

					<div className="content__title">
						<h2>Форма для тебя</h2>
					</div>

						<Form formData={formData} setFormData={setFormData} />

					<div className="content__select">
						<SelectDropdown formData={formData} setFormData={setFormData} />
					</div>

					<div className="message__theme">
						<MsgTheme formData={formData} setFormData={setFormData} />
					</div>

					<div className="form-buttons">
						<Buttons formData={formData} setFormData={setFormData} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default FormPage