import React from 'react';
import '../css/Button.css';

const Button = ({ label, handleClick }) => {
	return (
		<button className="button button1" onClick={handleClick}>
			{label}
		</button>
	);
};

export default Button;
