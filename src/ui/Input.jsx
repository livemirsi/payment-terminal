import styled from 'styled-components';

const Input = styled.input.attrs({})`
	width: 200px;
	box-sizing: border-box;
	padding: 12px 10px 8px 10px;
	background: #fff;
	border: 1px solid ${({ success }) => success ? '#00c4a7' : '#ccc'};
	border-radius: 4px;
	font-size: 19px;
	color: #494949;
	outline: none;

	&:focus {
		border: 1px solid ${({ success }) => success ? '#00c4a7' : '#2074db'};
	}

	&:disabled {
		background-color: #f4f4f4;
		cursor: not-allowed;
	}
`;

export default Input;
