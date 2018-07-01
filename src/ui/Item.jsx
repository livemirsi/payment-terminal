import styled from 'styled-components';

const Item = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: 30%;
	margin: 10px;
	padding-bottom: 10px;
	box-sizing: border-box;
	background: #fff;
	border: 1px solid #ccc;
	border-radius: 5px;
	color: #7a7a7a;
	cursor: pointer;

	&:hover {
		border: 1px solid #2074db;
	}

	@media (max-width: 1024px) {
		width: calc(50% - 20px);
	}

	@media (max-width: 768px) {
		width: calc(100% - 20px);
	}
`;

export default Item;
