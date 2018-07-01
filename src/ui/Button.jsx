import styled from 'styled-components';

const Button = styled.div.attrs({ disabled: props => props.disabled ? 'disabled' : false })`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	width: 200px;
	height: 80px;
	box-sizing: border-box;
	border-radius: 5px;
	background-color: #014ab7;
	color: #fff;
	font-family: inherit;
	font-size: 28px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 1.5px;
	cursor: pointer;
	outline: none;

	&:hover {
		background-color: #0052cc;
	}

	&[disabled] {
		opacity: 0.6;
		background-color: #e0e0e0;
		color: #494949;
		border: 1px solid #ccc;
		cursor: not-allowed;
	}
`;

export default Button;
