import React, { useEffect, useState } from 'react';
import './MsgTheme.scss';

import { IFormData, FormProps } from '../../pages/FormPage/FormPage';

import { useSelector } from 'react-redux';

const MsgTheme: React.FC<FormProps> = ({formData, setFormData}) => {
	const data: any = useSelector<IFormData>(state => state.message);
	const state: IFormData = data[0];
	const { message } = state;
	const [stateMessage, setStateMessage] = useState<string>(message);

	useEffect(() => {
		setStateMessage(message)
	}, [state])

	const messageHandler = () => {
		if (stateMessage.trim().length !== 0) {
			setFormData({
				...formData,
				message: stateMessage
			})
		}
	}

	return (
		<div className="msg-theme-wrap">
			<textarea name="" id="" placeholder='Например: разработать логотип для бренда рюкзаков. Наши покупатели – девушки и парни 17+, которые живут в большои городе и ценят независимость.' onBlur={messageHandler} onChange={(e) => setStateMessage(e.target.value)} value={stateMessage}></textarea>
		</div>
	)
}

export default MsgTheme