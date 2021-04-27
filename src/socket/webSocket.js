import { TICKER_DATA, SOCKET_ERROR } from '../store/actions/actionTypes';

let msg = JSON.stringify({
	event: 'subscribe',
	channel: 'ticker',
	symbol: 'tBTCUSD'
});

const createSocket = (socketRef, dispatch, label) => {
	const wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
	socketRef.current = wss;
	if (label === 'Stop') {
		wss.onmessage = message => {
			if (Array.isArray(JSON.parse(message.data)[1])) {
				return dispatch({
					type: TICKER_DATA,
					value: JSON.parse(message.data)[1]
				});
			}
		};
		wss.onerror = message => dispatch({ type: SOCKET_ERROR, value: 'error' });
		wss.onopen = () => {
			wss.send(msg);
		};
	}
};

export default createSocket;
