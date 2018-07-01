import styled from 'styled-components';

const Form = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: stretch;
	width: 80%;
	margin: 10px;
	padding: 30px;
	box-sizing: border-box;
	background: #fff;
	border: 1px solid #ccc;
	border-radius: 5px;
	color: #7a7a7a;

	@media (max-width: 1024px) {
		width: calc(100% - 10px);
	}

	@media (max-width: 860px) {
		align-items: center;
	}
`;

export default Form;
