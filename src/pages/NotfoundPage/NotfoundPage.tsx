import React from 'react';
import { Link } from 'react-router-dom';
import './NotfoundPage.scss';

const NotfoundPage = () => {
	return (
		<div className="notfondpage__wrap">
			<h1>404</h1>
			<div>Упс! Кажется Вы попали на несуществующую страницу</div>
			<div>Нажмите <Link to='/'>сюда</Link> для возврата на главную страницу</div>
		</div>
	)
}

export default NotfoundPage