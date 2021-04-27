import React, { useEffect, useRef, useState } from 'react';
import '../css/Ticker.css';
import createSocket from '../socket/webSocket';
import Logo from './Logo';
import { useSelector, useDispatch } from 'react-redux';
import ErrorComponent from './ErrorComponent';
import Loader from './Loader';
import Button from './ButtonComponent';

const Ticker = () => {
	const [buttonLabel, setButtonLabel] = useState('Stop');
	const response = useSelector(state => state.bitnifex_data.data);
	const socketRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (buttonLabel === 'Stop') {
			createSocket(socketRef, dispatch, buttonLabel);
		} else {
			socketRef.current.close();
		}
	}, [socketRef, dispatch, buttonLabel]);
 
	const handleClick = () => {
		setButtonLabel(buttonLabel === 'Stop' ? 'Start' : 'Stop');
	};

	if (!response) return <Loader />;
	if (response === 'error') return <ErrorComponent />;
	return (
		<div className="parent">
			<div className="grid-container">
				<div className="grid-item item1">
					<Logo />
				</div>
				<div className="grid-item row1 item2">BTC/USD</div>
				<div className="grid-item row1 item3">{response[0]}</div>
				<div className="grid-item row2 item4">
					<span className="span">VOL </span>{' '}
					{parseInt(response[7]) * parseInt(response[6])}
					<span className="span"> USD</span>
				</div>
				<div className="grid-item row2 item5">
					{parseFloat(response[4]).toFixed(2)}{' '}
					<i className="fa fa-caret-up fa-fw"></i>(
					{((response[5] / 100) * 10000).toFixed(2)}%)
				</div>
				<div className="grid-item row3 item6">
					<span className="span">LOW </span>
					{parseInt(response[9])}
				</div>
				<div className="grid-item row3 item7">
					<span className="span">HIGH </span> {parseInt(response[8])}
				</div>
			</div>
			<div className="grid-container" style={{ justifyContent: 'center' }}>
				<Button label={buttonLabel} handleClick={handleClick} />
			</div>
		</div>
	);
};

export default Ticker;
