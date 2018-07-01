import styled from 'styled-components';

const List = styled.div`
	position: relative;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	width: 1024px;

	@media (max-width: 1024px) {
		width: 100%;
	}
`;

export default List;
