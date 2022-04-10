import React from 'react';
import './App.scss';

import HomePage from './pages/HomePage/HomePage';
import FormPage from './pages/FormPage/FormPage';
import NotfoundPage from './pages/NotfoundPage/NotfoundPage';

import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className="container">
			<Routes>
				<Route path='/' element={<HomePage />}/>
				<Route path='/form' element={<FormPage />} />
				<Route path='/form/edit' element={<FormPage />} />
				<Route path='*' element={<NotfoundPage />}/>
			</Routes>
		</div>
	)
}

export default App;
